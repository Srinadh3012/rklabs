import { o as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { o as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { t as Button } from "./button-C1KSxKmF.mjs";
import { Et as Calculator, Q as IndianRupee, f as TrendingUp, it as FileDown, j as Plus, m as Trash2, p as TrendingDown } from "../_libs/lucide-react.mjs";
import { t as Input } from "./input-CCCvLIdb.mjs";
import { a as inrPdf, i as inr, n as fmtDate } from "./format-DOFCsm48.mjs";
import { i as useQueryClient, n as useQuery, t as useMutation } from "../_libs/tanstack__react-query.mjs";
import { t as toast } from "../_libs/sonner.mjs";
import { t as Label } from "./label-BhFXZmyO.mjs";
import { a as DialogTitle, i as DialogHeader, n as DialogContent, o as DialogTrigger, r as DialogFooter, t as Dialog } from "./dialog-CMoNC1Ou.mjs";
import { t as require_jspdf_node_min } from "../_libs/jspdf.mjs";
import { a as XAxis, c as Bar, d as ResponsiveContainer, f as Tooltip, i as YAxis, l as Pie, n as BarChart, p as Legend, s as CartesianGrid, t as PieChart, u as Cell } from "../_libs/recharts+[...].mjs";
import { a as SelectValue, i as SelectTrigger, n as SelectContent, r as SelectItem, t as Select } from "./select-CsgUQnBO.mjs";
import { n as deleteExpenseFn, r as getPnlDataFn, t as createExpenseFn } from "./reports-BA0BhwV4.mjs";
import { t as autoTable } from "../_libs/jspdf-autotable.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/pnl-BeEKQy-w.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var import_jspdf_node_min = /* @__PURE__ */ __toESM(require_jspdf_node_min());
var EXPENSE_CATEGORIES = [
	"Rent",
	"Salaries",
	"Utilities",
	"Internet & Phone",
	"Marketing",
	"Transport",
	"Software & Tools",
	"Repairs & Maintenance",
	"Tax",
	"Miscellaneous"
];
function monthRange(ym) {
	const [y, m] = ym.split("-").map(Number);
	return {
		from: new Date(y, m - 1, 1),
		to: new Date(y, m, 1)
	};
}
function defaultMonth() {
	const d = /* @__PURE__ */ new Date();
	return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
}
function PnLPage() {
	const qc = useQueryClient();
	const [month, setMonth] = (0, import_react.useState)(defaultMonth());
	const { from, to } = (0, import_react.useMemo)(() => monthRange(month), [month]);
	const [open, setOpen] = (0, import_react.useState)(false);
	const [form, setForm] = (0, import_react.useState)({
		category: "Rent",
		description: "",
		amount: "",
		expense_date: (/* @__PURE__ */ new Date()).toISOString().slice(0, 10)
	});
	const { data, isLoading } = useQuery({
		queryKey: ["pnl-data", month],
		queryFn: async () => {
			return await getPnlDataFn({ data: {
				from: from.toISOString(),
				to: to.toISOString()
			} });
		}
	});
	const invoices = data?.invoices || [];
	const invoiceItems = data?.invoiceItems || [];
	const inventory = data?.inventory || [];
	const purchaseOrders = data?.purchaseOrders || [];
	const expenses = data?.expenses || [];
	const totalRevenue = invoices.reduce((s, i) => s + Number(i.total || 0), 0);
	const paidRevenue = invoices.filter((i) => i.payment_status === "paid").reduce((s, i) => s + Number(i.total || 0), 0);
	const outstanding = invoices.filter((i) => i.payment_status !== "paid").reduce((s, i) => s + Number(i.total || 0), 0);
	const gstCollected = invoices.reduce((s, i) => s + Number(i.gst_amount || 0), 0);
	const discountsGiven = invoices.reduce((s, i) => s + Number(i.discount || 0), 0);
	const invByName = new Map(inventory.map((it) => [String(it.name).toLowerCase(), Number(it.cost_price || 0)]));
	const cogs = invoiceItems.reduce((s, it) => {
		const key = String(it.description || "").toLowerCase();
		const cost = invByName.get(key);
		const qty = Number(it.quantity || 0);
		if (cost && cost > 0) return s + cost * qty;
		return s + Number(it.unit_price || 0) * qty * .6;
	}, 0);
	const purchasesThisMonth = purchaseOrders.reduce((s, p) => s + Number(p.total || 0), 0);
	const expensesByCat = expenses.reduce((m, e) => {
		m[e.category] = (m[e.category] || 0) + Number(e.amount || 0);
		return m;
	}, {});
	const totalExpenses = Object.values(expensesByCat).reduce((a, b) => a + b, 0);
	const grossProfit = totalRevenue - cogs;
	const grossMargin = totalRevenue ? grossProfit / totalRevenue * 100 : 0;
	const netProfit = grossProfit - totalExpenses;
	const netMargin = totalRevenue ? netProfit / totalRevenue * 100 : 0;
	const daily = (0, import_react.useMemo)(() => {
		const map = /* @__PURE__ */ new Map();
		for (const i of invoices) {
			const d = new Date(i.created_at).toISOString().slice(0, 10);
			const cur = map.get(d) ?? {
				day: d.slice(8),
				revenue: 0,
				expense: 0
			};
			cur.revenue += Number(i.total || 0);
			map.set(d, cur);
		}
		for (const e of expenses) {
			const cur = map.get(e.expense_date) ?? {
				day: e.expense_date.slice(8),
				revenue: 0,
				expense: 0
			};
			cur.expense += Number(e.amount || 0);
			map.set(e.expense_date, cur);
		}
		return [...map.values()].sort((a, b) => a.day.localeCompare(b.day));
	}, [invoices, expenses]);
	const pieData = [
		{
			name: "COGS",
			value: Math.max(0, cogs),
			color: "#f97316"
		},
		{
			name: "Operating Expenses",
			value: Math.max(0, totalExpenses),
			color: "#ef4444"
		},
		{
			name: "Net Profit",
			value: Math.max(0, netProfit),
			color: "#22c55e"
		}
	].filter((d) => d.value > 0);
	const addExpense = useMutation({
		mutationFn: async () => {
			await createExpenseFn({ data: {
				category: form.category,
				description: form.description || null,
				amount: Number(form.amount || 0),
				expense_date: form.expense_date
			} });
		},
		onSuccess: () => {
			toast.success("Expense added");
			setOpen(false);
			setForm({
				category: "Rent",
				description: "",
				amount: "",
				expense_date: (/* @__PURE__ */ new Date()).toISOString().slice(0, 10)
			});
			qc.invalidateQueries({ queryKey: ["pnl-data"] });
		},
		onError: (e) => toast.error(e.message)
	});
	const delExpense = useMutation({
		mutationFn: async (id) => {
			await deleteExpenseFn({ data: id });
		},
		onSuccess: () => {
			toast.success("Removed");
			qc.invalidateQueries({ queryKey: ["pnl-data"] });
		}
	});
	function exportPDF() {
		const doc = new import_jspdf_node_min.default();
		doc.setFontSize(16);
		doc.text(`Profit & Loss — ${month}`, 14, 18);
		doc.setFontSize(10);
		doc.text(`Generated: ${fmtDate(/* @__PURE__ */ new Date())}`, 14, 25);
		autoTable(doc, {
			startY: 32,
			head: [["Income", "Amount (INR)"]],
			body: [
				["Total Revenue (Invoiced)", inrPdf(totalRevenue)],
				["  Paid", inrPdf(paidRevenue)],
				["  Outstanding", inrPdf(outstanding)],
				["GST Collected", inrPdf(gstCollected)],
				["Discounts Given", inrPdf(discountsGiven)]
			]
		});
		autoTable(doc, {
			head: [["Cost of Goods Sold", "Amount (INR)"]],
			body: [
				["COGS (parts used in invoices)", inrPdf(cogs)],
				["Inventory Purchases (POs received)", inrPdf(purchasesThisMonth)],
				["Gross Profit", inrPdf(grossProfit)],
				["Gross Margin %", grossMargin.toFixed(2) + " %"]
			]
		});
		autoTable(doc, {
			head: [["Operating Expenses", "Amount (INR)"]],
			body: [...Object.entries(expensesByCat).map(([k, v]) => [k, inrPdf(v)]), ["Total Operating Expenses", inrPdf(totalExpenses)]]
		});
		autoTable(doc, {
			head: [["Summary", "Amount"]],
			body: [["Net Profit / Loss", inrPdf(netProfit)], ["Net Margin %", netMargin.toFixed(2) + " %"]],
			headStyles: { fillColor: netProfit >= 0 ? [
				34,
				197,
				94
			] : [
				239,
				68,
				68
			] }
		});
		doc.save(`pnl-${month}.pdf`);
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-7xl space-y-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap items-end justify-between gap-4 border-b border-white/10 pb-6",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-1.5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
						className: "flex items-center gap-3 text-3xl font-bold tracking-tight",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Calculator, { className: "h-8 w-8 text-cyan-400" }), " Profit & Loss"]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-slate-400",
						children: "Monthly P&L from revenue, COGS, and operating expenses."
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-end gap-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-1.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
								className: "text-xs text-slate-400 uppercase tracking-widest font-bold",
								children: "Month"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								type: "month",
								value: month,
								onChange: (e) => setMonth(e.target.value),
								className: "w-44 h-10 bg-black/20 border-white/10 focus:ring-cyan-500/50"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							variant: "outline",
							className: "h-10 border-white/10 bg-white/5 hover:bg-white/10 text-slate-300",
							onClick: exportPDF,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileDown, { className: "mr-2 h-4 w-4 text-red-400" }), "Export PDF"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Dialog, {
							open,
							onOpenChange: setOpen,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTrigger, {
								asChild: true,
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
									className: "h-10 px-5 shadow-lg transition-transform hover:scale-105 active:scale-95",
									style: {
										background: "var(--gradient-primary)",
										color: "oklch(0.12 0.02 250)"
									},
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "mr-2 h-4 w-4" }), "Add Expense"]
								})
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
								className: "glass-strong border-white/10 shadow-2xl",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogHeader, {
										className: "border-b border-white/10 pb-4 mb-4",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, {
											className: "text-xl tracking-tight",
											children: "Add Operating Expense"
										})
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "grid gap-4",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "space-y-1.5",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
													className: "text-slate-300",
													children: "Category"
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
													value: form.category,
													onValueChange: (v) => setForm({
														...form,
														category: v
													}),
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
														className: "bg-black/20 border-white/10 focus:ring-cyan-500/50",
														children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {})
													}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectContent, {
														className: "bg-slate-900 border-white/10 text-slate-200",
														children: EXPENSE_CATEGORIES.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
															value: c,
															className: "focus:bg-cyan-500/20 focus:text-cyan-400",
															children: c
														}, c))
													})]
												})]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "space-y-1.5",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
													className: "text-slate-300",
													children: "Amount (INR)"
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
													type: "number",
													step: "0.01",
													value: form.amount,
													onChange: (e) => setForm({
														...form,
														amount: e.target.value
													}),
													className: "bg-black/20 border-white/10 focus:border-cyan-500/50"
												})]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "space-y-1.5",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
													className: "text-slate-300",
													children: "Date"
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
													type: "date",
													value: form.expense_date,
													onChange: (e) => setForm({
														...form,
														expense_date: e.target.value
													}),
													className: "bg-black/20 border-white/10 focus:border-cyan-500/50"
												})]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "space-y-1.5",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
													className: "text-slate-300",
													children: "Description (optional)"
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
													value: form.description,
													onChange: (e) => setForm({
														...form,
														description: e.target.value
													}),
													className: "bg-black/20 border-white/10 focus:border-cyan-500/50"
												})]
											})
										]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogFooter, {
										className: "pt-4 border-t border-white/10",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
											onClick: () => addExpense.mutate(),
											disabled: !form.amount || addExpense.isPending,
											className: "shadow-lg transition-transform hover:scale-105 active:scale-95",
											style: {
												background: "var(--gradient-primary)",
												color: "oklch(0.12 0.02 250)"
											},
											children: "Save"
										})
									})
								]
							})]
						})
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-4 md:grid-cols-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(KPI, {
						icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(IndianRupee, { className: "h-5 w-5" }),
						label: "Revenue",
						value: inr(totalRevenue),
						hint: `${inr(paidRevenue)} paid`,
						tone: "cyan"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(KPI, {
						icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TrendingDown, { className: "h-5 w-5" }),
						label: "COGS",
						value: inr(cogs),
						hint: "Parts used",
						tone: "amber"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(KPI, {
						icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TrendingDown, { className: "h-5 w-5" }),
						label: "Op. Expenses",
						value: inr(totalExpenses),
						hint: `${expenses.length} entries`,
						tone: "red"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(KPI, {
						icon: netProfit >= 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TrendingUp, { className: "h-5 w-5" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TrendingDown, { className: "h-5 w-5" }),
						label: netProfit >= 0 ? "Net Profit" : "Net Loss",
						value: inr(Math.abs(netProfit)),
						hint: `${netMargin.toFixed(1)}% margin`,
						tone: netProfit >= 0 ? "green" : "red"
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-4 lg:grid-cols-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-2xl border border-white/10 bg-[#0f172a]/80 backdrop-blur-xl p-5 shadow-lg lg:col-span-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "mb-4 text-sm font-bold uppercase tracking-widest text-slate-400",
						children: "Daily Revenue vs Expenses"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResponsiveContainer, {
						width: "100%",
						height: 260,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(BarChart, {
							data: daily,
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CartesianGrid, {
									strokeDasharray: "3 3",
									stroke: "rgba(255,255,255,0.05)"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(XAxis, {
									dataKey: "day",
									stroke: "#94a3b8",
									fontSize: 12,
									tickLine: false,
									axisLine: false
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(YAxis, {
									stroke: "#94a3b8",
									fontSize: 12,
									tickLine: false,
									axisLine: false
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, {
									contentStyle: {
										background: "#0f172a",
										border: "1px solid rgba(255,255,255,0.1)",
										borderRadius: "8px",
										color: "#f8fafc"
									},
									formatter: (v) => inr(Number(v)),
									cursor: { fill: "rgba(255,255,255,0.05)" }
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Legend, { wrapperStyle: { paddingTop: "10px" } }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bar, {
									dataKey: "revenue",
									fill: "#22d3ee",
									name: "Revenue",
									radius: [
										4,
										4,
										0,
										0
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bar, {
									dataKey: "expense",
									fill: "#ef4444",
									name: "Expenses",
									radius: [
										4,
										4,
										0,
										0
									]
								})
							]
						})
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-2xl border border-white/10 bg-[#0f172a]/80 backdrop-blur-xl p-5 shadow-lg",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "mb-4 text-sm font-bold uppercase tracking-widest text-slate-400",
						children: "Cost Breakdown"
					}), pieData.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "grid h-[260px] place-items-center text-sm text-slate-500",
						children: "No data yet"
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResponsiveContainer, {
						width: "100%",
						height: 260,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(PieChart, { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pie, {
								data: pieData,
								dataKey: "value",
								nameKey: "name",
								innerRadius: 60,
								outerRadius: 90,
								paddingAngle: 3,
								children: pieData.map((d, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Cell, { fill: d.color }, i))
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, {
								contentStyle: {
									background: "#0f172a",
									border: "1px solid rgba(255,255,255,0.1)",
									borderRadius: "8px",
									color: "#f8fafc"
								},
								formatter: (v) => inr(Number(v))
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Legend, { wrapperStyle: { paddingTop: "10px" } })
						] })
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "rounded-2xl border border-white/10 bg-[#0f172a]/80 backdrop-blur-xl p-6 shadow-lg",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", {
					className: "mb-5 text-sm font-bold uppercase tracking-widest text-slate-400",
					children: ["P&L Statement — ", month]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-1 text-sm",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
							label: "Total Revenue (Invoiced)",
							value: inr(totalRevenue)
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
							label: "— Paid",
							value: inr(paidRevenue),
							muted: true
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
							label: "— Outstanding",
							value: inr(outstanding),
							muted: true
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
							label: "GST Collected",
							value: inr(gstCollected),
							muted: true
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
							label: "Discounts Given",
							value: `- ${inr(discountsGiven)}`,
							muted: true
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "my-3 h-px bg-white/10" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
							label: "Cost of Goods Sold (parts)",
							value: `- ${inr(cogs)}`
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
							label: "Gross Profit",
							value: inr(grossProfit),
							bold: true,
							tone: grossProfit >= 0 ? "green" : "red"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
							label: "Gross Margin",
							value: `${grossMargin.toFixed(2)} %`,
							muted: true
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "my-3 h-px bg-white/10" }),
						Object.entries(expensesByCat).map(([k, v]) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
							label: k,
							value: `- ${inr(v)}`,
							muted: true
						}, k)),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
							label: "Total Operating Expenses",
							value: `- ${inr(totalExpenses)}`
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "my-3 h-px bg-white/10" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
							label: netProfit >= 0 ? "NET PROFIT" : "NET LOSS",
							value: inr(Math.abs(netProfit)),
							bold: true,
							tone: netProfit >= 0 ? "green" : "red",
							big: true
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
							label: "Net Margin",
							value: `${netMargin.toFixed(2)} %`,
							muted: true
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-4 rounded-lg bg-white/5 p-3 text-xs text-slate-400",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
									className: "text-slate-300",
									children: "Info:"
								}),
								" Inventory purchases (POs received this month): ",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-slate-200 font-mono",
									children: inr(purchasesThisMonth)
								}),
								" — shown for reference, not subtracted (COGS is matched per invoice)."
							]
						})
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "rounded-2xl border border-white/10 bg-[#0f172a]/80 backdrop-blur-xl p-0 shadow-lg overflow-hidden",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "p-5 border-b border-white/10 bg-white/[0.02]",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", {
						className: "text-sm font-bold uppercase tracking-widest text-slate-400",
						children: ["Operating Expenses — ", month]
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "overflow-x-auto custom-scrollbar p-1",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
						className: "w-full text-sm whitespace-nowrap",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", {
							className: "bg-slate-900/50 text-xs uppercase tracking-wider text-slate-400",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "px-4 py-3 text-left",
									children: "Date"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "px-4 py-3 text-left",
									children: "Category"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "px-4 py-3 text-left",
									children: "Description"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "px-4 py-3 text-right",
									children: "Amount"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { className: "px-4 py-3" })
							] })
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: expenses.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tr", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							colSpan: 5,
							className: "px-4 py-12 text-center text-slate-500",
							children: "No expenses logged for this month."
						}) }) : expenses.map((e) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
							className: "group border-b border-white/5 hover:bg-white/[0.02] transition-colors",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "px-4 py-3 text-slate-400",
									children: fmtDate(e.expense_date)
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "px-4 py-3 font-medium text-slate-200",
									children: e.category
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "px-4 py-3 text-slate-400",
									children: e.description || "—"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "px-4 py-3 text-right font-medium text-slate-200",
									children: inr(Number(e.amount))
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "px-4 py-3 text-right",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
										size: "icon",
										variant: "ghost",
										className: "h-8 w-8 text-slate-400 hover:text-red-400 hover:bg-red-400/10 opacity-0 group-hover:opacity-100 transition-opacity",
										onClick: () => delExpense.mutate(e.id),
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "h-4 w-4" })
									})
								})
							]
						}, e.id)) })]
					})
				})]
			})
		]
	});
}
function KPI({ icon, label, value, hint, tone }) {
	const color = {
		cyan: "#22d3ee",
		green: "#4ade80",
		red: "#f87171",
		amber: "#fbbf24"
	}[tone];
	const textCls = {
		cyan: "text-cyan-400",
		green: "text-emerald-400",
		red: "text-red-400",
		amber: "text-amber-400"
	}[tone];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "group relative overflow-hidden rounded-2xl border border-white/10 bg-[#0f172a]/80 backdrop-blur-xl p-5 shadow-lg transition-all hover:bg-white/5 hover:border-white/20 hover:-translate-y-0.5 hover:shadow-xl",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "pointer-events-none absolute -right-6 -top-6 h-24 w-24 rounded-full opacity-10 blur-2xl transition-opacity group-hover:opacity-20",
				style: { background: color }
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center justify-between",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "text-[11px] font-bold uppercase tracking-widest text-slate-400",
					children: label
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: `grid h-8 w-8 place-items-center rounded-lg border border-white/5 bg-white/[0.02] ${textCls}`,
					children: icon
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: `mt-2 text-2xl font-bold tracking-tight ${textCls}`,
				children: value
			}),
			hint && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-1 text-xs text-slate-500",
				children: hint
			})
		]
	});
}
function Row({ label, value, muted, bold, big, tone }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: `flex items-center justify-between py-1.5 transition-colors hover:bg-white/[0.02] px-2 -mx-2 rounded-md ${muted ? "text-slate-400 text-xs pl-6" : ""} ${bold ? "font-bold" : ""} ${big ? "text-xl font-black tracking-tight" : ""}`,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: label }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: tone === "green" ? "text-emerald-400" : tone === "red" ? "text-red-400" : "text-slate-200",
			children: value
		})]
	});
}
//#endregion
export { PnLPage as component };
