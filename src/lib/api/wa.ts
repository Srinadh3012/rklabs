import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { WaLog } from "../models";
import { requireAuth } from "../auth.server";

export const logWaMessageFn = createServerFn({ method: "POST" })
  .validator((data) => z.object({
    repair_id: z.string().nullable().optional(),
    invoice_id: z.string().nullable().optional(),
    kind: z.string(),
    recipient_name: z.string().nullable().optional(),
    phone: z.string().nullable().optional(),
    message: z.string(),
    status: z.enum(["sent", "blocked", "cancelled", "no_phone"]),
    error: z.string().nullable().optional(),
  }).parse(data))
  .handler(async ({ data }) => {
    const { session } = await requireAuth();
    
    await WaLog.create({
      owner_id: session.userId,
      ...data,
    });
    
    return { success: true };
  });

export const getWaLogsFn = createServerFn({ method: "GET" })
  .validator((data) => z.object({
    repair_id: z.string().optional(),
    invoice_id: z.string().optional(),
  }).parse(data))
  .handler(async ({ data }) => {
    const { session } = await requireAuth();
    
    const query: any = { owner_id: session.userId };
    if (data.repair_id) query.repair_id = data.repair_id;
    if (data.invoice_id) query.invoice_id = data.invoice_id;

    const logs = await WaLog.find(query).sort({ created_at: -1 });

    return logs.map((l: any) => ({
      id: l._id.toString(),
      kind: l.kind,
      recipient_name: l.recipient_name,
      phone: l.phone,
      message: l.message,
      status: l.status,
      error: l.error,
      created_at: l.created_at.toISOString(),
    }));
  });
