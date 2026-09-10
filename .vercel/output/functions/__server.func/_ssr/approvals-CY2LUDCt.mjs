import { o as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { o as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { t as Button } from "./button-C1KSxKmF.mjs";
import { J as LoaderCircle, l as UserCheck, s as UserX, x as ShieldCheck } from "../_libs/lucide-react.mjs";
import { t as motion } from "../_libs/framer-motion.mjs";
import { n as createServerFn } from "./server-De111qI3.mjs";
import { t as createSsrRpc } from "./createSsrRpc-CtdFS2cZ.mjs";
import { r as fmtDateTime } from "./format-DOFCsm48.mjs";
import { a as objectType, o as stringType, r as enumType } from "../_libs/zod.mjs";
import { i as useQueryClient, n as useQuery, t as useMutation } from "../_libs/tanstack__react-query.mjs";
import { i as TabsTrigger, n as TabsContent, r as TabsList, t as Tabs } from "./tabs-BefRq5JO.mjs";
import { r as meFn } from "./auth-BcHM1GNH.mjs";
import { t as toast } from "../_libs/sonner.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/approvals-CY2LUDCt.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var getApprovalsFn = createServerFn({ method: "GET" }).handler(createSsrRpc("725209e8770b575be5fb29edb5c9df2ad795060be8abade2b786f144b5c9d3c5"));
var decideApprovalFn = createServerFn({ method: "POST" }).validator((data) => objectType({
	id: stringType(),
	decision: enumType(["approved", "rejected"]),
	role: stringType().optional(),
	reason: stringType().optional()
}).parse(data)).handler(createSsrRpc("8fd37b624adf198fc97b4324cd58a7464b3a8e3c9659ea70ccf1d070e9e95205"));
var changeRoleFn = createServerFn({ method: "POST" }).validator((data) => objectType({
	id: stringType(),
	role: stringType()
}).parse(data)).handler(createSsrRpc("9781e8eaa83a4002270af1b13e0b25c9f246042d75af05c8e3471aa374e957fe"));
var ROLE_OPTIONS = [
	"customer",
	"employee",
	"staff",
	"technician",
	"admin"
];
function ApprovalsPage() {
	const [isAdmin, setIsAdmin] = (0, import_react.useState)(null);
	(0, import_react.useEffect)(() => {
		(async () => {
			try {
				const { user } = await meFn();
				setIsAdmin(user?.role === "admin");
			} catch (e) {
				setIsAdmin(false);
			}
		})();
	}, []);
	if (isAdmin === null) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex h-64 items-center justify-center text-slate-500",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "mr-2 h-4 w-4 animate-spin text-cyan-400" }), " Loading…"]
	});
	if (!isAdmin) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto mt-16 max-w-md rounded-2xl border border-white/10 bg-[#0f172a]/80 backdrop-blur-xl p-8 text-center shadow-lg",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { className: "mx-auto mb-4 h-10 w-10 text-cyan-400" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "text-xl font-bold tracking-tight text-slate-200",
				children: "Admins only"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 text-sm text-slate-400",
				children: "You need the admin role to review account approvals."
			})
		]
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ApprovalsInner, {});
}
function ApprovalsInner() {
	const qc = useQueryClient();
	const q = useQuery({
		queryKey: ["approvals"],
		queryFn: async () => {
			return await getApprovalsFn();
		}
	});
	const decide = useMutation({
		mutationFn: async (args) => {
			await decideApprovalFn({ data: {
				id: args.id,
				decision: args.decision,
				role: args.role,
				reason: args.reason
			} });
		},
		onSuccess: (_r, args) => {
			qc.invalidateQueries({ queryKey: ["approvals"] });
			toast.success(args.decision === "approved" ? "User approved" : "User rejected");
		},
		onError: (e) => toast.error(e.message ?? "Failed to update")
	});
	const changeRole = useMutation({
		mutationFn: async (args) => {
			await changeRoleFn({ data: {
				id: args.id,
				role: args.role
			} });
		},
		onSuccess: (_r, args) => {
			qc.invalidateQueries({ queryKey: ["approvals"] });
			toast.success(`Role updated to ${args.role}`);
		},
		onError: (e) => toast.error(e.message ?? "Failed to update role")
	});
	const rolesMap = (0, import_react.useMemo)(() => {
		const map = {};
		(q.data ?? []).forEach((r) => {
			if (r.role) map[r.id] = [r.role];
		});
		return map;
	}, [q.data]);
	const rows = q.data ?? [];
	const pending = rows.filter((r) => r.approval_status === "pending");
	const approved = rows.filter((r) => r.approval_status === "approved");
	const rejected = rows.filter((r) => r.approval_status === "rejected");
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
		initial: {
			opacity: 0,
			y: 8
		},
		animate: {
			opacity: 1,
			y: 0
		},
		className: "mx-auto max-w-7xl space-y-6",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex flex-col gap-1.5 border-b border-white/10 pb-6",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "text-3xl font-bold tracking-tight",
				children: "Account approvals"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-slate-400",
				children: "Review new signups and assign a role before granting access."
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Tabs, {
			defaultValue: "pending",
			className: "space-y-6",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsList, {
					className: "bg-[#0f172a]/80 backdrop-blur-xl border border-white/10 p-1 h-auto rounded-lg",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsTrigger, {
							value: "pending",
							className: "data-[state=active]:bg-cyan-500/20 data-[state=active]:text-cyan-400",
							children: [
								"Pending (",
								pending.length,
								")"
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsTrigger, {
							value: "approved",
							className: "data-[state=active]:bg-cyan-500/20 data-[state=active]:text-cyan-400",
							children: [
								"Approved (",
								approved.length,
								")"
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsTrigger, {
							value: "rejected",
							className: "data-[state=active]:bg-cyan-500/20 data-[state=active]:text-cyan-400",
							children: [
								"Rejected (",
								rejected.length,
								")"
							]
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
					value: "pending",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(List, {
						rows: pending,
						kind: "pending",
						decide: decide.mutate,
						busy: decide.isPending,
						rolesMap,
						onChangeRole: changeRole.mutate,
						changing: changeRole.isPending
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
					value: "approved",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(List, {
						rows: approved,
						kind: "approved",
						decide: decide.mutate,
						busy: decide.isPending,
						rolesMap,
						onChangeRole: changeRole.mutate,
						changing: changeRole.isPending
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
					value: "rejected",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(List, {
						rows: rejected,
						kind: "rejected",
						decide: decide.mutate,
						busy: decide.isPending,
						rolesMap,
						onChangeRole: changeRole.mutate,
						changing: changeRole.isPending
					})
				})
			]
		})]
	});
}
function List({ rows, kind, decide, busy, rolesMap, onChangeRole, changing }) {
	if (rows.length === 0) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "rounded-2xl border border-white/10 bg-[#0f172a]/80 backdrop-blur-xl p-10 text-center shadow-lg text-sm text-slate-500",
		children: "Nothing here."
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "grid gap-3",
		children: rows.map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
			row: r,
			kind,
			decide,
			busy,
			currentRoles: rolesMap[r.id] ?? [],
			onChangeRole,
			changing
		}, r.id))
	});
}
function Row({ row, kind, decide, busy, currentRoles, onChangeRole, changing }) {
	const [role, setRole] = (0, import_react.useState)(row.requested_role ?? "customer");
	const [editRole, setEditRole] = (0, import_react.useState)(currentRoles[0] ?? row.requested_role ?? "customer");
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-xl border border-white/10 bg-[#0f172a]/60 p-4 transition-all hover:bg-white/[0.02]",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex flex-wrap items-center gap-3 justify-between mb-4",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap items-center gap-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "font-semibold text-slate-200",
						children: row.full_name ?? "Unnamed user"
					}),
					row.requested_role && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "rounded-full border border-cyan-500/30 bg-cyan-500/10 px-2.5 py-0.5 text-xs capitalize text-cyan-400",
						children: ["requested: ", row.requested_role]
					}),
					kind === "approved" && currentRoles.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2.5 py-0.5 text-xs capitalize text-emerald-400",
						children: ["current: ", currentRoles.join(", ")]
					})
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
				className: "text-xs font-medium text-slate-500",
				children: ["Signed up ", fmtDateTime(row.created_at)]
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "flex flex-wrap items-center justify-between gap-3 bg-black/20 p-3 rounded-lg border border-white/5",
			children: kind === "pending" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "text-xs uppercase tracking-widest text-slate-400 font-bold",
					children: "Assign role"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
					value: role,
					onChange: (e) => setRole(e.target.value),
					className: "h-9 rounded-md border border-white/10 bg-[#0f172a] px-3 text-sm focus:border-cyan-500/50 outline-none text-slate-200",
					children: ROLE_OPTIONS.map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
						value: r,
						className: "bg-[#0f172a]",
						children: r
					}, r))
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					size: "sm",
					disabled: busy,
					onClick: () => decide({
						id: row.id,
						decision: "approved",
						role,
						name: row.full_name
					}),
					className: "shadow-lg transition-transform hover:scale-105 active:scale-95",
					style: {
						background: "var(--gradient-primary)",
						color: "oklch(0.12 0.02 250)"
					},
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(UserCheck, { className: "mr-2 h-4 w-4" }), " Approve"]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					size: "sm",
					variant: "outline",
					disabled: busy,
					className: "border-red-500/30 text-red-400 hover:bg-red-500/10 hover:text-red-300 transition-colors",
					onClick: () => {
						const reason = prompt("Reason for rejection (optional):") ?? void 0;
						decide({
							id: row.id,
							decision: "rejected",
							reason,
							name: row.full_name
						});
					},
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(UserX, { className: "mr-2 h-4 w-4" }), " Reject"]
				})]
			})] }) : kind === "approved" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "text-sm font-medium text-slate-400",
				children: ["Approved ", row.approved_at ? fmtDateTime(row.approved_at) : "—"]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-xs uppercase tracking-widest text-slate-400 font-bold",
						children: "Change role"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
						value: editRole,
						onChange: (e) => setEditRole(e.target.value),
						className: "h-9 rounded-md border border-white/10 bg-[#0f172a] px-3 text-sm focus:border-cyan-500/50 outline-none text-slate-200",
						children: ROLE_OPTIONS.map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: r,
							className: "bg-[#0f172a]",
							children: r
						}, r))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						size: "sm",
						variant: "outline",
						className: "border-white/10 hover:bg-white/10 text-slate-300",
						disabled: changing || currentRoles.length === 1 && currentRoles[0] === editRole,
						onClick: () => onChangeRole({
							id: row.id,
							role: editRole,
							name: row.full_name
						}),
						children: "Update"
					})
				]
			})] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "text-sm font-medium text-slate-400",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "text-red-400 font-semibold",
					children: "Rejected"
				}), row.rejection_reason ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "ml-2 text-slate-500",
					children: ["· ", row.rejection_reason]
				}) : ""]
			})
		})]
	});
}
//#endregion
export { ApprovalsPage as component };
