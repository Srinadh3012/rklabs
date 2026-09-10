import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { getStore } from "@/services/database";
import { requireAuth } from "../auth.server";

// === PNL DATA ===
export const getPnlDataFn = createServerFn({ method: "POST" })
  .validator((data) =>
    z
      .object({
        from: z.string(),
        to: z.string(),
      })
      .parse(data),
  )
  .handler(async ({ data }) => {
    await requireAuth();
    const store = getStore();

    const fromDate = data.from;
    const toDate = data.to;

    const invoices = store.invoices.query((i) => i.created_at >= fromDate && i.created_at < toDate);
    const inventory = store.inventory.list();
    const purchaseOrders = store.purchaseOrders.query(
      (p) => p.status === "received" && p.received_at! >= fromDate && p.received_at! < toDate,
    );
    const expenses = store.expenses.query(
      (e) =>
        (e.expense_date || e.date || "") >= data.from.slice(0, 10) &&
        (e.expense_date || e.date || "") < data.to.slice(0, 10),
    );

    const invoiceIds = invoices.map((i) => i.id);
    let invoiceItems = [] as any[];
    if (invoiceIds.length > 0) {
      invoiceItems = store.invoiceItems.query((i) => invoiceIds.includes(i.invoice_id));
    }

    return {
      invoices: invoices.map((i) => ({
        id: i.id || "",
        total: i.total,
        payment_status: i.payment_status,
        gst_amount: i.tax_amount,
        discount: i.discount,
        created_at: i.created_at,
      })),
      invoiceItems: invoiceItems.map((i) => ({
        id: i.id,
        invoice_id: i.invoice_id,
        description: i.description,
        quantity: i.quantity,
        unit_price: i.unit_price,
      })),
      inventory: inventory.map((i) => ({
        id: i.id,
        name: i.name,
        cost_price: i.cost_price,
        selling_price: i.selling_price,
      })),
      purchaseOrders: purchaseOrders.map((p) => ({
        id: p.id || "",
        total: p.total_amount,
      })),
      expenses: expenses.map((e) => ({
        id: e.id || "",
        category: e.category,
        description: e.description,
        amount: e.amount,
        expense_date: e.expense_date || e.date || "",
      })),
    };
  });

// === EXPENSES ===
export const createExpenseFn = createServerFn({ method: "POST" })
  .validator((data) =>
    z
      .object({
        category: z.string(),
        description: z.string().nullable().optional(),
        amount: z.number(),
        expense_date: z.string(),
      })
      .parse(data),
  )
  .handler(async ({ data }) => {
    const { session } = await requireAuth();
    const store = getStore();

    const expense = store.expenses.create({
      category: data.category,
      description: data.description || "",
      amount: data.amount,
      date: data.expense_date,
      expense_date: data.expense_date,
      owner_id: session.userId,
      created_at: new Date().toISOString(),
    });
    return { id: expense.id };
  });

export const deleteExpenseFn = createServerFn({ method: "POST" })
  .validator((id: string) => z.string().parse(id))
  .handler(async ({ data }) => {
    await requireAuth();
    const store = getStore();
    store.expenses.delete(data);
    return { success: true };
  });

// === REPORTS DATA ===
export const getReportsDataFn = createServerFn({ method: "POST" })
  .validator((data) =>
    z
      .object({
        from: z.string(),
      })
      .parse(data),
  )
  .handler(async ({ data }) => {
    await requireAuth();
    const store = getStore();

    const fromDate = data.from;

    const invoices = store.invoices.query((i) => i.created_at >= fromDate);
    const repairs = store.repairs.query((r) => r.created_at >= fromDate);
    const customers = store.customers.list().map((c) => ({ id: c.id, name: c.name }));

    return {
      invoices: invoices.map((i) => ({
        id: i.id,
        invoice_no: i.invoice_no,
        customer_id: i.customer_id,
        total: i.total,
        gst_amount: i.tax_amount,
        payment_status: i.payment_status,
        payment_mode: i.payment_method,
        created_at: i.created_at,
      })),
      repairs: repairs.map((r) => ({
        id: r.id,
        customer_id: r.customer_id,
        technician_name: "Technician", // Mock data logic for this
        status: r.status,
        estimated_cost: r.estimated_cost,
        final_cost: r.final_cost,
      })),
      customers,
    };
  });
