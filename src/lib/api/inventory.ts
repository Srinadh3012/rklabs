import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { InventoryItem, StockMovement, Supplier, PurchaseOrder, PurchaseOrderItem } from "../models";
import { requireAuth } from "../auth.server";

// === INVENTORY ITEMS ===
const inventoryItemSchema = z.object({
  name: z.string(),
  sku: z.string().nullable().optional(),
  category: z.string().nullable().optional(),
  cost_price: z.number(),
  selling_price: z.number(),
  stock_level: z.number(),
  min_stock_level: z.number().nullable().optional(),
  location: z.string().nullable().optional(),
});

export const getInventoryItemsFn = createServerFn({ method: "GET" })
  .handler(async () => {
    await requireAuth();
    const items = await InventoryItem.find().sort({ name: 1 });
    return items.map(i => ({
      id: i._id.toString(),
      name: i.name,
      sku: i.sku,
      category: i.category,
      cost_price: i.cost_price,
      selling_price: i.selling_price,
      stock_level: i.stock_level,
      min_stock_level: i.min_stock_level,
      location: i.location,
    }));
  });

export const createInventoryItemFn = createServerFn({ method: "POST" })
  .validator((data) => inventoryItemSchema.parse(data))
  .handler(async ({ data }) => {
    const { session } = await requireAuth();
    const item = await InventoryItem.create({ ...data, owner_id: session.userId });
    return { id: item._id.toString() };
  });

export const updateInventoryItemFn = createServerFn({ method: "POST" })
  .validator((data) => z.object({ id: z.string(), data: inventoryItemSchema.partial() }).parse(data))
  .handler(async ({ data }) => {
    await requireAuth();
    await InventoryItem.findByIdAndUpdate(data.id, data.data);
    return { success: true };
  });

export const deleteInventoryItemFn = createServerFn({ method: "POST" })
  .validator((id: string) => z.string().parse(id))
  .handler(async ({ data }) => {
    await requireAuth();
    await InventoryItem.findByIdAndDelete(data);
    return { success: true };
  });

// === STOCK MOVEMENTS ===
const stockMovementSchema = z.object({
  item_id: z.string(),
  type: z.string(),
  quantity: z.number(),
  reference_id: z.string().nullable().optional(),
  reference_type: z.string().nullable().optional(),
  notes: z.string().nullable().optional(),
});

export const getStockMovementsFn = createServerFn({ method: "GET" })
  .handler(async () => {
    await requireAuth();
    const moves = await StockMovement.find().sort({ created_at: -1 }).limit(500);
    return moves.map(m => ({
      id: m._id.toString(),
      item_id: m.item_id,
      item_name: "Item", // Would need a lookup, but keeping simple for now or fetch in UI
      movement_type: m.type,
      change: m.quantity,
      balance_after: 0, // Need calculation in UI
      reference: m.reference_id,
      notes: m.notes,
      created_at: m.created_at.toISOString(),
    }));
  });

export const createStockMovementFn = createServerFn({ method: "POST" })
  .validator((data) => stockMovementSchema.parse(data))
  .handler(async ({ data }) => {
    const { session } = await requireAuth();
    await StockMovement.create({ ...data, owner_id: session.userId });
    if (data.type === "in" || data.type === "out") {
      const modifier = data.type === "in" ? data.quantity : -data.quantity;
      await InventoryItem.findByIdAndUpdate(data.item_id, { $inc: { quantity: modifier } });
    }
    return { success: true };
  });

// === SUPPLIERS ===
const supplierSchema = z.object({
  name: z.string(),
  contact_person: z.string().nullable().optional(),
  phone: z.string().nullable().optional(),
  email: z.string().nullable().optional(),
  address: z.string().nullable().optional(),
  gst_number: z.string().nullable().optional(),
  notes: z.string().nullable().optional(),
});

export const getSuppliersFn = createServerFn({ method: "GET" })
  .handler(async () => {
    await requireAuth();
    const items = await Supplier.find().sort({ name: 1 });
    return items.map(i => ({
      id: i._id.toString(),
      name: i.name,
      contact_person: i.contact_person,
      phone: i.phone,
      email: i.email,
      address: i.address,
      gst_number: i.gst_number,
      notes: i.notes,
    }));
  });

export const createSupplierFn = createServerFn({ method: "POST" })
  .validator((data) => supplierSchema.parse(data))
  .handler(async ({ data }) => {
    const { session } = await requireAuth();
    const item = await Supplier.create({ ...data, owner_id: session.userId });
    return { id: item._id.toString() };
  });

export const updateSupplierFn = createServerFn({ method: "POST" })
  .validator((data) => z.object({ id: z.string(), data: supplierSchema.partial() }).parse(data))
  .handler(async ({ data }) => {
    await requireAuth();
    await Supplier.findByIdAndUpdate(data.id, data.data);
    return { success: true };
  });

export const deleteSupplierFn = createServerFn({ method: "POST" })
  .validator((id: string) => z.string().parse(id))
  .handler(async ({ data }) => {
    await requireAuth();
    await Supplier.findByIdAndDelete(data);
    return { success: true };
  });

// === PURCHASE ORDERS ===
export const getPurchaseOrdersFn = createServerFn({ method: "GET" })
  .handler(async () => {
    await requireAuth();
    const items = await PurchaseOrder.find().sort({ created_at: -1 });
    return items.map(i => ({
      id: i._id.toString(),
      po_no: i.po_number,
      supplier_id: i.supplier_id,
      status: i.status,
      total: i.total_amount,
      created_at: i.created_at.toISOString(),
      received_at: i.received_at?.toISOString(),
      notes: i.notes,
    }));
  });

export const getPurchaseOrderItemsFn = createServerFn({ method: "GET" })
  .validator((data) => z.object({ po_id: z.string() }).parse(data))
  .handler(async ({ data }) => {
    await requireAuth();
    const items = await PurchaseOrderItem.find({ po_id: data.po_id });
    return items.map(i => ({
      id: i._id.toString(),
      po_id: i.po_id,
      item_id: i.item_id,
      quantity: i.quantity,
      unit_cost: i.unit_cost,
    }));
  });

export const createPurchaseOrderFn = createServerFn({ method: "POST" })
  .validator((data) => z.any().parse(data))
  .handler(async ({ data }) => {
    const { session } = await requireAuth();
    const poNumber = `PO-${Date.now().toString().slice(-6)}`;
    const po = await PurchaseOrder.create({ 
      po_number: poNumber,
      supplier_id: data.supplier_id,
      total_amount: data.total,
      notes: data.notes,
      owner_id: session.userId 
    });
    
    if (data.lines && data.lines.length > 0) {
      const lineItems = data.lines.map((l: any) => ({
        po_id: po._id.toString(),
        item_id: l.item_id,
        quantity: l.quantity,
        unit_cost: l.unit_cost,
        total_cost: l.quantity * l.unit_cost,
      }));
      await PurchaseOrderItem.insertMany(lineItems);
    }
    return { id: po._id.toString(), po_no: po.po_number };
  });

export const updatePurchaseOrderFn = createServerFn({ method: "POST" })
  .validator((data) => z.object({ id: z.string(), data: z.any() }).parse(data))
  .handler(async ({ data }) => {
    await requireAuth();
    await PurchaseOrder.findByIdAndUpdate(data.id, data.data);
    return { success: true };
  });

export const deletePurchaseOrderFn = createServerFn({ method: "POST" })
  .validator((id: string) => z.string().parse(id))
  .handler(async ({ data }) => {
    await requireAuth();
    await PurchaseOrder.findByIdAndDelete(data);
    await PurchaseOrderItem.deleteMany({ po_id: data });
    return { success: true };
  });
