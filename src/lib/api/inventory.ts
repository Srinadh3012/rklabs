import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { collection, doc, addDoc, getDoc, getDocs, updateDoc, deleteDoc, query, orderBy, where, increment } from "firebase/firestore";
import { db } from "../firebase";
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
    const q = query(collection(db, "inventory"), orderBy("name", "asc"));
    const snap = await getDocs(q);
    return snap.docs.map((d) => ({ id: d.id, ...d.data() }));
  });

export const createInventoryItemFn = createServerFn({ method: "POST" })
  .validator((data) => inventoryItemSchema.parse(data))
  .handler(async ({ data }) => {
    const { session } = await requireAuth();
    const docRef = await addDoc(collection(db, "inventory"), {
      ...data,
      quantity: data.stock_level,
      owner_id: session.userId,
      created_at: new Date().toISOString(),
    });
    return { id: docRef.id };
  });

export const updateInventoryItemFn = createServerFn({ method: "POST" })
  .validator((data) => z.object({ id: z.string(), data: inventoryItemSchema.partial() }).parse(data))
  .handler(async ({ data }) => {
    await requireAuth();
    await updateDoc(doc(db, "inventory", data.id), data.data);
    return { success: true };
  });

export const deleteInventoryItemFn = createServerFn({ method: "POST" })
  .validator((id: string) => z.string().parse(id))
  .handler(async ({ data }) => {
    await requireAuth();
    await deleteDoc(doc(db, "inventory", data));
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
    const q = query(collection(db, "stock_movements"), orderBy("created_at", "desc"));
    const snap = await getDocs(q);
    return snap.docs.map((d) => {
      const m = d.data();
      return {
        id: d.id,
        item_id: m.item_id,
        item_name: "Item",
        movement_type: m.type,
        change: m.quantity,
        balance_after: 0,
        reference: m.reference_id,
        notes: m.notes,
        created_at: m.created_at,
      };
    });
  });

export const createStockMovementFn = createServerFn({ method: "POST" })
  .validator((data) => stockMovementSchema.parse(data))
  .handler(async ({ data }) => {
    const { session } = await requireAuth();
    await addDoc(collection(db, "stock_movements"), {
      ...data,
      owner_id: session.userId,
      created_at: new Date().toISOString(),
    });
    // Update inventory quantity
    if (data.type === "in" || data.type === "out") {
      const modifier = data.type === "in" ? data.quantity : -data.quantity;
      await updateDoc(doc(db, "inventory", data.item_id), {
        quantity: increment(modifier),
        stock_level: increment(modifier),
      });
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
    const q = query(collection(db, "suppliers"), orderBy("name", "asc"));
    const snap = await getDocs(q);
    return snap.docs.map((d) => ({ id: d.id, ...d.data() }));
  });

export const createSupplierFn = createServerFn({ method: "POST" })
  .validator((data) => supplierSchema.parse(data))
  .handler(async ({ data }) => {
    const { session } = await requireAuth();
    const docRef = await addDoc(collection(db, "suppliers"), {
      ...data,
      owner_id: session.userId,
      created_at: new Date().toISOString(),
    });
    return { id: docRef.id };
  });

export const updateSupplierFn = createServerFn({ method: "POST" })
  .validator((data) => z.object({ id: z.string(), data: supplierSchema.partial() }).parse(data))
  .handler(async ({ data }) => {
    await requireAuth();
    await updateDoc(doc(db, "suppliers", data.id), data.data);
    return { success: true };
  });

export const deleteSupplierFn = createServerFn({ method: "POST" })
  .validator((id: string) => z.string().parse(id))
  .handler(async ({ data }) => {
    await requireAuth();
    await deleteDoc(doc(db, "suppliers", data));
    return { success: true };
  });

// === PURCHASE ORDERS ===
export const getPurchaseOrdersFn = createServerFn({ method: "GET" })
  .handler(async () => {
    await requireAuth();
    const q = query(collection(db, "purchase_orders"), orderBy("created_at", "desc"));
    const snap = await getDocs(q);
    return snap.docs.map((d) => {
      const i = d.data();
      return {
        id: d.id,
        po_no: i.po_number,
        supplier_id: i.supplier_id,
        status: i.status,
        total: i.total_amount,
        created_at: i.created_at,
        received_at: i.received_at,
        notes: i.notes,
      };
    });
  });

export const getPurchaseOrderItemsFn = createServerFn({ method: "GET" })
  .validator((data) => z.object({ po_id: z.string() }).parse(data))
  .handler(async ({ data }) => {
    await requireAuth();
    const q = query(collection(db, "purchase_order_items"), where("po_id", "==", data.po_id));
    const snap = await getDocs(q);
    return snap.docs.map((d) => ({ id: d.id, ...d.data() }));
  });

export const createPurchaseOrderFn = createServerFn({ method: "POST" })
  .validator((data) => z.any().parse(data))
  .handler(async ({ data }) => {
    const { session } = await requireAuth();
    const poNumber = `PO-${Date.now().toString().slice(-6)}`;
    const docRef = await addDoc(collection(db, "purchase_orders"), { 
      po_number: poNumber,
      supplier_id: data.supplier_id,
      total_amount: data.total,
      notes: data.notes,
      status: "pending",
      owner_id: session.userId,
      created_at: new Date().toISOString(),
    });
    
    if (data.lines && data.lines.length > 0) {
      for (const l of data.lines) {
        await addDoc(collection(db, "purchase_order_items"), {
          po_id: docRef.id,
          item_id: l.item_id,
          quantity: l.quantity,
          unit_cost: l.unit_cost,
          total_cost: l.quantity * l.unit_cost,
        });
      }
    }
    return { id: docRef.id, po_no: poNumber };
  });

export const updatePurchaseOrderFn = createServerFn({ method: "POST" })
  .validator((data) => z.object({ id: z.string(), data: z.any() }).parse(data))
  .handler(async ({ data }) => {
    await requireAuth();
    await updateDoc(doc(db, "purchase_orders", data.id), data.data);
    return { success: true };
  });

export const deletePurchaseOrderFn = createServerFn({ method: "POST" })
  .validator((id: string) => z.string().parse(id))
  .handler(async ({ data }) => {
    await requireAuth();
    await deleteDoc(doc(db, "purchase_orders", data));
    const itemsSnap = await getDocs(query(collection(db, "purchase_order_items"), where("po_id", "==", data)));
    for (const itemDoc of itemsSnap.docs) {
      await deleteDoc(doc(db, "purchase_order_items", itemDoc.id));
    }
    return { success: true };
  });
