import { o as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { o as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { t as Button } from "./button-C1KSxKmF.mjs";
import { M as Phone, U as MessageCircle, j as Plus, m as Trash2, v as SquarePen, w as Search } from "../_libs/lucide-react.mjs";
import { t as Input } from "./input-CCCvLIdb.mjs";
import { t as Textarea } from "./textarea-C3L8366G.mjs";
import { n as fmtDate } from "./format-DOFCsm48.mjs";
import { i as useQueryClient, n as useQuery, t as useMutation } from "../_libs/tanstack__react-query.mjs";
import { t as toast } from "../_libs/sonner.mjs";
import { t as Label } from "./label-BhFXZmyO.mjs";
import { a as updateCustomerFn, i as getCustomersFn, r as deleteCustomerFn, t as createCustomerFn } from "./customers-Cs5FLpVT.mjs";
import { a as DialogTitle, i as DialogHeader, n as DialogContent, o as DialogTrigger, r as DialogFooter, t as Dialog } from "./dialog-CMoNC1Ou.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/customers-B5x8jtyt2.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function CustomersPage() {
	const qc = useQueryClient();
	const [search, setSearch] = (0, import_react.useState)("");
	const [open, setOpen] = (0, import_react.useState)(false);
	const [editing, setEditing] = (0, import_react.useState)(null);
	const { data: customers = [], isLoading } = useQuery({
		queryKey: ["customers"],
		queryFn: async () => {
			return await getCustomersFn();
		}
	});
	const filtered = customers.filter((c) => {
		const q = search.toLowerCase();
		return !q || c.name.toLowerCase().includes(q) || c.phone?.includes(q) || c.email?.toLowerCase().includes(q);
	});
	const save = useMutation({
		mutationFn: async (form) => {
			if (editing) await updateCustomerFn({ data: {
				id: editing.id,
				data: form
			} });
			else await createCustomerFn({ data: {
				name: form.name,
				...form
			} });
		},
		onSuccess: () => {
			toast.success(editing ? "Customer updated" : "Customer added");
			qc.invalidateQueries({ queryKey: ["customers"] });
			setOpen(false);
			setEditing(null);
		},
		onError: (e) => toast.error(e.message)
	});
	const del = useMutation({
		mutationFn: async (id) => {
			await deleteCustomerFn({ data: id });
		},
		onSuccess: () => {
			toast.success("Customer deleted");
			qc.invalidateQueries({ queryKey: ["customers"] });
		},
		onError: (e) => toast.error(e.message)
	});
	function onSubmit(e) {
		e.preventDefault();
		const fd = new FormData(e.currentTarget);
		save.mutate({
			name: String(fd.get("name") || ""),
			phone: String(fd.get("phone") || "") || null,
			whatsapp: String(fd.get("whatsapp") || "") || null,
			email: String(fd.get("email") || "") || null,
			address: String(fd.get("address") || "") || null,
			notes: String(fd.get("notes") || "") || null
		});
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-7xl space-y-6",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
			className: "flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-6",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "space-y-1.5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-3xl font-bold tracking-tight",
					children: "Customers"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "text-sm text-slate-400",
					children: [customers.length, " total customers"]
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
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "mr-2 h-4 w-4" }), " Add customer"]
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
					className: "glass-strong",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogTitle, { children: [editing ? "Edit" : "Add", " customer"] }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
						onSubmit,
						className: "space-y-3",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "grid grid-cols-2 gap-3",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
										label: "Name",
										name: "name",
										defaultValue: editing?.name,
										required: true
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
										label: "Phone",
										name: "phone",
										defaultValue: editing?.phone ?? ""
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
										label: "WhatsApp",
										name: "whatsapp",
										defaultValue: editing?.whatsapp ?? ""
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
										label: "Email",
										name: "email",
										type: "email",
										defaultValue: editing?.email ?? ""
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								label: "Address",
								name: "address",
								defaultValue: editing?.address ?? ""
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-1.5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Notes" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
									name: "notes",
									defaultValue: editing?.notes ?? "",
									className: "min-h-[100px] resize-none bg-input/40"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogFooter, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								type: "submit",
								disabled: save.isPending,
								className: "shadow-lg transition-transform hover:scale-105 active:scale-95",
								style: {
									background: "var(--gradient-primary)",
									color: "oklch(0.12 0.02 250)"
								},
								children: editing ? "Save changes" : "Create"
							}) })
						]
					})]
				})]
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "rounded-2xl border border-white/10 bg-[#0f172a]/80 backdrop-blur-xl p-4 shadow-lg",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative mb-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
					placeholder: "Search by name, phone or email…",
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
								children: "Contact"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "px-4 py-3 text-left",
								children: "Address"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "px-4 py-3 text-left",
								children: "Added"
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
						!isLoading && filtered.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tr", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							colSpan: 5,
							className: "px-4 py-12 text-center text-slate-500",
							children: "No customers yet. Add your first one."
						}) }),
						filtered.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
							className: "group border-b border-white/5 hover:bg-white/[0.02] transition-colors",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "px-4 py-3 font-medium text-slate-200",
									children: c.name
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "px-4 py-3 text-slate-400",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex flex-col gap-1",
										children: [c.phone && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "inline-flex items-center gap-1.5",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Phone, { className: "h-3 w-3" }), c.phone]
										}), c.whatsapp && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
											href: `https://wa.me/${c.whatsapp.replace(/\D/g, "")}`,
											target: "_blank",
											rel: "noreferrer",
											className: "inline-flex items-center gap-1.5 text-emerald-400 hover:text-emerald-300 hover:underline",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MessageCircle, { className: "h-3 w-3" }), " WhatsApp"]
										})]
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "px-4 py-3 text-slate-400 truncate max-w-[200px]",
									title: c.address ?? "",
									children: c.address ?? "—"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "px-4 py-3 text-slate-400",
									children: fmtDate(c.created_at)
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
												setEditing(c);
												setOpen(true);
											},
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SquarePen, { className: "h-4 w-4" })
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
											size: "icon",
											variant: "ghost",
											className: "h-8 w-8 text-slate-400 hover:text-red-400 hover:bg-red-400/10",
											onClick: () => {
												if (confirm(`Delete ${c.name}?`)) del.mutate(c.id);
											},
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "h-4 w-4" })
										})]
									})
								})
							]
						}, c.id))
					] })]
				})
			})]
		})]
	});
}
function Field({ label, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-1.5",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: label }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, { ...props })]
	});
}
//#endregion
export { CustomersPage as component };
