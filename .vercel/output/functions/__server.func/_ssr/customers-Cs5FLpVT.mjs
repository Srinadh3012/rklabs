import { t as __exportAll } from "./rolldown-runtime-D7D4PA-g.mjs";
import { n as createServerFn } from "./server-De111qI3.mjs";
import { t as createSsrRpc } from "./createSsrRpc-CtdFS2cZ.mjs";
import { a as objectType, o as stringType } from "../_libs/zod.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/customers-Cs5FLpVT.js
var customers_exports = /* @__PURE__ */ __exportAll({
	createCustomerFn: () => createCustomerFn,
	deleteCustomerFn: () => deleteCustomerFn,
	getCustomersFn: () => getCustomersFn,
	updateCustomerFn: () => updateCustomerFn
});
var customerSchema = objectType({
	name: stringType().min(1),
	phone: stringType().nullable().optional(),
	whatsapp: stringType().nullable().optional(),
	email: stringType().nullable().optional(),
	address: stringType().nullable().optional(),
	notes: stringType().nullable().optional()
});
var getCustomersFn = createServerFn({ method: "GET" }).handler(createSsrRpc("a8aba7396d27da0968f1691e43955703f0e49f7e39266887e554044d1c0938bd"));
var createCustomerFn = createServerFn({ method: "POST" }).validator((data) => customerSchema.parse(data)).handler(createSsrRpc("c2ffd3d26453f632dbc16e924485c088d29c19c52df347d88bf12989331b49d7"));
var updateCustomerFn = createServerFn({ method: "POST" }).validator((data) => objectType({
	id: stringType(),
	data: customerSchema.partial()
}).parse(data)).handler(createSsrRpc("5370c76ee2368f17cabfd36cc476dfb57f2d957687c645c8f5ae8230ff094e69"));
var deleteCustomerFn = createServerFn({ method: "POST" }).validator((id) => stringType().parse(id)).handler(createSsrRpc("9840bcd0f03bb77fe3206235405a040ad37090c588d8cd84830630eba5ca491c"));
//#endregion
export { updateCustomerFn as a, getCustomersFn as i, customers_exports as n, deleteCustomerFn as r, createCustomerFn as t };
