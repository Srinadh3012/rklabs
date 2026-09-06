import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { Invoice, InvoiceItem } from "../models";
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
    const { session } = await requireAuth();
    const invoices = await Invoice.find().sort({ created_at: -1 });
    return invoices.map(i => ({
      id: i._id.toString(),
      invoice_no: i.invoice_no,
      customer_id: i.customer_id,
      repair_id: i.repair_id,
      subtotal: i.subtotal,
      discount: i.discount,
      tax_rate: i.tax_rate,
      tax_amount: i.tax_amount,
      total: i.total,
      amount_paid: i.amount_paid,
      payment_status: i.payment_status,
      payment_method: i.payment_method,
      notes: i.notes,
      created_at: i.created_at.toISOString(),
    }));
  });

export const createInvoiceFn = createServerFn({ method: "POST" })
  .validator((data) => invoiceSchema.parse(data))
  .handler(async ({ data }) => {
    const { session } = await requireAuth();
    const inv = await Invoice.create({
      ...data,
      owner_id: session.userId,
    });
    return { id: inv._id.toString(), invoice_no: inv.invoice_no, created_at: inv.created_at.toISOString() };
  });

export const updateInvoiceFn = createServerFn({ method: "POST" })
  .validator((data) => z.object({ id: z.string(), data: z.any() }).parse(data))
  .handler(async ({ data }) => {
    await requireAuth();
    await Invoice.findByIdAndUpdate(data.id, data.data);
    return { success: true };
  });

export const deleteInvoiceFn = createServerFn({ method: "POST" })
  .validator((id: string) => z.string().parse(id))
  .handler(async ({ data }) => {
    await requireAuth();
    await Invoice.findByIdAndDelete(data);
    await InvoiceItem.deleteMany({ invoice_id: data });
    return { success: true };
  });

// Invoice items
export const getInvoiceItemsFn = createServerFn({ method: "GET" })
  .validator((data) => z.object({ invoice_id: z.string() }).parse(data))
  .handler(async ({ data }) => {
    await requireAuth();
    const items = await InvoiceItem.find({ invoice_id: data.invoice_id });
    return items.map(i => ({
      id: i._id.toString(),
      invoice_id: i.invoice_id,
      description: i.description,
      quantity: i.quantity,
      unit_price: i.unit_price,
      total_price: i.total_price,
    }));
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
    await InvoiceItem.insertMany(data);
    return { success: true };
  });
