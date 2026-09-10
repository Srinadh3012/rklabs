import { db } from "@/db";
import { expenses } from "@/db/schema";
import { eq, desc } from "drizzle-orm";

export class ExpenseRepository {
  async getAll() {
    return await db.select().from(expenses).orderBy(desc(expenses.created_at));
  }

  async getById(id: string) {
    const result = await db.select().from(expenses).where(eq(expenses.id, id));
    return result[0] || null;
  }

  async create(data: any) {
    const result = await db.insert(expenses).values(data).returning();
    return result[0];
  }

  async update(id: string, data: any) {
    const result = await db.update(expenses).set(data).where(eq(expenses.id, id)).returning();
    return result[0];
  }

  async delete(id: string) {
    await db.delete(expenses).where(eq(expenses.id, id));
    return true;
  }
}

export const expenseRepository = new ExpenseRepository();
