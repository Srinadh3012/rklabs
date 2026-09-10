import { n as createServerFn } from "./server-De111qI3.mjs";
import { a as objectType, o as stringType } from "../_libs/zod.mjs";
import { t as createServerRpc } from "./createServerRpc-BBOL_uPN.mjs";
import { t as getStore } from "./store-Db5axDNg.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/tracking.functions-CrFLDnIP.js
var schema = objectType({ ticket: stringType().trim().min(1).max(64) });
var trackRepair_createServerFn_handler = createServerRpc({
	id: "9c958c320691a0fd08728190f21987e8f9e8edac28cb47d5d3996c735efacf18",
	name: "trackRepair",
	filename: "src/lib/tracking.functions.ts"
}, (opts) => trackRepair.__executeServer(opts));
var trackRepair = createServerFn({ method: "GET" }).validator((data) => schema.parse(data)).handler(trackRepair_createServerFn_handler, async ({ data }) => {
	const ticket = data.ticket.toUpperCase();
	const store = getStore();
	const repairs = store.repairs.query((r) => r.ticket_no === ticket);
	if (repairs.length === 0) return { found: false };
	const repair = repairs[0];
	let customer = null;
	if (repair.customer_id) {
		const cust = store.customers.getById(repair.customer_id);
		if (cust) customer = {
			name: cust.name,
			phone: cust.phone,
			whatsapp: cust.whatsapp,
			email: cust.email,
			address: cust.address
		};
	}
	const notes = store.repairNotes.query((n) => n.repair_id === repair.id).sort((a, b) => a.created_at.localeCompare(b.created_at));
	return {
		found: true,
		repair,
		customer,
		notes
	};
});
//#endregion
export { trackRepair_createServerFn_handler };
