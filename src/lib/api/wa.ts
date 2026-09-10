import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { getStore } from "@/services/database";
import { requireAuth } from "../auth.server";

export const logWaMessageFn = createServerFn({ method: "POST" })
  .validator((data) =>
    z
      .object({
        repair_id: z.string().nullable().optional(),
        invoice_id: z.string().nullable().optional(),
        kind: z.string(),
        recipient_name: z.string().nullable().optional(),
        phone: z.string().nullable().optional(),
        message: z.string(),
        status: z.enum(["sent", "blocked", "cancelled", "no_phone"]),
        error: z.string().nullable().optional(),
      })
      .parse(data),
  )
  .handler(async ({ data }) => {
    const { session } = await requireAuth();
    const store = getStore();

    store.waLogs.create({
      owner_id: session.userId,
      ...data,
      created_at: new Date().toISOString(),
    });

    return { success: true };
  });

export const getWaLogsFn = createServerFn({ method: "GET" })
  .validator((data) =>
    z
      .object({
        repair_id: z.string().optional(),
        invoice_id: z.string().optional(),
      })
      .parse(data),
  )
  .handler(async ({ data }) => {
    const { session } = await requireAuth();
    const store = getStore();

    let logs = store.waLogs.query((w) => w.owner_id === session.userId);

    if (data.repair_id) {
      logs = logs.filter((w) => w.repair_id === data.repair_id);
    }
    if (data.invoice_id) {
      logs = logs.filter((w) => w.invoice_id === data.invoice_id);
    }

    return logs.sort((a, b) => b.created_at.localeCompare(a.created_at));
  });
