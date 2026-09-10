import { o as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { o as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { n as cn, t as Button } from "./button-C1KSxKmF.mjs";
import { D as Receipt, Dt as Boxes, Et as Calculator, F as PanelLeftClose, J as LoaderCircle, Ot as Bell, P as PanelLeftOpen, R as Moon, S as Settings, W as Menu, Y as LayoutDashboard, _ as Sun, a as Users, gt as CircleCheck, ht as CircleX, l as UserCheck, q as LogOut, r as Wrench, u as Truck, xt as ChartColumn } from "../_libs/lucide-react.mjs";
import { n as SheetContent, r as SheetTrigger, t as Sheet } from "./sheet-CEMjYtmP.mjs";
import { b as useNavigate, d as useRouterState, m as Outlet, v as Link, y as Navigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as createServerFn } from "./server-De111qI3.mjs";
import { t as createSsrRpc } from "./createSsrRpc-CtdFS2cZ.mjs";
import { r as fmtDateTime } from "./format-DOFCsm48.mjs";
import { n as arrayType, o as stringType } from "../_libs/zod.mjs";
import { i as useQueryClient, n as useQuery } from "../_libs/tanstack__react-query.mjs";
import { n as logoutFn, r as meFn } from "./auth-BcHM1GNH.mjs";
import { t as useAuth } from "./use-auth-BL2gVulO.mjs";
import { t as WaSenderProvider } from "./wa-sender-D87O9muQ.mjs";
import { i as Trigger, n as Portal, r as Root2, t as Content2 } from "../_libs/@radix-ui/react-popover+[...].mjs";
import { n as useTheme } from "./router-BWK9T6k8.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/route-4OaCtdAT.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var Popover = Root2;
var PopoverTrigger = Trigger;
var PopoverContent = import_react.forwardRef(({ className, align = "center", sideOffset = 4, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Portal, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Content2, {
	ref,
	align,
	sideOffset,
	className: cn("z-50 w-72 rounded-md border bg-popover p-4 text-popover-foreground shadow-md outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 origin-(--radix-popover-content-transform-origin)", className),
	...props
}) }));
PopoverContent.displayName = Content2.displayName;
var getNotificationsFn = createServerFn({ method: "GET" }).handler(createSsrRpc("77e87866966d716d1b130a85926181257409646ca911c2453e8049e870b251ef"));
var markNotificationsReadFn = createServerFn({ method: "POST" }).validator((data) => arrayType(stringType()).parse(data)).handler(createSsrRpc("4b64d1190dd2be37b7f0d71a5f30e20b82aa2de056595720b22ac547c77a748c"));
var NAV = [
	{
		to: "/dashboard",
		label: "Dashboard",
		icon: LayoutDashboard
	},
	{
		to: "/customers",
		label: "Customers",
		icon: Users
	},
	{
		to: "/repairs",
		label: "Repairs",
		icon: Wrench
	},
	{
		to: "/inventory",
		label: "Inventory",
		icon: Boxes
	},
	{
		to: "/suppliers",
		label: "Suppliers",
		icon: Truck
	},
	{
		to: "/billing",
		label: "Billing",
		icon: Receipt
	},
	{
		to: "/reports",
		label: "Reports",
		icon: ChartColumn
	},
	{
		to: "/pnl",
		label: "Profit & Loss",
		icon: Calculator
	},
	{
		to: "/approvals",
		label: "Approvals",
		icon: UserCheck,
		adminOnly: true
	},
	{
		to: "/settings",
		label: "Settings",
		icon: Settings
	}
];
function NavLinks({ onClick, collapsed }) {
	const path = useRouterState({ select: (s) => s.location.pathname });
	const [isAdmin, setIsAdmin] = (0, import_react.useState)(false);
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
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
		className: cn("flex flex-col gap-1 p-3", collapsed ? "items-center" : ""),
		children: NAV.filter((n) => !("adminOnly" in n && n.adminOnly) || isAdmin).map((item) => {
			const active = path.startsWith(item.to);
			return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
				to: item.to,
				onClick,
				title: collapsed ? item.label : void 0,
				className: cn("flex items-center gap-3 rounded-lg py-2.5 text-sm transition-all", collapsed ? "justify-center px-0 w-10 h-10" : "px-3", active ? "bg-cyan-500/10 text-cyan-400 shadow-[inset_0_0_0_1px_rgba(34,211,238,0.2)]" : "text-slate-400 hover:bg-white/5 hover:text-slate-100"),
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(item.icon, { className: cn("shrink-0", collapsed ? "h-5 w-5" : "h-4 w-4", active && "text-cyan-400") }), !collapsed && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: item.label })]
			}, item.to);
		})
	});
}
function SidebarBrand({ collapsed }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
		to: "/dashboard",
		className: cn("flex items-center border-b border-white/5 py-5", collapsed ? "justify-center px-2" : "gap-3 px-5"),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
			src: "/logo.png",
			alt: "RK Repair Labs",
			className: cn("rounded-lg object-contain bg-white/5 p-0.5 shrink-0", collapsed ? "h-8 w-8" : "h-10 w-10")
		}), !collapsed && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "min-w-0",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "text-sm font-bold tracking-tight text-slate-100 truncate",
				children: "RK Repair Labs"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "text-[10px] uppercase tracking-wider text-cyan-500 font-semibold",
				children: "Repair System"
			})]
		})]
	});
}
function AppLayout({ children }) {
	const navigate = useNavigate();
	const [open, setOpen] = (0, import_react.useState)(false);
	const [collapsed, setCollapsed] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		if (localStorage.getItem("rk-sidebar-collapsed") === "true") setCollapsed(true);
	}, []);
	function toggleSidebar() {
		const next = !collapsed;
		setCollapsed(next);
		localStorage.setItem("rk-sidebar-collapsed", String(next));
	}
	async function signOut() {
		await logoutFn();
		navigate({
			to: "/auth",
			replace: true
		});
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(WaSenderProvider, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex h-screen overflow-hidden bg-[#020617] text-slate-200 selection:bg-cyan-500/30",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
			className: cn("hidden shrink-0 flex-col border-r border-white/10 bg-[#0f172a]/95 backdrop-blur-md md:flex transition-all duration-300 ease-in-out h-full", collapsed ? "w-[72px]" : "w-64"),
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SidebarBrand, { collapsed }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex-1 overflow-y-auto overflow-x-hidden custom-scrollbar",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NavLinks, { collapsed })
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "shrink-0 border-t border-white/10 p-3 flex flex-col gap-2 mt-auto",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						variant: "ghost",
						className: cn("justify-start gap-2 text-slate-400 hover:text-slate-100", collapsed ? "px-0 justify-center h-10 w-10 mx-auto" : "w-full"),
						onClick: signOut,
						title: collapsed ? "Sign out" : void 0,
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LogOut, { className: cn("shrink-0", collapsed ? "h-5 w-5" : "h-4 w-4") }),
							" ",
							!collapsed && "Sign out"
						]
					})
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex min-w-0 flex-1 flex-col h-full overflow-hidden",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "shrink-0 flex h-14 items-center gap-2 border-b border-white/10 bg-[#0f172a]/80 backdrop-blur-md px-3 sm:px-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Sheet, {
						open,
						onOpenChange: setOpen,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SheetTrigger, {
							asChild: true,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								variant: "ghost",
								size: "icon",
								className: "md:hidden text-slate-300 hover:text-white",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Menu, { className: "h-5 w-5" })
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SheetContent, {
							side: "left",
							className: "w-72 border-r border-white/10 bg-[#0f172a] p-0 flex flex-col h-full",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SidebarBrand, {}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "flex-1 overflow-y-auto",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NavLinks, { onClick: () => setOpen(false) })
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "shrink-0 border-t border-white/10 p-3 mt-auto",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
										variant: "ghost",
										className: "w-full justify-start gap-2 text-slate-400 hover:text-slate-100",
										onClick: signOut,
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LogOut, { className: "h-4 w-4 shrink-0" }), " Sign out"]
									})
								})
							]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "ghost",
						size: "icon",
						className: "hidden md:flex text-slate-400 hover:text-slate-100",
						onClick: toggleSidebar,
						title: collapsed ? "Expand sidebar" : "Collapse sidebar",
						children: collapsed ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PanelLeftOpen, { className: "h-5 w-5" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PanelLeftClose, { className: "h-5 w-5" })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "flex-1" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ThemeToggle, {}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(NotificationsBell, {}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "ghost",
						size: "icon",
						className: "md:hidden",
						onClick: signOut,
						"aria-label": "Sign out",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LogOut, { className: "h-5 w-5" })
					})
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
				className: "flex-1 overflow-y-auto p-3 sm:p-4 md:p-6 lg:p-8 custom-scrollbar",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mx-auto w-full max-w-[1400px]",
					children
				})
			})]
		})]
	}) });
}
function ThemeToggle() {
	const { theme, toggle } = useTheme();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
		variant: "ghost",
		size: "icon",
		onClick: toggle,
		"aria-label": "Toggle theme",
		title: `Switch to ${theme === "dark" ? "light" : "dark"} mode`,
		children: theme === "dark" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sun, { className: "h-5 w-5" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Moon, { className: "h-5 w-5" })
	});
}
function NotificationsBell() {
	const qc = useQueryClient();
	const { data } = useQuery({
		queryKey: ["notifications"],
		queryFn: async () => {
			try {
				return await getNotificationsFn();
			} catch (e) {
				return [];
			}
		},
		refetchInterval: 3e4
	});
	const items = data ?? [];
	const unread = items.filter((n) => !n.read_at).length;
	async function markAllRead() {
		const ids = items.filter((n) => !n.read_at).map((n) => n.id);
		if (ids.length === 0) return;
		await markNotificationsReadFn({ data: ids });
		qc.invalidateQueries({ queryKey: ["notifications"] });
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Popover, {
		onOpenChange: (o) => {
			if (!o) markAllRead();
		},
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PopoverTrigger, {
			asChild: true,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
				variant: "ghost",
				size: "icon",
				className: "relative",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bell, { className: "h-5 w-5" }), unread > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "absolute right-1.5 top-1.5 grid h-4 min-w-4 place-items-center rounded-full bg-[var(--neon)] px-1 text-[10px] font-bold text-background",
					children: unread
				})]
			})
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(PopoverContent, {
			align: "end",
			className: "w-80 p-0",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center justify-between border-b border-white/5 px-4 py-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "text-sm font-semibold",
					children: "Notifications"
				}), unread > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					onClick: markAllRead,
					className: "text-xs text-muted-foreground hover:text-foreground",
					children: "Mark all read"
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "max-h-96 overflow-y-auto",
				children: items.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "p-6 text-center text-xs text-muted-foreground",
					children: "No notifications yet."
				}) : items.map((n) => {
					const isApproved = n.kind.startsWith("approval_approved");
					const isRejected = n.kind.startsWith("approval_rejected");
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: cn("flex gap-3 border-b border-white/5 px-4 py-3 last:border-0", !n.read_at && "bg-white/[0.03]"),
						children: [isApproved ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "mt-0.5 h-4 w-4 shrink-0 text-[var(--neon)]" }) : isRejected ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleX, { className: "mt-0.5 h-4 w-4 shrink-0 text-red-400" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bell, { className: "mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "min-w-0 flex-1",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "text-sm font-medium",
									children: n.title
								}),
								n.body && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "mt-0.5 text-xs text-muted-foreground",
									children: n.body
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "mt-1 text-[10px] uppercase tracking-wider text-muted-foreground",
									children: fmtDateTime(n.created_at)
								})
							]
						})]
					}, n.id);
				})
			})]
		})]
	});
}
function AuthGate() {
	const { user, loading } = useAuth();
	if (loading) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "grid min-h-screen place-items-center",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "h-6 w-6 animate-spin text-muted-foreground" })
	});
	if (!user) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Navigate, {
		to: "/auth",
		replace: true
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppLayout, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {}) });
}
//#endregion
export { AuthGate as component };
