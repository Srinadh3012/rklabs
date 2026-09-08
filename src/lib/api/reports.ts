import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { collection, doc, addDoc, getDocs, deleteDoc, query, orderBy, where } from "firebase/firestore";
import { db } from "../firebase";
import { requireAuth } from "../auth.server";

// === PNL DATA ===
export const getPnlDataFn = createServerFn({ method: "POST" })
  .validator((data) => z.object({
    from: z.string(),
    to: z.string()
  }).parse(data))
  .handler(async ({ data }) => {
    await requireAuth();
    
    const fromDate = data.from;
    const toDate = data.to;

    const [invoicesSnap, inventorySnap, posSnap, expensesSnap] = await Promise.all([
      getDocs(collection(db, "invoices")),
      getDocs(collection(db, "inventory")),
      getDocs(collection(db, "purchase_orders")),
      getDocs(query(collection(db, "expenses"), orderBy("expense_date", "desc"))),
    ]);

    const invoices = invoicesSnap.docs.map(d => d.data()).filter((i: any) => i.created_at >= fromDate && i.created_at < toDate);
    const inventory = inventorySnap.docs.map(d => ({ id: d.id, ...d.data() }));
    const purchaseOrders = posSnap.docs.map(d => d.data()).filter((p: any) => p.status === "received" && p.received_at >= fromDate && p.received_at < toDate);
    const expenses = expensesSnap.docs.map(d => d.data()).filter((e: any) => (e.expense_date || e.date) >= data.from.slice(0, 10) && (e.expense_date || e.date) < data.to.slice(0, 10));

    // Get invoice items for matching invoices
    const invoiceIds = invoicesSnap.docs.filter(d => {
      const i = d.data();
      return i.created_at >= fromDate && i.created_at < toDate;
    }).map(d => d.id);

    let invoiceItems: any[] = [];
    if (invoiceIds.length > 0) {
      const itemsSnap = await getDocs(collection(db, "invoice_items"));
      invoiceItems = itemsSnap.docs.map(d => ({ id: d.id, ...d.data() })).filter((i: any) => invoiceIds.includes(i.invoice_id));
    }

    return {
      invoices: invoices.map((i: any) => ({
        id: i.id || "",
        total: i.total,
        payment_status: i.payment_status,
        gst_amount: i.tax_amount,
        discount: i.discount,
        created_at: i.created_at,
      })),
      invoiceItems: invoiceItems.map((i: any) => ({
        id: i.id,
        invoice_id: i.invoice_id,
        description: i.description,
        quantity: i.quantity,
        unit_price: i.unit_price,
      })),
      inventory: inventory.map((i: any) => ({
        id: i.id,
        name: i.name,
        cost_price: i.cost_price,
        selling_price: i.selling_price,
      })),
      purchaseOrders: purchaseOrders.map((p: any) => ({
        id: p.id || "",
        total: p.total_amount,
      })),
      expenses: expenses.map((e: any) => ({
        id: e.id || "",
        category: e.category,
        description: e.description,
        amount: e.amount,
        expense_date: e.expense_date || e.date || "",
      }))
    };
  });

// === EXPENSES ===
export const createExpenseFn = createServerFn({ method: "POST" })
  .validator((data) => z.object({
    category: z.string(),
    description: z.string().nullable().optional(),
    amount: z.number(),
    expense_date: z.string()
  }).parse(data))
  .handler(async ({ data }) => {
    const { session } = await requireAuth();
    const docRef = await addDoc(collection(db, "expenses"), {
      category: data.category,
      description: data.description || "",
      amount: data.amount,
      date: data.expense_date,
      expense_date: data.expense_date,
      owner_id: session.userId,
      created_at: new Date().toISOString(),
    });
    return { id: docRef.id };
  });

export const deleteExpenseFn = createServerFn({ method: "POST" })
  .validator((id: string) => z.string().parse(id))
  .handler(async ({ data }) => {
    await requireAuth();
    await deleteDoc(doc(db, "expenses", data));
    return { success: true };
  });

// === REPORTS DATA ===
export const getReportsDataFn = createServerFn({ method: "POST" })
  .validator((data) => z.object({
    from: z.string(),
  }).parse(data))
  .handler(async ({ data }) => {
    await requireAuth();
    
    const fromDate = data.from;

    const [invoicesSnap, repairsSnap, customersSnap] = await Promise.all([
      getDocs(collection(db, "invoices")),
      getDocs(collection(db, "repairs")),
      getDocs(collection(db, "customers")),
    ]);

    const invoices = invoicesSnap.docs.map(d => ({ id: d.id, ...d.data() })).filter((i: any) => i.created_at >= fromDate);
    const repairs = repairsSnap.docs.map(d => ({ id: d.id, ...d.data() })).filter((r: any) => r.created_at >= fromDate);
    const customers = customersSnap.docs.map(d => ({ id: d.id, name: d.data().name }));

    return {
      invoices: invoices.map((i: any) => ({
        id: i.id,
        invoice_no: i.invoice_no,
        customer_id: i.customer_id,
        total: i.total,
        gst_amount: i.tax_amount,
        payment_status: i.payment_status,
        payment_mode: i.payment_method,
        created_at: i.created_at,
      })),
      repairs: repairs.map((r: any) => ({
        id: r.id,
        customer_id: r.customer_id,
        technician_name: r.technician_name,
        status: r.status,
        estimated_cost: r.estimated_cost,
        final_cost: r.final_cost,
      })),
      customers,
    };
  });
