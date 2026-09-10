import { o as __toESM } from "./_runtime.mjs";
import { u as require_react } from "./_libs/@floating-ui/react-dom+[...].mjs";
import { o as require_jsx_runtime } from "./_libs/@radix-ui/react-collection+[...].mjs";
import { n as cn, t as Button } from "./_ssr/button-C1KSxKmF.mjs";
import { G as MapPin, K as Mail, M as Phone, U as MessageCircle, W as Menu, ft as Clock, gt as CircleCheck, vt as ChevronRight } from "./_libs/lucide-react.mjs";
import { n as SheetContent, r as SheetTrigger, t as Sheet } from "./_ssr/sheet-CEMjYtmP.mjs";
import { d as useRouterState, m as Outlet, v as Link } from "./_libs/@tanstack/react-router+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/_public-Brd3hjIz.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var NAV_LINKS = [
	{
		to: "/",
		label: "Home"
	},
	{
		to: "/services",
		label: "Services"
	},
	{
		to: "/about",
		label: "About"
	},
	{
		to: "/contact",
		label: "Contact"
	}
];
function PublicHeader() {
	const path = useRouterState({ select: (s) => s.location.pathname });
	const [open, setOpen] = (0, import_react.useState)(false);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("header", {
		className: "sticky top-0 z-50 w-full border-b border-white/5 bg-[#020617]/80 backdrop-blur-xl",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "container mx-auto flex h-16 md:h-20 items-center justify-between px-4 sm:px-6",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/",
					className: "flex items-center gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: "/logo.png",
						alt: "RK Repair Labs",
						className: "h-10 w-10 md:h-12 md:w-12 rounded-full border border-white/10 bg-white/5"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "hidden sm:block",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "text-base md:text-lg font-bold tracking-tight text-white leading-none",
							children: "RK Repair Labs"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "text-[10px] md:text-xs uppercase tracking-widest text-cyan-400 font-semibold mt-1",
							children: "Repair System"
						})]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
					className: "hidden lg:flex items-center gap-8",
					children: NAV_LINKS.map((link) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: link.to,
						className: cn("text-sm font-semibold transition-colors hover:text-cyan-400 relative py-2", path === link.to ? "text-cyan-400" : "text-slate-300"),
						children: [link.label, path === link.to && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "absolute -bottom-[21px] left-0 right-0 h-0.5 bg-cyan-400 rounded-t-full shadow-[0_0_10px_rgba(34,211,238,0.5)]" })]
					}, link.to))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2 md:gap-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/track",
							className: "hidden sm:inline-flex",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								variant: "ghost",
								className: "text-slate-300 hover:text-white font-semibold",
								children: "Track Repair"
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/auth",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								className: "shadow-[var(--shadow-neon)] transition-transform hover:-translate-y-0.5 bg-[var(--neon)] text-black font-bold",
								children: "Sign In"
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Sheet, {
							open,
							onOpenChange: setOpen,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SheetTrigger, {
								asChild: true,
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									variant: "ghost",
									size: "icon",
									className: "lg:hidden text-slate-300 hover:text-white",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Menu, { className: "h-6 w-6" })
								})
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SheetContent, {
								side: "right",
								className: "w-full sm:w-80 border-l border-white/10 bg-[#0f172a] p-0 flex flex-col h-full",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "p-6 border-b border-white/5 flex items-center gap-3",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
										src: "/logo.png",
										alt: "RK Repair Labs",
										className: "h-10 w-10 rounded-full"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "text-lg font-bold text-white",
										children: "RK Repair Labs"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "text-xs uppercase text-cyan-400",
										children: "Repair System"
									})] })]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex-1 overflow-y-auto py-6 px-4 flex flex-col gap-2",
									children: [NAV_LINKS.map((link) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
										to: link.to,
										onClick: () => setOpen(false),
										className: cn("flex items-center justify-between p-4 rounded-xl text-base font-semibold transition-all", path === link.to ? "bg-cyan-500/10 text-cyan-400" : "text-slate-300 hover:bg-white/5"),
										children: [link.label, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { className: "h-4 w-4 opacity-50" })]
									}, link.to)), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
										to: "/track",
										onClick: () => setOpen(false),
										className: "flex items-center justify-between p-4 rounded-xl text-base font-semibold text-slate-300 hover:bg-white/5 transition-all mt-4 border border-white/10",
										children: ["Track Repair", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { className: "h-4 w-4 opacity-50" })]
									})]
								})]
							})]
						})
					]
				})
			]
		})
	});
}
function PublicFooter() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("footer", {
		className: "border-t border-white/5 bg-[#0f172a] pt-16 pb-8",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "container mx-auto px-6",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-6",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
								to: "/",
								className: "flex items-center gap-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
									src: "/logo.png",
									alt: "RK Repair Labs",
									className: "h-12 w-12 rounded-full border border-white/10 bg-white/5"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "text-xl font-bold tracking-tight text-white leading-none",
									children: "RK Repair Labs"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "text-xs uppercase tracking-widest text-cyan-400 font-semibold mt-1",
									children: "Repair System"
								})] })]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-slate-400 text-sm leading-relaxed",
								children: "Expert laptop and mobile repair services in Guntur. 11+ years of experience in chip-level repairs, screen replacement, and software solutions."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "flex items-center gap-4",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
									href: "https://wa.me/919666984949",
									target: "_blank",
									rel: "noopener noreferrer",
									className: "flex h-10 w-10 items-center justify-center rounded-full bg-white/5 text-slate-300 hover:bg-[#25D366] hover:text-white transition-all",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MessageCircle, { className: "h-5 w-5" })
								})
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "text-lg font-bold text-white mb-6",
						children: "Quick Links"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "space-y-4",
						children: NAV_LINKS.map((link) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: link.to,
							className: "text-slate-400 hover:text-cyan-400 transition-colors text-sm font-medium flex items-center gap-2",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { className: "h-3 w-3" }),
								" ",
								link.label
							]
						}) }, link.to))
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "text-lg font-bold text-white mb-6",
						children: "Our Services"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
						className: "space-y-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
								className: "text-slate-400 text-sm font-medium flex items-center gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "h-4 w-4 text-cyan-500" }), " Laptop Chip-Level Repair"]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
								className: "text-slate-400 text-sm font-medium flex items-center gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "h-4 w-4 text-cyan-500" }), " iPhone & Mobile Repair"]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
								className: "text-slate-400 text-sm font-medium flex items-center gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "h-4 w-4 text-cyan-500" }), " Screen Replacement"]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
								className: "text-slate-400 text-sm font-medium flex items-center gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "h-4 w-4 text-cyan-500" }), " Dead Condition Recovery"]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
								className: "text-slate-400 text-sm font-medium flex items-center gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "h-4 w-4 text-cyan-500" }), " Software Solutions"]
							})
						]
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "text-lg font-bold text-white mb-6",
						children: "Contact Us"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
						className: "space-y-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
								className: "flex items-start gap-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, { className: "h-5 w-5 text-cyan-500 shrink-0 mt-0.5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-slate-400 text-sm leading-relaxed",
									children: "Shop No 5, Sri Srinivasa Complex, Opp. R.T.C Bus Stand, Guntur, AP"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
								className: "flex items-center gap-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Phone, { className: "h-5 w-5 text-cyan-500 shrink-0" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
									href: "tel:+919666984949",
									className: "text-slate-400 hover:text-white text-sm font-medium",
									children: "+91 96669 84949"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
								className: "flex items-center gap-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mail, { className: "h-5 w-5 text-cyan-500 shrink-0" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
									href: "mailto:info@rkrepairlabs.com",
									className: "text-slate-400 hover:text-white text-sm font-medium",
									children: "info@rkrepairlabs.com"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
								className: "flex items-center gap-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock, { className: "h-5 w-5 text-cyan-500 shrink-0" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-slate-400 text-sm",
									children: "Mon - Sat: 10:00 AM - 8:30 PM"
								})]
							})
						]
					})] })
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "border-t border-white/5 pt-8 flex flex-col md:flex-row items-center justify-between gap-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "text-slate-500 text-xs text-center md:text-left",
					children: [
						"© ",
						(/* @__PURE__ */ new Date()).getFullYear(),
						" RK Repair Labs. All rights reserved."
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-6",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/track",
						className: "text-slate-500 hover:text-slate-300 text-xs font-medium transition-colors",
						children: "Track Repair"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/auth",
						className: "text-slate-500 hover:text-slate-300 text-xs font-medium transition-colors",
						children: "Admin Sign In"
					})]
				})]
			})]
		})
	});
}
function PublicLayout({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen flex flex-col bg-[#020617] text-slate-200 selection:bg-cyan-500/30 font-sans",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PublicHeader, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
				className: "flex-1 w-full flex flex-col",
				children
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PublicFooter, {})
		]
	});
}
function PublicLayoutWrapper() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PublicLayout, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {}) });
}
//#endregion
export { PublicLayoutWrapper as component };
