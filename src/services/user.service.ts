import { db } from "@/db";
import { profiles } from "@/db/schema/users";
import { notifications } from "@/db/schema/logs";
import { eq, desc } from "drizzle-orm";

export class UserService {
  async getProfiles() {
    return await db.select().from(profiles).orderBy(desc(profiles.created_at));
  }

  async getProfileById(id: string) {
    const result = await db.select().from(profiles).where(eq(profiles.id, id));
    return result[0] || null;
  }

  async getProfileByEmail(email: string) {
    const result = await db.select().from(profiles).where(eq(profiles.email, email));
    return result[0] || null;
  }

  async countProfiles() {
    const result = await db.select().from(profiles);
    return result.length;
  }

  async createProfile(data: any) {
    const result = await db.insert(profiles).values(data).returning();
    return result[0];
  }

  async updateProfile(id: string, data: any) {
    const result = await db.update(profiles).set(data).where(eq(profiles.id, id)).returning();
    return result[0];
  }

  async getNotificationsByUserId(userId: string) {
    return await db.select().from(notifications).where(eq(notifications.user_id, userId)).orderBy(desc(notifications.created_at)).limit(25);
  }

  async createNotification(data: any) {
    const result = await db.insert(notifications).values(data).returning();
    return result[0];
  }

  async updateNotification(id: string, data: any) {
    const result = await db.update(notifications).set(data).where(eq(notifications.id, id)).returning();
    return result[0];
  }
}

export const userService = new UserService();
