import { o as require_jsx_runtime } from "./_libs/@radix-ui/react-collection+[...].mjs";
import { X as Laptop, b as Smartphone, ct as Database, g as Tablet, gt as CircleCheck, i as Watch, lt as Cpu } from "./_libs/lucide-react.mjs";
import { v as Link } from "./_libs/@tanstack/react-router+[...].mjs";
import { t as motion } from "./_libs/framer-motion.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/_public.services-C140CM-7.js
var import_jsx_runtime = require_jsx_runtime();
function Services() {
	const services = [
		{
			title: "MacBook & Laptop Repairs",
			icon: Laptop,
			description: "Expert chip-level repair and component replacement for all major laptop brands.",
			features: [
				"Motherboard chip-level repair",
				"Screen and display replacement",
				"Keyboard and trackpad repair",
				"Battery replacement",
				"Liquid damage recovery",
				"Hinge and body fabrication",
				"Overheating issues resolved"
			]
		},
		{
			title: "iPhone & Mobile Repairs",
			icon: Smartphone,
			description: "Fast, reliable fixes for iOS and Android devices using premium replacement parts.",
			features: [
				"Broken screen replacement",
				"Battery replacement",
				"Charging port repair",
				"Camera and lens repair",
				"Speaker and microphone fixes",
				"Face ID / Touch ID repair",
				"Software flashing and updates"
			]
		},
		{
			title: "iPad & Tablet Repair",
			icon: Tablet,
			description: "Complete repair solutions for Apple iPads and Android tablets of all sizes.",
			features: [
				"Digitizer / Glass replacement",
				"LCD replacement",
				"Battery drain issues",
				"Charging problems",
				"Button repairs"
			]
		},
		{
			title: "Data Recovery",
			icon: Database,
			description: "Professional data extraction from dead or damaged devices and hard drives.",
			features: [
				"Dead phone data recovery",
				"Corrupted hard drive recovery",
				"Deleted files restoration",
				"OS crash recovery",
				"Secure data transfer"
			]
		},
		{
			title: "Smart Watch Repair",
			icon: Watch,
			description: "Screen, battery, and functionality repairs for Apple Watch and other smart wearables.",
			features: [
				"Screen replacement",
				"Battery replacement",
				"Water damage repair",
				"Sensor repairs"
			]
		},
		{
			title: "Motherboard Specialists",
			icon: Cpu,
			description: "We handle the complex micro-soldering repairs that other shops reject.",
			features: [
				"Short circuit repair",
				"IC replacement",
				"Trace repair",
				"Component level diagnostics"
			]
		}
	];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "w-full pb-20",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "relative pt-16 md:pt-24 pb-12 overflow-hidden border-b border-white/10 bg-[#0f172a]/50",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 z-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-cyan-900/20 via-[#0f172a]/0 to-transparent" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "container relative z-10 mx-auto px-6 text-center",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.h1, {
						initial: {
							opacity: 0,
							y: 20
						},
						animate: {
							opacity: 1,
							y: 0
						},
						transition: { duration: .5 },
						className: "text-4xl md:text-5xl font-extrabold text-white mb-4",
						children: "Our Services"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.p, {
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
						className: "text-lg text-slate-400 max-w-2xl mx-auto",
						children: "Comprehensive laptop and mobile repair services in Guntur. Chip-level repairs, screen replacement, software solutions, and more."
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				className: "py-20",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "container mx-auto px-6",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8",
						children: services.map((service, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
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
								delay: index * .1
							},
							className: "bg-gradient-to-b from-[#1e293b] to-[#0f172a] rounded-3xl p-8 border border-white/10 relative overflow-hidden group hover:border-cyan-500/30 transition-colors",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-10 transition-opacity",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(service.icon, { className: "h-40 w-40 text-cyan-400" })
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "h-14 w-14 rounded-2xl bg-cyan-500/20 flex items-center justify-center mb-6 relative z-10",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(service.icon, { className: "h-7 w-7 text-cyan-400" })
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
									className: "text-2xl font-bold text-white mb-3 relative z-10",
									children: service.title
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-slate-400 mb-8 relative z-10 min-h-[48px]",
									children: service.description
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "space-y-3 relative z-10",
									children: service.features.map((feature, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-start gap-3",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "h-5 w-5 text-cyan-500 shrink-0 mt-0.5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-slate-300 text-sm font-medium",
											children: feature
										})]
									}, i))
								})
							]
						}, service.title))
					})
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				className: "py-16",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "container mx-auto px-6",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "bg-gradient-to-r from-cyan-900/40 to-blue-900/40 border border-cyan-500/20 rounded-3xl p-8 md:p-12 text-center max-w-4xl mx-auto",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "text-3xl md:text-4xl font-bold text-white mb-4",
								children: "Need a repair?"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-lg text-slate-300 mb-8 max-w-2xl mx-auto",
								children: "Bring your device to our lab for a free diagnosis. We'll give you an honest quote before proceeding with any repairs."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex flex-col sm:flex-row items-center justify-center gap-4",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
									to: "/contact",
									className: "w-full sm:w-auto bg-cyan-500 hover:bg-cyan-400 text-black px-8 py-3.5 rounded-xl font-bold transition-colors",
									children: "Contact Us"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
									href: "tel:+919666984949",
									className: "w-full sm:w-auto bg-white/10 hover:bg-white/20 border border-white/10 text-white px-8 py-3.5 rounded-xl font-bold transition-colors",
									children: "Call Now"
								})]
							})
						]
					})
				})
			})
		]
	});
}
//#endregion
export { Services as component };
