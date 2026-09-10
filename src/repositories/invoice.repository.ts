import { db } from "@/db";
import { invoices, invoiceItems } from "@/db/schema";
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
    await db.delete(invoiceItems).where(eq(invoiceItems.invoice_id, id));
    await db.delete(invoices).where(eq(invoices.id, id));
    return true;
  }

  // Invoice Items
  async getItemsByInvoiceId(invoiceId: string) {
    return await db.select().from(invoiceItems).where(eq(invoiceItems.invoice_id, invoiceId));
  }

  async createItem(data: any) {
    const result = await db.insert(invoiceItems).values(data).returning();
    return result[0];
  }

  async deleteItemsByInvoiceId(invoiceId: string) {
    await db.delete(invoiceItems).where(eq(invoiceItems.invoice_id, invoiceId));
    return true;
  }
}

export const invoiceRepository = new InvoiceRepository();
