import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { getStore } from "@/services/database";
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

export const getRepairsFn = createServerFn({ method: "GET" }).handler(async () => {
  await requireAuth();
  const store = getStore();
  return store.repairs.list().sort((a, b) => b.created_at.localeCompare(a.created_at));
});

export const createRepairFn = createServerFn({ method: "POST" })
  .validator((data) => repairSchema.parse(data))
  .handler(async ({ data }) => {
    const { session } = await requireAuth();
    const store = getStore();
    const ticket_no = data.ticket_no || `TK-${Date.now().toString().slice(-6)}`;
    const now = new Date().toISOString();
    const repair = store.repairs.create({
      ...data,
      ticket_no,
      owner_id: session.userId,
      created_at: now,
    });
    return { id: repair.id, ticket_no, created_at: now };
  });

export const updateRepairFn = createServerFn({ method: "POST" })
  .validator((data) => z.object({ id: z.string(), data: repairSchema.partial() }).parse(data))
  .handler(async ({ data }) => {
    await requireAuth();
    const store = getStore();
    store.repairs.update(data.id, data.data);
    const repair = store.repairs.getById(data.id);
    return { id: data.id, ticket_no: repair?.ticket_no };
  });

export const deleteRepairFn = createServerFn({ method: "POST" })
  .validator((id: string) => z.string().parse(id))
  .handler(async ({ data }) => {
    await requireAuth();
    const store = getStore();
    store.repairs.delete(data);
    // Delete related notes
    const notes = store.repairNotes.query((n) => n.repair_id === data);
    for (const note of notes) {
      store.repairNotes.delete(note.id);
    }
    return { success: true };
  });

// Repair Notes
export const getRepairNotesFn = createServerFn({ method: "GET" })
  .validator((data) => z.object({ repair_id: z.string() }).parse(data))
  .handler(async ({ data }) => {
    await requireAuth();
    const store = getStore();
    return store.repairNotes
      .query((n) => n.repair_id === data.repair_id)
      .sort((a, b) => b.created_at.localeCompare(a.created_at));
  });

export const createRepairNoteFn = createServerFn({ method: "POST" })
  .validator((data) =>
    z
      .object({ repair_id: z.string(), note: z.string(), technician_name: z.string().optional() })
      .parse(data),
  )
  .handler(async ({ data }) => {
    await requireAuth();
    const store = getStore();
    const note = store.repairNotes.create({
      ...data,
      task_done: false,
      created_at: new Date().toISOString(),
    });
    return { id: note.id };
  });

export const updateRepairNoteFn = createServerFn({ method: "POST" })
  .validator((data) => z.object({ id: z.string(), data: z.any() }).parse(data))
  .handler(async ({ data }) => {
    await requireAuth();
    const store = getStore();
    store.repairNotes.update(data.id, data.data);
    return { success: true };
  });

// Appointment Events
export const getAppointmentEventsFn = createServerFn({ method: "GET" })
  .validator((data) => z.object({ repair_id: z.string() }).parse(data))
  .handler(async ({ data }) => {
    await requireAuth();
    const store = getStore();
    return store.appointments
      .query((a) => a.repair_id === data.repair_id)
      .sort((a, b) => b.created_at.localeCompare(a.created_at))
      .map((e) => ({
        id: e.id,
        action: e.title,
        previous_at: e.start_time,
        new_at: e.end_time,
        note: e.notes,
        created_at: e.created_at,
      }));
  });

export const createAppointmentEventFn = createServerFn({ method: "POST" })
  .validator((data) =>
    z
      .object({
        repair_id: z.string(),
        action: z.string(),
        previous_at: z.string().nullable(),
        new_at: z.string().nullable(),
      })
      .parse(data),
  )
  .handler(async ({ data }) => {
    const { session } = await requireAuth();
    const store = getStore();
    const apt = store.appointments.create({
      repair_id: data.repair_id,
      title: data.action,
      start_time: data.previous_at || "",
      end_time: data.new_at || "",
      owner_id: session.userId,
      created_at: new Date().toISOString(),
    });
    return { id: apt.id };
  });

export const getWaLogsFn = createServerFn({ method: "GET" })
  .validator((data) => z.object({ repair_id: z.string() }).parse(data))
  .handler(async ({ data }) => {
    await requireAuth();
    const store = getStore();
    return store.waLogs
      .query((w) => w.repair_id === data.repair_id)
      .sort((a, b) => b.created_at.localeCompare(a.created_at));
  });
