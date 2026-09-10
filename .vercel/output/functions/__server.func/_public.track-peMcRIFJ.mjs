import { o as __toESM } from "./_runtime.mjs";
import { u as require_react } from "./_libs/@floating-ui/react-dom+[...].mjs";
import { o as require_jsx_runtime } from "./_libs/@radix-ui/react-collection+[...].mjs";
import { t as Button } from "./_ssr/button-C1KSxKmF.mjs";
import { G as MapPin, K as Mail, M as Phone, Tt as CalendarClock, U as MessageCircle, gt as CircleCheck, mt as Circle, w as Search, wt as CalendarPlus } from "./_libs/lucide-react.mjs";
import { b as useNavigate, x as useSearch } from "./_libs/@tanstack/react-router+[...].mjs";
import { t as Input } from "./_ssr/input-CCCvLIdb.mjs";
import { n as createServerFn } from "./_ssr/server-De111qI3.mjs";
import { t as createSsrRpc } from "./_ssr/createSsrRpc-CtdFS2cZ.mjs";
import { i as inr, n as fmtDate, r as fmtDateTime } from "./_ssr/format-DOFCsm48.mjs";
import { n as googleCalendarUrl, t as downloadIcs } from "./_ssr/calendar-C42Bqs_0.mjs";
import { a as objectType, o as stringType } from "./_libs/zod.mjs";
import { t as useMutation } from "./_libs/tanstack__react-query.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/_public.track-peMcRIFJ.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var schema = objectType({ ticket: stringType().trim().min(1).max(64) });
var trackRepair = createServerFn({ method: "GET" }).validator((data) => schema.parse(data)).handler(createSsrRpc("9c958c320691a0fd08728190f21987e8f9e8edac28cb47d5d3996c735efacf18"));
var STEPS = [
	"received",
	"diagnosed",
	"in_progress",
	"completed",
	"ready_delivery",
	"delivered"
];
var STEP_LABEL = {
	received: "Received",
	diagnosed: "Diagnosed",
	in_progress: "In Progress",
	completed: "Completed",
	ready_delivery: "Ready for delivery",
	delivered: "Delivered"
};
function TrackPage() {
	const { id } = useSearch({ from: "/_public/track" });
	const navigate = useNavigate({ from: "/_public/track" });
	const [ticket, setTicket] = (0, import_react.useState)(id);
	const [result, setResult] = (0, import_react.useState)(null);
	const lookup = useMutation({
		mutationFn: (t) => trackRepair({ data: { ticket: t } }),
		onSuccess: (r) => setResult(r)
	});
	function onSubmit(e) {
		e.preventDefault();
		const t = ticket.trim();
		if (!t) return;
		navigate({
			search: { id: t },
			replace: true
		});
		lookup.mutate(t);
	}
	if (id && !result && !lookup.isPending && !lookup.isError && lookup.status === "idle") lookup.mutate(id);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "w-full pb-20",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
			className: "container mx-auto max-w-3xl px-6 pt-16 md:pt-24 pb-16",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "text-center",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "text-4xl font-black tracking-tight md:text-5xl",
						children: "Track your repair"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-3 text-muted-foreground",
						children: [
							"Enter your ticket ID (e.g. ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-mono text-foreground",
								children: "RK-1001"
							}),
							") to see live status."
						]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
					onSubmit,
					className: "glass mt-8 flex gap-2 rounded-2xl border border-white/10 p-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "relative flex-1",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							autoFocus: true,
							value: ticket,
							onChange: (e) => setTicket(e.target.value),
							placeholder: "RK-1001",
							className: "pl-9 font-mono uppercase"
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						type: "submit",
						disabled: lookup.isPending,
						style: {
							background: "var(--gradient-primary)",
							color: "oklch(0.12 0.02 250)"
						},
						children: lookup.isPending ? "Searching…" : "Track"
					})]
				}),
				lookup.isError && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "glass mt-6 rounded-2xl border border-destructive/30 p-4 text-sm text-destructive",
					children: "Could not look up that ticket. Please try again."
				}),
				result && !result.found && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "glass mt-6 rounded-2xl border border-white/10 p-6 text-center text-muted-foreground",
					children: [
						"No repair found for",
						" ",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "font-mono text-foreground",
							children: ticket.toUpperCase()
						}),
						". Double-check your ticket ID."
					]
				}),
				result && result.found && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResultView, { data: result })
			]
		})
	});
}
function ResultView({ data }) {
	const { repair, customer, notes } = data;
	const currentIdx = STEPS.indexOf(repair.status);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mt-6 space-y-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "glass rounded-2xl border border-white/10 p-6",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-wrap items-center justify-between gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "text-xs uppercase tracking-wider text-muted-foreground",
						children: "Ticket"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "text-2xl font-bold font-mono",
						children: repair.ticket_no
					})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "rounded-full border border-[var(--neon)]/40 bg-[var(--neon)]/10 px-4 py-1.5 text-sm font-semibold text-[var(--neon)]",
						children: STEP_LABEL[repair.status] ?? repair.status
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-6",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mb-3 text-xs uppercase tracking-wider text-muted-foreground",
						children: "Workflow"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
						className: "space-y-2",
						children: STEPS.map((s, i) => {
							const done = currentIdx >= 0 && i <= currentIdx;
							return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
								className: "flex items-center gap-3 text-sm",
								children: [done ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "h-4 w-4 text-[var(--neon)]" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Circle, { className: "h-4 w-4 text-muted-foreground" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: done ? "" : "text-muted-foreground",
									children: STEP_LABEL[s]
								})]
							}, s);
						})
					})]
				})]
			}),
			customer && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "glass rounded-2xl border border-white/10 p-6",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mb-3 text-xs uppercase tracking-wider text-muted-foreground",
						children: "Customer"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "text-lg font-semibold",
						children: customer.name
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-2 grid gap-2 text-sm text-muted-foreground md:grid-cols-2",
						children: [
							customer.phone && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "inline-flex items-center gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Phone, { className: "h-4 w-4" }), customer.phone]
							}),
							customer.whatsapp && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
								href: `https://wa.me/${customer.whatsapp.replace(/\D/g, "")}`,
								target: "_blank",
								rel: "noreferrer",
								className: "inline-flex items-center gap-2 text-[var(--neon)] hover:underline",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MessageCircle, { className: "h-4 w-4" }),
									" ",
									customer.whatsapp
								]
							}),
							customer.email && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "inline-flex items-center gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mail, { className: "h-4 w-4" }), customer.email]
							}),
							customer.address && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "inline-flex items-center gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, { className: "h-4 w-4" }), customer.address]
							})
						]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "glass rounded-2xl border border-white/10 p-6",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mb-3 text-xs uppercase tracking-wider text-muted-foreground",
						children: "Device & Issue"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid gap-3 text-sm md:grid-cols-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Info, {
								label: "Type",
								value: repair.device_type ?? "—"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Info, {
								label: "Brand",
								value: repair.device_brand ?? "—"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Info, {
								label: "Model",
								value: repair.device_model ?? "—"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Info, {
								label: "IMEI / Serial",
								value: repair.imei ?? "—"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Info, {
								label: "Technician",
								value: repair.technician_name ?? "Not assigned"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Info, {
								label: "ETA",
								value: repair.estimated_completion ? fmtDate(repair.estimated_completion) : "—"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Info, {
								label: "Estimated cost",
								value: repair.estimated_cost != null ? inr(repair.estimated_cost) : "—"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Info, {
								label: "Final cost",
								value: repair.final_cost != null ? inr(repair.final_cost) : "—"
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "text-xs uppercase tracking-wider text-muted-foreground",
							children: "Reported issue"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 text-sm",
							children: repair.issue
						})]
					})
				]
			}),
			repair.appointment_at && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppointmentCard, { repair }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "glass rounded-2xl border border-white/10 p-6",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mb-3 text-xs uppercase tracking-wider text-muted-foreground",
					children: "Timeline"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
					className: "space-y-1.5 text-sm text-muted-foreground",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: ["Created — ", fmtDate(repair.created_at)] }),
						repair.appointment_at && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
							className: "text-[var(--neon)]",
							children: ["Appointment scheduled — ", fmtDateTime(repair.appointment_at)]
						}),
						repair.assigned_at && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: ["Assigned — ", fmtDate(repair.assigned_at)] }),
						repair.completed_at && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: ["Completed — ", fmtDate(repair.completed_at)] }),
						repair.delivered_at && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: ["Delivered — ", fmtDate(repair.delivered_at)] })
					]
				})]
			}),
			notes.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "glass rounded-2xl border border-white/10 p-6",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mb-3 text-xs uppercase tracking-wider text-muted-foreground",
					children: "Technician notes"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "space-y-2 text-sm",
					children: notes.map((n) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: "flex items-start gap-2",
						children: [n.task_done ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "mt-0.5 h-4 w-4 text-[var(--neon)]" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Circle, { className: "mt-0.5 h-4 w-4 text-muted-foreground" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: n.task_done ? "line-through text-muted-foreground" : "",
							children: n.note
						}), n.technician_name && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "text-xs text-muted-foreground",
							children: ["— ", n.technician_name]
						})] })]
					}, n.id))
				})]
			})
		]
	});
}
function Info({ label, value }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "text-xs uppercase tracking-wider text-muted-foreground",
		children: label
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "mt-0.5",
		children: value
	})] });
}
function AppointmentCard({ repair }) {
	const start = new Date(repair.appointment_at);
	const device = [repair.device_brand, repair.device_model].filter(Boolean).join(" ") || repair.device_type || "device";
	const ev = {
		title: `RK Repair Labs — ${device} (${repair.ticket_no})`,
		description: `Repair appointment for ${device}. Ticket ${repair.ticket_no}. Issue: ${repair.issue}`,
		start,
		durationMinutes: 45
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "glass rounded-2xl border border-[var(--neon)]/30 bg-[var(--neon)]/5 p-6",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex flex-wrap items-start justify-between gap-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mb-1 inline-flex items-center gap-2 text-xs uppercase tracking-wider text-[var(--neon)]",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CalendarClock, { className: "h-3.5 w-3.5" }), " Your appointment"]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "text-2xl font-bold",
					children: fmtDateTime(repair.appointment_at)
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 text-sm text-muted-foreground",
					children: "Add it to your phone calendar in one click so you don't miss the drop-off slot."
				})
			] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
					href: googleCalendarUrl(ev),
					target: "_blank",
					rel: "noreferrer",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						size: "sm",
						style: {
							background: "var(--gradient-primary)",
							color: "oklch(0.12 0.02 250)"
						},
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CalendarPlus, { className: "mr-2 h-4 w-4" }), " Google Calendar"]
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					size: "sm",
					variant: "outline",
					className: "glass",
					onClick: () => downloadIcs(ev, `${repair.ticket_no}.ics`),
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CalendarPlus, { className: "mr-2 h-4 w-4" }), " Apple / Outlook (.ics)"]
				})]
			})]
		})
	});
}
//#endregion
export { TrackPage as component };
