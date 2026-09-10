import { n as createServerFn } from "./server-De111qI3.mjs";
import { t as createSsrRpc } from "./createSsrRpc-CtdFS2cZ.mjs";
import { a as objectType, i as numberType, o as stringType, t as anyType } from "../_libs/zod.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/inventory-DBqm2GjA.js
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
var getInventoryItemsFn = createServerFn({ method: "GET" }).handler(createSsrRpc("4448a8b00b86a1716c5800a8dc3cbd60d034d32489123a7fdf3ba3bc441f7a46"));
var createInventoryItemFn = createServerFn({ method: "POST" }).validator((data) => inventoryItemSchema.parse(data)).handler(createSsrRpc("c9c1c49eed1e88a7137756c5dfaac6a2eb623ef87367fab60a793954e49546da"));
var updateInventoryItemFn = createServerFn({ method: "POST" }).validator((data) => objectType({
	id: stringType(),
	data: inventoryItemSchema.partial()
}).parse(data)).handler(createSsrRpc("499221b839ad4e0b4f3c8a401970bae08966f07568f16d1bcc5c76ce19745c0f"));
var deleteInventoryItemFn = createServerFn({ method: "POST" }).validator((id) => stringType().parse(id)).handler(createSsrRpc("8a34f61437188a879895d84969ff97026e049632eb40a76465cb96b002382af2"));
var stockMovementSchema = objectType({
	item_id: stringType(),
	type: stringType(),
	quantity: numberType(),
	reference_id: stringType().nullable().optional(),
	reference_type: stringType().nullable().optional(),
	notes: stringType().nullable().optional()
});
var getStockMovementsFn = createServerFn({ method: "GET" }).handler(createSsrRpc("76f8aed13fa6d505e0c19fdce767c967539811657ba551be05767ebae5a235ea"));
createServerFn({ method: "POST" }).validator((data) => stockMovementSchema.parse(data)).handler(createSsrRpc("145afbf69ff267b1f68291c4a41543544df34c8fa2f1009c63e1e038d3c331ee"));
var supplierSchema = objectType({
	name: stringType(),
	contact_person: stringType().nullable().optional(),
	phone: stringType().nullable().optional(),
	email: stringType().nullable().optional(),
	address: stringType().nullable().optional(),
	gst_number: stringType().nullable().optional(),
	notes: stringType().nullable().optional()
});
var getSuppliersFn = createServerFn({ method: "GET" }).handler(createSsrRpc("cbcac86dca42b97a9901289b6f79b04bbc7dda802f89bcc882e15328a24a5119"));
var createSupplierFn = createServerFn({ method: "POST" }).validator((data) => supplierSchema.parse(data)).handler(createSsrRpc("fde07ec7ce6bfd6bbc577c0be0a69da5dffd1bd4591c5b2e7a4a208b8dc60a87"));
var updateSupplierFn = createServerFn({ method: "POST" }).validator((data) => objectType({
	id: stringType(),
	data: supplierSchema.partial()
}).parse(data)).handler(createSsrRpc("fc998e9e8d0a6d40246c6f489d89562028978675aa4631c8747ba24118460664"));
var deleteSupplierFn = createServerFn({ method: "POST" }).validator((id) => stringType().parse(id)).handler(createSsrRpc("be4cac2e7badcc3b41c02187d5a77301a12b962e3276b1e37dee0723d92ce08d"));
var getPurchaseOrdersFn = createServerFn({ method: "GET" }).handler(createSsrRpc("2d3c4bc35c713d6fd1dd732b23c034d673f64e22462fb1a1af282d55e34f3d5f"));
var getPurchaseOrderItemsFn = createServerFn({ method: "GET" }).validator((data) => objectType({ po_id: stringType() }).parse(data)).handler(createSsrRpc("d7d743a431b045382d7ea57f123e2dcc49b519488166ddd801a1a75604996897"));
var createPurchaseOrderFn = createServerFn({ method: "POST" }).validator((data) => anyType().parse(data)).handler(createSsrRpc("abfca97d53611f869b8a1637626ef3665df3786867690819f3a00330e65fe45b"));
var updatePurchaseOrderFn = createServerFn({ method: "POST" }).validator((data) => objectType({
	id: stringType(),
	data: anyType()
}).parse(data)).handler(createSsrRpc("ecad46eee97196fb27ba24a76d03ba5edfdd673ac75872d39870d04ebedee145"));
createServerFn({ method: "POST" }).validator((id) => stringType().parse(id)).handler(createSsrRpc("4ddc61fb1e15f5527f000ed005b62428a3a0d529753ddbd0b588f5a83d5b4acf"));
//#endregion
export { deleteSupplierFn as a, getPurchaseOrdersFn as c, updateInventoryItemFn as d, updatePurchaseOrderFn as f, deleteInventoryItemFn as i, getStockMovementsFn as l, createPurchaseOrderFn as n, getInventoryItemsFn as o, updateSupplierFn as p, createSupplierFn as r, getPurchaseOrderItemsFn as s, createInventoryItemFn as t, getSuppliersFn as u };
