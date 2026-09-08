import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { collection, addDoc, getDocs, query, orderBy, where } from "firebase/firestore";
import { db } from "../firebase";
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
    
    await addDoc(collection(db, "wa_logs"), {
      owner_id: session.userId,
      ...data,
      created_at: new Date().toISOString(),
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
    
    // Build query constraints
    let constraints: any[] = [where("owner_id", "==", session.userId)];
    if (data.repair_id) constraints.push(where("repair_id", "==", data.repair_id));
    if (data.invoice_id) constraints.push(where("invoice_id", "==", data.invoice_id));

    const q = query(collection(db, "wa_logs"), ...constraints, orderBy("created_at", "desc"));
    const snap = await getDocs(q);

    return snap.docs.map((d) => ({ id: d.id, ...d.data() }));
  });
