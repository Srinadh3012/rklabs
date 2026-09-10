import { n as createServerFn } from "./server-De111qI3.mjs";
import { n as arrayType, o as stringType } from "../_libs/zod.mjs";
import { t as createServerRpc } from "./createServerRpc-BBOL_uPN.mjs";
import { t as getStore } from "./store-Db5axDNg.mjs";
import { i as requireAuth } from "./auth.server-CSvFL3TF.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/notifications-CdOp6rTt.js
var getNotificationsFn_createServerFn_handler = createServerRpc({
	id: "77e87866966d716d1b130a85926181257409646ca911c2453e8049e870b251ef",
	name: "getNotificationsFn",
	filename: "src/lib/api/notifications.ts"
}, (opts) => getNotificationsFn.__executeServer(opts));
var getNotificationsFn = createServerFn({ method: "GET" }).handler(getNotificationsFn_createServerFn_handler, async () => {
	const { session } = await requireAuth();
	return getStore().notifications.query((n) => n.user_id === session.userId).sort((a, b) => b.created_at.localeCompare(a.created_at)).slice(0, 25).map((n) => ({
		id: n.id,
		kind: n.kind,
		title: n.title,
		body: n.body,
		read_at: n.read_at || null,
		created_at: n.created_at
	}));
});
var markNotificationsReadFn_createServerFn_handler = createServerRpc({
	id: "4b64d1190dd2be37b7f0d71a5f30e20b82aa2de056595720b22ac547c77a748c",
	name: "markNotificationsReadFn",
	filename: "src/lib/api/notifications.ts"
}, (opts) => markNotificationsReadFn.__executeServer(opts));
var markNotificationsReadFn = createServerFn({ method: "POST" }).validator((data) => arrayType(stringType()).parse(data)).handler(markNotificationsReadFn_createServerFn_handler, async ({ data }) => {
	await requireAuth();
	const store = getStore();
	const now = (/* @__PURE__ */ new Date()).toISOString();
	for (const id of data) store.notifications.update(id, { read_at: now });
	return { success: true };
});
//#endregion
export { getNotificationsFn_createServerFn_handler, markNotificationsReadFn_createServerFn_handler };
