import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { collection, doc, addDoc, getDoc, getDocs, updateDoc, deleteDoc, query, orderBy } from "firebase/firestore";
import { db } from "../firebase";
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
    await requireAuth();
    const q = query(collection(db, "customers"), orderBy("created_at", "desc"));
    const snap = await getDocs(q);
    return snap.docs.map((d) => ({
      id: d.id,
      ...d.data(),
    }));
  });

export const createCustomerFn = createServerFn({ method: "POST" })
  .validator((data) => customerSchema.parse(data))
  .handler(async ({ data }) => {
    const { session } = await requireAuth();
    const docRef = await addDoc(collection(db, "customers"), {
      ...data,
      owner_id: session.userId,
      created_at: new Date().toISOString(),
    });
    return { id: docRef.id };
  });

export const updateCustomerFn = createServerFn({ method: "POST" })
  .validator((data) => z.object({ id: z.string(), data: customerSchema.partial() }).parse(data))
  .handler(async ({ data }) => {
    await requireAuth();
    await updateDoc(doc(db, "customers", data.id), data.data);
    return { success: true };
  });

export const deleteCustomerFn = createServerFn({ method: "POST" })
  .validator((id: string) => z.string().parse(id))
  .handler(async ({ data }) => {
    await requireAuth();
    await deleteDoc(doc(db, "customers", data));
    return { success: true };
  });
