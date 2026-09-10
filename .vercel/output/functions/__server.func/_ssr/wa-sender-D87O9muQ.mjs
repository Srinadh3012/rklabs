import { o as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { o as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { t as Button } from "./button-C1KSxKmF.mjs";
import { U as MessageCircle, n as X, ut as Copy } from "../_libs/lucide-react.mjs";
import { t as Textarea } from "./textarea-C3L8366G.mjs";
import { n as createServerFn } from "./server-De111qI3.mjs";
import { t as createSsrRpc } from "./createSsrRpc-CtdFS2cZ.mjs";
import { a as objectType, o as stringType, r as enumType } from "../_libs/zod.mjs";
import { i as useQueryClient } from "../_libs/tanstack__react-query.mjs";
import { t as toast } from "../_libs/sonner.mjs";
import { t as Label } from "./label-BhFXZmyO.mjs";
import { a as DialogTitle, i as DialogHeader, n as DialogContent, r as DialogFooter, t as Dialog } from "./dialog-CMoNC1Ou.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/wa-sender-D87O9muQ.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var logWaMessageFn = createServerFn({ method: "POST" }).validator((data) => objectType({
	repair_id: stringType().nullable().optional(),
	invoice_id: stringType().nullable().optional(),
	kind: stringType(),
	recipient_name: stringType().nullable().optional(),
	phone: stringType().nullable().optional(),
	message: stringType(),
	status: enumType([
		"sent",
		"blocked",
		"cancelled",
		"no_phone"
	]),
	error: stringType().nullable().optional()
}).parse(data)).handler(createSsrRpc("258500584c885e8d733927ef29a4a10f364b3b72225dbc95b2d5e65927b7a8ff"));
createServerFn({ method: "GET" }).validator((data) => objectType({
	repair_id: stringType().optional(),
	invoice_id: stringType().optional()
}).parse(data)).handler(createSsrRpc("fdd9416b9d14291d72b2884853ac4004a6ac7c1d01f1352ba3d1e30028f89a13"));
var WaCtx = (0, import_react.createContext)(null);
function useWaSender() {
	const c = (0, import_react.useContext)(WaCtx);
	if (!c) throw new Error("WaSenderProvider missing");
	return c;
}
async function insertLog(req, status, error) {
	try {
		await logWaMessageFn({ data: {
			repair_id: req.repairId ?? null,
			invoice_id: req.invoiceId ?? null,
			kind: req.kind,
			recipient_name: req.recipientName ?? null,
			phone: req.phone ?? null,
			message: req.message,
			status,
			error: error ?? null
		} });
	} catch {}
}
function WaSenderProvider({ children }) {
	const qc = useQueryClient();
	const [req, setReq] = (0, import_react.useState)(null);
	const [text, setText] = (0, import_react.useState)("");
	const send = (0, import_react.useCallback)((r) => {
		setReq(r);
		setText(r.message);
	}, []);
	function close() {
		setReq(null);
		setText("");
	}
	function refreshLogs() {
		if (req?.repairId) qc.invalidateQueries({ queryKey: ["wa-logs", req.repairId] });
		if (req?.invoiceId) qc.invalidateQueries({ queryKey: ["wa-logs-invoice", req.invoiceId] });
	}
	async function openNow() {
		if (!req) return;
		const finalReq = {
			...req,
			message: text
		};
		if (!finalReq.phone) {
			await insertLog(finalReq, "no_phone", "No WhatsApp number for recipient");
			toast.error("No WhatsApp number for this recipient");
			refreshLogs();
			close();
			return;
		}
		const digits = finalReq.phone.replace(/\D/g, "");
		const url = `https://web.whatsapp.com/send?phone=${digits}&text=${encodeURIComponent(finalReq.message)}`;
		const fallbackUrl = `https://wa.me/${digits}?text=${encodeURIComponent(finalReq.message)}`;
		if (window.open(url, "_blank", "noopener")) {
			await insertLog(finalReq, "sent");
			toast.success(`WhatsApp opened for ${finalReq.recipientName ?? digits}`, {
				description: "If WhatsApp Web doesn't load, try the fallback link.",
				action: {
					label: "Try wa.me",
					onClick: () => window.open(fallbackUrl, "_blank", "noopener")
				},
				duration: 8e3
			});
		} else {
			await insertLog(finalReq, "blocked", "Popup blocked");
			toast.error("WhatsApp blocked by browser", {
				description: "Allow popups for this site, or copy the message and send manually.",
				action: {
					label: "Retry",
					onClick: () => window.open(url, "_blank", "noopener")
				},
				duration: 15e3
			});
		}
		refreshLogs();
		close();
	}
	async function cancel() {
		if (req) {
			await insertLog({
				...req,
				message: text
			}, "cancelled");
			refreshLogs();
		}
		close();
	}
	async function copyMsg() {
		try {
			await navigator.clipboard.writeText(text);
			toast.success("Message copied");
		} catch {
			toast.error("Copy failed");
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(WaCtx.Provider, {
		value: { send },
		children: [children, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
			open: !!req,
			onOpenChange: (v) => {
				if (!v) cancel();
			},
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
				className: "glass-strong max-w-lg",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogTitle, {
						className: "flex items-center gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MessageCircle, { className: "h-5 w-5 text-[var(--neon)]" }), req?.title ?? "Preview WhatsApp message"]
					}) }),
					req && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid grid-cols-2 gap-3 text-xs",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "glass rounded-lg p-3",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "uppercase tracking-wider text-muted-foreground",
										children: "Recipient"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "mt-1 font-semibold",
										children: req.recipientName ?? "—"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "text-muted-foreground",
										children: req.phone ?? "No number on file"
									})
								]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "glass rounded-lg p-3",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "uppercase tracking-wider text-muted-foreground",
										children: "Type"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "mt-1 font-semibold capitalize",
										children: req.kind.replace(/_/g, " ")
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "text-muted-foreground",
										children: "Logged on ticket / invoice"
									})
								]
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-1.5",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Label, {
									className: "flex items-center justify-between",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Message preview (editable)" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
										type: "button",
										onClick: copyMsg,
										className: "inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Copy, { className: "h-3 w-3" }), " Copy"]
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
									value: text,
									onChange: (e) => setText(e.target.value),
									rows: 10,
									className: "font-mono text-xs leading-relaxed"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "text-[11px] text-muted-foreground",
									children: "Verify greeting, ticket number and amounts before opening WhatsApp."
								})
							]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogFooter, {
						className: "gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							variant: "outline",
							onClick: cancel,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "mr-2 h-4 w-4" }), " Cancel"]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							onClick: openNow,
							disabled: !req?.phone,
							style: {
								background: "var(--gradient-primary)",
								color: "oklch(0.12 0.02 250)"
							},
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MessageCircle, { className: "mr-2 h-4 w-4" }), " Open WhatsApp"]
						})]
					})
				]
			})
		})]
	});
}
//#endregion
export { useWaSender as n, WaSenderProvider as t };
