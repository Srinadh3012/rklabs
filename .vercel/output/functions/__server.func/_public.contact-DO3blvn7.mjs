import { o as __toESM } from "./_runtime.mjs";
import { u as require_react } from "./_libs/@floating-ui/react-dom+[...].mjs";
import { o as require_jsx_runtime } from "./_libs/@radix-ui/react-collection+[...].mjs";
import { t as Button } from "./_ssr/button-C1KSxKmF.mjs";
import { C as Send, G as MapPin, K as Mail, M as Phone, U as MessageCircle, ft as Clock } from "./_libs/lucide-react.mjs";
import { t as motion } from "./_libs/framer-motion.mjs";
import { t as Input } from "./_ssr/input-CCCvLIdb.mjs";
import { t as Textarea } from "./_ssr/textarea-C3L8366G.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/_public.contact-DO3blvn7.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function Contact() {
	const [isSubmitting, setIsSubmitting] = (0, import_react.useState)(false);
	const handleSubmit = (e) => {
		e.preventDefault();
		setIsSubmitting(true);
		setTimeout(() => {
			setIsSubmitting(false);
			alert("Thanks for your message! We will get back to you shortly.");
		}, 1e3);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "w-full pb-20",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
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
					children: "Contact Us"
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
					children: "Have a question or need a quote? Reach out to us and our expert technicians will assist you."
				})]
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			className: "py-20",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "container mx-auto px-6",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid grid-cols-1 lg:grid-cols-2 gap-16",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
						initial: {
							opacity: 0,
							x: -20
						},
						animate: {
							opacity: 1,
							x: 0
						},
						transition: { duration: .5 },
						className: "space-y-12",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "text-3xl font-bold text-white mb-8",
							children: "Get in Touch"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-6",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-start gap-4",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "h-12 w-12 rounded-full bg-[#1e293b] flex items-center justify-center shrink-0 border border-white/5",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, { className: "h-5 w-5 text-cyan-400" })
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
										className: "text-lg font-bold text-white mb-1",
										children: "Our Location"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "text-slate-400",
										children: [
											"Shop No 5, Sri Srinivasa Complex",
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
											"Opp. R.T.C Bus Stand",
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
											"Guntur, Andhra Pradesh 522001"
										]
									})] })]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-start gap-4",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "h-12 w-12 rounded-full bg-[#1e293b] flex items-center justify-center shrink-0 border border-white/5",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Phone, { className: "h-5 w-5 text-cyan-400" })
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
										className: "text-lg font-bold text-white mb-1",
										children: "Phone"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-slate-400",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
											href: "tel:+919666984949",
											className: "hover:text-cyan-400 transition-colors",
											children: "+91 96669 84949"
										})
									})] })]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-start gap-4",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "h-12 w-12 rounded-full bg-[#1e293b] flex items-center justify-center shrink-0 border border-white/5",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mail, { className: "h-5 w-5 text-cyan-400" })
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
										className: "text-lg font-bold text-white mb-1",
										children: "Email"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-slate-400",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
											href: "mailto:info@rkrepairlabs.com",
											className: "hover:text-cyan-400 transition-colors",
											children: "info@rkrepairlabs.com"
										})
									})] })]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-start gap-4",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "h-12 w-12 rounded-full bg-[#1e293b] flex items-center justify-center shrink-0 border border-white/5",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock, { className: "h-5 w-5 text-cyan-400" })
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
										className: "text-lg font-bold text-white mb-1",
										children: "Business Hours"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "text-slate-400",
										children: [
											"Monday - Saturday: 10:00 AM - 8:30 PM",
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
											"Sunday: Closed"
										]
									})] })]
								})
							]
						})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "rounded-3xl overflow-hidden border border-white/10 aspect-video bg-[#1e293b] relative group",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("iframe", {
								src: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3829.4182998632616!2d80.4195551!3d16.3150446!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a4a75a4222b8609%3A0x5b8731d711a07ad8!2sRk%20repair%20labs!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin",
								width: "100%",
								height: "100%",
								style: { border: 0 },
								allowFullScreen: true,
								loading: "lazy",
								referrerPolicy: "no-referrer-when-downgrade",
								title: "RK Repair Labs Location"
							})
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
						initial: {
							opacity: 0,
							x: 20
						},
						animate: {
							opacity: 1,
							x: 0
						},
						transition: {
							duration: .5,
							delay: .2
						},
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "bg-[#1e293b]/50 border border-white/10 rounded-3xl p-8 md:p-12",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
									className: "text-2xl font-bold text-white mb-6",
									children: "Send us a Message"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
									onSubmit: handleSubmit,
									className: "space-y-6",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "space-y-2",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
												className: "text-sm font-medium text-slate-300",
												children: "Your Name"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
												required: true,
												placeholder: "John Doe",
												className: "bg-[#020617] border-white/10 h-12 text-white"
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "space-y-2",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
												className: "text-sm font-medium text-slate-300",
												children: "Phone Number"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
												required: true,
												type: "tel",
												placeholder: "+91 XXXXX XXXXX",
												className: "bg-[#020617] border-white/10 h-12 text-white"
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "space-y-2",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
												className: "text-sm font-medium text-slate-300",
												children: "Email Address (Optional)"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
												type: "email",
												placeholder: "john@example.com",
												className: "bg-[#020617] border-white/10 h-12 text-white"
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "space-y-2",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
												className: "text-sm font-medium text-slate-300",
												children: "Device & Issue"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
												required: true,
												placeholder: "E.g. MacBook Pro M1 - Screen cracked",
												className: "bg-[#020617] border-white/10 min-h-[120px] resize-y text-white"
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
											type: "submit",
											disabled: isSubmitting,
											className: "w-full h-12 text-base font-bold bg-cyan-500 hover:bg-cyan-400 text-black",
											children: isSubmitting ? "Sending..." : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Send, { className: "mr-2 h-4 w-4" }), " Send Message"] })
										})
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "mt-8 pt-8 border-t border-white/10 text-center",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-slate-400 text-sm mb-4",
										children: "Or reach us instantly via WhatsApp"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
										href: "https://wa.me/919666984949",
										target: "_blank",
										rel: "noopener noreferrer",
										className: "inline-flex items-center gap-2 bg-[#25D366] text-white px-6 py-3 rounded-xl font-bold hover:bg-[#20bd5a] transition-colors",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MessageCircle, { className: "h-5 w-5" }), " Chat on WhatsApp"]
									})]
								})
							]
						})
					})]
				})
			})
		})]
	});
}
//#endregion
export { Contact as component };
