import { o as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { o as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { t as Button } from "./button-C1KSxKmF.mjs";
import { Dt as Boxes, d as TriangleAlert, j as Plus, m as Trash2, v as SquarePen, w as Search } from "../_libs/lucide-react.mjs";
import { t as Input } from "./input-CCCvLIdb.mjs";
import { i as inr } from "./format-DOFCsm48.mjs";
import { i as useQueryClient, n as useQuery, t as useMutation } from "../_libs/tanstack__react-query.mjs";
import { t as toast } from "../_libs/sonner.mjs";
import { t as Label } from "./label-BhFXZmyO.mjs";
import { a as DialogTitle, i as DialogHeader, n as DialogContent, o as DialogTrigger, r as DialogFooter, t as Dialog } from "./dialog-CMoNC1Ou.mjs";
import { t as Badge } from "./badge-eXqQHFo7.mjs";
import { d as updateInventoryItemFn, i as deleteInventoryItemFn, o as getInventoryItemsFn, t as createInventoryItemFn } from "./inventory-DBqm2GjA.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/inventory-DeAcK-Vq2.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function InventoryPage() {
	const qc = useQueryClient();
	const [search, setSearch] = (0, import_react.useState)("");
	const [open, setOpen] = (0, import_react.useState)(false);
	const [editing, setEditing] = (0, import_react.useState)(null);
	const { data: items = [], isLoading } = useQuery({
		queryKey: ["inventory"],
		queryFn: async () => {
			return (await getInventoryItemsFn()).map((i) => ({
				...i,
				quantity: i.stock_level,
				low_stock_threshold: i.min_stock_level ?? 5,
				supplier: null,
				warranty_months: null
			}));
		}
	});
	const filtered = items.filter((i) => !search || i.name.toLowerCase().includes(search.toLowerCase()) || i.sku?.toLowerCase().includes(search.toLowerCase()));
	const lowStock = items.filter((i) => i.quantity <= i.low_stock_threshold);
	const totalValue = items.reduce((s, i) => s + i.quantity * Number(i.cost_price), 0);
	const save = useMutation({
		mutationFn: async (form) => {
			const payload = {
				name: form.name,
				sku: form.sku,
				category: form.category,
				cost_price: form.cost_price ?? 0,
				selling_price: form.selling_price ?? 0,
				stock_level: form.quantity ?? 0,
				min_stock_level: form.low_stock_threshold ?? 5
			};
			if (editing) await updateInventoryItemFn({ data: {
				id: editing.id,
				data: payload
			} });
			else await createInventoryItemFn({ data: payload });
		},
		onSuccess: () => {
			toast.success("Saved");
			qc.invalidateQueries({ queryKey: ["inventory"] });
			setOpen(false);
			setEditing(null);
		},
		onError: (e) => toast.error(e.message)
	});
	const del = useMutation({
		mutationFn: async (id) => {
			await deleteInventoryItemFn({ data: id });
		},
		onSuccess: () => {
			toast.success("Deleted");
			qc.invalidateQueries({ queryKey: ["inventory"] });
		}
	});
	function onSubmit(e) {
		e.preventDefault();
		const fd = new FormData(e.currentTarget);
		save.mutate({
			name: String(fd.get("name")),
			sku: String(fd.get("sku") || "") || null,
			category: String(fd.get("category") || "") || null,
			quantity: Number(fd.get("quantity") || 0),
			cost_price: Number(fd.get("cost_price") || 0),
			selling_price: Number(fd.get("selling_price") || 0),
			supplier: String(fd.get("supplier") || "") || null,
			warranty_months: Number(fd.get("warranty_months") || 0),
			low_stock_threshold: Number(fd.get("low_stock_threshold") || 5)
		});
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
						children: "Inventory"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-slate-400",
						children: "Spare parts, accessories and tools"
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Dialog, {
					open,
					onOpenChange: (v) => {
						setOpen(v);
						if (!v) setEditing(null);
					},
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTrigger, {
						asChild: true,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							className: "h-10 px-5 shadow-lg transition-transform hover:scale-105 active:scale-95",
							style: {
								background: "var(--gradient-primary)",
								color: "oklch(0.12 0.02 250)"
							},
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "mr-2 h-4 w-4" }), " Add custom item"]
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
						className: "glass-strong max-h-[90vh] overflow-y-auto custom-scrollbar border-white/10 shadow-2xl",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogHeader, {
								className: "border-b border-white/10 pb-4 mb-4",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogTitle, {
									className: "text-xl tracking-tight",
									children: [editing ? "Edit" : "Add new", " inventory item"]
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-sm text-slate-400 -mt-2 mb-4",
								children: "Enter any product — spare part, accessory, new device or refurbished unit — with your own name, SKU, price and stock quantity."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
								onSubmit,
								className: "space-y-4",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "grid grid-cols-2 gap-4",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(F, {
											label: "Name",
											name: "name",
											defaultValue: editing?.name,
											required: true,
											className: "bg-black/20 border-white/10 focus:border-cyan-500/50"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(F, {
											label: "SKU",
											name: "sku",
											defaultValue: editing?.sku ?? "",
											className: "bg-black/20 border-white/10 focus:border-cyan-500/50"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "space-y-1.5",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
													className: "text-slate-300",
													children: "Category"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
													list: "category-list",
													name: "category",
													defaultValue: editing?.category ?? "",
													placeholder: "Refurbished Laptop / New Mobile / Spare…",
													className: "bg-black/20 border-white/10 focus:border-cyan-500/50"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("datalist", {
													id: "category-list",
													children: [
														/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { value: "Spare Part" }),
														/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { value: "Accessory" }),
														/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { value: "Tool" }),
														/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { value: "Mobile Charger" }),
														/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { value: "Screen Guard" }),
														/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { value: "Cable" }),
														/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { value: "Wire" }),
														/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { value: "Earphones" }),
														/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { value: "Battery" }),
														/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { value: "New Mobile" }),
														/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { value: "New Laptop" }),
														/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { value: "New Tablet" }),
														/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { value: "New Smart Watch" }),
														/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { value: "New Desktop" }),
														/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { value: "Refurbished Mobile" }),
														/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { value: "Refurbished Laptop" }),
														/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { value: "Refurbished Tablet" }),
														/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { value: "Refurbished Smart Watch" }),
														/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { value: "Refurbished Desktop" }),
														/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { value: "Others" })
													]
												})
											]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(F, {
											label: "Supplier",
											name: "supplier",
											defaultValue: editing?.supplier ?? "",
											className: "bg-black/20 border-white/10 focus:border-cyan-500/50"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(F, {
											label: "Quantity",
											name: "quantity",
											type: "number",
											defaultValue: editing?.quantity ?? 0,
											required: true,
											className: "bg-black/20 border-white/10 focus:border-cyan-500/50"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(F, {
											label: "Low stock threshold",
											name: "low_stock_threshold",
											type: "number",
											defaultValue: editing?.low_stock_threshold ?? 5,
											className: "bg-black/20 border-white/10 focus:border-cyan-500/50"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(F, {
											label: "Cost price (₹)",
											name: "cost_price",
											type: "number",
											step: "0.01",
											defaultValue: editing?.cost_price ?? 0,
											className: "bg-black/20 border-white/10 focus:border-cyan-500/50"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(F, {
											label: "Selling price (₹)",
											name: "selling_price",
											type: "number",
											step: "0.01",
											defaultValue: editing?.selling_price ?? 0,
											className: "bg-black/20 border-white/10 focus:border-cyan-500/50"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(F, {
											label: "Warranty (months)",
											name: "warranty_months",
											type: "number",
											defaultValue: editing?.warranty_months ?? 0,
											className: "bg-black/20 border-white/10 focus:border-cyan-500/50"
										})
									]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogFooter, {
									className: "pt-4 border-t border-white/10",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
										type: "submit",
										disabled: save.isPending,
										className: "shadow-lg transition-transform hover:scale-105 active:scale-95",
										style: {
											background: "var(--gradient-primary)",
											color: "oklch(0.12 0.02 250)"
										},
										children: "Save"
									})
								})]
							})
						]
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-4 sm:grid-cols-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
						icon: Boxes,
						label: "Items",
						value: String(items.length),
						color: "#3b82f6"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
						icon: TriangleAlert,
						label: "Low stock",
						value: String(lowStock.length),
						tone: "warn",
						color: "#ef4444"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
						icon: Boxes,
						label: "Inventory value",
						value: inr(totalValue),
						color: "#10b981"
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "rounded-2xl border border-white/10 bg-[#0f172a]/80 backdrop-blur-xl p-4 shadow-lg",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "relative mb-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						placeholder: "Search by name or SKU…",
						value: search,
						onChange: (e) => setSearch(e.target.value),
						className: "pl-9 h-10 bg-black/20 border-white/10"
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "overflow-x-auto custom-scrollbar",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
						className: "w-full text-sm whitespace-nowrap",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", {
							className: "bg-slate-900/50 text-xs uppercase tracking-wider text-slate-400",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "px-4 py-3 text-left rounded-tl-lg",
									children: "Name"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "px-4 py-3 text-left",
									children: "SKU"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "px-4 py-3 text-left",
									children: "Category"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "px-4 py-3 text-right",
									children: "Qty"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "px-4 py-3 text-right",
									children: "Cost"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "px-4 py-3 text-right",
									children: "Price"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "px-4 py-3 text-right rounded-tr-lg",
									children: "Actions"
								})
							] })
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tbody", { children: [
							isLoading && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tr", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								colSpan: 7,
								className: "px-4 py-12 text-center text-slate-500",
								children: "Loading…"
							}) }),
							!isLoading && filtered.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tr", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								colSpan: 7,
								className: "px-4 py-12 text-center text-slate-500",
								children: "No items yet."
							}) }),
							filtered.map((i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
								className: "group border-b border-white/5 hover:bg-white/[0.02] transition-colors",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "px-4 py-3 font-medium text-slate-200",
										children: i.name
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "px-4 py-3 text-slate-400",
										children: i.sku ?? "—"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "px-4 py-3 text-slate-400",
										children: i.category ?? "—"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
										className: "px-4 py-3 text-right",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: i.quantity <= i.low_stock_threshold ? "text-red-400 font-bold" : "text-slate-200",
											children: i.quantity
										}), i.quantity <= i.low_stock_threshold && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
											variant: "outline",
											className: "ml-2 border-red-500/40 text-red-400 bg-red-500/10",
											children: "Low"
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "px-4 py-3 text-right text-slate-400",
										children: inr(i.cost_price)
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "px-4 py-3 text-right font-medium text-slate-200",
										children: inr(i.selling_price)
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "px-4 py-3 text-right",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
												size: "icon",
												variant: "ghost",
												className: "h-8 w-8 text-slate-400 hover:text-cyan-400 hover:bg-cyan-400/10",
												"aria-label": `Edit ${i.name}`,
												onClick: () => {
													setEditing(i);
													setOpen(true);
												},
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SquarePen, { className: "h-4 w-4" })
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
												size: "icon",
												variant: "ghost",
												className: "h-8 w-8 text-slate-400 hover:text-red-400 hover:bg-red-400/10",
												"aria-label": `Delete ${i.name}`,
												onClick: () => {
													if (confirm("Delete?")) del.mutate(i.id);
												},
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "h-4 w-4" })
											})]
										})
									})
								]
							}, i.id))
						] })]
					})
				})]
			})
		]
	});
}
function F({ label, className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-1.5",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
			className: "text-slate-300",
			children: label
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
			className,
			...props
		})]
	});
}
function Stat({ icon: Icon, label, value, tone, color = "#22d3ee" }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "group relative overflow-hidden rounded-2xl border border-white/10 bg-[#0f172a]/80 backdrop-blur-xl p-5 shadow-lg transition-all hover:bg-white/5 hover:border-white/20 hover:-translate-y-0.5 hover:shadow-xl",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "pointer-events-none absolute -right-6 -top-6 h-24 w-24 rounded-full opacity-10 blur-2xl transition-opacity group-hover:opacity-20",
			style: { background: color }
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-start justify-between",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "text-[11px] font-bold uppercase tracking-widest text-slate-400",
				children: label
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-2 text-2xl font-bold tracking-tight " + (tone === "warn" ? "text-red-400" : "text-slate-100"),
				children: value
			})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid h-9 w-9 place-items-center rounded-xl border border-white/5 bg-white/[0.02]",
				style: { color },
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "h-4 w-4" })
			})]
		})]
	});
}
//#endregion
export { InventoryPage as component };
