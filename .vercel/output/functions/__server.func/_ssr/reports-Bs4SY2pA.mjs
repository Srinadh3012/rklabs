import { o as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { o as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { t as Button } from "./button-C1KSxKmF.mjs";
import { it as FileDown, rt as FileSpreadsheet, xt as ChartColumn } from "../_libs/lucide-react.mjs";
import { a as inrPdf, i as inr, n as fmtDate } from "./format-DOFCsm48.mjs";
import { n as useQuery } from "../_libs/tanstack__react-query.mjs";
import { i as TabsTrigger, n as TabsContent, r as TabsList, t as Tabs } from "./tabs-BefRq5JO.mjs";
import { t as require_jspdf_node_min } from "../_libs/jspdf.mjs";
import { a as SelectValue, i as SelectTrigger, n as SelectContent, r as SelectItem, t as Select } from "./select-CsgUQnBO.mjs";
import { i as getReportsDataFn } from "./reports-BA0BhwV4.mjs";
import { t as autoTable } from "../_libs/jspdf-autotable.mjs";
import { n as writeFileSync, t as utils } from "../_libs/xlsx.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/reports-Bs4SY2pA.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var import_jspdf_node_min = /* @__PURE__ */ __toESM(require_jspdf_node_min());
function startOf(range) {
	const d = /* @__PURE__ */ new Date();
	if (range === "day") {
		d.setHours(0, 0, 0, 0);
		return d;
	}
	if (range === "week") {
		const t = /* @__PURE__ */ new Date();
		t.setDate(t.getDate() - 7);
		t.setHours(0, 0, 0, 0);
		return t;
	}
	if (range === "month") {
		const t = /* @__PURE__ */ new Date();
		t.setDate(1);
		t.setHours(0, 0, 0, 0);
		return t;
	}
	const t = /* @__PURE__ */ new Date();
	t.setMonth(0, 1);
	t.setHours(0, 0, 0, 0);
	return t;
}
function ReportsPage() {
	const [range, setRange] = (0, import_react.useState)("month");
	const from = (0, import_react.useMemo)(() => startOf(range), [range]);
	const { data, isLoading } = useQuery({
		queryKey: ["reports-data", range],
		queryFn: async () => {
			return await getReportsDataFn({ data: { from: from.toISOString() } });
		}
	});
	const invoices = data?.invoices || [];
	const repairs = data?.repairs || [];
	const customers = data?.customers || [];
	const custName = new Map(customers.map((c) => [c.id, c.name]));
	const revenue = invoices.filter((i) => i.payment_status === "paid").reduce((s, i) => s + Number(i.total), 0);
	const outstanding = invoices.filter((i) => i.payment_status !== "paid").reduce((s, i) => s + Number(i.total), 0);
	const techStats = (0, import_react.useMemo)(() => {
		const map = /* @__PURE__ */ new Map();
		for (const r of repairs) {
			const key = r.technician_name || "Unassigned";
			const cur = map.get(key) ?? {
				jobs: 0,
				completed: 0,
				revenue: 0
			};
			cur.jobs += 1;
			if (r.status === "delivered" || r.status === "completed" || r.status === "ready_delivery") cur.completed += 1;
			cur.revenue += Number(r.final_cost || r.estimated_cost || 0);
			map.set(key, cur);
		}
		return [...map.entries()].map(([name, s]) => ({
			name,
			...s
		})).sort((a, b) => b.revenue - a.revenue);
	}, [repairs]);
	const custStats = (0, import_react.useMemo)(() => {
		const map = /* @__PURE__ */ new Map();
		for (const r of repairs) {
			const key = r.customer_id || "walkin";
			const cur = map.get(key) ?? {
				name: custName.get(r.customer_id) || "Walk-in",
				repairs: 0,
				spend: 0
			};
			cur.repairs += 1;
			map.set(key, cur);
		}
		for (const i of invoices) {
			const key = i.customer_id || "walkin";
			const cur = map.get(key) ?? {
				name: custName.get(i.customer_id) || "Walk-in",
				repairs: 0,
				spend: 0
			};
			cur.spend += Number(i.total);
			map.set(key, cur);
		}
		return [...map.values()].sort((a, b) => b.spend - a.spend).slice(0, 50);
	}, [
		repairs,
		invoices,
		custName
	]);
	function exportXlsx(sheetName, rows, filename) {
		const ws = utils.json_to_sheet(rows);
		const wb = utils.book_new();
		utils.book_append_sheet(wb, ws, sheetName);
		writeFileSync(wb, filename);
	}
	function exportPdf(title, head, body, filename) {
		const doc = new import_jspdf_node_min.default();
		doc.setFontSize(16);
		doc.setFont("helvetica", "bold");
		doc.text(title, 14, 18);
		doc.setFontSize(9);
		doc.setFont("helvetica", "normal");
		doc.setTextColor(120);
		doc.text(`Range: ${range.toUpperCase()} · Generated: ${fmtDate(/* @__PURE__ */ new Date())}`, 14, 24);
		autoTable(doc, {
			startY: 30,
			head: [head],
			body,
			theme: "striped",
			headStyles: { fillColor: [
				30,
				41,
				59
			] },
			styles: { fontSize: 9 }
		});
		doc.save(filename);
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-7xl space-y-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-6",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-1.5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "text-3xl font-bold tracking-tight",
						children: "Reports & Analytics"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-slate-400",
						children: "Export daily, weekly, monthly summaries with per-technician and per-customer breakdowns."
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
					value: range,
					onValueChange: (v) => setRange(v),
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
						className: "w-44 h-10 bg-black/20 border-white/10 focus:ring-cyan-500/50",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectContent, {
						className: "bg-slate-900 border-white/10 text-slate-200",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
								value: "day",
								className: "focus:bg-cyan-500/20 focus:text-cyan-400",
								children: "Today"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
								value: "week",
								className: "focus:bg-cyan-500/20 focus:text-cyan-400",
								children: "Last 7 days"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
								value: "month",
								className: "focus:bg-cyan-500/20 focus:text-cyan-400",
								children: "This month"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
								value: "year",
								className: "focus:bg-cyan-500/20 focus:text-cyan-400",
								children: "This year"
							})
						]
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-4 sm:grid-cols-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
						label: "Invoices",
						value: String(invoices.length)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
						label: "Repairs",
						value: String(repairs.length)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
						label: "Revenue (paid)",
						value: inr(revenue),
						color: "#10b981"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
						label: "Outstanding",
						value: inr(outstanding),
						tone: "warn",
						color: "#ef4444"
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Tabs, {
				defaultValue: "sales",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsList, {
						className: "bg-[#0f172a]/80 backdrop-blur-xl border border-white/10 p-1 h-auto rounded-lg",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsTrigger, {
								value: "sales",
								className: "data-[state=active]:bg-cyan-500/20 data-[state=active]:text-cyan-400",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChartColumn, { className: "mr-2 h-4 w-4" }), "Sales"]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
								value: "tech",
								className: "data-[state=active]:bg-cyan-500/20 data-[state=active]:text-cyan-400",
								children: "Technicians"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
								value: "cust",
								className: "data-[state=active]:bg-cyan-500/20 data-[state=active]:text-cyan-400",
								children: "Customers"
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsContent, {
						value: "sales",
						className: "mt-6 space-y-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toolbar, {
							onXlsx: () => exportXlsx("Invoices", invoices.map((i) => ({
								invoice_no: i.invoice_no,
								date: fmtDate(i.created_at),
								customer: custName.get(i.customer_id) || "Walk-in",
								total: Number(i.total),
								gst: Number(i.gst_amount),
								status: i.payment_status,
								mode: i.payment_mode
							})), `sales-${range}.xlsx`),
							onPdf: () => exportPdf("Sales report", [
								"Invoice",
								"Date",
								"Customer",
								"Total",
								"GST",
								"Status"
							], invoices.map((i) => [
								i.invoice_no,
								fmtDate(i.created_at),
								custName.get(i.customer_id) || "Walk-in",
								inrPdf(i.total),
								inrPdf(i.gst_amount),
								i.payment_status
							]), `sales-${range}.pdf`)
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DataTable, {
							head: [
								"Invoice",
								"Date",
								"Customer",
								"Total",
								"Status"
							],
							rows: invoices.map((i) => [
								i.invoice_no,
								fmtDate(i.created_at),
								custName.get(i.customer_id) || "Walk-in",
								inr(i.total),
								i.payment_status
							])
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsContent, {
						value: "tech",
						className: "mt-6 space-y-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toolbar, {
							onXlsx: () => exportXlsx("Technicians", techStats, `technicians-${range}.xlsx`),
							onPdf: () => exportPdf("Technician performance", [
								"Technician",
								"Jobs",
								"Completed",
								"Revenue"
							], techStats.map((t) => [
								t.name,
								String(t.jobs),
								String(t.completed),
								inrPdf(t.revenue)
							]), `technicians-${range}.pdf`)
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DataTable, {
							head: [
								"Technician",
								"Jobs",
								"Completed",
								"Revenue"
							],
							rows: techStats.map((t) => [
								t.name,
								String(t.jobs),
								String(t.completed),
								inr(t.revenue)
							])
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsContent, {
						value: "cust",
						className: "mt-6 space-y-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toolbar, {
							onXlsx: () => exportXlsx("Customers", custStats, `customers-${range}.xlsx`),
							onPdf: () => exportPdf("Customer report", [
								"Customer",
								"Repairs",
								"Total spend"
							], custStats.map((c) => [
								c.name,
								String(c.repairs),
								inrPdf(c.spend)
							]), `customers-${range}.pdf`)
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DataTable, {
							head: [
								"Customer",
								"Repairs",
								"Spend"
							],
							rows: custStats.map((c) => [
								c.name,
								String(c.repairs),
								inr(c.spend)
							])
						})]
					})
				]
			})
		]
	});
}
function Toolbar({ onXlsx, onPdf }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex justify-end gap-2",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
			variant: "outline",
			size: "sm",
			className: "border-white/10 bg-white/5 hover:bg-white/10 text-slate-300",
			onClick: onXlsx,
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileSpreadsheet, { className: "mr-2 h-4 w-4 text-emerald-400" }), "Excel"]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
			variant: "outline",
			size: "sm",
			className: "border-white/10 bg-white/5 hover:bg-white/10 text-slate-300",
			onClick: onPdf,
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileDown, { className: "mr-2 h-4 w-4 text-red-400" }), "PDF"]
		})]
	});
}
function DataTable({ head, rows }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "rounded-2xl border border-white/10 bg-[#0f172a]/80 backdrop-blur-xl p-4 shadow-lg",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "overflow-x-auto custom-scrollbar",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
				className: "w-full text-sm whitespace-nowrap",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", {
					className: "bg-slate-900/50 text-xs uppercase tracking-wider text-slate-400",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tr", { children: head.map((h, idx) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
						className: `px-4 py-3 text-left ${idx === 0 ? "rounded-tl-lg" : ""} ${idx === head.length - 1 ? "rounded-tr-lg" : ""}`,
						children: h
					}, h)) })
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tbody", { children: [rows.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tr", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
					colSpan: head.length,
					className: "px-4 py-12 text-center text-slate-500",
					children: "No data in selected range."
				}) }), rows.map((r, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tr", {
					className: "border-b border-white/5 hover:bg-white/[0.02] transition-colors",
					children: r.map((c, j) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
						className: `px-4 py-3 ${j === 0 ? "font-medium text-slate-200" : "text-slate-400"}`,
						children: c
					}, j))
				}, i))] })]
			})
		})
	});
}
function Stat({ label, value, tone, color = "#22d3ee" }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "group relative overflow-hidden rounded-2xl border border-white/10 bg-[#0f172a]/80 backdrop-blur-xl p-5 shadow-lg transition-all hover:bg-white/5 hover:border-white/20 hover:-translate-y-0.5 hover:shadow-xl",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "pointer-events-none absolute -right-6 -top-6 h-24 w-24 rounded-full opacity-10 blur-2xl transition-opacity group-hover:opacity-20",
				style: { background: color }
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "text-[11px] font-bold uppercase tracking-widest text-slate-400",
				children: label
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-2 text-3xl font-bold tracking-tight " + (tone === "warn" ? "text-red-400" : "text-slate-100"),
				children: value
			})
		]
	});
}
//#endregion
export { ReportsPage as component };
