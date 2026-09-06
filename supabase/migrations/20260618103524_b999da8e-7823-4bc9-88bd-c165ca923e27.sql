
-- Profiles: WhatsApp templates and reminder toggle
ALTER TABLE public.profiles
  ADD COLUMN IF NOT EXISTS wa_templates jsonb NOT NULL DEFAULT '{
    "received": "Hi {name}, we have received your {device} for repair. Ticket: {ticket}. — {shop}",
    "in_progress": "Hi {name}, work has started on your {device} (Ticket {ticket}). We will update you soon. — {shop}",
    "ready_delivery": "Hi {name}, your {device} (Ticket {ticket}) is ready for delivery. Please visit us. — {shop}",
    "delivered": "Hi {name}, thanks for choosing {shop}. Your {device} (Ticket {ticket}) is delivered. We appreciate a review!",
    "payment_reminder": "Hi {name}, gentle reminder: invoice {invoice_no} of {amount} is pending. — {shop}",
    "invoice": "Hi {name}, your invoice {invoice_no} of {amount} from {shop}. Download: {link}"
  }'::jsonb,
  ADD COLUMN IF NOT EXISTS auto_reminders boolean NOT NULL DEFAULT false;

-- Repairs: status timestamps
ALTER TABLE public.repairs
  ADD COLUMN IF NOT EXISTS completed_at timestamptz,
  ADD COLUMN IF NOT EXISTS delivered_at timestamptz,
  ADD COLUMN IF NOT EXISTS assigned_at timestamptz;

CREATE OR REPLACE FUNCTION public.tg_repair_status_timestamps()
RETURNS trigger LANGUAGE plpgsql SET search_path = public AS $$
BEGIN
  IF NEW.status IS DISTINCT FROM OLD.status THEN
    IF NEW.status IN ('completed','ready_delivery') AND NEW.completed_at IS NULL THEN
      NEW.completed_at := now();
    END IF;
    IF NEW.status = 'delivered' AND NEW.delivered_at IS NULL THEN
      NEW.delivered_at := now();
    END IF;
  END IF;
  IF NEW.technician_name IS DISTINCT FROM OLD.technician_name AND NEW.technician_name IS NOT NULL THEN
    NEW.assigned_at := now();
  END IF;
  RETURN NEW;
END $$;

DROP TRIGGER IF EXISTS trg_repair_status_timestamps ON public.repairs;
CREATE TRIGGER trg_repair_status_timestamps BEFORE UPDATE ON public.repairs
  FOR EACH ROW EXECUTE FUNCTION public.tg_repair_status_timestamps();

-- Repair notes
CREATE TABLE IF NOT EXISTS public.repair_notes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  owner_id uuid NOT NULL,
  repair_id uuid NOT NULL REFERENCES public.repairs(id) ON DELETE CASCADE,
  technician_name text,
  note text NOT NULL,
  task_done boolean NOT NULL DEFAULT false,
  completed_at timestamptz,
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.repair_notes TO authenticated;
GRANT ALL ON public.repair_notes TO service_role;
ALTER TABLE public.repair_notes ENABLE ROW LEVEL SECURITY;
CREATE POLICY "owner crud repair_notes" ON public.repair_notes FOR ALL
  USING (auth.uid() = owner_id) WITH CHECK (auth.uid() = owner_id);
CREATE INDEX IF NOT EXISTS idx_repair_notes_repair ON public.repair_notes(repair_id);

-- Suppliers
CREATE TABLE IF NOT EXISTS public.suppliers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  owner_id uuid NOT NULL,
  name text NOT NULL,
  contact_person text,
  phone text,
  email text,
  address text,
  gst_number text,
  notes text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.suppliers TO authenticated;
GRANT ALL ON public.suppliers TO service_role;
ALTER TABLE public.suppliers ENABLE ROW LEVEL SECURITY;
CREATE POLICY "owner crud suppliers" ON public.suppliers FOR ALL
  USING (auth.uid() = owner_id) WITH CHECK (auth.uid() = owner_id);
CREATE TRIGGER trg_suppliers_updated BEFORE UPDATE ON public.suppliers
  FOR EACH ROW EXECUTE FUNCTION public.tg_set_updated_at();

-- Purchase orders
CREATE TABLE IF NOT EXISTS public.purchase_orders (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  owner_id uuid NOT NULL,
  supplier_id uuid REFERENCES public.suppliers(id) ON DELETE SET NULL,
  po_no text NOT NULL DEFAULT ('PO-' || to_char(now(),'YYMMDD') || '-' || lpad((floor(random()*9999))::text,4,'0')),
  status text NOT NULL DEFAULT 'pending', -- pending/received/cancelled
  total numeric(12,2) NOT NULL DEFAULT 0,
  notes text,
  received_at timestamptz,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.purchase_orders TO authenticated;
GRANT ALL ON public.purchase_orders TO service_role;
ALTER TABLE public.purchase_orders ENABLE ROW LEVEL SECURITY;
CREATE POLICY "owner crud purchase_orders" ON public.purchase_orders FOR ALL
  USING (auth.uid() = owner_id) WITH CHECK (auth.uid() = owner_id);
CREATE TRIGGER trg_po_updated BEFORE UPDATE ON public.purchase_orders
  FOR EACH ROW EXECUTE FUNCTION public.tg_set_updated_at();

CREATE TABLE IF NOT EXISTS public.purchase_order_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  owner_id uuid NOT NULL,
  po_id uuid NOT NULL REFERENCES public.purchase_orders(id) ON DELETE CASCADE,
  item_id uuid REFERENCES public.inventory_items(id) ON DELETE SET NULL,
  description text NOT NULL,
  quantity int NOT NULL DEFAULT 1,
  unit_cost numeric(12,2) NOT NULL DEFAULT 0,
  amount numeric(12,2) NOT NULL DEFAULT 0
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.purchase_order_items TO authenticated;
GRANT ALL ON public.purchase_order_items TO service_role;
ALTER TABLE public.purchase_order_items ENABLE ROW LEVEL SECURITY;
CREATE POLICY "owner crud po_items" ON public.purchase_order_items FOR ALL
  USING (auth.uid() = owner_id) WITH CHECK (auth.uid() = owner_id);

-- Stock movements (history log)
CREATE TABLE IF NOT EXISTS public.stock_movements (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  owner_id uuid NOT NULL,
  item_id uuid REFERENCES public.inventory_items(id) ON DELETE CASCADE,
  item_name text NOT NULL,
  change int NOT NULL,
  balance_after int,
  movement_type text NOT NULL DEFAULT 'adjustment', -- in / out / adjustment / purchase / repair
  reference text,
  notes text,
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.stock_movements TO authenticated;
GRANT ALL ON public.stock_movements TO service_role;
ALTER TABLE public.stock_movements ENABLE ROW LEVEL SECURITY;
CREATE POLICY "owner crud stock_movements" ON public.stock_movements FOR ALL
  USING (auth.uid() = owner_id) WITH CHECK (auth.uid() = owner_id);
CREATE INDEX IF NOT EXISTS idx_stock_movements_item ON public.stock_movements(item_id);
CREATE INDEX IF NOT EXISTS idx_stock_movements_created ON public.stock_movements(created_at DESC);

-- Auto-log inventory quantity changes
CREATE OR REPLACE FUNCTION public.tg_log_inventory_change()
RETURNS trigger LANGUAGE plpgsql SET search_path = public AS $$
DECLARE delta int;
BEGIN
  IF TG_OP = 'INSERT' THEN
    IF NEW.quantity <> 0 THEN
      INSERT INTO public.stock_movements(owner_id,item_id,item_name,change,balance_after,movement_type,notes)
      VALUES (NEW.owner_id, NEW.id, NEW.name, NEW.quantity, NEW.quantity, 'in', 'Initial stock');
    END IF;
    RETURN NEW;
  ELSIF TG_OP = 'UPDATE' THEN
    delta := NEW.quantity - OLD.quantity;
    IF delta <> 0 THEN
      INSERT INTO public.stock_movements(owner_id,item_id,item_name,change,balance_after,movement_type,notes)
      VALUES (NEW.owner_id, NEW.id, NEW.name, delta, NEW.quantity,
              CASE WHEN delta > 0 THEN 'in' ELSE 'out' END,
              'Stock updated');
    END IF;
    RETURN NEW;
  END IF;
  RETURN NEW;
END $$;

DROP TRIGGER IF EXISTS trg_log_inventory_change ON public.inventory_items;
CREATE TRIGGER trg_log_inventory_change AFTER INSERT OR UPDATE ON public.inventory_items
  FOR EACH ROW EXECUTE FUNCTION public.tg_log_inventory_change();
