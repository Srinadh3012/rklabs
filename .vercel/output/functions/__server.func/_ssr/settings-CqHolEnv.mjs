import { o as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { o as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { n as cn, t as Button } from "./button-C1KSxKmF.mjs";
import { J as LoaderCircle, dt as CloudUpload, n as X } from "../_libs/lucide-react.mjs";
import { t as Input } from "./input-CCCvLIdb.mjs";
import { t as Textarea } from "./textarea-C3L8366G.mjs";
import { i as useQueryClient, n as useQuery, t as useMutation } from "../_libs/tanstack__react-query.mjs";
import { t as toast } from "../_libs/sonner.mjs";
import { t as Label } from "./label-BhFXZmyO.mjs";
import { n as updateProfileFn, t as getProfileFn } from "./settings-RVr-3c2S.mjs";
import { n as SwitchThumb, t as Switch$1 } from "../_libs/radix-ui__react-switch.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/settings-CqHolEnv.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var Switch = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Switch$1, {
	className: cn("peer inline-flex h-5 w-9 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=unchecked]:bg-input", className),
	...props,
	ref,
	children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SwitchThumb, { className: cn("pointer-events-none block h-4 w-4 rounded-full bg-background shadow-lg ring-0 transition-transform data-[state=checked]:translate-x-4 data-[state=unchecked]:translate-x-0") })
}));
Switch.displayName = Switch$1.displayName;
function FileUpload({ onUploadSuccess, accept = "image/*", maxSizeMB = 5, label = "Upload File" }) {
	const [progress, setProgress] = (0, import_react.useState)(0);
	const [isUploading, setIsUploading] = (0, import_react.useState)(false);
	const fileInputRef = (0, import_react.useRef)(null);
	const handleFileChange = async (e) => {
		const file = e.target.files?.[0];
		if (!file) return;
		if (file.size > maxSizeMB * 1024 * 1024) {
			toast.error(`File size must be less than ${maxSizeMB}MB`);
			return;
		}
		setIsUploading(true);
		setProgress(0);
		const totalTime = 1500;
		const intervalTime = 50;
		const steps = totalTime / intervalTime;
		let currentStep = 0;
		const timer = setInterval(() => {
			currentStep++;
			setProgress(currentStep / steps * 100);
			if (currentStep >= steps) {
				clearInterval(timer);
				onUploadSuccess(URL.createObjectURL(file));
				setIsUploading(false);
				toast.success("File uploaded successfully (Mock)");
			}
		}, intervalTime);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-4 w-full",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-center gap-4",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
				type: "file",
				ref: fileInputRef,
				className: "hidden",
				accept,
				onChange: handleFileChange
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
				type: "button",
				variant: "outline",
				onClick: () => fileInputRef.current?.click(),
				disabled: isUploading,
				className: "w-full flex gap-2 items-center justify-center py-6 border-dashed border-white/20 bg-black/20 hover:bg-white/5 text-slate-300",
				children: [isUploading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "h-5 w-5 animate-spin text-[var(--neon)]" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CloudUpload, { className: "h-5 w-5 text-[var(--neon)]" }), isUploading ? `Uploading... ${Math.round(progress)}%` : label]
			})]
		}), isUploading && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "w-full bg-slate-800 rounded-full h-1.5 overflow-hidden",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "bg-[var(--neon)] h-1.5 transition-all duration-300 ease-out",
				style: { width: `${progress}%` }
			})
		})]
	});
}
var DEFAULT_TEMPLATES = {
	received: "Hi {name}, we have received your {device} for repair. Ticket: {ticket}. — {shop}",
	in_progress: "Hi {name}, work has started on your {device} (Ticket {ticket}). We will update you soon. — {shop}",
	ready_delivery: "Hi {name}, your {device} (Ticket {ticket}) is ready for delivery. Please visit us. — {shop}",
	delivered: "Hi {name}, thanks for choosing {shop}. Your {device} (Ticket {ticket}) is delivered. We appreciate a review!",
	payment_reminder: "Hi {name}, gentle reminder: invoice {invoice_no} of {amount} is pending. — {shop}",
	invoice: "Hi {name}, your invoice {invoice_no} of {amount} from {shop}. Download: {link}"
};
var TEMPLATE_LABELS = {
	received: "Repair received",
	in_progress: "Work in progress",
	ready_delivery: "Ready for delivery",
	delivered: "Delivered (review request)",
	payment_reminder: "Payment reminder",
	invoice: "Invoice delivery"
};
function SettingsPage() {
	const qc = useQueryClient();
	const { data: profile, isLoading } = useQuery({
		queryKey: ["profile"],
		queryFn: async () => {
			try {
				return await getProfileFn();
			} catch (e) {
				return null;
			}
		}
	});
	const [templates, setTemplates] = (0, import_react.useState)(DEFAULT_TEMPLATES);
	const [autoReminders, setAutoReminders] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		if (profile?.wa_templates) setTemplates({
			...DEFAULT_TEMPLATES,
			...profile.wa_templates
		});
		if (profile?.auto_reminders != null) setAutoReminders(profile.auto_reminders);
	}, [profile]);
	const saveShop = useMutation({
		mutationFn: async (form) => {
			await updateProfileFn({ data: form });
		},
		onSuccess: () => {
			toast.success("Saved");
			qc.invalidateQueries({ queryKey: ["profile"] });
		},
		onError: (e) => toast.error(e.message)
	});
	const saveTemplates = useMutation({
		mutationFn: async () => {
			await updateProfileFn({ data: {
				wa_templates: templates,
				auto_reminders: autoReminders
			} });
		},
		onSuccess: () => {
			toast.success("WhatsApp templates saved");
			qc.invalidateQueries({ queryKey: ["profile"] });
		},
		onError: (e) => toast.error(e.message)
	});
	function onShopSubmit(e) {
		e.preventDefault();
		const fd = new FormData(e.currentTarget);
		saveShop.mutate({
			full_name: String(fd.get("full_name") || ""),
			shop_name: String(fd.get("shop_name") || ""),
			shop_address: String(fd.get("shop_address") || ""),
			shop_phone: String(fd.get("shop_phone") || ""),
			gst_number: String(fd.get("gst_number") || ""),
			gst_percent: Number(fd.get("gst_percent") || 18)
		});
	}
	if (isLoading) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "text-slate-500",
		children: "Loading…"
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-4xl space-y-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "border-b border-white/10 pb-6",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-3xl font-bold tracking-tight",
					children: "Settings"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1.5 text-sm text-slate-400",
					children: "Shop details, WhatsApp templates, and reminder automation."
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				onSubmit: onShopSubmit,
				className: "rounded-2xl border border-white/10 bg-[#0f172a]/80 backdrop-blur-xl p-6 shadow-lg space-y-6",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "text-lg font-bold tracking-tight text-slate-200",
						children: "Shop details"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid grid-cols-2 gap-5",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(F, {
								label: "Your name",
								name: "full_name",
								defaultValue: profile?.full_name ?? ""
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(F, {
								label: "Shop name",
								name: "shop_name",
								defaultValue: profile?.shop_name ?? "RK Labs"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(F, {
								label: "Shop phone",
								name: "shop_phone",
								defaultValue: profile?.shop_phone ?? ""
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(F, {
								label: "GSTIN",
								name: "gst_number",
								defaultValue: profile?.gst_number ?? ""
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(F, {
								label: "Default GST %",
								name: "gst_percent",
								type: "number",
								step: "0.01",
								defaultValue: profile?.gst_percent ?? 18
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(F, {
						label: "Shop address",
						name: "shop_address",
						defaultValue: profile?.shop_address ?? ""
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
								className: "text-sm font-medium text-slate-300",
								children: "Shop Logo"
							}),
							profile?.shop_logo && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mb-4 relative w-32 h-32 rounded-lg border border-white/10 overflow-hidden bg-white/5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
									src: profile.shop_logo,
									alt: "Shop Logo",
									className: "object-contain w-full h-full"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									onClick: () => saveShop.mutate({ shop_logo: "" }),
									className: "absolute top-1 right-1 bg-red-500/80 p-1 rounded hover:bg-red-500 transition",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "w-3 h-3 text-white" })
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileUpload, {
								label: profile?.shop_logo ? "Change Logo" : "Upload Logo",
								folder: "logos",
								onUploadSuccess: (url) => {
									saveShop.mutate({ shop_logo: url });
								}
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs text-slate-400",
								children: "Used on invoice PDFs."
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex justify-end pt-2",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							type: "submit",
							disabled: saveShop.isPending,
							className: "shadow-lg transition-transform hover:scale-105 active:scale-95",
							style: {
								background: "var(--gradient-primary)",
								color: "oklch(0.12 0.02 250)"
							},
							children: "Save shop"
						})
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "rounded-2xl border border-white/10 bg-[#0f172a]/80 backdrop-blur-xl p-6 shadow-lg space-y-6",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-start justify-between gap-4 border-b border-white/10 pb-5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "text-lg font-bold tracking-tight text-slate-200",
							children: "WhatsApp templates"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-1 text-sm text-slate-400",
							children: [
								"Use placeholders:",
								" ",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("code", {
									className: "rounded bg-black/30 px-1.5 py-0.5 font-mono text-cyan-400",
									children: "{name} {device} {ticket} {shop} {invoice_no} {amount} {link}"
								})
							]
						})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-3 bg-white/5 rounded-lg px-4 py-2 border border-white/5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
								htmlFor: "auto",
								className: "text-sm font-semibold text-slate-300",
								children: "Auto status reminders"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Switch, {
								id: "auto",
								checked: autoReminders,
								onCheckedChange: setAutoReminders,
								className: "data-[state=checked]:bg-cyan-500"
							})]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "grid gap-5",
						children: Object.keys(DEFAULT_TEMPLATES).map((key) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
								className: "text-sm font-semibold uppercase tracking-widest text-slate-400",
								children: TEMPLATE_LABELS[key]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
								rows: 2,
								value: templates[key] ?? "",
								onChange: (e) => setTemplates({
									...templates,
									[key]: e.target.value
								}),
								className: "resize-none bg-black/20 border-white/10 focus:border-cyan-500/50 text-slate-200 placeholder:text-slate-600"
							})]
						}, key))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex justify-between pt-4 border-t border-white/10",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							type: "button",
							variant: "outline",
							className: "border-white/10 bg-white/5 hover:bg-white/10 text-slate-300",
							onClick: () => setTemplates(DEFAULT_TEMPLATES),
							children: "Reset defaults"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							onClick: () => saveTemplates.mutate(),
							disabled: saveTemplates.isPending,
							className: "shadow-lg transition-transform hover:scale-105 active:scale-95",
							style: {
								background: "var(--gradient-primary)",
								color: "oklch(0.12 0.02 250)"
							},
							children: "Save templates"
						})]
					})
				]
			})
		]
	});
}
function F({ label, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-2",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
			className: "text-sm font-medium text-slate-300",
			children: label
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
			...props,
			className: "bg-black/20 border-white/10 focus:border-cyan-500/50 text-slate-200"
		})]
	});
}
//#endregion
export { SettingsPage as component };
