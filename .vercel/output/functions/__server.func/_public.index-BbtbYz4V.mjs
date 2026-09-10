import { o as require_jsx_runtime } from "./_libs/@radix-ui/react-collection+[...].mjs";
import { H as Microscope, M as Phone, X as Laptop, b as Smartphone, gt as CircleCheck, r as Wrench, x as ShieldCheck } from "./_libs/lucide-react.mjs";
import { v as Link } from "./_libs/@tanstack/react-router+[...].mjs";
import { t as motion } from "./_libs/framer-motion.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/_public.index-BbtbYz4V.js
var import_jsx_runtime = require_jsx_runtime();
function PublicHome() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "w-full pb-20",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "relative overflow-hidden pt-16 md:pt-24 lg:pt-32 pb-16 lg:pb-24",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "absolute inset-0 z-0",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute -top-[30%] -right-[10%] w-[70%] h-[70%] rounded-full bg-cyan-500/10 blur-[120px]" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute top-[20%] -left-[10%] w-[50%] h-[50%] rounded-full bg-blue-500/10 blur-[100px]" })]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "container relative z-10 mx-auto px-6",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "max-w-4xl mx-auto text-center space-y-8",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
								initial: {
									opacity: 0,
									y: 20
								},
								animate: {
									opacity: 1,
									y: 0
								},
								transition: { duration: .5 },
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
									className: "text-5xl md:text-7xl font-extrabold tracking-tight text-white mb-4",
									children: [
										"Expert Hands.",
										" ",
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500",
											children: "Trusted Repairs."
										})
									]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-xl md:text-2xl text-slate-300 font-medium max-w-2xl mx-auto",
									children: "Only at RK Repair Labs"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
								initial: {
									opacity: 0,
									y: 20
								},
								animate: {
									opacity: 1,
									y: 0
								},
								transition: {
									duration: .5,
									delay: .1
								},
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-base md:text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed",
									children: "MacBook & iPhone specialists. Skilled professionals with deep knowledge of all major brands and models. Chip-level fixes, screens, batteries, charging, and more."
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
								initial: {
									opacity: 0,
									y: 20
								},
								animate: {
									opacity: 1,
									y: 0
								},
								transition: {
									duration: .5,
									delay: .2
								},
								className: "flex flex-col sm:flex-row items-center justify-center gap-4 pt-4",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
									href: "tel:+919666984949",
									className: "w-full sm:w-auto flex items-center justify-center gap-2 bg-white text-black px-8 py-3.5 rounded-xl font-bold hover:bg-slate-200 transition-colors",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Phone, { className: "h-5 w-5" }), " Call Now"]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
									to: "/track",
									className: "w-full sm:w-auto flex items-center justify-center gap-2 bg-[#1e293b] border border-white/10 text-white px-8 py-3.5 rounded-xl font-semibold hover:bg-white/5 transition-colors",
									children: "Track Repair"
								})]
							})
						]
					})
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				className: "py-20 bg-[#0f172a]/50",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "container mx-auto px-6",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "text-center mb-16",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "text-3xl md:text-4xl font-bold text-white mb-4",
							children: "Why Choose Us"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-1 w-20 bg-cyan-500 mx-auto rounded-full" })]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8",
						children: [
							{
								icon: ShieldCheck,
								title: "Free Diagnosis",
								desc: "No-obligation device checkup & estimate."
							},
							{
								icon: Laptop,
								title: "MacBook & iPhone",
								desc: "Expert in Apple repairs, with genuine quality parts."
							},
							{
								icon: Wrench,
								title: "Any Brand, Any Problem",
								desc: "From broken screens to complex motherboard repairs."
							},
							{
								icon: Microscope,
								title: "Advanced Tools",
								desc: "Chip-level lab, skilled technicians, clean workflow."
							}
						].map((feature, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
							initial: {
								opacity: 0,
								y: 20
							},
							whileInView: {
								opacity: 1,
								y: 0
							},
							viewport: { once: true },
							transition: {
								duration: .5,
								delay: i * .1
							},
							className: "bg-[#1e293b]/50 border border-white/5 rounded-2xl p-8 hover:bg-[#1e293b] transition-colors",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "h-12 w-12 rounded-xl bg-cyan-500/20 flex items-center justify-center mb-6",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(feature.icon, { className: "h-6 w-6 text-cyan-400" })
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
									className: "text-xl font-bold text-white mb-3",
									children: feature.title
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-slate-400 text-sm leading-relaxed",
									children: feature.desc
								})
							]
						}, i))
					})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				className: "py-24",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "container mx-auto px-6",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "text-center mb-16",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "text-3xl md:text-4xl font-bold text-white mb-4",
								children: "Our Expert Services"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-1 w-20 bg-cyan-500 mx-auto rounded-full" })]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid grid-cols-1 lg:grid-cols-3 gap-8",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "bg-gradient-to-b from-[#1e293b] to-[#0f172a] rounded-3xl p-8 border border-white/10 relative overflow-hidden group",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Laptop, { className: "h-32 w-32 text-cyan-400" })
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
											className: "text-2xl font-bold text-white mb-6 relative z-10",
											children: "Laptop Repairs"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
											className: "space-y-4 relative z-10",
											children: [
												"Chip-level repair",
												"Screen replacement",
												"DC jack repairs",
												"Hinges repairs",
												"Dead condition recovery"
											].map((item, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
												className: "flex items-center gap-3 text-slate-300",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "h-5 w-5 text-cyan-500 shrink-0" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: item })]
											}, i))
										})
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "bg-gradient-to-b from-[#1e293b] to-[#0f172a] rounded-3xl p-8 border border-white/10 relative overflow-hidden group",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Smartphone, { className: "h-32 w-32 text-cyan-400" })
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
											className: "text-2xl font-bold text-white mb-6 relative z-10",
											children: "Mobile Repairs"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
											className: "space-y-4 relative z-10",
											children: [
												"Screen & body damages",
												"Slow and hanging issues",
												"Software updates",
												"Battery replacement",
												"Water damage repair"
											].map((item, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
												className: "flex items-center gap-3 text-slate-300",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "h-5 w-5 text-cyan-500 shrink-0" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: item })]
											}, i))
										})
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "bg-gradient-to-b from-[#1e293b] to-[#0f172a] rounded-3xl p-8 border border-white/10 relative overflow-hidden group",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Wrench, { className: "h-32 w-32 text-cyan-400" })
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
											className: "text-2xl font-bold text-white mb-6 relative z-10",
											children: "Accessories & Upgrades"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
											className: "space-y-4 relative z-10",
											children: [
												"Genuine parts",
												"Performance upgrades",
												"Storage solutions",
												"Chargers & cables",
												"Protective cases"
											].map((item, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
												className: "flex items-center gap-3 text-slate-300",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "h-5 w-5 text-cyan-500 shrink-0" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: item })]
											}, i))
										})
									]
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-12 text-center",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
								to: "/services",
								className: "inline-flex items-center gap-2 text-cyan-400 hover:text-cyan-300 font-semibold transition-colors",
								children: ["View all services ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									"aria-hidden": "true",
									children: "→"
								})]
							})
						})
					]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "py-16 bg-[#0f172a]/80 border-y border-white/5 overflow-hidden",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "container mx-auto px-6 mb-8",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-center text-sm font-semibold tracking-widest uppercase text-slate-500",
						children: "Trusted by All Major Brands"
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex w-full overflow-hidden",
					children: [...Array(2)].map((_, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
						className: "flex items-center gap-16 md:gap-24 shrink-0 pr-16 md:pr-24",
						animate: { x: ["0%", "-100%"] },
						transition: {
							repeat: Infinity,
							ease: "linear",
							duration: 25
						},
						children: [
							{
								name: "Apple",
								src: "https://cdn.simpleicons.org/apple/ffffff"
							},
							{
								name: "Dell",
								src: "https://cdn.simpleicons.org/dell/ffffff"
							},
							{
								name: "HP",
								src: "https://cdn.simpleicons.org/hp/ffffff"
							},
							{
								name: "Lenovo",
								src: "https://cdn.simpleicons.org/lenovo/ffffff"
							},
							{
								name: "Acer",
								src: "https://cdn.simpleicons.org/acer/ffffff"
							},
							{
								name: "Asus",
								src: "https://cdn.simpleicons.org/asus/ffffff"
							},
							{
								name: "OnePlus",
								src: "https://cdn.simpleicons.org/oneplus/ffffff"
							},
							{
								name: "Samsung",
								src: "https://cdn.simpleicons.org/samsung/ffffff"
							}
						].map((brand) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: brand.src,
							alt: brand.name,
							className: "h-8 md:h-10 w-auto opacity-50 hover:opacity-100 transition-opacity"
						}, brand.name))
					}, i))
				})]
			})
		]
	});
}
//#endregion
export { PublicHome as component };
