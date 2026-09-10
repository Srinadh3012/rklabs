import { db } from "@/db";
import { invoices } from "@/db/schema";
import { eq, desc } from "drizzle-orm";

export class InvoiceRepository {
  async getAll() {
    return await db.select().from(invoices).orderBy(desc(invoices.created_at));
  }

  async getById(id: string) {
    const result = await db.select().from(invoices).where(eq(invoices.id, id));
    return result[0] || null;
  }

  async create(data: any) {
    const result = await db.insert(invoices).values(data).returning();
    return result[0];
  }

  async update(id: string, data: any) {
    const result = await db.update(invoices).set(data).where(eq(invoices.id, id)).returning();
    return result[0];
  }

  async delete(id: string) {
    await db.delete(invoices).where(eq(invoices.id, id));
    return true;
  }
}

export const invoiceRepository = new InvoiceRepository();
