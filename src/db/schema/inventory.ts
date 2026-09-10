import { pgTable, uuid, varchar, integer, timestamp, text, real } from "drizzle-orm/pg-core";
import { profiles } from "./users";

export const inventory = pgTable("inventory", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: varchar("name", { length: 255 }).notNull(),
  sku: varchar("sku", { length: 100 }),
  category: varchar("category", { length: 100 }),
  cost_price: real("cost_price").notNull(),
  selling_price: real("selling_price").notNull(),
  stock_level: integer("stock_level").notNull().default(0),
  quantity: integer("quantity").notNull().default(0),
  min_stock_level: integer("min_stock_level"),
  location: varchar("location", { length: 255 }),
  owner_id: uuid("owner_id")
    .references(() => profiles.id)
    .notNull(),
  created_at: timestamp("created_at").defaultNow().notNull(),
});

export const stockMovements = pgTable("stock_movements", {
  id: uuid("id").primaryKey().defaultRandom(),
  item_id: uuid("item_id")
    .references(() => inventory.id)
    .notNull(),
  type: varchar("type", { length: 50 }).notNull(), // "in" | "out"
  quantity: integer("quantity").notNull(),
  reference_id: uuid("reference_id"),
  reference_type: varchar("reference_type", { length: 100 }),
  notes: text("notes"),
  owner_id: uuid("owner_id")
    .references(() => profiles.id)
    .notNull(),
  created_at: timestamp("created_at").defaultNow().notNull(),
});
