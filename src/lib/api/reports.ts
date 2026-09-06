import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { Expense, Invoice, InvoiceItem, InventoryItem, PurchaseOrder, Repair, Customer } from "../models";
import { requireAuth } from "../auth.server";

// === PNL DATA ===
export const getPnlDataFn = createServerFn({ method: "POST" })
  .validator((data) => z.object({
    from: z.string(), // ISO date string
    to: z.string()    // ISO date string
  }).parse(data))
  .handler(async ({ data }) => {
    await requireAuth();
    
    const fromDate = new Date(data.from);
    const toDate = new Date(data.to);

    const [invoices, inventory, purchaseOrders, expenses] = await Promise.all([
      Invoice.find({ created_at: { $gte: fromDate, $lt: toDate } }),
      InventoryItem.find().select("id name cost_price selling_price"),
      PurchaseOrder.find({ status: "received", received_at: { $gte: fromDate, $lt: toDate } }),
      Expense.find({ expense_date: { $gte: data.from.slice(0, 10), $lt: data.to.slice(0, 10) } }).sort({ expense_date: -1 })
    ]);

    const invoiceIds = invoices.map(i => i._id.toString());
    const invoiceItems = await InvoiceItem.find({ invoice_id: { $in: invoiceIds } });

    return {
      invoices: invoices.map(i => ({
        id: i._id.toString(),
        total: i.total,
        payment_status: i.payment_status,
        gst_amount: i.tax_amount, // Assuming tax_amount represents gst
        discount: i.discount,
        created_at: i.created_at.toISOString(),
      })),
      invoiceItems: invoiceItems.map(i => ({
        id: i._id.toString(),
        invoice_id: i.invoice_id,
        description: i.description,
        quantity: i.quantity,
        unit_price: i.unit_price,
      })),
      inventory: inventory.map(i => ({
        id: i._id.toString(),
        name: i.name,
        cost_price: i.cost_price,
        selling_price: i.selling_price,
      })),
      purchaseOrders: purchaseOrders.map(p => ({
        id: p._id.toString(),
        total: p.total_amount,
      })),
      expenses: expenses.map(e => ({
        id: e._id.toString(),
        category: e.category,
        description: e.description,
        amount: e.amount,
        expense_date: e.date || e.created_at.toISOString().slice(0, 10), // Use 'date' per schema
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
    const expense = await Expense.create({
      category: data.category,
      description: data.description || "",
      amount: data.amount,
      date: data.expense_date,
      owner_id: session.userId,
    });
    return { id: expense._id.toString() };
  });

export const deleteExpenseFn = createServerFn({ method: "POST" })
  .validator((id: string) => z.string().parse(id))
  .handler(async ({ data }) => {
    await requireAuth();
    await Expense.findByIdAndDelete(data);
    return { success: true };
  });

// === REPORTS DATA ===
export const getReportsDataFn = createServerFn({ method: "POST" })
  .validator((data) => z.object({
    from: z.string(), // ISO date string
  }).parse(data))
  .handler(async ({ data }) => {
    await requireAuth();
    
    const fromDate = new Date(data.from);

    const [invoices, repairs, customers] = await Promise.all([
      Invoice.find({ created_at: { $gte: fromDate } }).sort({ created_at: -1 }),
      Repair.find({ created_at: { $gte: fromDate } }).sort({ created_at: -1 }),
      Customer.find().select("id name"),
    ]);

    return {
      invoices: invoices.map(i => ({
        id: i._id.toString(),
        invoice_no: i.invoice_no,
        customer_id: i.customer_id,
        total: i.total,
        gst_amount: i.tax_amount,
        payment_status: i.payment_status,
        payment_mode: i.payment_method,
        created_at: i.created_at.toISOString(),
      })),
      repairs: repairs.map(r => ({
        id: r._id.toString(),
        customer_id: r.customer_id,
        technician_name: r.technician_name,
        status: r.status,
        estimated_cost: r.estimated_cost,
        final_cost: r.final_cost,
      })),
      customers: customers.map(c => ({
        id: c._id.toString(),
        name: c.name,
      }))
    };
  });
