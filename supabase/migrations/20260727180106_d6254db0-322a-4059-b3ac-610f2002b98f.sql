
CREATE TABLE public.wa_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  owner_id UUID NOT NULL,
  repair_id UUID REFERENCES public.repairs(id) ON DELETE CASCADE,
  invoice_id UUID REFERENCES public.invoices(id) ON DELETE CASCADE,
  kind TEXT NOT NULL,
  recipient_name TEXT,
  phone TEXT,
  message TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'sent',
  error TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.wa_logs TO authenticated;
GRANT ALL ON public.wa_logs TO service_role;
ALTER TABLE public.wa_logs ENABLE ROW LEVEL SECURITY;
CREATE POLICY "own wa_logs" ON public.wa_logs FOR ALL USING (auth.uid() = owner_id) WITH CHECK (auth.uid() = owner_id);
CREATE INDEX wa_logs_repair_idx ON public.wa_logs(repair_id, created_at DESC);
CREATE INDEX wa_logs_invoice_idx ON public.wa_logs(invoice_id, created_at DESC);
