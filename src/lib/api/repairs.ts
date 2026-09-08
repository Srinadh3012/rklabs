import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { collection, doc, addDoc, getDocs, updateDoc, deleteDoc, query, orderBy, where } from "firebase/firestore";
import { db } from "../firebase";
import { requireAuth } from "../auth.server";

const repairSchema = z.object({
  customer_id: z.string().nullable().optional(),
  device_type: z.string().nullable().optional(),
  device_brand: z.string().nullable().optional(),
  device_model: z.string().nullable().optional(),
  imei: z.string().nullable().optional(),
  issue: z.string().min(1),
  status: z.string(),
  technician_notes: z.string().nullable().optional(),
  estimated_completion: z.string().nullable().optional(),
  estimated_cost: z.number().nullable().optional(),
  appointment_at: z.string().nullable().optional(),
  ticket_no: z.string().optional(),
});

export const getRepairsFn = createServerFn({ method: "GET" })
  .handler(async () => {
    await requireAuth();
    const q = query(collection(db, "repairs"), orderBy("created_at", "desc"));
    const snap = await getDocs(q);
    return snap.docs.map((d) => ({ id: d.id, ...d.data() }));
  });

export const createRepairFn = createServerFn({ method: "POST" })
  .validator((data) => repairSchema.parse(data))
  .handler(async ({ data }) => {
    const { session } = await requireAuth();
    const ticket_no = data.ticket_no || `TK-${Date.now().toString().slice(-6)}`;
    const now = new Date().toISOString();
    const docRef = await addDoc(collection(db, "repairs"), {
      ...data,
      ticket_no,
      owner_id: session.userId,
      created_at: now,
    });
    return { id: docRef.id, ticket_no, created_at: now };
  });

export const updateRepairFn = createServerFn({ method: "POST" })
  .validator((data) => z.object({ id: z.string(), data: repairSchema.partial() }).parse(data))
  .handler(async ({ data }) => {
    await requireAuth();
    await updateDoc(doc(db, "repairs", data.id), data.data);
    const snap = await getDocs(query(collection(db, "repairs"), where("__name__", "==", data.id)));
    const repairData = snap.docs[0]?.data();
    return { id: data.id, ticket_no: repairData?.ticket_no };
  });

export const deleteRepairFn = createServerFn({ method: "POST" })
  .validator((id: string) => z.string().parse(id))
  .handler(async ({ data }) => {
    await requireAuth();
    await deleteDoc(doc(db, "repairs", data));
    // Delete related notes
    const notesSnap = await getDocs(query(collection(db, "repair_notes"), where("repair_id", "==", data)));
    for (const noteDoc of notesSnap.docs) {
      await deleteDoc(doc(db, "repair_notes", noteDoc.id));
    }
    return { success: true };
  });

// Repair Notes
export const getRepairNotesFn = createServerFn({ method: "GET" })
  .validator((data) => z.object({ repair_id: z.string() }).parse(data))
  .handler(async ({ data }) => {
    await requireAuth();
    const q = query(collection(db, "repair_notes"), where("repair_id", "==", data.repair_id), orderBy("created_at", "desc"));
    const snap = await getDocs(q);
    return snap.docs.map((d) => ({ id: d.id, ...d.data() }));
  });

export const createRepairNoteFn = createServerFn({ method: "POST" })
  .validator((data) => z.object({ repair_id: z.string(), note: z.string(), technician_name: z.string().optional() }).parse(data))
  .handler(async ({ data }) => {
    await requireAuth();
    const docRef = await addDoc(collection(db, "repair_notes"), {
      ...data,
      task_done: false,
      created_at: new Date().toISOString(),
    });
    return { id: docRef.id };
  });

export const updateRepairNoteFn = createServerFn({ method: "POST" })
  .validator((data) => z.object({ id: z.string(), data: z.any() }).parse(data))
  .handler(async ({ data }) => {
    await requireAuth();
    await updateDoc(doc(db, "repair_notes", data.id), data.data);
    return { success: true };
  });

// Appointment Events
export const getAppointmentEventsFn = createServerFn({ method: "GET" })
  .validator((data) => z.object({ repair_id: z.string() }).parse(data))
  .handler(async ({ data }) => {
    await requireAuth();
    const q = query(collection(db, "appointments"), where("repair_id", "==", data.repair_id), orderBy("created_at", "desc"));
    const snap = await getDocs(q);
    return snap.docs.map((d) => {
      const e = d.data();
      return {
        id: d.id,
        action: e.title,
        previous_at: e.start_time,
        new_at: e.end_time,
        note: e.notes,
        created_at: e.created_at,
      };
    });
  });

export const createAppointmentEventFn = createServerFn({ method: "POST" })
  .validator((data) => z.object({ 
    repair_id: z.string(), 
    action: z.string(), 
    previous_at: z.string().nullable(), 
    new_at: z.string().nullable() 
  }).parse(data))
  .handler(async ({ data }) => {
    const { session } = await requireAuth();
    const docRef = await addDoc(collection(db, "appointments"), {
      repair_id: data.repair_id,
      title: data.action,
      start_time: data.previous_at || "",
      end_time: data.new_at || "",
      owner_id: session.userId,
      created_at: new Date().toISOString(),
    });
    return { id: docRef.id };
  });

export const getWaLogsFn = createServerFn({ method: "GET" })
  .validator((data) => z.object({ repair_id: z.string() }).parse(data))
  .handler(async ({ data }) => {
    await requireAuth();
    const q = query(collection(db, "wa_logs"), where("repair_id", "==", data.repair_id), orderBy("created_at", "desc"));
    const snap = await getDocs(q);
    return snap.docs.map((d) => ({ id: d.id, ...d.data() }));
  });
