import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { collection, doc, addDoc, getDocs, updateDoc, deleteDoc, query, orderBy, where } from "firebase/firestore";
import { db } from "../firebase";
import { requireAuth } from "../auth.server";

const invoiceSchema = z.object({
  invoice_no: z.string(),
  customer_id: z.string().nullable().optional(),
  repair_id: z.string().nullable().optional(),
  subtotal: z.number(),
  discount: z.number().nullable().optional(),
  tax_rate: z.number().nullable().optional(),
  tax_amount: z.number().nullable().optional(),
  total: z.number(),
  amount_paid: z.number().nullable().optional(),
  payment_status: z.string(),
  payment_method: z.string().nullable().optional(),
  notes: z.string().nullable().optional(),
});

export const getInvoicesFn = createServerFn({ method: "GET" })
  .handler(async () => {
    await requireAuth();
    const q = query(collection(db, "invoices"), orderBy("created_at", "desc"));
    const snap = await getDocs(q);
    return snap.docs.map((d) => ({ id: d.id, ...d.data() }));
  });

export const createInvoiceFn = createServerFn({ method: "POST" })
  .validator((data) => invoiceSchema.parse(data))
  .handler(async ({ data }) => {
    const { session } = await requireAuth();
    const now = new Date().toISOString();
    const docRef = await addDoc(collection(db, "invoices"), {
      ...data,
      owner_id: session.userId,
      created_at: now,
    });
    return { id: docRef.id, invoice_no: data.invoice_no, created_at: now };
  });

export const updateInvoiceFn = createServerFn({ method: "POST" })
  .validator((data) => z.object({ id: z.string(), data: z.any() }).parse(data))
  .handler(async ({ data }) => {
    await requireAuth();
    await updateDoc(doc(db, "invoices", data.id), data.data);
    return { success: true };
  });

export const deleteInvoiceFn = createServerFn({ method: "POST" })
  .validator((id: string) => z.string().parse(id))
  .handler(async ({ data }) => {
    await requireAuth();
    await deleteDoc(doc(db, "invoices", data));
    // Delete related items
    const itemsSnap = await getDocs(query(collection(db, "invoice_items"), where("invoice_id", "==", data)));
    for (const itemDoc of itemsSnap.docs) {
      await deleteDoc(doc(db, "invoice_items", itemDoc.id));
    }
    return { success: true };
  });

// Invoice items
export const getInvoiceItemsFn = createServerFn({ method: "GET" })
  .validator((data) => z.object({ invoice_id: z.string() }).parse(data))
  .handler(async ({ data }) => {
    await requireAuth();
    const q = query(collection(db, "invoice_items"), where("invoice_id", "==", data.invoice_id));
    const snap = await getDocs(q);
    return snap.docs.map((d) => ({ id: d.id, ...d.data() }));
  });

export const createInvoiceItemsFn = createServerFn({ method: "POST" })
  .validator((data) => z.array(z.object({
    invoice_id: z.string(),
    description: z.string(),
    quantity: z.number(),
    unit_price: z.number(),
    total_price: z.number(),
  })).parse(data))
  .handler(async ({ data }) => {
    await requireAuth();
    for (const item of data) {
      await addDoc(collection(db, "invoice_items"), {
        ...item,
        created_at: new Date().toISOString(),
      });
    }
    return { success: true };
  });
