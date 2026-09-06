import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { Repair, RepairNote } from "../models";
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
    const { session } = await requireAuth();
    const repairs = await Repair.find().sort({ created_at: -1 });
    return repairs.map((r) => ({
      id: r._id.toString(),
      ticket_no: r.ticket_no,
      customer_id: r.customer_id,
      device_type: r.device_type,
      device_brand: r.device_brand,
      device_model: r.device_model,
      imei: r.imei,
      issue: r.issue,
      status: r.status,
      technician_name: r.technician_name,
      technician_notes: r.technician_notes,
      estimated_completion: r.estimated_completion?.toISOString(),
      estimated_cost: r.estimated_cost,
      final_cost: r.final_cost,
      appointment_at: r.appointment_at?.toISOString(),
      created_at: r.created_at.toISOString(),
      completed_at: r.completed_at?.toISOString(),
      delivered_at: r.delivered_at?.toISOString(),
      assigned_at: r.assigned_at?.toISOString(),
    }));
  });

export const createRepairFn = createServerFn({ method: "POST" })
  .validator((data) => repairSchema.parse(data))
  .handler(async ({ data }) => {
    const { session } = await requireAuth();
    
    // Generate a simple ticket_no if not provided
    const ticket_no = data.ticket_no || `TK-${Date.now().toString().slice(-6)}`;

    const repair = await Repair.create({
      ...data,
      ticket_no,
      owner_id: session.userId,
    });
    return { id: repair._id.toString(), ticket_no: repair.ticket_no, created_at: repair.created_at.toISOString() };
  });

export const updateRepairFn = createServerFn({ method: "POST" })
  .validator((data) => z.object({ id: z.string(), data: repairSchema.partial() }).parse(data))
  .handler(async ({ data }) => {
    await requireAuth();
    const repair = await Repair.findByIdAndUpdate(data.id, data.data, { new: true });
    return { id: repair?._id.toString(), ticket_no: repair?.ticket_no };
  });

export const deleteRepairFn = createServerFn({ method: "POST" })
  .validator((id: string) => z.string().parse(id))
  .handler(async ({ data }) => {
    await requireAuth();
    await Repair.findByIdAndDelete(data);
    await RepairNote.deleteMany({ repair_id: data });
    return { success: true };
  });

// Repair Notes
export const getRepairNotesFn = createServerFn({ method: "GET" })
  .validator((data) => z.object({ repair_id: z.string() }).parse(data))
  .handler(async ({ data }) => {
    await requireAuth();
    const notes = await RepairNote.find({ repair_id: data.repair_id }).sort({ created_at: -1 });
    return notes.map(n => ({
      id: n._id.toString(),
      repair_id: n.repair_id,
      note: n.note,
      task_done: n.task_done,
      technician_name: n.technician_name,
      completed_at: n.completed_at?.toISOString(),
      created_at: n.created_at.toISOString(),
    }));
  });

export const createRepairNoteFn = createServerFn({ method: "POST" })
  .validator((data) => z.object({ repair_id: z.string(), note: z.string(), technician_name: z.string().optional() }).parse(data))
  .handler(async ({ data }) => {
    await requireAuth();
    const note = await RepairNote.create(data);
    return { id: note._id.toString() };
  });

export const updateRepairNoteFn = createServerFn({ method: "POST" })
  .validator((data) => z.object({ id: z.string(), data: z.any() }).parse(data))
  .handler(async ({ data }) => {
    await requireAuth();
    await RepairNote.findByIdAndUpdate(data.id, data.data);
    return { success: true };
  });

// Appointment Events
import { AppointmentEvent } from "../models";

export const getAppointmentEventsFn = createServerFn({ method: "GET" })
  .validator((data) => z.object({ repair_id: z.string() }).parse(data))
  .handler(async ({ data }) => {
    await requireAuth();
    const events = await AppointmentEvent.find({ repair_id: data.repair_id }).sort({ created_at: -1 });
    return events.map(e => ({
      id: e._id.toString(),
      action: e.title, // 'action' is stored in title for simplicity
      previous_at: e.start_time,
      new_at: e.end_time,
      note: e.notes,
      created_at: e.created_at.toISOString(),
    }));
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
    const event = await AppointmentEvent.create({
      repair_id: data.repair_id,
      title: data.action,
      start_time: data.previous_at || "",
      end_time: data.new_at || "",
      owner_id: session.userId,
    });
    return { id: event._id.toString() };
  });

import { WaLog } from "../models";

export const getWaLogsFn = createServerFn({ method: "GET" })
  .validator((data) => z.object({ repair_id: z.string() }).parse(data))
  .handler(async ({ data }) => {
    await requireAuth();
    const logs = await WaLog.find({ repair_id: data.repair_id }).sort({ created_at: -1 });
    return logs.map(l => ({
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
