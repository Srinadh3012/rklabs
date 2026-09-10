import { db } from "@/db";
import { inventory } from "@/db/schema";
import { eq, desc } from "drizzle-orm";

export class InventoryRepository {
  async getAll() {
    return await db.select().from(inventory).orderBy(desc(inventory.created_at));
  }

  async getById(id: string) {
    const result = await db.select().from(inventory).where(eq(inventory.id, id));
    return result[0] || null;
  }

  async create(data: any) {
    const result = await db.insert(inventory).values(data).returning();
    return result[0];
  }

  async update(id: string, data: any) {
    const result = await db.update(inventory).set(data).where(eq(inventory.id, id)).returning();
    return result[0];
  }

  async delete(id: string) {
    await db.delete(inventory).where(eq(inventory.id, id));
    return true;
  }
}

export const inventoryRepository = new InventoryRepository();
