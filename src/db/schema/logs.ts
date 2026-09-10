import { pgTable, uuid, varchar, text, timestamp } from "drizzle-orm/pg-core";
import { profiles } from "./users";
import { repairs } from "./repairs";
import { invoices } from "./billing";

export const notifications = pgTable("notifications", {
  id: uuid("id").primaryKey().defaultRandom(),
  user_id: uuid("user_id")
    .references(() => profiles.id)
    .notNull(),
  kind: varchar("kind", { length: 50 }).notNull(),
  title: varchar("title", { length: 255 }).notNull(),
  body: text("body"),
  read_at: timestamp("read_at"),
  created_at: timestamp("created_at").defaultNow().notNull(),
});

export const waLogs = pgTable("wa_logs", {
  id: uuid("id").primaryKey().defaultRandom(),
  owner_id: uuid("owner_id")
    .references(() => profiles.id)
    .notNull(),
  repair_id: uuid("repair_id").references(() => repairs.id),
  invoice_id: uuid("invoice_id").references(() => invoices.id),
  kind: varchar("kind", { length: 50 }).notNull(),
  recipient_name: varchar("recipient_name", { length: 255 }),
  phone: varchar("phone", { length: 50 }),
  message: text("message").notNull(),
  status: varchar("status", { length: 50 }).notNull(), // "sent" | "blocked" | "cancelled" | "no_phone"
  error: text("error"),
  created_at: timestamp("created_at").defaultNow().notNull(),
});
