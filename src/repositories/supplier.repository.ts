import { db } from "@/db";
import { suppliers } from "@/db/schema";
import { eq, desc } from "drizzle-orm";

export class SupplierRepository {
  async getAll() {
    return await db.select().from(suppliers).orderBy(desc(suppliers.created_at));
  }

  async getById(id: string) {
    const result = await db.select().from(suppliers).where(eq(suppliers.id, id));
    return result[0] || null;
  }

  async create(data: any) {
    const result = await db.insert(suppliers).values(data).returning();
    return result[0];
  }

  async update(id: string, data: any) {
    const result = await db.update(suppliers).set(data).where(eq(suppliers.id, id)).returning();
    return result[0];
  }

  async delete(id: string) {
    await db.delete(suppliers).where(eq(suppliers.id, id));
    return true;
  }
}

export const supplierRepository = new SupplierRepository();
