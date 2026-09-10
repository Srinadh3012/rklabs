import { db } from "@/db";
import { purchaseOrders } from "@/db/schema";
import { eq, desc } from "drizzle-orm";

export class PurchaseOrderRepository {
  async getAll() {
    return await db.select().from(purchaseOrders).orderBy(desc(purchaseOrders.created_at));
  }

  async getById(id: string) {
    const result = await db.select().from(purchaseOrders).where(eq(purchaseOrders.id, id));
    return result[0] || null;
  }

  async create(data: any) {
    const result = await db.insert(purchaseOrders).values(data).returning();
    return result[0];
  }

  async update(id: string, data: any) {
    const result = await db.update(purchaseOrders).set(data).where(eq(purchaseOrders.id, id)).returning();
    return result[0];
  }

  async delete(id: string) {
    await db.delete(purchaseOrders).where(eq(purchaseOrders.id, id));
    return true;
  }
}

export const purchaseorderRepository = new PurchaseOrderRepository();
