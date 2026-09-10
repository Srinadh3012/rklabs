import { n as createServerFn } from "./server-De111qI3.mjs";
import { a as objectType, i as numberType, o as stringType, t as anyType } from "../_libs/zod.mjs";
import { t as createServerRpc } from "./createServerRpc-BBOL_uPN.mjs";
import { t as getStore } from "./store-Db5axDNg.mjs";
import { i as requireAuth } from "./auth.server-CSvFL3TF.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/inventory-DUsCtjOH.js
var inventoryItemSchema = objectType({
	name: stringType(),
	sku: stringType().nullable().optional(),
	category: stringType().nullable().optional(),
	cost_price: numberType(),
	selling_price: numberType(),
	stock_level: numberType(),
	min_stock_level: numberType().nullable().optional(),
	location: stringType().nullable().optional()
});
var getInventoryItemsFn_createServerFn_handler = createServerRpc({
	id: "4448a8b00b86a1716c5800a8dc3cbd60d034d32489123a7fdf3ba3bc441f7a46",
	name: "getInventoryItemsFn",
	filename: "src/lib/api/inventory.ts"
}, (opts) => getInventoryItemsFn.__executeServer(opts));
var getInventoryItemsFn = createServerFn({ method: "GET" }).handler(getInventoryItemsFn_createServerFn_handler, async () => {
	await requireAuth();
	return getStore().inventory.list().sort((a, b) => a.name.localeCompare(b.name));
});
var createInventoryItemFn_createServerFn_handler = createServerRpc({
	id: "c9c1c49eed1e88a7137756c5dfaac6a2eb623ef87367fab60a793954e49546da",
	name: "createInventoryItemFn",
	filename: "src/lib/api/inventory.ts"
}, (opts) => createInventoryItemFn.__executeServer(opts));
var createInventoryItemFn = createServerFn({ method: "POST" }).validator((data) => inventoryItemSchema.parse(data)).handler(createInventoryItemFn_createServerFn_handler, async ({ data }) => {
	const { session } = await requireAuth();
	return { id: getStore().inventory.create({
		...data,
		quantity: data.stock_level,
		owner_id: session.userId,
		created_at: (/* @__PURE__ */ new Date()).toISOString()
	}).id };
});
var updateInventoryItemFn_createServerFn_handler = createServerRpc({
	id: "499221b839ad4e0b4f3c8a401970bae08966f07568f16d1bcc5c76ce19745c0f",
	name: "updateInventoryItemFn",
	filename: "src/lib/api/inventory.ts"
}, (opts) => updateInventoryItemFn.__executeServer(opts));
var updateInventoryItemFn = createServerFn({ method: "POST" }).validator((data) => objectType({
	id: stringType(),
	data: inventoryItemSchema.partial()
}).parse(data)).handler(updateInventoryItemFn_createServerFn_handler, async ({ data }) => {
	await requireAuth();
	getStore().inventory.update(data.id, data.data);
	return { success: true };
});
var deleteInventoryItemFn_createServerFn_handler = createServerRpc({
	id: "8a34f61437188a879895d84969ff97026e049632eb40a76465cb96b002382af2",
	name: "deleteInventoryItemFn",
	filename: "src/lib/api/inventory.ts"
}, (opts) => deleteInventoryItemFn.__executeServer(opts));
var deleteInventoryItemFn = createServerFn({ method: "POST" }).validator((id) => stringType().parse(id)).handler(deleteInventoryItemFn_createServerFn_handler, async ({ data }) => {
	await requireAuth();
	getStore().inventory.delete(data);
	return { success: true };
});
var stockMovementSchema = objectType({
	item_id: stringType(),
	type: stringType(),
	quantity: numberType(),
	reference_id: stringType().nullable().optional(),
	reference_type: stringType().nullable().optional(),
	notes: stringType().nullable().optional()
});
var getStockMovementsFn_createServerFn_handler = createServerRpc({
	id: "76f8aed13fa6d505e0c19fdce767c967539811657ba551be05767ebae5a235ea",
	name: "getStockMovementsFn",
	filename: "src/lib/api/inventory.ts"
}, (opts) => getStockMovementsFn.__executeServer(opts));
var getStockMovementsFn = createServerFn({ method: "GET" }).handler(getStockMovementsFn_createServerFn_handler, async () => {
	await requireAuth();
	return getStore().stockMovements.list().sort((a, b) => b.created_at.localeCompare(a.created_at)).map((m) => ({
		id: m.id,
		item_id: m.item_id,
		item_name: "Item",
		movement_type: m.type,
		change: m.quantity,
		balance_after: 0,
		reference: m.reference_id,
		notes: m.notes,
		created_at: m.created_at
	}));
});
var createStockMovementFn_createServerFn_handler = createServerRpc({
	id: "145afbf69ff267b1f68291c4a41543544df34c8fa2f1009c63e1e038d3c331ee",
	name: "createStockMovementFn",
	filename: "src/lib/api/inventory.ts"
}, (opts) => createStockMovementFn.__executeServer(opts));
var createStockMovementFn = createServerFn({ method: "POST" }).validator((data) => stockMovementSchema.parse(data)).handler(createStockMovementFn_createServerFn_handler, async ({ data }) => {
	const { session } = await requireAuth();
	const store = getStore();
	store.stockMovements.create({
		...data,
		owner_id: session.userId,
		created_at: (/* @__PURE__ */ new Date()).toISOString()
	});
	if (data.type === "in" || data.type === "out") {
		const modifier = data.type === "in" ? data.quantity : -data.quantity;
		const item = store.inventory.getById(data.item_id);
		if (item) store.inventory.update(data.item_id, {
			quantity: (item.quantity || 0) + modifier,
			stock_level: (item.stock_level || 0) + modifier
		});
	}
	return { success: true };
});
var supplierSchema = objectType({
	name: stringType(),
	contact_person: stringType().nullable().optional(),
	phone: stringType().nullable().optional(),
	email: stringType().nullable().optional(),
	address: stringType().nullable().optional(),
	gst_number: stringType().nullable().optional(),
	notes: stringType().nullable().optional()
});
var getSuppliersFn_createServerFn_handler = createServerRpc({
	id: "cbcac86dca42b97a9901289b6f79b04bbc7dda802f89bcc882e15328a24a5119",
	name: "getSuppliersFn",
	filename: "src/lib/api/inventory.ts"
}, (opts) => getSuppliersFn.__executeServer(opts));
var getSuppliersFn = createServerFn({ method: "GET" }).handler(getSuppliersFn_createServerFn_handler, async () => {
	await requireAuth();
	return getStore().suppliers.list().sort((a, b) => a.name.localeCompare(b.name));
});
var createSupplierFn_createServerFn_handler = createServerRpc({
	id: "fde07ec7ce6bfd6bbc577c0be0a69da5dffd1bd4591c5b2e7a4a208b8dc60a87",
	name: "createSupplierFn",
	filename: "src/lib/api/inventory.ts"
}, (opts) => createSupplierFn.__executeServer(opts));
var createSupplierFn = createServerFn({ method: "POST" }).validator((data) => supplierSchema.parse(data)).handler(createSupplierFn_createServerFn_handler, async ({ data }) => {
	const { session } = await requireAuth();
	return { id: getStore().suppliers.create({
		...data,
		owner_id: session.userId,
		created_at: (/* @__PURE__ */ new Date()).toISOString()
	}).id };
});
var updateSupplierFn_createServerFn_handler = createServerRpc({
	id: "fc998e9e8d0a6d40246c6f489d89562028978675aa4631c8747ba24118460664",
	name: "updateSupplierFn",
	filename: "src/lib/api/inventory.ts"
}, (opts) => updateSupplierFn.__executeServer(opts));
var updateSupplierFn = createServerFn({ method: "POST" }).validator((data) => objectType({
	id: stringType(),
	data: supplierSchema.partial()
}).parse(data)).handler(updateSupplierFn_createServerFn_handler, async ({ data }) => {
	await requireAuth();
	getStore().suppliers.update(data.id, data.data);
	return { success: true };
});
var deleteSupplierFn_createServerFn_handler = createServerRpc({
	id: "be4cac2e7badcc3b41c02187d5a77301a12b962e3276b1e37dee0723d92ce08d",
	name: "deleteSupplierFn",
	filename: "src/lib/api/inventory.ts"
}, (opts) => deleteSupplierFn.__executeServer(opts));
var deleteSupplierFn = createServerFn({ method: "POST" }).validator((id) => stringType().parse(id)).handler(deleteSupplierFn_createServerFn_handler, async ({ data }) => {
	await requireAuth();
	getStore().suppliers.delete(data);
	return { success: true };
});
var getPurchaseOrdersFn_createServerFn_handler = createServerRpc({
	id: "2d3c4bc35c713d6fd1dd732b23c034d673f64e22462fb1a1af282d55e34f3d5f",
	name: "getPurchaseOrdersFn",
	filename: "src/lib/api/inventory.ts"
}, (opts) => getPurchaseOrdersFn.__executeServer(opts));
var getPurchaseOrdersFn = createServerFn({ method: "GET" }).handler(getPurchaseOrdersFn_createServerFn_handler, async () => {
	await requireAuth();
	return getStore().purchaseOrders.list().sort((a, b) => b.created_at.localeCompare(a.created_at)).map((i) => ({
		id: i.id,
		po_no: i.po_number,
		supplier_id: i.supplier_id,
		status: i.status,
		total: i.total_amount,
		created_at: i.created_at,
		received_at: i.received_at,
		notes: i.notes
	}));
});
var getPurchaseOrderItemsFn_createServerFn_handler = createServerRpc({
	id: "d7d743a431b045382d7ea57f123e2dcc49b519488166ddd801a1a75604996897",
	name: "getPurchaseOrderItemsFn",
	filename: "src/lib/api/inventory.ts"
}, (opts) => getPurchaseOrderItemsFn.__executeServer(opts));
var getPurchaseOrderItemsFn = createServerFn({ method: "GET" }).validator((data) => objectType({ po_id: stringType() }).parse(data)).handler(getPurchaseOrderItemsFn_createServerFn_handler, async ({ data }) => {
	await requireAuth();
	return getStore().purchaseOrderItems.query((i) => i.po_id === data.po_id);
});
var createPurchaseOrderFn_createServerFn_handler = createServerRpc({
	id: "abfca97d53611f869b8a1637626ef3665df3786867690819f3a00330e65fe45b",
	name: "createPurchaseOrderFn",
	filename: "src/lib/api/inventory.ts"
}, (opts) => createPurchaseOrderFn.__executeServer(opts));
var createPurchaseOrderFn = createServerFn({ method: "POST" }).validator((data) => anyType().parse(data)).handler(createPurchaseOrderFn_createServerFn_handler, async ({ data }) => {
	const { session } = await requireAuth();
	const store = getStore();
	const poNumber = `PO-${Date.now().toString().slice(-6)}`;
	const po = store.purchaseOrders.create({
		po_number: poNumber,
		supplier_id: data.supplier_id,
		total_amount: data.total,
		notes: data.notes,
		status: "pending",
		received_at: null,
		owner_id: session.userId,
		created_at: (/* @__PURE__ */ new Date()).toISOString()
	});
	if (data.lines && data.lines.length > 0) for (const l of data.lines) store.purchaseOrderItems.create({
		po_id: po.id,
		item_id: l.item_id,
		quantity: l.quantity,
		unit_cost: l.unit_cost,
		total_cost: l.quantity * l.unit_cost
	});
	return {
		id: po.id,
		po_no: poNumber
	};
});
var updatePurchaseOrderFn_createServerFn_handler = createServerRpc({
	id: "ecad46eee97196fb27ba24a76d03ba5edfdd673ac75872d39870d04ebedee145",
	name: "updatePurchaseOrderFn",
	filename: "src/lib/api/inventory.ts"
}, (opts) => updatePurchaseOrderFn.__executeServer(opts));
var updatePurchaseOrderFn = createServerFn({ method: "POST" }).validator((data) => objectType({
	id: stringType(),
	data: anyType()
}).parse(data)).handler(updatePurchaseOrderFn_createServerFn_handler, async ({ data }) => {
	await requireAuth();
	getStore().purchaseOrders.update(data.id, data.data);
	return { success: true };
});
var deletePurchaseOrderFn_createServerFn_handler = createServerRpc({
	id: "4ddc61fb1e15f5527f000ed005b62428a3a0d529753ddbd0b588f5a83d5b4acf",
	name: "deletePurchaseOrderFn",
	filename: "src/lib/api/inventory.ts"
}, (opts) => deletePurchaseOrderFn.__executeServer(opts));
var deletePurchaseOrderFn = createServerFn({ method: "POST" }).validator((id) => stringType().parse(id)).handler(deletePurchaseOrderFn_createServerFn_handler, async ({ data }) => {
	await requireAuth();
	const store = getStore();
	store.purchaseOrders.delete(data);
	const items = store.purchaseOrderItems.query((i) => i.po_id === data);
	for (const item of items) store.purchaseOrderItems.delete(item.id);
	return { success: true };
});
//#endregion
export { createInventoryItemFn_createServerFn_handler, createPurchaseOrderFn_createServerFn_handler, createStockMovementFn_createServerFn_handler, createSupplierFn_createServerFn_handler, deleteInventoryItemFn_createServerFn_handler, deletePurchaseOrderFn_createServerFn_handler, deleteSupplierFn_createServerFn_handler, getInventoryItemsFn_createServerFn_handler, getPurchaseOrderItemsFn_createServerFn_handler, getPurchaseOrdersFn_createServerFn_handler, getStockMovementsFn_createServerFn_handler, getSuppliersFn_createServerFn_handler, updateInventoryItemFn_createServerFn_handler, updatePurchaseOrderFn_createServerFn_handler, updateSupplierFn_createServerFn_handler };
