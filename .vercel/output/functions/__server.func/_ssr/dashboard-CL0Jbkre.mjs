import { o as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { Dt as Boxes, Q as IndianRupee, a as Users, d as TriangleAlert, f as TrendingUp, ft as Clock, gt as CircleCheck, r as Wrench } from "../_libs/lucide-react.mjs";
import { t as motion } from "../_libs/framer-motion.mjs";
import { n as createServerFn } from "./server-De111qI3.mjs";
import { t as createSsrRpc } from "./createSsrRpc-CtdFS2cZ.mjs";
import { i as inr } from "./format-DOFCsm48.mjs";
import { n as useQuery } from "../_libs/tanstack__react-query.mjs";
import { r as meFn } from "./auth-BcHM1GNH.mjs";
import { a as XAxis, c as Bar, d as ResponsiveContainer, f as Tooltip, i as YAxis, n as BarChart, o as Line, r as LineChart, s as CartesianGrid } from "../_libs/recharts+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/dashboard-CL0Jbkre.js
var import_jsx_runtime = require_jsx_runtime();
var getDashboardStatsFn = createServerFn({ method: "GET" }).handler(createSsrRpc("92c86580a27a10e890ecfbf75ae005c3557d41a4510a0012a6a095356cdc166d"));
async function fetchStats() {
	return await getDashboardStatsFn();
}
function StatCard({ icon: Icon, label, value, sub, color, delay = 0 }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
		initial: {
			opacity: 0,
			y: 12
		},
		animate: {
			opacity: 1,
			y: 0
		},
		transition: {
			duration: .35,
			delay
		},
		className: "group relative overflow-hidden rounded-2xl border border-white/10 bg-[#0f172a]/80 backdrop-blur-xl p-5 shadow-lg transition-all hover:bg-white/5 hover:border-white/20 hover:-translate-y-0.5 hover:shadow-xl",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "pointer-events-none absolute -right-6 -top-6 h-24 w-24 rounded-full opacity-10 blur-2xl transition-opacity group-hover:opacity-20",
			style: { background: color }
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-start justify-between",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "text-[11px] font-bold uppercase tracking-widest text-slate-400",
					children: label
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-2 text-2xl font-bold tracking-tight text-slate-100",
					children: value
				}),
				sub && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-1 text-xs font-medium text-slate-500",
					children: sub
				})
			] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid h-9 w-9 place-items-center rounded-xl border border-white/5 bg-white/[0.02]",
				style: { color },
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "h-4 w-4" })
			})]
		})]
	});
}
function Dashboard() {
	const { data, isLoading } = useQuery({
		queryKey: ["dashboard-stats"],
		queryFn: fetchStats
	});
	const { data: me } = useQuery({
		queryKey: ["my-profile"],
		queryFn: async () => {
			const { user } = await meFn();
			if (!user) return null;
			return user;
		}
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-7xl space-y-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "flex flex-col gap-1.5 border-b border-white/10 pb-6",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-3xl font-bold tracking-tight",
					children: "Dashboard"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-slate-400",
					children: "Real-time view of your repair operations."
				})]
			}),
			me && me.approval_status !== "approved" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "rounded-2xl border border-amber-500/30 bg-amber-500/10 p-4 text-sm text-amber-200 shadow-lg",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "font-semibold",
					children: me.approval_status === "pending" ? "Pending admin approval" : "Signup not approved"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-1 text-xs opacity-90",
					children: me.approval_status === "pending" ? "Your access is limited until an admin reviews your account." : me.rejection_reason ?? "Please contact the shop admin."
				})]
			}),
			me && me.approval_status === "approved" && me.approved_at && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "rounded-2xl border border-emerald-500/30 bg-emerald-500/10 p-4 text-sm text-emerald-400 shadow-lg",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "font-semibold",
					children: "Account approved"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-1 text-xs opacity-90",
					children: [
						"You have full access as ",
						me.requested_role ?? "user",
						"."
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-4 sm:grid-cols-2 lg:grid-cols-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
						icon: Wrench,
						label: "Today's Repairs",
						value: isLoading ? "—" : String(data?.todayRepairs ?? 0),
						color: "#22d3ee",
						delay: 0
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
						icon: Clock,
						label: "Pending",
						value: isLoading ? "—" : String(data?.pending ?? 0),
						sub: "In workflow",
						color: "#f59e0b",
						delay: .05
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
						icon: CircleCheck,
						label: "Delivered",
						value: isLoading ? "—" : String(data?.delivered ?? 0),
						color: "#10b981",
						delay: .1
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
						icon: IndianRupee,
						label: "Total Revenue",
						value: isLoading ? "—" : inr(data?.revenue ?? 0),
						color: "#a855f7",
						delay: .15
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
						icon: TrendingUp,
						label: "This Month",
						value: isLoading ? "—" : inr(data?.monthRevenue ?? 0),
						color: "#ec4899",
						delay: .2
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
						icon: Boxes,
						label: "Inventory Value",
						value: isLoading ? "—" : inr(data?.inventoryValue ?? 0),
						color: "#3b82f6",
						delay: .25
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
						icon: TriangleAlert,
						label: "Low Stock",
						value: isLoading ? "—" : String(data?.lowStock ?? 0),
						sub: "Items below threshold",
						color: "#ef4444",
						delay: .3
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
						icon: Users,
						label: "Customers",
						value: isLoading ? "—" : String(data?.customers ?? 0),
						color: "#06b6d4",
						delay: .35
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				"aria-labelledby": "dashboard-charts",
				className: "grid gap-6 lg:grid-cols-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						id: "dashboard-charts",
						className: "sr-only",
						children: "Performance charts"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
						initial: { opacity: 0 },
						animate: { opacity: 1 },
						transition: { delay: .3 },
						className: "rounded-2xl border border-white/10 bg-[#0f172a]/80 backdrop-blur-xl p-6 shadow-lg",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "mb-6 text-sm font-semibold tracking-tight text-slate-200",
							children: "Repairs · Last 7 days"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "h-[280px]",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResponsiveContainer, {
								width: "100%",
								height: "100%",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(LineChart, {
									data: data?.dailyRepairs ?? [],
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CartesianGrid, {
											stroke: "rgba(255,255,255,0.05)",
											strokeDasharray: "3 3",
											vertical: false
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(XAxis, {
											dataKey: "day",
											stroke: "#64748b",
											fontSize: 11,
											tickLine: false,
											axisLine: false,
											dy: 10
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(YAxis, {
											stroke: "#64748b",
											fontSize: 11,
											allowDecimals: false,
											tickLine: false,
											axisLine: false,
											dx: -10
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, {
											contentStyle: {
												background: "#0f172a",
												border: "1px solid rgba(255,255,255,0.1)",
												borderRadius: 8,
												color: "#f8fafc"
											},
											itemStyle: { color: "#22d3ee" }
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Line, {
											type: "monotone",
											dataKey: "count",
											stroke: "#22d3ee",
											strokeWidth: 3,
											dot: {
												fill: "#0f172a",
												stroke: "#22d3ee",
												strokeWidth: 2,
												r: 4
											},
											activeDot: {
												r: 6,
												fill: "#22d3ee"
											}
										})
									]
								})
							})
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
						initial: { opacity: 0 },
						animate: { opacity: 1 },
						transition: { delay: .4 },
						className: "rounded-2xl border border-white/10 bg-[#0f172a]/80 backdrop-blur-xl p-6 shadow-lg",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "mb-6 text-sm font-semibold tracking-tight text-slate-200",
							children: "Monthly Sales · Last 6 months"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "h-[280px]",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResponsiveContainer, {
								width: "100%",
								height: "100%",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(BarChart, {
									data: data?.monthlySales ?? [],
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CartesianGrid, {
											stroke: "rgba(255,255,255,0.05)",
											strokeDasharray: "3 3",
											vertical: false
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(XAxis, {
											dataKey: "month",
											stroke: "#64748b",
											fontSize: 11,
											tickLine: false,
											axisLine: false,
											dy: 10
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(YAxis, {
											stroke: "#64748b",
											fontSize: 11,
											tickLine: false,
											axisLine: false,
											dx: -10
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, {
											contentStyle: {
												background: "#0f172a",
												border: "1px solid rgba(255,255,255,0.1)",
												borderRadius: 8,
												color: "#f8fafc"
											},
											itemStyle: { color: "#a855f7" },
											formatter: (v) => inr(Number(v)),
											cursor: { fill: "rgba(255,255,255,0.05)" }
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bar, {
											dataKey: "total",
											fill: "#a855f7",
											radius: [
												4,
												4,
												0,
												0
											],
											maxBarSize: 40
										})
									]
								})
							})
						})]
					})
				]
			})
		]
	});
}
//#endregion
export { Dashboard as component };
