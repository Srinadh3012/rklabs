import { n as createServerFn } from "./server-De111qI3.mjs";
import { a as objectType, o as stringType } from "../_libs/zod.mjs";
import { t as createServerRpc } from "./createServerRpc-BBOL_uPN.mjs";
import { i as requireAuth } from "./auth.server-CSvFL3TF.mjs";
import { t as cs } from "../_libs/neondatabase__serverless.mjs";
import { a as varchar, c as text, d as boolean, i as pgTable, l as jsonb, n as desc, o as uuid, r as eq, s as timestamp, t as drizzle, u as integer } from "../_libs/drizzle-orm.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/customers-Bp7L1-CU.js
if (!process.env.DATABASE_URL) throw new Error("DATABASE_URL is not set in environment variables.");
var sql = cs(process.env.DATABASE_URL);
var db = drizzle(sql);
var profiles = pgTable("profiles", {
	id: uuid("id").primaryKey().defaultRandom(),
	email: varchar("email", { length: 255 }).notNull().unique(),
	full_name: varchar("full_name", { length: 255 }).notNull(),
	role: varchar("role", { length: 50 }).notNull().default("user"),
	requested_role: varchar("requested_role", { length: 50 }).notNull().default("user"),
	approval_status: varchar("approval_status", { length: 50 }).notNull().default("pending"),
	approved_at: timestamp("approved_at"),
	approved_by: uuid("approved_by"),
	rejection_reason: text("rejection_reason"),
	shop_name: varchar("shop_name", { length: 255 }),
	shop_address: text("shop_address"),
	shop_phone: varchar("shop_phone", { length: 50 }),
	shop_logo: text("shop_logo"),
	gst_number: varchar("gst_number", { length: 100 }),
	gst_percent: integer("gst_percent"),
	wa_templates: jsonb("wa_templates"),
	auto_reminders: boolean("auto_reminders").default(false),
	created_at: timestamp("created_at").defaultNow().notNull()
});
var customers = pgTable("customers", {
	id: uuid("id").primaryKey().defaultRandom(),
	name: varchar("name", { length: 255 }).notNull(),
	phone: varchar("phone", { length: 50 }),
	whatsapp: varchar("whatsapp", { length: 50 }),
	email: varchar("email", { length: 255 }),
	address: text("address"),
	notes: text("notes"),
	owner_id: uuid("owner_id").references(() => profiles.id).notNull(),
	created_at: timestamp("created_at").defaultNow().notNull()
});
pgTable("suppliers", {
	id: uuid("id").primaryKey().defaultRandom(),
	name: varchar("name", { length: 255 }).notNull(),
	contact_person: varchar("contact_person", { length: 255 }),
	phone: varchar("phone", { length: 50 }),
	email: varchar("email", { length: 255 }),
	address: text("address"),
	gst_number: varchar("gst_number", { length: 100 }),
	notes: text("notes"),
	owner_id: uuid("owner_id").references(() => profiles.id).notNull(),
	created_at: timestamp("created_at").defaultNow().notNull()
});
var CustomerRepository = class {
	async getAll() {
		return await db.select().from(customers).orderBy(desc(customers.created_at));
	}
	async getById(id) {
		return (await db.select().from(customers).where(eq(customers.id, id)))[0] || null;
	}
	async create(data) {
		return (await db.insert(customers).values(data).returning())[0];
	}
	async update(id, data) {
		return (await db.update(customers).set(data).where(eq(customers.id, id)).returning())[0];
	}
	async delete(id) {
		await db.delete(customers).where(eq(customers.id, id));
		return true;
	}
};
var customerRepository = new CustomerRepository();
var CustomerService = class {
	async getCustomers() {
		return await customerRepository.getAll();
	}
	async getCustomerById(id) {
		return await customerRepository.getById(id);
	}
	async createCustomer(data) {
		return await customerRepository.create(data);
	}
	async updateCustomer(id, data) {
		return await customerRepository.update(id, data);
	}
	async deleteCustomer(id) {
		return await customerRepository.delete(id);
	}
};
var customerService = new CustomerService();
var customerSchema = objectType({
	name: stringType().min(1),
	phone: stringType().nullable().optional(),
	whatsapp: stringType().nullable().optional(),
	email: stringType().nullable().optional(),
	address: stringType().nullable().optional(),
	notes: stringType().nullable().optional()
});
var getCustomersFn_createServerFn_handler = createServerRpc({
	id: "a8aba7396d27da0968f1691e43955703f0e49f7e39266887e554044d1c0938bd",
	name: "getCustomersFn",
	filename: "src/lib/api/customers.ts"
}, (opts) => getCustomersFn.__executeServer(opts));
var getCustomersFn = createServerFn({ method: "GET" }).handler(getCustomersFn_createServerFn_handler, async () => {
	await requireAuth();
	return await customerService.getCustomers();
});
var createCustomerFn_createServerFn_handler = createServerRpc({
	id: "c2ffd3d26453f632dbc16e924485c088d29c19c52df347d88bf12989331b49d7",
	name: "createCustomerFn",
	filename: "src/lib/api/customers.ts"
}, (opts) => createCustomerFn.__executeServer(opts));
var createCustomerFn = createServerFn({ method: "POST" }).validator((data) => customerSchema.parse(data)).handler(createCustomerFn_createServerFn_handler, async ({ data }) => {
	const { session } = await requireAuth();
	return { id: (await customerService.createCustomer({
		...data,
		owner_id: session.userId
	})).id };
});
var updateCustomerFn_createServerFn_handler = createServerRpc({
	id: "5370c76ee2368f17cabfd36cc476dfb57f2d957687c645c8f5ae8230ff094e69",
	name: "updateCustomerFn",
	filename: "src/lib/api/customers.ts"
}, (opts) => updateCustomerFn.__executeServer(opts));
var updateCustomerFn = createServerFn({ method: "POST" }).validator((data) => objectType({
	id: stringType(),
	data: customerSchema.partial()
}).parse(data)).handler(updateCustomerFn_createServerFn_handler, async ({ data }) => {
	await requireAuth();
	await customerService.updateCustomer(data.id, data.data);
	return { success: true };
});
var deleteCustomerFn_createServerFn_handler = createServerRpc({
	id: "9840bcd0f03bb77fe3206235405a040ad37090c588d8cd84830630eba5ca491c",
	name: "deleteCustomerFn",
	filename: "src/lib/api/customers.ts"
}, (opts) => deleteCustomerFn.__executeServer(opts));
var deleteCustomerFn = createServerFn({ method: "POST" }).validator((id) => stringType().parse(id)).handler(deleteCustomerFn_createServerFn_handler, async ({ data }) => {
	await requireAuth();
	await customerService.deleteCustomer(data);
	return { success: true };
});
//#endregion
export { createCustomerFn_createServerFn_handler, deleteCustomerFn_createServerFn_handler, getCustomersFn_createServerFn_handler, updateCustomerFn_createServerFn_handler };
