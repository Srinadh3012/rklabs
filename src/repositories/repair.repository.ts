import { db } from "@/db";
import { repairs, repairNotes, appointments, waLogs } from "@/db/schema";
import { eq, desc } from "drizzle-orm";

export class RepairRepository {
  async getAll(filters?: { customerId?: string; technicianId?: string }) {
    let query = db.select().from(repairs).$dynamic();
    
    if (filters?.customerId) {
      query = query.where(eq(repairs.customer_id, filters.customerId));
    }
    if (filters?.technicianId) {
      query = query.where(eq(repairs.technician_id, filters.technicianId));
    }
    
    return await query.orderBy(desc(repairs.created_at));
  }

  async getById(id: string) {
    const result = await db.select().from(repairs).where(eq(repairs.id, id));
    return result[0] || null;
  }

  async create(data: any) {
    const result = await db.insert(repairs).values(data).returning();
    return result[0];
  }

  async update(id: string, data: any) {
    const result = await db.update(repairs).set(data).where(eq(repairs.id, id)).returning();
    return result[0];
  }

  async delete(id: string) {
    // Also delete associated notes and appointments first to avoid FK constraints
    await db.delete(repairNotes).where(eq(repairNotes.repair_id, id));
    await db.delete(appointments).where(eq(appointments.repair_id, id));
    await db.delete(repairs).where(eq(repairs.id, id));
    return true;
  }

  // --- Repair Notes ---
  async getNotes(repairId: string) {
    return await db.select().from(repairNotes).where(eq(repairNotes.repair_id, repairId)).orderBy(desc(repairNotes.created_at));
  }

  async createNote(data: any) {
    const result = await db.insert(repairNotes).values(data).returning();
    return result[0];
  }

  async updateNote(id: string, data: any) {
    const result = await db.update(repairNotes).set(data).where(eq(repairNotes.id, id)).returning();
    return result[0];
  }

  // --- Appointments ---
  async getAppointments(repairId: string) {
    return await db.select().from(appointments).where(eq(appointments.repair_id, repairId)).orderBy(desc(appointments.created_at));
  }

  async createAppointment(data: any) {
    const result = await db.insert(appointments).values(data).returning();
    return result[0];
  }

  // --- WA Logs ---
  async getWaLogs(repairId: string) {
    return await db.select().from(waLogs).where(eq(waLogs.repair_id, repairId)).orderBy(desc(waLogs.created_at));
  }
}

export const repairRepository = new RepairRepository();
