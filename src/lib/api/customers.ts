import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { Customer } from "../models";
import { requireAuth } from "../auth.server";

const customerSchema = z.object({
  name: z.string().min(1),
  phone: z.string().nullable().optional(),
  whatsapp: z.string().nullable().optional(),
  email: z.string().nullable().optional(),
  address: z.string().nullable().optional(),
  notes: z.string().nullable().optional(),
});

export const getCustomersFn = createServerFn({ method: "GET" })
  .handler(async () => {
    const { session } = await requireAuth();
    // In original code, it fetched all. You might want to filter by owner_id or tenant if multi-tenant.
    // For now we replicate the original: select("*").order("created_at", { ascending: false })
    const customers = await Customer.find().sort({ created_at: -1 });
    return customers.map((c) => ({
      id: c._id.toString(),
      name: c.name,
      phone: c.phone,
      whatsapp: c.whatsapp,
      email: c.email,
      address: c.address,
      notes: c.notes,
      owner_id: c.owner_id,
      created_at: c.created_at.toISOString(),
    }));
  });

export const createCustomerFn = createServerFn({ method: "POST" })
  .validator((data) => customerSchema.parse(data))
  .handler(async ({ data }) => {
    const { session } = await requireAuth();
    const customer = await Customer.create({
      ...data,
      owner_id: session.userId,
    });
    return { id: customer._id.toString() };
  });

export const updateCustomerFn = createServerFn({ method: "POST" })
  .validator((data) => z.object({ id: z.string(), data: customerSchema.partial() }).parse(data))
  .handler(async ({ data }) => {
    await requireAuth();
    await Customer.findByIdAndUpdate(data.id, data.data);
    return { success: true };
  });

export const deleteCustomerFn = createServerFn({ method: "POST" })
  .validator((id: string) => z.string().parse(id))
  .handler(async ({ data }) => {
    await requireAuth();
    await Customer.findByIdAndDelete(data);
    return { success: true };
  });
