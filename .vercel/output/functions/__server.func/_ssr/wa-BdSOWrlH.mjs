import { n as createServerFn } from "./server-De111qI3.mjs";
import { a as objectType, o as stringType, r as enumType } from "../_libs/zod.mjs";
import { t as createServerRpc } from "./createServerRpc-BBOL_uPN.mjs";
import { t as getStore } from "./store-Db5axDNg.mjs";
import { i as requireAuth } from "./auth.server-CSvFL3TF.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/wa-BdSOWrlH.js
var logWaMessageFn_createServerFn_handler = createServerRpc({
	id: "258500584c885e8d733927ef29a4a10f364b3b72225dbc95b2d5e65927b7a8ff",
	name: "logWaMessageFn",
	filename: "src/lib/api/wa.ts"
}, (opts) => logWaMessageFn.__executeServer(opts));
var logWaMessageFn = createServerFn({ method: "POST" }).validator((data) => objectType({
	repair_id: stringType().nullable().optional(),
	invoice_id: stringType().nullable().optional(),
	kind: stringType(),
	recipient_name: stringType().nullable().optional(),
	phone: stringType().nullable().optional(),
	message: stringType(),
	status: enumType([
		"sent",
		"blocked",
		"cancelled",
		"no_phone"
	]),
	error: stringType().nullable().optional()
}).parse(data)).handler(logWaMessageFn_createServerFn_handler, async ({ data }) => {
	const { session } = await requireAuth();
	getStore().waLogs.create({
		owner_id: session.userId,
		...data,
		created_at: (/* @__PURE__ */ new Date()).toISOString()
	});
	return { success: true };
});
var getWaLogsFn_createServerFn_handler = createServerRpc({
	id: "fdd9416b9d14291d72b2884853ac4004a6ac7c1d01f1352ba3d1e30028f89a13",
	name: "getWaLogsFn",
	filename: "src/lib/api/wa.ts"
}, (opts) => getWaLogsFn.__executeServer(opts));
var getWaLogsFn = createServerFn({ method: "GET" }).validator((data) => objectType({
	repair_id: stringType().optional(),
	invoice_id: stringType().optional()
}).parse(data)).handler(getWaLogsFn_createServerFn_handler, async ({ data }) => {
	const { session } = await requireAuth();
	let logs = getStore().waLogs.query((w) => w.owner_id === session.userId);
	if (data.repair_id) logs = logs.filter((w) => w.repair_id === data.repair_id);
	if (data.invoice_id) logs = logs.filter((w) => w.invoice_id === data.invoice_id);
	return logs.sort((a, b) => b.created_at.localeCompare(a.created_at));
});
//#endregion
export { getWaLogsFn_createServerFn_handler, logWaMessageFn_createServerFn_handler };
