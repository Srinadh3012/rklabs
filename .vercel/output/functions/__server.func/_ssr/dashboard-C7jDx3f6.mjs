import { n as createServerFn } from "./server-De111qI3.mjs";
import { t as createServerRpc } from "./createServerRpc-BBOL_uPN.mjs";
import { t as getStore } from "./store-Db5axDNg.mjs";
import { i as requireAuth } from "./auth.server-CSvFL3TF.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/dashboard-C7jDx3f6.js
var getDashboardStatsFn_createServerFn_handler = createServerRpc({
	id: "92c86580a27a10e890ecfbf75ae005c3557d41a4510a0012a6a095356cdc166d",
	name: "getDashboardStatsFn",
	filename: "src/lib/api/dashboard.ts"
}, (opts) => getDashboardStatsFn.__executeServer(opts));
var getDashboardStatsFn = createServerFn({ method: "GET" }).handler(getDashboardStatsFn_createServerFn_handler, async () => {
	await requireAuth();
	const store = getStore();
	const startToday = /* @__PURE__ */ new Date();
	startToday.setHours(0, 0, 0, 0);
	const startMonth = /* @__PURE__ */ new Date();
	startMonth.setDate(1);
	startMonth.setHours(0, 0, 0, 0);
	const reps = store.repairs.list();
	const invs = store.invoices.list();
	const its = store.inventory.list();
	const custsCount = store.customers.count();
	return {
		todayRepairs: reps.filter((r) => new Date(r.created_at) >= startToday).length,
		pending: reps.filter((r) => !["delivered", "cancelled"].includes(r.status)).length,
		delivered: reps.filter((r) => r.status === "delivered").length,
		revenue: invs.filter((i) => i.payment_status === "paid").reduce((s, i) => s + Number(i.total), 0),
		monthRevenue: invs.filter((i) => new Date(i.created_at) >= startMonth && i.payment_status === "paid").reduce((s, i) => s + Number(i.total), 0),
		inventoryValue: its.reduce((s, i) => s + (Number(i.cost_price) || 0) * (Number(i.quantity) || 0), 0),
		lowStock: its.filter((i) => (Number(i.quantity) || 0) <= (Number(i.min_stock_level) || 5)).length,
		customers: custsCount,
		dailyRepairs: Array.from({ length: 7 }).map((_, idx) => {
			const d = /* @__PURE__ */ new Date();
			d.setDate(d.getDate() - (6 - idx));
			d.setHours(0, 0, 0, 0);
			const next = new Date(d);
			next.setDate(next.getDate() + 1);
			const count = reps.filter((r) => {
				const t = new Date(r.created_at);
				return t >= d && t < next;
			}).length;
			return {
				day: d.toLocaleDateString("en-IN", { weekday: "short" }),
				count
			};
		}),
		monthlySales: Array.from({ length: 6 }).map((_, idx) => {
			const d = /* @__PURE__ */ new Date();
			d.setDate(1);
			d.setHours(0, 0, 0, 0);
			d.setMonth(d.getMonth() - (5 - idx));
			const next = new Date(d);
			next.setMonth(next.getMonth() + 1);
			const total = invs.filter((i) => {
				const t = new Date(i.created_at);
				return t >= d && t < next;
			}).reduce((s, i) => s + Number(i.total), 0);
			return {
				month: d.toLocaleDateString("en-IN", { month: "short" }),
				total
			};
		})
	};
});
//#endregion
export { getDashboardStatsFn_createServerFn_handler };
