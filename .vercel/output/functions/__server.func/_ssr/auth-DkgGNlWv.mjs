import { o as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { o as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { t as Button } from "./button-C1KSxKmF.mjs";
import { J as LoaderCircle, ft as Clock, ht as CircleX, r as Wrench } from "../_libs/lucide-react.mjs";
import { b as useNavigate, v as Link, y as Navigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as motion } from "../_libs/framer-motion.mjs";
import { t as Input } from "./input-CCCvLIdb.mjs";
import { i as TabsTrigger, n as TabsContent, r as TabsList, t as Tabs } from "./tabs-BefRq5JO.mjs";
import { i as registerFn, t as loginFn } from "./auth-BcHM1GNH.mjs";
import { t as toast } from "../_libs/sonner.mjs";
import { t as Label } from "./label-BhFXZmyO.mjs";
import { t as useAuth } from "./use-auth-BL2gVulO.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/auth-DkgGNlWv.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var STATUS_KEY = "rk_signup_status";
function AuthPage() {
	const { user, loading } = useAuth();
	useNavigate();
	const [busy, setBusy] = (0, import_react.useState)(false);
	const [email, setEmail] = (0, import_react.useState)("");
	const [password, setPassword] = (0, import_react.useState)("");
	const [fullName, setFullName] = (0, import_react.useState)("");
	const [requestedRole, setRequestedRole] = (0, import_react.useState)("customer");
	const [stored, setStored] = (0, import_react.useState)(null);
	(0, import_react.useEffect)(() => {
		try {
			const raw = localStorage.getItem(STATUS_KEY);
			if (raw) setStored(JSON.parse(raw));
		} catch {}
	}, []);
	if (!loading && user) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Navigate, {
		to: "/dashboard",
		replace: true
	});
	function persistStatus(next) {
		setStored(next);
		if (next) localStorage.setItem(STATUS_KEY, JSON.stringify(next));
		else localStorage.removeItem(STATUS_KEY);
	}
	async function signIn(e) {
		e.preventDefault();
		setBusy(true);
		try {
			await loginFn({ data: {
				email,
				password
			} });
			setBusy(false);
			toast.success("Welcome back");
			window.location.href = "/dashboard";
		} catch (error) {
			setBusy(false);
			return toast.error(error.message || "Invalid credentials");
		}
	}
	async function signUp(e) {
		e.preventDefault();
		setBusy(true);
		try {
			const res = await registerFn({ data: {
				email,
				password,
				fullName,
				requestedRole
			} });
			setBusy(false);
			if (res.status === "approved") {
				persistStatus(null);
				toast.success("Shop admin account created");
				window.location.href = "/dashboard";
				return;
			}
			persistStatus({
				email,
				status: "pending",
				at: (/* @__PURE__ */ new Date()).toISOString()
			});
			toast.success("Account created — waiting for admin approval");
		} catch (error) {
			setBusy(false);
			return toast.error(error.message || "Failed to create account");
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "relative min-h-screen overflow-hidden",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "pointer-events-none absolute inset-0",
			style: { background: "var(--gradient-glow)" }
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
			className: "container relative mx-auto flex min-h-screen max-w-md flex-col justify-center px-6 py-12",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
				to: "/",
				className: "mb-8 flex items-center gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "grid h-9 w-9 place-items-center rounded-lg",
					style: { background: "var(--gradient-primary)" },
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Wrench, { className: "h-5 w-5 text-background" })
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "text-lg font-bold",
					children: "RK Labs"
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
				initial: {
					opacity: 0,
					y: 12
				},
				animate: {
					opacity: 1,
					y: 0
				},
				className: "glass-strong rounded-2xl p-8 shadow-[var(--shadow-glow)]",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "text-2xl font-bold",
						children: "Repair Management System"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 text-sm text-muted-foreground",
						children: "Sign in to your shop dashboard."
					}),
					stored && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: `mt-4 flex items-start gap-3 rounded-xl border p-3 text-sm ${stored.status === "pending" ? "border-amber-500/30 bg-amber-500/10 text-amber-200" : "border-red-500/30 bg-red-500/10 text-red-200"}`,
						children: [
							stored.status === "pending" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock, { className: "mt-0.5 h-4 w-4 shrink-0" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleX, { className: "mt-0.5 h-4 w-4 shrink-0" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex-1",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "font-medium",
									children: stored.status === "pending" ? "Pending admin approval" : "Signup rejected"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "mt-0.5 text-xs opacity-90",
									children: [stored.email, stored.status === "rejected" && stored.reason ? ` · ${stored.reason}` : ""]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								onClick: () => persistStatus(null),
								className: "text-xs underline opacity-70 hover:opacity-100",
								children: "Dismiss"
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Tabs, {
						defaultValue: "signin",
						className: "mt-6",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsList, {
								className: "grid w-full grid-cols-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
									value: "signin",
									children: "Sign in"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
									value: "signup",
									children: "Create account"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
								value: "signin",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
									onSubmit: signIn,
									className: "space-y-4 pt-4",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "space-y-2",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
												htmlFor: "email",
												children: "Email"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
												id: "email",
												type: "email",
												required: true,
												value: email,
												onChange: (e) => setEmail(e.target.value)
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "space-y-2",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
												htmlFor: "pw",
												children: "Password"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
												id: "pw",
												type: "password",
												required: true,
												value: password,
												onChange: (e) => setPassword(e.target.value)
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
											type: "submit",
											disabled: busy,
											className: "w-full",
											style: {
												background: "var(--gradient-primary)",
												color: "oklch(0.12 0.02 250)"
											},
											children: [busy && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "mr-2 h-4 w-4 animate-spin" }), " Sign in"]
										}),
										false
									]
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
								value: "signup",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
									onSubmit: signUp,
									className: "space-y-4 pt-4",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "space-y-2",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
												htmlFor: "name",
												children: "Full name"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
												id: "name",
												required: true,
												value: fullName,
												onChange: (e) => setFullName(e.target.value)
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "space-y-2",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "I am a" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "grid grid-cols-2 gap-2",
												children: ["customer", "employee"].map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
													type: "button",
													onClick: () => setRequestedRole(r),
													className: `rounded-lg border px-3 py-2 text-sm capitalize transition ${requestedRole === r ? "border-[var(--neon)]/60 bg-[var(--neon)]/10 text-[var(--neon)]" : "border-white/10 bg-white/[0.02] text-muted-foreground hover:text-foreground"}`,
													children: r
												}, r))
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "space-y-2",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
												htmlFor: "email2",
												children: "Email"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
												id: "email2",
												type: "email",
												required: true,
												value: email,
												onChange: (e) => setEmail(e.target.value)
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "space-y-2",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
												htmlFor: "pw2",
												children: "Password"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
												id: "pw2",
												type: "password",
												required: true,
												minLength: 8,
												value: password,
												onChange: (e) => setPassword(e.target.value)
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
											type: "submit",
											disabled: busy,
											className: "w-full",
											style: {
												background: "var(--gradient-primary)",
												color: "oklch(0.12 0.02 250)"
											},
											children: [busy && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "mr-2 h-4 w-4 animate-spin" }), " Create account"]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-xs text-muted-foreground",
											children: "New accounts require admin approval before sign-in. The very first account created on this shop becomes the admin."
										})
									]
								})
							})
						]
					})
				]
			})]
		})]
	});
}
//#endregion
export { AuthPage as component };
