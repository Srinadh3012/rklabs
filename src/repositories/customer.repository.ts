import { db } from "@/db";
import { customers } from "@/db/schema";
import { eq, desc } from "drizzle-orm";

export class CustomerRepository {
  async getAll() {
    return await db.select().from(customers).orderBy(desc(customers.created_at));
  }

  async getById(id: string) {
    const result = await db.select().from(customers).where(eq(customers.id, id));
    return result[0] || null;
  }

  async create(data: any) {
    const result = await db.insert(customers).values(data).returning();
    return result[0];
  }

  async update(id: string, data: any) {
    const result = await db.update(customers).set(data).where(eq(customers.id, id)).returning();
    return result[0];
  }

  async delete(id: string) {
    await db.delete(customers).where(eq(customers.id, id));
    return true;
  }
}

export const customerRepository = new CustomerRepository();
