import { db } from "@/db";
import { waLogs } from "@/db/schema/logs";
import { eq, desc, and } from "drizzle-orm";

export class WaRepository {
  async create(data: any) {
    const result = await db.insert(waLogs).values(data).returning();
    return result[0];
  }

  async getLogs(ownerId: string, repairId?: string, invoiceId?: string) {
    let query: any = db.select().from(waLogs);
    const conditions = [eq(waLogs.owner_id, ownerId)];
    
    if (repairId) {
      conditions.push(eq(waLogs.repair_id, repairId));
    }
    if (invoiceId) {
      conditions.push(eq(waLogs.invoice_id, invoiceId));
    }

    return await query.where(and(...conditions)).orderBy(desc(waLogs.created_at));
  }
}

export const waRepository = new WaRepository();
