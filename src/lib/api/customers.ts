import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { getStore } from "@/services/database";
import { requireAuth } from "../auth.server";

const customerSchema = z.object({
  name: z.string().min(1),
  phone: z.string().nullable().optional(),
  whatsapp: z.string().nullable().optional(),
  email: z.string().nullable().optional(),
  address: z.string().nullable().optional(),
  notes: z.string().nullable().optional(),
});

export const getCustomersFn = createServerFn({ method: "GET" }).handler(async () => {
  await requireAuth();
  const store = getStore();
  return store.customers.list().sort((a, b) => b.created_at.localeCompare(a.created_at));
});

export const createCustomerFn = createServerFn({ method: "POST" })
  .validator((data) => customerSchema.parse(data))
  .handler(async ({ data }) => {
    const { session } = await requireAuth();
    const store = getStore();
    const customer = store.customers.create({
      ...data,
      owner_id: session.userId,
      created_at: new Date().toISOString(),
    });
    return { id: customer.id };
  });

export const updateCustomerFn = createServerFn({ method: "POST" })
  .validator((data) => z.object({ id: z.string(), data: customerSchema.partial() }).parse(data))
  .handler(async ({ data }) => {
    await requireAuth();
    const store = getStore();
    store.customers.update(data.id, data.data);
    return { success: true };
  });

export const deleteCustomerFn = createServerFn({ method: "POST" })
  .validator((id: string) => z.string().parse(id))
  .handler(async ({ data }) => {
    await requireAuth();
    const store = getStore();
    store.customers.delete(data);
    return { success: true };
  });
