import { pgTable, uuid, varchar, text, timestamp } from "drizzle-orm/pg-core";
import { profiles } from "./users";

export const customers = pgTable("customers", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: varchar("name", { length: 255 }).notNull(),
  phone: varchar("phone", { length: 50 }),
  whatsapp: varchar("whatsapp", { length: 50 }),
  email: varchar("email", { length: 255 }),
  address: text("address"),
  notes: text("notes"),
  owner_id: uuid("owner_id")
    .references(() => profiles.id)
    .notNull(),
  profile_id: uuid("profile_id").references(() => profiles.id),
  created_at: timestamp("created_at").defaultNow().notNull(),
});

export const suppliers = pgTable("suppliers", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: varchar("name", { length: 255 }).notNull(),
  contact_person: varchar("contact_person", { length: 255 }),
  phone: varchar("phone", { length: 50 }),
  email: varchar("email", { length: 255 }),
  address: text("address"),
  gst_number: varchar("gst_number", { length: 100 }),
  notes: text("notes"),
  owner_id: uuid("owner_id")
    .references(() => profiles.id)
    .notNull(),
  created_at: timestamp("created_at").defaultNow().notNull(),
});
