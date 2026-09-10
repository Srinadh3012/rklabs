import { n as createServerFn } from "./server-De111qI3.mjs";
import { a as objectType, i as numberType, o as stringType } from "../_libs/zod.mjs";
import { t as createServerRpc } from "./createServerRpc-BBOL_uPN.mjs";
import { t as getStore } from "./store-Db5axDNg.mjs";
import { i as requireAuth } from "./auth.server-CSvFL3TF.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/reports-durQZMpR.js
var getPnlDataFn_createServerFn_handler = createServerRpc({
	id: "2cc51368a2ec11c45e2a641feb18fe49cdafa226f21aa2b155dc77a7827fb36c",
	name: "getPnlDataFn",
	filename: "src/lib/api/reports.ts"
}, (opts) => getPnlDataFn.__executeServer(opts));
var getPnlDataFn = createServerFn({ method: "POST" }).validator((data) => objectType({
	from: stringType(),
	to: stringType()
}).parse(data)).handler(getPnlDataFn_createServerFn_handler, async ({ data }) => {
	await requireAuth();
	const store = getStore();
	const fromDate = data.from;
	const toDate = data.to;
	const invoices = store.invoices.query((i) => i.created_at >= fromDate && i.created_at < toDate);
	const inventory = store.inventory.list();
	const purchaseOrders = store.purchaseOrders.query((p) => p.status === "received" && p.received_at >= fromDate && p.received_at < toDate);
	const expenses = store.expenses.query((e) => (e.expense_date || e.date || "") >= data.from.slice(0, 10) && (e.expense_date || e.date || "") < data.to.slice(0, 10));
	const invoiceIds = invoices.map((i) => i.id);
	let invoiceItems = [];
	if (invoiceIds.length > 0) invoiceItems = store.invoiceItems.query((i) => invoiceIds.includes(i.invoice_id));
	return {
		invoices: invoices.map((i) => ({
			id: i.id || "",
			total: i.total,
			payment_status: i.payment_status,
			gst_amount: i.tax_amount,
			discount: i.discount,
			created_at: i.created_at
		})),
		invoiceItems: invoiceItems.map((i) => ({
			id: i.id,
			invoice_id: i.invoice_id,
			description: i.description,
			quantity: i.quantity,
			unit_price: i.unit_price
		})),
		inventory: inventory.map((i) => ({
			id: i.id,
			name: i.name,
			cost_price: i.cost_price,
			selling_price: i.selling_price
		})),
		purchaseOrders: purchaseOrders.map((p) => ({
			id: p.id || "",
			total: p.total_amount
		})),
		expenses: expenses.map((e) => ({
			id: e.id || "",
			category: e.category,
			description: e.description,
			amount: e.amount,
			expense_date: e.expense_date || e.date || ""
		}))
	};
});
var createExpenseFn_createServerFn_handler = createServerRpc({
	id: "c76ba0c3191eb9b47ea84d69b55d87a1c4dcec734c7275e9c3c9076fe69058ff",
	name: "createExpenseFn",
	filename: "src/lib/api/reports.ts"
}, (opts) => createExpenseFn.__executeServer(opts));
var createExpenseFn = createServerFn({ method: "POST" }).validator((data) => objectType({
	category: stringType(),
	description: stringType().nullable().optional(),
	amount: numberType(),
	expense_date: stringType()
}).parse(data)).handler(createExpenseFn_createServerFn_handler, async ({ data }) => {
	const { session } = await requireAuth();
	return { id: getStore().expenses.create({
		category: data.category,
		description: data.description || "",
		amount: data.amount,
		date: data.expense_date,
		expense_date: data.expense_date,
		owner_id: session.userId,
		created_at: (/* @__PURE__ */ new Date()).toISOString()
	}).id };
});
var deleteExpenseFn_createServerFn_handler = createServerRpc({
	id: "f2b404b245ce544567bb0c1db4c7d4c76233c2c66d7e651e29172c5d0989740c",
	name: "deleteExpenseFn",
	filename: "src/lib/api/reports.ts"
}, (opts) => deleteExpenseFn.__executeServer(opts));
var deleteExpenseFn = createServerFn({ method: "POST" }).validator((id) => stringType().parse(id)).handler(deleteExpenseFn_createServerFn_handler, async ({ data }) => {
	await requireAuth();
	getStore().expenses.delete(data);
	return { success: true };
});
var getReportsDataFn_createServerFn_handler = createServerRpc({
	id: "ce582482b532f40fd4e98207336e9e5e3659223f291fe7203c82b5bf09f9ebce",
	name: "getReportsDataFn",
	filename: "src/lib/api/reports.ts"
}, (opts) => getReportsDataFn.__executeServer(opts));
var getReportsDataFn = createServerFn({ method: "POST" }).validator((data) => objectType({ from: stringType() }).parse(data)).handler(getReportsDataFn_createServerFn_handler, async ({ data }) => {
	await requireAuth();
	const store = getStore();
	const fromDate = data.from;
	const invoices = store.invoices.query((i) => i.created_at >= fromDate);
	const repairs = store.repairs.query((r) => r.created_at >= fromDate);
	const customers = store.customers.list().map((c) => ({
		id: c.id,
		name: c.name
	}));
	return {
		invoices: invoices.map((i) => ({
			id: i.id,
			invoice_no: i.invoice_no,
			customer_id: i.customer_id,
			total: i.total,
			gst_amount: i.tax_amount,
			payment_status: i.payment_status,
			payment_mode: i.payment_method,
			created_at: i.created_at
		})),
		repairs: repairs.map((r) => ({
			id: r.id,
			customer_id: r.customer_id,
			technician_name: "Technician",
			status: r.status,
			estimated_cost: r.estimated_cost,
			final_cost: r.final_cost
		})),
		customers
	};
});
//#endregion
export { createExpenseFn_createServerFn_handler, deleteExpenseFn_createServerFn_handler, getPnlDataFn_createServerFn_handler, getReportsDataFn_createServerFn_handler };
