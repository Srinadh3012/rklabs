import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { getStore } from "@/services/database";
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

export const getInvoicesFn = createServerFn({ method: "GET" }).handler(async () => {
  await requireAuth();
  const store = getStore();
  return store.invoices.list().sort((a, b) => b.created_at.localeCompare(a.created_at));
});

export const createInvoiceFn = createServerFn({ method: "POST" })
  .validator((data) => invoiceSchema.parse(data))
  .handler(async ({ data }) => {
    const { session } = await requireAuth();
    const store = getStore();
    const now = new Date().toISOString();
    const invoice = store.invoices.create({
      ...data,
      owner_id: session.userId,
      created_at: now,
    });
    return { id: invoice.id, invoice_no: data.invoice_no, created_at: now };
  });

export const updateInvoiceFn = createServerFn({ method: "POST" })
  .validator((data) => z.object({ id: z.string(), data: z.any() }).parse(data))
  .handler(async ({ data }) => {
    await requireAuth();
    const store = getStore();
    store.invoices.update(data.id, data.data);
    return { success: true };
  });

export const deleteInvoiceFn = createServerFn({ method: "POST" })
  .validator((id: string) => z.string().parse(id))
  .handler(async ({ data }) => {
    await requireAuth();
    const store = getStore();
    store.invoices.delete(data);
    // Delete related items
    const items = store.invoiceItems.query((i) => i.invoice_id === data);
    for (const item of items) {
      store.invoiceItems.delete(item.id);
    }
    return { success: true };
  });

// Invoice items
export const getInvoiceItemsFn = createServerFn({ method: "GET" })
  .validator((data) => z.object({ invoice_id: z.string() }).parse(data))
  .handler(async ({ data }) => {
    await requireAuth();
    const store = getStore();
    return store.invoiceItems.query((i) => i.invoice_id === data.invoice_id);
  });

export const createInvoiceItemsFn = createServerFn({ method: "POST" })
  .validator((data) =>
    z
      .array(
        z.object({
          invoice_id: z.string(),
          description: z.string(),
          quantity: z.number(),
          unit_price: z.number(),
          total_price: z.number(),
        }),
      )
      .parse(data),
  )
  .handler(async ({ data }) => {
    await requireAuth();
    const store = getStore();
    for (const item of data) {
      store.invoiceItems.create({
        ...item,
        created_at: new Date().toISOString(),
      });
    }
    return { success: true };
  });
