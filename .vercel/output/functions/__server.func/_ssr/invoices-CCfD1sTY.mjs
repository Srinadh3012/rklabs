import { n as createServerFn } from "./server-De111qI3.mjs";
import { a as objectType, i as numberType, n as arrayType, o as stringType, t as anyType } from "../_libs/zod.mjs";
import { t as createServerRpc } from "./createServerRpc-BBOL_uPN.mjs";
import { t as getStore } from "./store-Db5axDNg.mjs";
import { i as requireAuth } from "./auth.server-CSvFL3TF.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/invoices-CCfD1sTY.js
var invoiceSchema = objectType({
	invoice_no: stringType(),
	customer_id: stringType().nullable().optional(),
	repair_id: stringType().nullable().optional(),
	subtotal: numberType(),
	discount: numberType().nullable().optional(),
	tax_rate: numberType().nullable().optional(),
	tax_amount: numberType().nullable().optional(),
	total: numberType(),
	amount_paid: numberType().nullable().optional(),
	payment_status: stringType(),
	payment_method: stringType().nullable().optional(),
	notes: stringType().nullable().optional()
});
var getInvoicesFn_createServerFn_handler = createServerRpc({
	id: "e4e1504ea552ff6d6734316e2b963e23cf8271826388f07ab906c2edee7af74c",
	name: "getInvoicesFn",
	filename: "src/lib/api/invoices.ts"
}, (opts) => getInvoicesFn.__executeServer(opts));
var getInvoicesFn = createServerFn({ method: "GET" }).handler(getInvoicesFn_createServerFn_handler, async () => {
	await requireAuth();
	return getStore().invoices.list().sort((a, b) => b.created_at.localeCompare(a.created_at));
});
var createInvoiceFn_createServerFn_handler = createServerRpc({
	id: "fd28105b5287e4a1ddbfc0b218c909fa33894af5efeb33fd98742b5ac85138cb",
	name: "createInvoiceFn",
	filename: "src/lib/api/invoices.ts"
}, (opts) => createInvoiceFn.__executeServer(opts));
var createInvoiceFn = createServerFn({ method: "POST" }).validator((data) => invoiceSchema.parse(data)).handler(createInvoiceFn_createServerFn_handler, async ({ data }) => {
	const { session } = await requireAuth();
	const store = getStore();
	const now = (/* @__PURE__ */ new Date()).toISOString();
	return {
		id: store.invoices.create({
			...data,
			owner_id: session.userId,
			created_at: now
		}).id,
		invoice_no: data.invoice_no,
		created_at: now
	};
});
var updateInvoiceFn_createServerFn_handler = createServerRpc({
	id: "ce61ffc04f347fb344a25beeb85110722cacbb0d2b62376e8dcdf0e4ce847e42",
	name: "updateInvoiceFn",
	filename: "src/lib/api/invoices.ts"
}, (opts) => updateInvoiceFn.__executeServer(opts));
var updateInvoiceFn = createServerFn({ method: "POST" }).validator((data) => objectType({
	id: stringType(),
	data: anyType()
}).parse(data)).handler(updateInvoiceFn_createServerFn_handler, async ({ data }) => {
	await requireAuth();
	getStore().invoices.update(data.id, data.data);
	return { success: true };
});
var deleteInvoiceFn_createServerFn_handler = createServerRpc({
	id: "6f188c1f4d207f99de28499dd5452f9a59bffd593bec75e024f2f59c509894c5",
	name: "deleteInvoiceFn",
	filename: "src/lib/api/invoices.ts"
}, (opts) => deleteInvoiceFn.__executeServer(opts));
var deleteInvoiceFn = createServerFn({ method: "POST" }).validator((id) => stringType().parse(id)).handler(deleteInvoiceFn_createServerFn_handler, async ({ data }) => {
	await requireAuth();
	const store = getStore();
	store.invoices.delete(data);
	const items = store.invoiceItems.query((i) => i.invoice_id === data);
	for (const item of items) store.invoiceItems.delete(item.id);
	return { success: true };
});
var getInvoiceItemsFn_createServerFn_handler = createServerRpc({
	id: "190c2a44d3d3fd70e9737c8bbf6c336d30473a51511b2d5a5a0cd7b88688b720",
	name: "getInvoiceItemsFn",
	filename: "src/lib/api/invoices.ts"
}, (opts) => getInvoiceItemsFn.__executeServer(opts));
var getInvoiceItemsFn = createServerFn({ method: "GET" }).validator((data) => objectType({ invoice_id: stringType() }).parse(data)).handler(getInvoiceItemsFn_createServerFn_handler, async ({ data }) => {
	await requireAuth();
	return getStore().invoiceItems.query((i) => i.invoice_id === data.invoice_id);
});
var createInvoiceItemsFn_createServerFn_handler = createServerRpc({
	id: "d18de23211e95b78f7f1ce3a96ef1305acfb86f9e689253e7f1235844d98fc79",
	name: "createInvoiceItemsFn",
	filename: "src/lib/api/invoices.ts"
}, (opts) => createInvoiceItemsFn.__executeServer(opts));
var createInvoiceItemsFn = createServerFn({ method: "POST" }).validator((data) => arrayType(objectType({
	invoice_id: stringType(),
	description: stringType(),
	quantity: numberType(),
	unit_price: numberType(),
	total_price: numberType()
})).parse(data)).handler(createInvoiceItemsFn_createServerFn_handler, async ({ data }) => {
	await requireAuth();
	const store = getStore();
	for (const item of data) store.invoiceItems.create({
		...item,
		created_at: (/* @__PURE__ */ new Date()).toISOString()
	});
	return { success: true };
});
//#endregion
export { createInvoiceFn_createServerFn_handler, createInvoiceItemsFn_createServerFn_handler, deleteInvoiceFn_createServerFn_handler, getInvoiceItemsFn_createServerFn_handler, getInvoicesFn_createServerFn_handler, updateInvoiceFn_createServerFn_handler };
