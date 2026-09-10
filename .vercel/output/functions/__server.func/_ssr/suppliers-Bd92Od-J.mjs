import { o as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { o as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { t as Button } from "./button-C1KSxKmF.mjs";
import { $ as History, L as PackageCheck, j as Plus, m as Trash2, nt as FileText, u as Truck, v as SquarePen } from "../_libs/lucide-react.mjs";
import { t as Input } from "./input-CCCvLIdb.mjs";
import { t as Textarea } from "./textarea-C3L8366G.mjs";
import { i as inr, o as inrPrecise, r as fmtDateTime } from "./format-DOFCsm48.mjs";
import { i as useQueryClient, n as useQuery, t as useMutation } from "../_libs/tanstack__react-query.mjs";
import { i as TabsTrigger, n as TabsContent, r as TabsList, t as Tabs } from "./tabs-BefRq5JO.mjs";
import { t as toast } from "../_libs/sonner.mjs";
import { t as Label } from "./label-BhFXZmyO.mjs";
import { a as DialogTitle, i as DialogHeader, n as DialogContent, o as DialogTrigger, r as DialogFooter, t as Dialog } from "./dialog-CMoNC1Ou.mjs";
import { t as Badge } from "./badge-eXqQHFo7.mjs";
import { a as deleteSupplierFn, c as getPurchaseOrdersFn, d as updateInventoryItemFn, f as updatePurchaseOrderFn, l as getStockMovementsFn, n as createPurchaseOrderFn, o as getInventoryItemsFn, p as updateSupplierFn, r as createSupplierFn, s as getPurchaseOrderItemsFn, u as getSuppliersFn } from "./inventory-DBqm2GjA.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/suppliers-Bd92Od-J.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function SuppliersPage() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-7xl space-y-6",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
			className: "flex flex-col gap-1.5 border-b border-white/10 pb-6",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "text-3xl font-bold tracking-tight",
				children: "Suppliers & Stock"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-slate-400",
				children: "Manage suppliers, purchase orders, and full stock history."
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Tabs, {
			defaultValue: "suppliers",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsList, {
					className: "bg-[#0f172a]/80 backdrop-blur-xl border border-white/10 p-1 h-auto rounded-lg",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsTrigger, {
							value: "suppliers",
							className: "data-[state=active]:bg-cyan-500/20 data-[state=active]:text-cyan-400",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Truck, { className: "mr-2 h-4 w-4" }), "Suppliers"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsTrigger, {
							value: "po",
							className: "data-[state=active]:bg-cyan-500/20 data-[state=active]:text-cyan-400",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileText, { className: "mr-2 h-4 w-4" }), "Purchase Orders"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsTrigger, {
							value: "history",
							className: "data-[state=active]:bg-cyan-500/20 data-[state=active]:text-cyan-400",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(History, { className: "mr-2 h-4 w-4" }), "Stock History"]
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
					value: "suppliers",
					className: "mt-6",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SuppliersTab, {})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
					value: "po",
					className: "mt-6",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PurchaseOrdersTab, {})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
					value: "history",
					className: "mt-6",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StockHistoryTab, {})
				})
			]
		})]
	});
}
function SuppliersTab() {
	const qc = useQueryClient();
	const [open, setOpen] = (0, import_react.useState)(false);
	const [editing, setEditing] = (0, import_react.useState)(null);
	const { data: suppliers = [], isLoading } = useQuery({
		queryKey: ["suppliers"],
		queryFn: async () => {
			return await getSuppliersFn();
		}
	});
	const save = useMutation({
		mutationFn: async (form) => {
			if (editing) await updateSupplierFn({ data: {
				id: editing.id,
				data: form
			} });
			else await createSupplierFn({ data: form });
		},
		onSuccess: () => {
			toast.success("Saved");
			qc.invalidateQueries({ queryKey: ["suppliers"] });
			setOpen(false);
			setEditing(null);
		},
		onError: (e) => toast.error(e.message)
	});
	const del = useMutation({
		mutationFn: async (id) => {
			await deleteSupplierFn({ data: id });
		},
		onSuccess: () => {
			toast.success("Deleted");
			qc.invalidateQueries({ queryKey: ["suppliers"] });
		}
	});
	function onSubmit(e) {
		e.preventDefault();
		const fd = new FormData(e.currentTarget);
		save.mutate({
			name: String(fd.get("name")),
			contact_person: String(fd.get("contact_person") || "") || null,
			phone: String(fd.get("phone") || "") || null,
			email: String(fd.get("email") || "") || null,
			address: String(fd.get("address") || "") || null,
			gst_number: String(fd.get("gst_number") || "") || null,
			notes: String(fd.get("notes") || "") || null
		});
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-2xl border border-white/10 bg-[#0f172a]/80 backdrop-blur-xl p-4 shadow-lg",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mb-4 flex justify-end",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Dialog, {
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
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "mr-2 h-4 w-4" }), " Add supplier"]
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
					className: "glass-strong max-h-[90vh] overflow-y-auto custom-scrollbar border-white/10 shadow-2xl",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogHeader, {
						className: "border-b border-white/10 pb-4 mb-4",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogTitle, {
							className: "text-xl tracking-tight",
							children: [editing ? "Edit" : "Add", " supplier"]
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
						onSubmit,
						className: "space-y-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "grid grid-cols-2 gap-4",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(F, {
										label: "Supplier name",
										name: "name",
										defaultValue: editing?.name ?? "",
										required: true,
										className: "bg-black/20 border-white/10 focus:border-cyan-500/50"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(F, {
										label: "Contact person",
										name: "contact_person",
										defaultValue: editing?.contact_person ?? "",
										className: "bg-black/20 border-white/10 focus:border-cyan-500/50"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(F, {
										label: "Phone",
										name: "phone",
										defaultValue: editing?.phone ?? "",
										className: "bg-black/20 border-white/10 focus:border-cyan-500/50"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(F, {
										label: "Email",
										name: "email",
										type: "email",
										defaultValue: editing?.email ?? "",
										className: "bg-black/20 border-white/10 focus:border-cyan-500/50"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(F, {
										label: "GSTIN",
										name: "gst_number",
										defaultValue: editing?.gst_number ?? "",
										className: "bg-black/20 border-white/10 focus:border-cyan-500/50"
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-1.5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
									className: "text-slate-300",
									children: "Address"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
									name: "address",
									rows: 2,
									defaultValue: editing?.address ?? "",
									className: "bg-black/20 border-white/10 focus:border-cyan-500/50 resize-none"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-1.5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
									className: "text-slate-300",
									children: "Notes"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
									name: "notes",
									rows: 2,
									defaultValue: editing?.notes ?? "",
									className: "bg-black/20 border-white/10 focus:border-cyan-500/50 resize-none"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogFooter, {
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
							})
						]
					})]
				})]
			})
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "overflow-x-auto custom-scrollbar",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
				className: "w-full text-sm whitespace-nowrap",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", {
					className: "bg-slate-900/50 text-xs uppercase tracking-wider text-slate-400",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							className: "px-4 py-3 text-left rounded-tl-lg",
							children: "Supplier"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							className: "px-4 py-3 text-left",
							children: "Contact"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							className: "px-4 py-3 text-left",
							children: "Phone"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							className: "px-4 py-3 text-left",
							children: "GSTIN"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							className: "px-4 py-3 text-right rounded-tr-lg",
							children: "Actions"
						})
					] })
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tbody", { children: [
					isLoading && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tr", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
						colSpan: 5,
						className: "px-4 py-12 text-center text-slate-500",
						children: "Loading…"
					}) }),
					!isLoading && suppliers.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tr", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
						colSpan: 5,
						className: "px-4 py-12 text-center text-slate-500",
						children: "No suppliers yet."
					}) }),
					suppliers.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
						className: "group border-b border-white/5 hover:bg-white/[0.02] transition-colors",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "px-4 py-3 font-medium text-slate-200",
								children: s.name
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "px-4 py-3 text-slate-400",
								children: s.contact_person ?? "—"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "px-4 py-3 text-slate-400",
								children: s.phone ?? "—"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "px-4 py-3 font-mono text-xs text-slate-400",
								children: s.gst_number ?? "—"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "px-4 py-3 text-right",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
										size: "icon",
										variant: "ghost",
										className: "h-8 w-8 text-slate-400 hover:text-cyan-400 hover:bg-cyan-400/10",
										onClick: () => {
											setEditing(s);
											setOpen(true);
										},
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SquarePen, { className: "h-4 w-4" })
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
										size: "icon",
										variant: "ghost",
										className: "h-8 w-8 text-slate-400 hover:text-red-400 hover:bg-red-400/10",
										onClick: () => {
											if (confirm("Delete?")) del.mutate(s.id);
										},
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "h-4 w-4" })
									})]
								})
							})
						]
					}, s.id))
				] })]
			})
		})]
	});
}
function PurchaseOrdersTab() {
	const qc = useQueryClient();
	const [open, setOpen] = (0, import_react.useState)(false);
	const [supplierId, setSupplierId] = (0, import_react.useState)("");
	const [notes, setNotes] = (0, import_react.useState)("");
	const [lines, setLines] = (0, import_react.useState)([{
		description: "",
		quantity: 1,
		unit_cost: 0
	}]);
	const { data: pos = [], isLoading } = useQuery({
		queryKey: ["purchase_orders"],
		queryFn: async () => {
			return await getPurchaseOrdersFn();
		}
	});
	const { data: suppliers = [] } = useQuery({
		queryKey: ["suppliers-min"],
		queryFn: async () => await getSuppliersFn()
	});
	const { data: items = [] } = useQuery({
		queryKey: ["inventory-min"],
		queryFn: async () => await getInventoryItemsFn()
	});
	const total = lines.reduce((s, l) => s + l.quantity * l.unit_cost, 0);
	const create = useMutation({
		mutationFn: async () => {
			const cleaned = lines.filter((l) => l.description && l.quantity > 0);
			if (cleaned.length === 0) throw new Error("Add at least one item");
			const payload = {
				supplier_id: supplierId || null,
				total,
				notes: notes || null,
				lines: cleaned.map((l) => ({
					item_id: l.item_id || null,
					quantity: l.quantity,
					unit_cost: l.unit_cost
				}))
			};
			await createPurchaseOrderFn({ data: payload });
		},
		onSuccess: () => {
			toast.success("Purchase order created");
			qc.invalidateQueries({ queryKey: ["purchase_orders"] });
			setOpen(false);
			setLines([{
				description: "",
				quantity: 1,
				unit_cost: 0
			}]);
			setSupplierId("");
			setNotes("");
		},
		onError: (e) => toast.error(e.message)
	});
	const receive = useMutation({
		mutationFn: async (po) => {
			if (po.status === "received") throw new Error("Already received");
			const poItems = await getPurchaseOrderItemsFn({ data: { po_id: po.id } });
			for (const li of poItems ?? []) if (li.item_id) {
				const it = items.find((i) => i.id === li.item_id);
				if (it) await updateInventoryItemFn({ data: {
					id: li.item_id,
					data: {
						stock_level: it.stock_level + li.quantity,
						cost_price: li.unit_cost || it.cost_price
					}
				} });
			}
			await updatePurchaseOrderFn({ data: {
				id: po.id,
				data: {
					status: "received",
					received_at: (/* @__PURE__ */ new Date()).toISOString()
				}
			} });
		},
		onSuccess: () => {
			toast.success("Stock received");
			qc.invalidateQueries({ queryKey: ["purchase_orders"] });
			qc.invalidateQueries({ queryKey: ["inventory"] });
			qc.invalidateQueries({ queryKey: ["inventory-min"] });
			qc.invalidateQueries({ queryKey: ["stock_movements"] });
		},
		onError: (e) => toast.error(e.message)
	});
	const supplierMap = new Map(suppliers.map((s) => [s.id, s.name]));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-2xl border border-white/10 bg-[#0f172a]/80 backdrop-blur-xl p-4 shadow-lg",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mb-4 flex justify-end",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Dialog, {
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
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "mr-2 h-4 w-4" }), " New PO"]
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
					className: "glass-strong max-h-[90vh] max-w-3xl overflow-y-auto custom-scrollbar border-white/10 shadow-2xl",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogHeader, {
							className: "border-b border-white/10 pb-4 mb-4",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, {
								className: "text-xl tracking-tight",
								children: "New purchase order"
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-4",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-1.5",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
										className: "text-slate-300",
										children: "Supplier"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
										value: supplierId,
										onChange: (e) => setSupplierId(e.target.value),
										className: "h-10 w-full rounded-md border border-white/10 bg-black/20 px-3 text-sm focus:border-cyan-500/50 outline-none",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: "",
											className: "bg-[#0f172a]",
											children: "— Select supplier —"
										}), suppliers.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: s.id,
											className: "bg-[#0f172a]",
											children: s.name
										}, s.id))]
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-2",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
											className: "text-slate-300",
											children: "Line items"
										}),
										lines.map((l, idx) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "grid grid-cols-[1.5fr_1fr_70px_110px_40px] gap-2",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
													placeholder: "Description",
													value: l.description,
													onChange: (e) => setLines(lines.map((x, i) => i === idx ? {
														...x,
														description: e.target.value
													} : x)),
													className: "bg-black/20 border-white/10 focus:border-cyan-500/50"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
													className: "h-10 rounded-md border border-white/10 bg-black/20 px-2 text-xs focus:border-cyan-500/50 outline-none",
													value: l.item_id ?? "",
													onChange: (e) => {
														const it = items.find((x) => x.id === e.target.value);
														setLines(lines.map((x, i) => i === idx ? {
															...x,
															item_id: e.target.value || null,
															description: x.description || it?.name || "",
															unit_cost: x.unit_cost || Number(it?.cost_price ?? 0)
														} : x));
													},
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
														value: "",
														className: "bg-[#0f172a]",
														children: "— Link inventory —"
													}), items.map((it) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
														value: it.id,
														className: "bg-[#0f172a]",
														children: it.name
													}, it.id))]
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
													type: "number",
													min: 1,
													value: l.quantity,
													onChange: (e) => setLines(lines.map((x, i) => i === idx ? {
														...x,
														quantity: Number(e.target.value)
													} : x)),
													className: "bg-black/20 border-white/10 focus:border-cyan-500/50"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
													type: "number",
													step: "0.01",
													placeholder: "Unit ₹",
													value: l.unit_cost,
													onChange: (e) => setLines(lines.map((x, i) => i === idx ? {
														...x,
														unit_cost: Number(e.target.value)
													} : x)),
													className: "bg-black/20 border-white/10 focus:border-cyan-500/50"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
													type: "button",
													variant: "ghost",
													size: "icon",
													className: "h-10 w-10 text-slate-400 hover:text-red-400 hover:bg-red-400/10",
													onClick: () => setLines(lines.filter((_, i) => i !== idx)),
													children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "h-4 w-4" })
												})
											]
										}, idx)),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
											type: "button",
											variant: "outline",
											size: "sm",
											className: "mt-2 border-white/10 bg-white/5 hover:bg-white/10",
											onClick: () => setLines([...lines, {
												description: "",
												quantity: 1,
												unit_cost: 0
											}]),
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "mr-1 h-4 w-4" }), " Add line"]
										})
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-1.5",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
										className: "text-slate-300",
										children: "Notes"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
										value: notes,
										onChange: (e) => setNotes(e.target.value),
										rows: 2,
										className: "bg-black/20 border-white/10 focus:border-cyan-500/50 resize-none"
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "text-right text-xl font-bold text-slate-200 pt-4",
									children: ["Total: ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-cyan-400",
										children: inrPrecise(total)
									})]
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogFooter, {
							className: "pt-4 border-t border-white/10",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								onClick: () => create.mutate(),
								disabled: create.isPending,
								className: "shadow-lg transition-transform hover:scale-105 active:scale-95",
								style: {
									background: "var(--gradient-primary)",
									color: "oklch(0.12 0.02 250)"
								},
								children: "Create PO"
							})
						})
					]
				})]
			})
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "overflow-x-auto custom-scrollbar",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
				className: "w-full text-sm whitespace-nowrap",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", {
					className: "bg-slate-900/50 text-xs uppercase tracking-wider text-slate-400",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							className: "px-4 py-3 text-left rounded-tl-lg",
							children: "PO #"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							className: "px-4 py-3 text-left",
							children: "Supplier"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							className: "px-4 py-3 text-left",
							children: "Date"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							className: "px-4 py-3 text-right",
							children: "Total"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							className: "px-4 py-3 text-left",
							children: "Status"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							className: "px-4 py-3 text-right rounded-tr-lg",
							children: "Actions"
						})
					] })
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tbody", { children: [
					isLoading && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tr", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
						colSpan: 6,
						className: "px-4 py-12 text-center text-slate-500",
						children: "Loading…"
					}) }),
					!isLoading && pos.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tr", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
						colSpan: 6,
						className: "px-4 py-12 text-center text-slate-500",
						children: "No purchase orders yet."
					}) }),
					pos.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
						className: "group border-b border-white/5 hover:bg-white/[0.02] transition-colors",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "px-4 py-3 font-mono text-xs font-semibold text-cyan-400",
								children: p.po_no
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "px-4 py-3 text-slate-200",
								children: p.supplier_id ? supplierMap.get(p.supplier_id) ?? "—" : "—"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "px-4 py-3 text-slate-400",
								children: fmtDateTime(p.created_at)
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "px-4 py-3 text-right font-medium text-slate-200",
								children: inr(p.total)
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "px-4 py-3",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
									variant: "outline",
									className: p.status === "received" ? "border-emerald-500/40 text-emerald-400 bg-emerald-500/10" : "border-amber-500/40 text-amber-400 bg-amber-500/10",
									children: p.status
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "px-4 py-3 text-right",
								children: p.status !== "received" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
									size: "sm",
									variant: "outline",
									className: "border-emerald-500/50 text-emerald-400 hover:bg-emerald-500/10 opacity-0 group-hover:opacity-100 transition-opacity",
									onClick: () => receive.mutate(p),
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PackageCheck, { className: "mr-2 h-4 w-4" }), "Mark received"]
								})
							})
						]
					}, p.id))
				] })]
			})
		})]
	});
}
function StockHistoryTab() {
	const { data: movements = [], isLoading } = useQuery({
		queryKey: ["stock_movements"],
		queryFn: async () => {
			return await getStockMovementsFn();
		}
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "rounded-2xl border border-white/10 bg-[#0f172a]/80 backdrop-blur-xl p-4 shadow-lg",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "overflow-x-auto custom-scrollbar",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
				className: "w-full text-sm whitespace-nowrap",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", {
					className: "bg-slate-900/50 text-xs uppercase tracking-wider text-slate-400",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							className: "px-4 py-3 text-left rounded-tl-lg",
							children: "When"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							className: "px-4 py-3 text-left",
							children: "Item"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							className: "px-4 py-3 text-left",
							children: "Type"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							className: "px-4 py-3 text-right",
							children: "Change"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							className: "px-4 py-3 text-right",
							children: "Balance"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							className: "px-4 py-3 text-left rounded-tr-lg",
							children: "Notes"
						})
					] })
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tbody", { children: [
					isLoading && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tr", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
						colSpan: 6,
						className: "px-4 py-12 text-center text-slate-500",
						children: "Loading…"
					}) }),
					!isLoading && movements.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tr", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
						colSpan: 6,
						className: "px-4 py-12 text-center text-slate-500",
						children: "No movements yet."
					}) }),
					movements.map((m) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
						className: "border-b border-white/5 hover:bg-white/[0.02] transition-colors",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "px-4 py-3 text-slate-400",
								children: fmtDateTime(m.created_at)
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "px-4 py-3 font-medium text-slate-200",
								children: m.item_name
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "px-4 py-3",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
									variant: "outline",
									className: "border-white/20 text-[11px] text-slate-300 bg-white/5",
									children: m.movement_type
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
								className: "px-4 py-3 text-right font-semibold " + (m.change > 0 ? "text-emerald-400" : "text-red-400"),
								children: [m.change > 0 ? "+" : "", m.change]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "px-4 py-3 text-right font-medium text-slate-200",
								children: m.balance_after ?? "—"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "px-4 py-3 text-slate-400",
								children: m.notes ?? "—"
							})
						]
					}, m.id))
				] })]
			})
		})
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
//#endregion
export { SuppliersPage as component };
