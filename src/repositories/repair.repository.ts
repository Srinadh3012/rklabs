import { db } from "@/db";
import { repairs } from "@/db/schema";
import { eq, desc } from "drizzle-orm";

export class RepairRepository {
  async getAll() {
    return await db.select().from(repairs).orderBy(desc(repairs.created_at));
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
    await db.delete(repairs).where(eq(repairs.id, id));
    return true;
  }
}

export const repairRepository = new RepairRepository();
