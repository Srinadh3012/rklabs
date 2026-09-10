import { o as __toESM } from "../_runtime.mjs";
import { l as require_react_dom, u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { o as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { n as cn, t as Button } from "./button-C1KSxKmF.mjs";
import { A as PowerOff, B as MonitorX, C as Send, D as Receipt, E as ScanLine, G as MapPin, I as Package, M as Phone, N as PenTool, Q as IndianRupee, St as Calendar, T as Scissors, U as MessageCircle, V as MonitorCheck, X as Laptop, at as Eye, b as Smartphone, et as Hammer, ft as Clock, g as Tablet, it as FileDown, j as Plus, k as Power, m as Trash2, nt as FileText, o as User, ot as Ellipsis, pt as ClipboardList, r as Wrench, st as Droplet, tt as Globe, x as ShieldCheck, z as Monitor } from "../_libs/lucide-react.mjs";
import { t as Input } from "./input-CCCvLIdb.mjs";
import { n as createServerFn } from "./server-De111qI3.mjs";
import { t as createSsrRpc } from "./createSsrRpc-CtdFS2cZ.mjs";
import { i as inr, n as fmtDate, o as inrPrecise, t as fillTemplate } from "./format-DOFCsm48.mjs";
import { a as objectType, i as numberType, n as arrayType, o as stringType, t as anyType } from "../_libs/zod.mjs";
import { i as useQueryClient, n as useQuery, t as useMutation } from "../_libs/tanstack__react-query.mjs";
import { t as toast } from "../_libs/sonner.mjs";
import { t as Label } from "./label-BhFXZmyO.mjs";
import { i as getCustomersFn } from "./customers-Cs5FLpVT.mjs";
import { a as DialogTitle, i as DialogHeader, n as DialogContent, o as DialogTrigger, r as DialogFooter, t as Dialog } from "./dialog-CMoNC1Ou.mjs";
import { t as Badge } from "./badge-eXqQHFo7.mjs";
import { n as useWaSender } from "./wa-sender-D87O9muQ.mjs";
import { s as getRepairsFn } from "./repairs-DllhEgbp.mjs";
import { t as getProfileFn } from "./settings-RVr-3c2S.mjs";
import { t as require_client } from "../_libs/react-dom+scheduler.mjs";
import { t as require_jspdf_node_min } from "../_libs/jspdf.mjs";
import { t as toJpeg } from "../_libs/html-to-image.mjs";
import { t as QRCodeCanvas } from "../_libs/qrcode.react.mjs";
import { t as require_react_barcode } from "../_libs/react-barcode.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/billing-D-ls1-zs.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var import_client = require_client();
var import_react_dom = /* @__PURE__ */ __toESM(require_react_dom());
var import_jspdf_node_min = /* @__PURE__ */ __toESM(require_jspdf_node_min());
var import_react_barcode = /* @__PURE__ */ __toESM(require_react_barcode());
var IntakeReceiptTemplate = (0, import_react.forwardRef)(({ invoice, customer, repair, shop, items }, ref) => {
	const jobID = repair?.ticket_no || invoice?.invoice_no || "RKRL-000001";
	let dateStr = "";
	let timeStr = "";
	try {
		const src = invoice?.created_at || repair?.created_at;
		const d = new Date(src);
		if (!isNaN(d.getTime())) {
			dateStr = d.toLocaleDateString("en-IN", {
				day: "2-digit",
				month: "2-digit",
				year: "numeric"
			});
			timeStr = d.toLocaleTimeString("en-IN", {
				hour: "2-digit",
				minute: "2-digit"
			});
		}
	} catch (_e) {}
	const teal = "#008A9A";
	const orange = "#F47A21";
	const darkBg = "#111827";
	const trackUrl = `https://rklabs.syncailabs.in/track?ticket=${jobID}`;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		ref,
		style: {
			width: "794px",
			minHeight: "1123px",
			padding: "28px 32px 20px",
			fontFamily: "'Inter', 'Roboto', 'Segoe UI', 'Helvetica Neue', Arial, sans-serif",
			fontSize: "10px",
			color: "#1a1a1a",
			backgroundColor: "#ffffff",
			boxSizing: "border-box",
			position: "relative",
			margin: "0 auto",
			display: "flex",
			flexDirection: "column",
			"--color-white": "#ffffff",
			"--color-black": "#000000",
			"--color-gray-50": "#f9fafb",
			"--color-gray-100": "#f3f4f6",
			"--color-gray-200": "#e5e7eb",
			"--color-gray-300": "#d1d5db",
			"--color-gray-400": "#9ca3af",
			"--color-gray-500": "#6b7280",
			"--color-gray-600": "#4b5563",
			"--color-gray-700": "#374151",
			"--color-gray-800": "#1f2937",
			"--color-gray-900": "#111827",
			"--color-red-600": "#dc2626",
			"--color-green-600": "#16a34a",
			"--color-amber-500": "#f59e0b"
		},
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				style: {
					position: "absolute",
					top: 0,
					left: 0,
					width: "100%",
					height: "160px",
					zIndex: 0,
					pointerEvents: "none",
					overflow: "hidden"
				},
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
					width: "100%",
					height: "100%",
					viewBox: "0 0 800 160",
					preserveAspectRatio: "none",
					style: {
						position: "absolute",
						top: 0,
						left: 0
					},
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
						d: "M0,0 L280,0 L180,160 L0,160 Z",
						fill: "#111827"
					})
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				style: {
					position: "relative",
					zIndex: 1,
					height: "145px",
					borderBottom: `4px solid ${teal}`,
					marginBottom: "12px"
				},
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						style: {
							position: "absolute",
							left: "20px",
							top: "10px",
							width: "120px",
							height: "120px",
							display: "flex",
							alignItems: "center",
							justifyContent: "center"
						},
						children: shop?.logo_url ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: shop.logo_url,
							alt: "Company Logo",
							style: {
								maxWidth: "100%",
								maxHeight: "100%",
								objectFit: "contain"
							},
							crossOrigin: "anonymous"
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							style: {
								width: "100px",
								height: "100px",
								display: "flex",
								alignItems: "center",
								justifyContent: "center",
								borderRadius: "50%",
								border: `4px solid ${teal}`,
								backgroundColor: "#111827",
								boxShadow: `0 0 0 4px ${orange}`
							},
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								style: {
									display: "flex",
									flexDirection: "column",
									alignItems: "center",
									justifyContent: "center",
									marginTop: "4px"
								},
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									style: {
										display: "flex",
										alignItems: "baseline"
									},
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										style: {
											fontSize: "44px",
											fontWeight: 900,
											color: teal,
											lineHeight: 1,
											fontFamily: "Impact, \"Arial Black\", sans-serif"
										},
										children: "R"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										style: {
											fontSize: "44px",
											fontWeight: 900,
											color: orange,
											lineHeight: 1,
											fontFamily: "Impact, \"Arial Black\", sans-serif"
										},
										children: "K"
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									style: {
										backgroundColor: "#ffffff",
										color: "#111827",
										fontSize: "7px",
										fontWeight: "bold",
										padding: "2px 4px",
										marginTop: "2px",
										letterSpacing: "1px",
										textTransform: "uppercase",
										borderRadius: "2px"
									},
									children: "Repair Labs"
								})]
							})
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						style: {
							position: "absolute",
							left: "210px",
							top: "0px",
							width: "360px",
							display: "flex",
							flexDirection: "column",
							alignItems: "center"
						},
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								style: {
									display: "flex",
									alignItems: "center",
									gap: "6px"
								},
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									style: {
										fontFamily: "Impact, 'Arial Black', sans-serif",
										fontSize: "30px",
										fontWeight: 900,
										color: teal,
										letterSpacing: "1px",
										lineHeight: 1.1
									},
									children: "RK"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									style: {
										fontFamily: "Impact, 'Arial Black', sans-serif",
										fontSize: "30px",
										fontWeight: 900,
										color: orange,
										letterSpacing: "1px",
										lineHeight: 1.1
									},
									children: "REPAIR LABS"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								style: {
									display: "flex",
									alignItems: "center",
									gap: "10px",
									width: "100%",
									justifyContent: "center",
									marginTop: "2px"
								},
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: {
										height: "2px",
										background: teal,
										flex: 1
									} }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										style: {
											fontSize: "11px",
											fontWeight: 600,
											color: "#333",
											letterSpacing: "0.5px"
										},
										children: "Expert hands - Trusted repairs"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: {
										height: "2px",
										background: teal,
										flex: 1
									} })
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								style: {
									display: "flex",
									justifyContent: "space-between",
									width: "100%",
									marginTop: "16px",
									padding: "0 10px"
								},
								children: [
									{
										icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Laptop, {
											size: 20,
											strokeWidth: 2
										}),
										text: "LAPTOP REPAIR"
									},
									{
										icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Smartphone, {
											size: 20,
											strokeWidth: 2
										}),
										text: "MOBILE REPAIR"
									},
									{
										icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Monitor, {
											size: 20,
											strokeWidth: 2
										}),
										text: "MACBOOK REPAIR"
									},
									{
										icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tablet, {
											size: 20,
											strokeWidth: 2
										}),
										text: "TABLET REPAIR"
									}
								].map((item, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									style: {
										display: "flex",
										flexDirection: "column",
										alignItems: "center",
										gap: "4px"
									},
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											style: {
												display: "flex",
												alignItems: "center",
												justifyContent: "center",
												color: teal
											},
											children: item.icon
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											style: {
												fontSize: "9px",
												fontWeight: 800,
												color: "#222"
											},
											children: item.text
										}),
										i < 3 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: {
											position: "absolute",
											right: "-12px",
											top: "10px",
											width: "1px",
											height: "16px",
											background: "#ddd"
										} })
									]
								}, i))
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						style: {
							position: "absolute",
							right: "0px",
							top: "2px",
							width: "190px",
							display: "flex",
							flexDirection: "column",
							alignItems: "center"
						},
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								style: {
									fontFamily: "Impact, 'Arial Black', sans-serif",
									fontSize: "22px",
									fontWeight: 900,
									lineHeight: 1.1,
									textTransform: "uppercase",
									textAlign: "center"
								},
								children: "REPAIR INTAKE RECEIPT"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								style: {
									position: "relative",
									width: "100%",
									marginTop: "12px"
								},
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									style: {
										position: "absolute",
										top: "-10px",
										left: "50%",
										transform: "translateX(-50%)",
										background: teal,
										color: "#fff",
										padding: "2px 14px",
										borderRadius: "12px",
										fontSize: "9px",
										fontWeight: 800,
										textTransform: "uppercase",
										zIndex: 2,
										border: "2px solid #fff",
										whiteSpace: "nowrap"
									},
									children: "JOB ID"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									style: {
										border: `2px solid ${orange}`,
										borderRadius: "8px",
										textAlign: "center",
										paddingTop: "14px",
										paddingBottom: "4px",
										fontFamily: "Impact, 'Arial Black', sans-serif",
										fontSize: "16px",
										fontWeight: 900,
										color: orange
									},
									children: jobID
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								style: {
									marginTop: "4px",
									width: "100%",
									display: "flex",
									justifyContent: "center",
									overflow: "hidden"
								},
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_react_barcode.default, {
									value: jobID,
									width: 1.2,
									height: 26,
									displayValue: false,
									margin: 0,
									background: "transparent",
									lineColor: "#000"
								})
							})
						]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				style: {
					display: "grid",
					gridTemplateColumns: "1fr 265px",
					gap: "12px 16px"
				},
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						style: {
							display: "flex",
							gap: "10px"
						},
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DateTimeBox, {
							icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Calendar, {
								size: 16,
								strokeWidth: 2.5,
								color: "#fff"
							}),
							label: "DATE",
							value: dateStr,
							color: teal
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DateTimeBox, {
							icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock, {
								size: 16,
								strokeWidth: 2.5,
								color: "#fff"
							}),
							label: "TIME",
							value: timeStr,
							color: teal
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						style: {
							display: "flex",
							flexDirection: "column",
							gap: "10px"
						},
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Section$1, {
								icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(User, {
									size: 14,
									strokeWidth: 2.5,
									color: "#fff"
								}),
								title: "CUSTOMER DETAILS",
								color: teal,
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									style: {
										padding: "4px 14px 10px",
										display: "flex",
										flexDirection: "column",
										gap: "8px"
									},
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldRow$1, {
											label: "Customer Name",
											value: customer?.name
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldRow$1, {
											label: "Mobile No.",
											value: customer?.phone
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldRow$1, {
											label: "Email ID",
											value: customer?.email
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldRow$1, {
											label: "Address",
											value: customer?.address
										})
									]
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Section$1, {
								icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Smartphone, {
									size: 14,
									strokeWidth: 2.5,
									color: "#fff"
								}),
								title: "DEVICE DETAILS",
								color: teal,
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									style: {
										padding: "4px 14px 10px",
										display: "flex",
										flexDirection: "column",
										gap: "8px"
									},
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											style: {
												display: "flex",
												alignItems: "center",
												fontSize: "10px"
											},
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													style: {
														fontWeight: 500,
														width: "120px",
														flexShrink: 0
													},
													children: "Device Type"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													style: { marginRight: "6px" },
													children: ":"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													style: {
														display: "flex",
														gap: "10px",
														flexWrap: "wrap",
														flex: 1
													},
													children: [
														/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CheckboxEl, {
															text: "Laptop",
															checked: repair?.device_type === "Laptop"
														}),
														/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CheckboxEl, {
															text: "Mobile",
															checked: repair?.device_type === "Mobile"
														}),
														/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CheckboxEl, {
															text: "Tablet",
															checked: repair?.device_type === "Tablet"
														}),
														/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CheckboxEl, {
															text: "MacBook",
															checked: repair?.device_type === "MacBook"
														}),
														/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CheckboxEl, {
															text: "Other",
															checked: ![
																"Laptop",
																"Mobile",
																"Tablet",
																"MacBook"
															].includes(repair?.device_type) && !!repair?.device_type
														})
													]
												})
											]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldRow$1, {
											label: "Brand",
											value: repair?.device_brand
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldRow$1, {
											label: "Model",
											value: repair?.device_model
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldRow$1, {
											label: "Serial No./IMEI",
											value: repair?.imei
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldRow$1, {
											label: "Password (if any)",
											value: repair?.password
										})
									]
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Section$1, {
								icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileText, {
									size: 14,
									strokeWidth: 2.5,
									color: "#fff"
								}),
								title: "REPORTED PROBLEM",
								color: teal,
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									style: { padding: "4px 14px 12px" },
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											style: {
												fontSize: "10px",
												fontWeight: 500,
												marginBottom: "4px"
											},
											children: "Reported Problem / Fault Description :"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											style: {
												borderBottom: "1px solid #aaa",
												minHeight: "20px",
												fontSize: "10px",
												fontStyle: "italic",
												fontWeight: 600,
												padding: "2px 4px"
											},
											children: repair?.issue || ""
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: {
											borderBottom: "1px solid #ccc",
											height: "22px"
										} }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: {
											borderBottom: "1px solid #ccc",
											height: "22px"
										} })
									]
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Section$1, {
								icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Package, {
									size: 14,
									strokeWidth: 2.5,
									color: "#fff"
								}),
								title: "ACCESSORIES RECEIVED",
								color: teal,
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									style: { padding: "6px 14px 10px" },
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										style: {
											display: "flex",
											gap: "14px",
											fontSize: "10px",
											fontWeight: 600,
											marginBottom: "10px",
											flexWrap: "wrap"
										},
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CheckboxEl, { text: "Charger" }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CheckboxEl, { text: "Battery" }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CheckboxEl, { text: "Bag" }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CheckboxEl, { text: "Box" }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CheckboxEl, { text: "Other" }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { style: {
												borderBottom: "1px solid #aaa",
												width: "60px",
												display: "inline-block"
											} })
										]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldRow$1, {
										label: "Other Notes",
										value: ""
									})]
								})
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						style: {
							display: "flex",
							flexDirection: "column",
							gap: "10px"
						},
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Section$1, {
								icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ScanLine, {
									size: 14,
									strokeWidth: 2.5,
									color: "#fff"
								}),
								title: "TRACK REPAIR STATUS",
								color: teal,
								style: {
									display: "flex",
									flexDirection: "column"
								},
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									style: {
										padding: "16px 12px",
										display: "flex",
										alignItems: "center",
										justifyContent: "center",
										gap: "14px",
										flex: 1
									},
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										style: {
											padding: "4px",
											background: "#fff",
											border: "2px solid #000",
											borderRadius: "6px",
											flexShrink: 0
										},
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(QRCodeCanvas, {
											value: trackUrl,
											size: 84,
											level: "M"
										})
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										style: {
											fontSize: "10px",
											fontWeight: 600,
											color: "#333",
											textAlign: "left",
											lineHeight: 1.4
										},
										children: [
											"Scan QR to check",
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
											"real-time repair",
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
											"status online."
										]
									})]
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Section$1, {
								icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ClipboardList, {
									size: 14,
									strokeWidth: 2.5,
									color: "#fff"
								}),
								title: "DEVICE CONDITION AT INTAKE",
								color: teal,
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									style: {
										display: "grid",
										gridTemplateColumns: "1fr 1fr",
										gap: "10px 6px",
										padding: "10px 10px 12px",
										fontSize: "10px"
									},
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ConditionItem, {
											icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Power, {
												size: 12,
												strokeWidth: 2.5
											}),
											text: "Power ON"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ConditionItem, {
											icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Droplet, {
												size: 12,
												strokeWidth: 2.5
											}),
											text: "Water Damage"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ConditionItem, {
											icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PowerOff, {
												size: 12,
												strokeWidth: 2.5
											}),
											text: "Power OFF"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ConditionItem, {
											icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Hammer, {
												size: 12,
												strokeWidth: 2.5
											}),
											text: "Physical Damage"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ConditionItem, {
											icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MonitorCheck, {
												size: 12,
												strokeWidth: 2.5
											}),
											text: "Display OK"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ConditionItem, {
											icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Scissors, {
												size: 12,
												strokeWidth: 2.5
											}),
											text: "Scratches / Dents"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ConditionItem, {
											icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MonitorX, {
												size: 12,
												strokeWidth: 2.5
											}),
											text: "No Display"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ConditionItem, {
											icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Wrench, {
												size: 12,
												strokeWidth: 2.5
											}),
											text: "Missing Screws"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ConditionItem, {
											icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Smartphone, {
												size: 12,
												strokeWidth: 2.5
											}),
											text: "Screen Cracked"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ConditionItem, {
											icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Ellipsis, {
												size: 12,
												strokeWidth: 2.5
											}),
											text: "Other"
										})
									]
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Section$1, {
								icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(IndianRupee, {
									size: 14,
									strokeWidth: 2.5,
									color: "#fff"
								}),
								title: "ESTIMATED & PAYMENT DETAILS",
								color: teal,
								iconBg: true,
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									style: {
										padding: "8px 10px 10px",
										display: "flex",
										flexDirection: "column",
										gap: "8px",
										fontSize: "10px",
										fontWeight: 600
									},
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PaymentRow, { label: "Inspection / Diagnosis Fee" }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PaymentRow, {
											label: "Estimated Repair Cost",
											value: repair?.estimated_cost ? String(repair.estimated_cost) : ""
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PaymentRow, { label: "Advance Paid" }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PaymentRow, { label: "Balance Amount" }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: {
											height: "1px",
											background: "#ddd",
											margin: "2px 0"
										} }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											style: {
												display: "flex",
												justifyContent: "space-between",
												alignItems: "flex-end"
											},
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Expected Delivery Date" }),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													style: { marginLeft: "4px" },
													children: ":"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													style: {
														display: "flex",
														gap: "3px",
														flex: 1,
														justifyContent: "center",
														paddingLeft: "8px"
													},
													children: [
														/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { style: {
															width: "24px",
															borderBottom: "1px solid #aaa",
															display: "inline-block"
														} }),
														" ",
														"/",
														/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { style: {
															width: "24px",
															borderBottom: "1px solid #aaa",
															display: "inline-block"
														} }),
														" ",
														"/",
														/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { style: {
															width: "40px",
															borderBottom: "1px solid #aaa",
															display: "inline-block"
														} })
													]
												})
											]
										})
									]
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								style: {
									border: "1px solid #ddd",
									borderRadius: "12px",
									position: "relative",
									padding: "20px 10px 10px",
									background: "#fdf2e9"
								},
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									style: {
										position: "absolute",
										top: "-10px",
										left: "12px",
										background: orange,
										color: "#fff",
										padding: "4px 16px 4px 12px",
										fontWeight: 700,
										fontSize: "10px",
										textTransform: "uppercase",
										clipPath: "polygon(0 0, 100% 0, 94% 50%, 100% 100%, 0 100%)",
										paddingRight: "22px"
									},
									children: "TERMS & CONDITIONS"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									style: {
										display: "flex",
										flexDirection: "column",
										gap: "2px",
										marginTop: "4px"
									},
									children: (shop?.terms?.length ? shop.terms : [
										"Data backup is the customer's responsibility.",
										"RK Repair Labs is not responsible for data loss.",
										"Warranty applies only to repaired parts / service.",
										"Device not collected within 30 days may incur charges.",
										"By submitting this device, you agree to the above terms."
									]).map((term, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										style: {
											display: "flex",
											gap: "4px",
											alignItems: "flex-start"
										},
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											style: {
												fontSize: "9px",
												color: orange,
												fontWeight: 900
											},
											children: [i + 1, "."]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											style: {
												fontSize: "9px",
												color: "#444",
												fontWeight: 600,
												lineHeight: 1.3
											},
											children: term
										})]
									}, i))
								})]
							})
						]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				style: {
					display: "grid",
					gridTemplateColumns: "1fr 1fr",
					gap: "16px",
					marginTop: "14px",
					flexShrink: 0
				},
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					style: {
						border: "1.5px solid #e2e8f0",
						borderRadius: "8px",
						display: "flex",
						alignItems: "center",
						justifyContent: "space-between",
						padding: "16px 20px",
						background: "#f8fafc"
					},
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							style: {
								fontSize: "12px",
								fontStyle: "italic",
								color: "#666",
								fontWeight: 600
							},
							children: "Thank you for trusting"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							style: {
								fontFamily: "Impact, 'Arial Black', sans-serif",
								fontSize: "22px",
								fontWeight: 900,
								color: teal,
								lineHeight: 1,
								marginTop: "4px"
							},
							children: ["RK ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								style: { color: orange },
								children: "REPAIR LABS"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							style: {
								fontSize: "9px",
								fontWeight: 700,
								color: "#444",
								marginTop: "4px",
								lineHeight: 1.4
							},
							children: [
								"We'll get your device",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
								"back in perfect shape!"
							]
						})
					] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						style: {
							width: "56px",
							height: "66px",
							display: "flex",
							flexDirection: "column",
							alignItems: "center",
							justifyContent: "center",
							textAlign: "center",
							position: "relative",
							flexShrink: 0
						},
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
							viewBox: "0 0 100 120",
							style: {
								position: "absolute",
								top: 0,
								left: 0,
								width: "100%",
								height: "100%",
								zIndex: 0
							},
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
								d: "M50 0 L100 20 L100 60 C100 90 75 115 50 120 C25 115 0 90 0 60 L0 20 Z",
								fill: teal,
								stroke: orange,
								strokeWidth: "4"
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							style: {
								position: "relative",
								zIndex: 1,
								display: "flex",
								flexDirection: "column",
								alignItems: "center",
								marginTop: "-4px"
							},
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, {
								size: 20,
								color: "#fff",
								strokeWidth: 3
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								style: {
									color: "#fff",
									fontSize: "6px",
									fontWeight: 800,
									letterSpacing: "0.5px",
									textTransform: "uppercase",
									lineHeight: 1.2,
									marginTop: "2px"
								},
								children: [
									"QUALITY",
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
									"REPAIR",
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
									"YOU CAN",
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
									"TRUST"
								]
							})]
						})]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					style: {
						border: "1.5px solid #e2e8f0",
						borderRadius: "8px",
						position: "relative",
						padding: "16px 20px",
						display: "flex",
						flexDirection: "column",
						justifyContent: "flex-end",
						alignItems: "center",
						background: "#f8fafc"
					},
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							style: {
								position: "absolute",
								left: "16px",
								top: "16px",
								color: teal
							},
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PenTool, {
								size: 18,
								strokeWidth: 2
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: {
							borderBottom: "1.5px solid #555",
							width: "100%",
							maxWidth: "180px",
							margin: "40px auto 0"
						} }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							style: {
								textAlign: "center",
								fontSize: "10px",
								fontWeight: 700,
								color: teal,
								textTransform: "uppercase",
								marginTop: "6px",
								letterSpacing: "0.5px"
							},
							children: "TECHNICIAN SIGNATURE"
						})
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: { flex: 1 } }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				style: {
					background: darkBg,
					color: "#fff",
					borderRadius: "8px",
					marginTop: "16px",
					padding: "16px 20px",
					display: "grid",
					gridTemplateColumns: "1.2fr 0.8fr 1fr",
					gap: "16px",
					flexShrink: 0
				},
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						style: {
							display: "flex",
							gap: "10px",
							alignItems: "flex-start"
						},
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							style: {
								color: orange,
								marginTop: "-2px"
							},
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, {
								size: 16,
								strokeWidth: 2.5
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							style: {
								lineHeight: 1.5,
								fontSize: "9px",
								fontWeight: 500,
								color: "#e2e8f0"
							},
							children: [
								"14-13, Brindavan Gardens 1st Lane,",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
								"Brindavan Gardens, Guntur - 522004,",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
								"Andhra Pradesh, India."
							]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						style: {
							display: "flex",
							gap: "10px",
							alignItems: "flex-start"
						},
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							style: {
								color: teal,
								marginTop: "-2px"
							},
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Phone, {
								size: 16,
								strokeWidth: 2.5
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							style: {
								fontWeight: 600,
								fontSize: "10px",
								lineHeight: 1.5,
								color: "#fff",
								letterSpacing: "0.5px"
							},
							children: [
								"+91 9666984949",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
								"+91 9505225222"
							]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						style: {
							display: "flex",
							gap: "10px",
							alignItems: "flex-start"
						},
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							style: {
								color: orange,
								marginTop: "-2px"
							},
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Globe, {
								size: 16,
								strokeWidth: 2.5
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							style: {
								fontWeight: 600,
								fontSize: "10px",
								color: "#fff",
								letterSpacing: "0.5px",
								marginBottom: "2px"
							},
							children: "rkrepairlabs.vercel.app"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							style: {
								color: "#94a3b8",
								fontSize: "9px",
								fontWeight: 500,
								display: "flex",
								gap: "6px",
								alignItems: "center"
							},
							children: [
								"Facebook ",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									style: { color: teal },
									children: "|"
								}),
								" Instagram",
								" ",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									style: { color: teal },
									children: "|"
								}),
								" YouTube"
							]
						})] })]
					})
				]
			})
		]
	});
});
IntakeReceiptTemplate.displayName = "IntakeReceiptTemplate";
function DateTimeBox({ icon, label, value, color }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		style: {
			flex: 1,
			border: "1.5px solid #e2e8f0",
			borderRadius: "6px",
			display: "flex",
			alignItems: "stretch",
			overflow: "hidden",
			position: "relative"
		},
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			style: {
				background: color,
				width: "38px",
				display: "flex",
				alignItems: "center",
				justifyContent: "center",
				flexShrink: 0
			},
			children: icon
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			style: {
				display: "flex",
				flexDirection: "column",
				padding: "6px 12px",
				justifyContent: "center"
			},
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				style: {
					fontWeight: 700,
					fontSize: "9px",
					color,
					letterSpacing: "0.5px"
				},
				children: label
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				style: {
					fontWeight: 600,
					fontSize: "11px",
					color: "#333",
					marginTop: "2px"
				},
				children: value
			})]
		})]
	});
}
function Section$1({ icon, title, children, color, iconBg, style }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		style: {
			border: "1.5px dashed #C8DCDC",
			borderRadius: "6px",
			position: "relative",
			paddingTop: "24px",
			marginTop: "12px",
			...style
		},
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				style: {
					position: "absolute",
					top: "-10px",
					left: "12px",
					height: "24px",
					background: color,
					display: "flex",
					alignItems: "center",
					clipPath: "polygon(0 0, 100% 0, 95% 50%, 100% 100%, 0 100%)",
					paddingRight: "16px",
					zIndex: 2
				},
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					style: {
						width: "24px",
						height: "24px",
						display: "flex",
						alignItems: "center",
						justifyContent: "center",
						borderRight: "1px solid rgba(255,255,255,0.2)",
						background: iconBg ? "rgba(0,0,0,0.1)" : "transparent",
						fontSize: "12px"
					},
					children: icon
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					style: {
						color: "#fff",
						padding: "0 10px",
						fontWeight: 700,
						fontSize: "10px",
						textTransform: "uppercase",
						letterSpacing: "0.5px",
						whiteSpace: "nowrap"
					},
					children: title
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: {
				position: "absolute",
				top: "14px",
				left: "8px",
				width: 0,
				height: 0,
				borderStyle: "solid",
				borderWidth: "0 4px 4px 0",
				borderColor: `transparent ${color} transparent transparent`,
				filter: "brightness(0.6)",
				zIndex: 1
			} }),
			children
		]
	});
}
function FieldRow$1({ label, value }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		style: {
			display: "flex",
			alignItems: "flex-end",
			fontSize: "10px",
			marginBottom: "6px"
		},
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			style: {
				width: "120px",
				flexShrink: 0,
				display: "flex",
				justifyContent: "space-between",
				paddingBottom: "1px"
			},
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				style: { fontWeight: 500 },
				children: label
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				style: {
					fontWeight: 500,
					paddingRight: "4px"
				},
				children: ":"
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			style: {
				flex: 1,
				borderBottom: "1.5px solid #C8DCDC",
				minHeight: "18px",
				fontWeight: 600,
				display: "flex",
				alignItems: "flex-end",
				paddingBottom: "1px",
				paddingLeft: "4px",
				whiteSpace: "nowrap",
				overflow: "hidden",
				textOverflow: "ellipsis",
				color: "#333"
			},
			children: value || ""
		})]
	});
}
function PaymentRow({ label, value }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		style: {
			display: "flex",
			justifyContent: "space-between",
			alignItems: "flex-end",
			fontSize: "10px"
		},
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				style: { paddingBottom: "1px" },
				children: label
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				style: { paddingBottom: "1px" },
				children: ": ₹"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				style: {
					width: "80px",
					borderBottom: "1px solid #aaa",
					minHeight: "18px",
					fontWeight: 600,
					display: "flex",
					alignItems: "flex-end",
					justifyContent: "flex-end",
					paddingBottom: "1px",
					paddingRight: "4px"
				},
				children: value || ""
			})
		]
	});
}
function CheckboxEl({ text, checked }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
		style: {
			display: "flex",
			alignItems: "center",
			gap: "4px",
			cursor: "default"
		},
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			style: {
				width: "12px",
				height: "12px",
				border: "1.5px solid #888",
				borderRadius: "2px",
				background: "#fff",
				display: "flex",
				alignItems: "center",
				justifyContent: "center",
				flexShrink: 0
			},
			children: checked && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: {
				width: "7px",
				height: "7px",
				background: "#222",
				borderRadius: "1px"
			} })
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			style: {
				fontWeight: 600,
				fontSize: "10px"
			},
			children: text
		})]
	});
}
function ConditionItem({ icon, text, checked }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		style: {
			display: "flex",
			alignItems: "center",
			justifyContent: "space-between"
		},
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			style: {
				display: "flex",
				alignItems: "center",
				gap: "5px"
			},
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				style: {
					background: "#f3f3f3",
					border: "1px solid #ddd",
					borderRadius: "50%",
					width: "20px",
					height: "20px",
					display: "flex",
					alignItems: "center",
					justifyContent: "center",
					fontSize: "10px",
					flexShrink: 0
				},
				children: icon
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				style: {
					fontWeight: 600,
					fontSize: "10px"
				},
				children: text
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			style: {
				width: "13px",
				height: "13px",
				border: "1.5px solid #888",
				borderRadius: "2px",
				background: "#fff",
				display: "flex",
				alignItems: "center",
				justifyContent: "center",
				flexShrink: 0
			},
			children: checked && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: {
				width: "7px",
				height: "7px",
				background: "#222",
				borderRadius: "1px"
			} })
		})]
	});
}
var InvoiceTemplate = (0, import_react.forwardRef)(({ invoice, customer, repair, shop, items }, ref) => {
	const jobID = invoice?.invoice_no || "INV-000000";
	let dateStr = "";
	try {
		const src = invoice?.created_at || (/* @__PURE__ */ new Date()).toISOString();
		const d = new Date(src);
		if (!isNaN(d.getTime())) dateStr = d.toLocaleDateString("en-IN", {
			day: "2-digit",
			month: "2-digit",
			year: "numeric"
		});
	} catch (_e) {}
	const teal = "#008A9A";
	const orange = "#F47A21";
	const darkBg = "#111827";
	const pdfSafeStyle = {
		"--color-white": "#ffffff",
		"--color-black": "#000000",
		"--color-gray-50": "#f9fafb",
		"--color-gray-100": "#f3f4f6",
		"--color-gray-200": "#e5e7eb",
		"--color-gray-300": "#d1d5db",
		"--color-gray-400": "#9ca3af",
		"--color-gray-500": "#6b7280",
		"--color-gray-600": "#4b5563",
		"--color-gray-700": "#374151",
		"--color-gray-800": "#1f2937",
		"--color-gray-900": "#111827",
		"--color-red-600": "#dc2626",
		"--color-green-600": "#16a34a",
		"--color-amber-500": "#f59e0b"
	};
	const subtotal = invoice?.subtotal || items?.reduce((acc, it) => acc + (it.unit_price || 0) * (it.quantity || 1), 0) || 0;
	const tax = invoice?.tax || 0;
	const discount = invoice?.discount || 0;
	const total = invoice?.total || subtotal + tax - discount;
	const advance = invoice?.advance || 0;
	const due = Math.max(0, total - advance);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		ref,
		style: {
			width: "794px",
			minHeight: "1123px",
			padding: "28px 32px 20px",
			fontFamily: "'Inter', 'Roboto', 'Segoe UI', 'Helvetica Neue', Arial, sans-serif",
			fontSize: "10px",
			color: "#1a1a1a",
			backgroundColor: "#ffffff",
			boxSizing: "border-box",
			position: "relative",
			margin: "0 auto",
			display: "flex",
			flexDirection: "column",
			...pdfSafeStyle
		},
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				style: {
					position: "absolute",
					top: 0,
					left: 0,
					width: "100%",
					height: "160px",
					zIndex: 0,
					pointerEvents: "none",
					overflow: "hidden"
				},
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
					width: "100%",
					height: "100%",
					viewBox: "0 0 800 160",
					preserveAspectRatio: "none",
					style: {
						position: "absolute",
						top: 0,
						left: 0
					},
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
						d: "M0,0 L280,0 L180,160 L0,160 Z",
						fill: "#111827"
					})
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				style: {
					position: "relative",
					zIndex: 1,
					height: "145px",
					borderBottom: `4px solid ${teal}`,
					marginBottom: "12px"
				},
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						style: {
							position: "absolute",
							left: "20px",
							top: "10px",
							width: "120px",
							height: "120px",
							display: "flex",
							alignItems: "center",
							justifyContent: "center"
						},
						children: shop?.logo_url ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: shop.logo_url,
							alt: "Company Logo",
							style: {
								maxWidth: "100%",
								maxHeight: "100%",
								objectFit: "contain"
							},
							crossOrigin: "anonymous"
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							style: {
								width: "100px",
								height: "100px",
								display: "flex",
								alignItems: "center",
								justifyContent: "center",
								borderRadius: "50%",
								border: `4px solid ${teal}`,
								backgroundColor: "#111827",
								boxShadow: `0 0 0 4px ${orange}`
							},
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								style: {
									display: "flex",
									flexDirection: "column",
									alignItems: "center",
									justifyContent: "center",
									marginTop: "4px"
								},
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									style: {
										display: "flex",
										alignItems: "baseline"
									},
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										style: {
											fontSize: "44px",
											fontWeight: 900,
											color: teal,
											lineHeight: 1,
											fontFamily: "Impact, \"Arial Black\", sans-serif"
										},
										children: "R"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										style: {
											fontSize: "44px",
											fontWeight: 900,
											color: orange,
											lineHeight: 1,
											fontFamily: "Impact, \"Arial Black\", sans-serif"
										},
										children: "K"
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									style: {
										backgroundColor: "#ffffff",
										color: "#111827",
										fontSize: "7px",
										fontWeight: "bold",
										padding: "2px 4px",
										marginTop: "2px",
										letterSpacing: "1px",
										textTransform: "uppercase",
										borderRadius: "2px"
									},
									children: "Repair Labs"
								})]
							})
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						style: {
							position: "absolute",
							left: "210px",
							top: "0px",
							width: "360px",
							display: "flex",
							flexDirection: "column",
							alignItems: "center"
						},
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								style: {
									display: "flex",
									alignItems: "center",
									gap: "6px"
								},
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									style: {
										fontFamily: "Impact, 'Arial Black', sans-serif",
										fontSize: "30px",
										fontWeight: 900,
										color: teal,
										letterSpacing: "1px",
										lineHeight: 1.1
									},
									children: "RK"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									style: {
										fontFamily: "Impact, 'Arial Black', sans-serif",
										fontSize: "30px",
										fontWeight: 900,
										color: orange,
										letterSpacing: "1px",
										lineHeight: 1.1
									},
									children: "REPAIR LABS"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								style: {
									display: "flex",
									alignItems: "center",
									gap: "10px",
									width: "100%",
									justifyContent: "center",
									marginTop: "2px"
								},
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: {
										height: "2px",
										background: teal,
										flex: 1
									} }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										style: {
											fontSize: "11px",
											fontWeight: 600,
											color: "#333",
											letterSpacing: "0.5px"
										},
										children: "Expert hands - Trusted repairs"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: {
										height: "2px",
										background: teal,
										flex: 1
									} })
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								style: {
									marginTop: "16px",
									textAlign: "center",
									fontSize: "11px",
									color: "#555",
									fontWeight: 500,
									lineHeight: 1.4
								},
								children: [
									"14-13, Brindavan Gardens 1st Lane, Guntur - 522004",
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
									"Phone: +91 9666984949 / 9505225222",
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
									"GSTIN: ",
									shop?.gst_no || "22AAAAA0000A1Z5"
								]
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						style: {
							position: "absolute",
							right: "0px",
							top: "2px",
							width: "190px",
							display: "flex",
							flexDirection: "column",
							alignItems: "center"
						},
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							style: {
								fontFamily: "Impact, 'Arial Black', sans-serif",
								fontSize: "32px",
								fontWeight: 900,
								lineHeight: 1.1,
								textTransform: "uppercase",
								textAlign: "center",
								color: darkBg
							},
							children: "TAX INVOICE"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							style: {
								position: "relative",
								width: "100%",
								marginTop: "16px"
							},
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								style: {
									position: "absolute",
									top: "-10px",
									left: "50%",
									transform: "translateX(-50%)",
									background: teal,
									color: "#fff",
									padding: "2px 14px",
									borderRadius: "12px",
									fontSize: "9px",
									fontWeight: 800,
									textTransform: "uppercase",
									zIndex: 2,
									border: "2px solid #fff",
									whiteSpace: "nowrap"
								},
								children: "INVOICE NO"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								style: {
									border: `2px solid ${orange}`,
									borderRadius: "8px",
									textAlign: "center",
									paddingTop: "14px",
									paddingBottom: "4px",
									fontFamily: "Impact, 'Arial Black', sans-serif",
									fontSize: "16px",
									fontWeight: 900,
									color: orange
								},
								children: jobID
							})]
						})]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				style: {
					display: "grid",
					gridTemplateColumns: "1fr 1fr",
					gap: "20px",
					marginBottom: "20px"
				},
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Section, {
					icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(User, {
						size: 14,
						strokeWidth: 2.5,
						color: "#fff"
					}),
					title: "BILLED TO",
					color: teal,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						style: {
							padding: "8px 14px 12px",
							display: "flex",
							flexDirection: "column",
							gap: "8px"
						},
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldRow, {
								label: "Customer Name",
								value: customer?.name || "Cash / Walk-in"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldRow, {
								label: "Mobile No.",
								value: customer?.phone || "-"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldRow, {
								label: "Email ID",
								value: customer?.email || "-"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldRow, {
								label: "Address",
								value: customer?.address || "-"
							}),
							customer?.gst_no && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldRow, {
								label: "GSTIN",
								value: customer.gst_no
							})
						]
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Section, {
					icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(IndianRupee, {
						size: 14,
						strokeWidth: 2.5,
						color: "#fff"
					}),
					title: "INVOICE DETAILS",
					color: teal,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						style: {
							padding: "8px 14px 12px",
							display: "flex",
							flexDirection: "column",
							gap: "8px"
						},
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldRow, {
								label: "Invoice Date",
								value: dateStr
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldRow, {
								label: "Payment Mode",
								value: invoice?.payment_method || "Cash"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldRow, {
								label: "Related Ticket",
								value: repair?.ticket_no || "-"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldRow, {
								label: "Device/Model",
								value: repair ? `${repair.device_brand} ${repair.device_model}` : "-"
							})
						]
					})
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				style: {
					border: `2px solid ${teal}`,
					borderRadius: "8px",
					overflow: "hidden",
					display: "flex",
					flexDirection: "column"
				},
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						style: {
							display: "grid",
							gridTemplateColumns: "40px 1fr 80px 80px 100px",
							background: teal,
							color: "white",
							padding: "8px 12px",
							fontWeight: 700,
							fontSize: "11px",
							letterSpacing: "0.5px"
						},
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								style: { textAlign: "center" },
								children: "S.No"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: "Description of Service / Product" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								style: { textAlign: "center" },
								children: "Qty"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								style: { textAlign: "right" },
								children: "Rate"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								style: { textAlign: "right" },
								children: "Amount (₹)"
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						style: {
							minHeight: "300px",
							display: "flex",
							flexDirection: "column"
						},
						children: items && items.length > 0 ? items.map((it, idx) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							style: {
								display: "grid",
								gridTemplateColumns: "40px 1fr 80px 80px 100px",
								padding: "10px 12px",
								borderBottom: "1px solid #e2e8f0",
								fontSize: "11px",
								fontWeight: 500,
								color: "#333"
							},
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									style: { textAlign: "center" },
									children: idx + 1
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: it.description || "Repair Service" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									style: { textAlign: "center" },
									children: it.quantity || 1
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									style: { textAlign: "right" },
									children: (it.unit_price || 0).toFixed(2)
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									style: { textAlign: "right" },
									children: ((it.unit_price || 0) * (it.quantity || 1)).toFixed(2)
								})
							]
						}, idx)) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							style: {
								padding: "12px",
								fontStyle: "italic",
								color: "#888"
							},
							children: "No items billed."
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						style: {
							display: "flex",
							justifyContent: "flex-end",
							background: "#f8fafc",
							borderTop: "2px solid #e2e8f0",
							padding: "12px"
						},
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							style: {
								width: "240px",
								display: "flex",
								flexDirection: "column",
								gap: "8px",
								fontSize: "11px",
								fontWeight: 600
							},
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									style: {
										display: "flex",
										justifyContent: "space-between"
									},
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										style: { color: "#555" },
										children: "Subtotal:"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: ["₹ ", subtotal.toFixed(2)] })]
								}),
								discount > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									style: {
										display: "flex",
										justifyContent: "space-between"
									},
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										style: { color: "#555" },
										children: "Discount:"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										style: { color: "#16a34a" },
										children: ["- ₹ ", discount.toFixed(2)]
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									style: {
										display: "flex",
										justifyContent: "space-between"
									},
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										style: { color: "#555" },
										children: "Taxes (GST):"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: ["₹ ", tax.toFixed(2)] })]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: {
									height: "1px",
									background: "#cbd5e1",
									margin: "4px 0"
								} }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									style: {
										display: "flex",
										justifyContent: "space-between",
										fontSize: "14px",
										fontWeight: 800,
										color: teal
									},
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Grand Total:" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: ["₹ ", total.toFixed(2)] })]
								}),
								advance > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									style: {
										display: "flex",
										justifyContent: "space-between",
										color: "#555",
										marginTop: "4px"
									},
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Advance Paid:" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: ["₹ ", advance.toFixed(2)] })]
								}),
								due > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									style: {
										display: "flex",
										justifyContent: "space-between",
										color: orange,
										fontSize: "12px",
										fontWeight: 800,
										marginTop: "4px"
									},
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Balance Due:" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: ["₹ ", due.toFixed(2)] })]
								})
							]
						})
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: { flex: 1 } }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				style: {
					display: "grid",
					gridTemplateColumns: "1fr 200px",
					gap: "20px"
				},
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					style: {
						fontSize: "10px",
						fontWeight: 700,
						color: teal,
						marginBottom: "4px",
						textTransform: "uppercase"
					},
					children: "Terms & Conditions:"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
					style: {
						margin: 0,
						paddingLeft: "16px",
						fontSize: "9px",
						color: "#555",
						display: "flex",
						flexDirection: "column",
						gap: "4px"
					},
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "All repair parts include a 30-day limited warranty unless stated otherwise." }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Water damaged devices do not carry any warranty." }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Please retain this invoice for any future warranty claims." }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Goods once sold will not be taken back." })
					]
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					style: {
						border: "1.5px solid #e2e8f0",
						borderRadius: "8px",
						position: "relative",
						padding: "16px 20px",
						display: "flex",
						flexDirection: "column",
						justifyContent: "flex-end",
						alignItems: "center",
						background: "#f8fafc",
						height: "100px"
					},
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							style: {
								position: "absolute",
								left: "16px",
								top: "16px",
								color: teal
							},
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PenTool, {
								size: 18,
								strokeWidth: 2
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: {
							borderBottom: "1.5px solid #555",
							width: "100%",
							maxWidth: "180px",
							margin: "40px auto 0"
						} }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							style: {
								textAlign: "center",
								fontSize: "10px",
								fontWeight: 700,
								color: teal,
								textTransform: "uppercase",
								marginTop: "6px",
								letterSpacing: "0.5px"
							},
							children: "AUTHORIZED SIGNATORY"
						})
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				style: {
					background: darkBg,
					color: "#fff",
					borderRadius: "8px",
					marginTop: "16px",
					padding: "16px 20px",
					display: "grid",
					gridTemplateColumns: "1.2fr 0.8fr 1fr",
					gap: "16px",
					flexShrink: 0
				},
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						style: {
							display: "flex",
							gap: "10px",
							alignItems: "flex-start"
						},
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							style: {
								color: orange,
								marginTop: "-2px"
							},
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, {
								size: 16,
								strokeWidth: 2.5
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							style: {
								lineHeight: 1.5,
								fontSize: "9px",
								fontWeight: 500,
								color: "#e2e8f0"
							},
							children: [
								"14-13, Brindavan Gardens 1st Lane,",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
								"Brindavan Gardens, Guntur - 522004,",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
								"Andhra Pradesh, India."
							]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						style: {
							display: "flex",
							gap: "10px",
							alignItems: "flex-start"
						},
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							style: {
								color: teal,
								marginTop: "-2px"
							},
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Phone, {
								size: 16,
								strokeWidth: 2.5
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							style: {
								fontWeight: 600,
								fontSize: "10px",
								lineHeight: 1.5,
								color: "#fff",
								letterSpacing: "0.5px"
							},
							children: [
								"+91 9666984949",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
								"+91 9505225222"
							]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						style: {
							display: "flex",
							gap: "10px",
							alignItems: "flex-start"
						},
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							style: {
								color: orange,
								marginTop: "-2px"
							},
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Globe, {
								size: 16,
								strokeWidth: 2.5
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							style: {
								fontWeight: 600,
								fontSize: "10px",
								color: "#fff",
								letterSpacing: "0.5px",
								marginBottom: "2px"
							},
							children: "rkrepairlabs.vercel.app"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							style: {
								color: "#94a3b8",
								fontSize: "9px",
								fontWeight: 500,
								display: "flex",
								gap: "6px",
								alignItems: "center"
							},
							children: [
								"Facebook ",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									style: { color: teal },
									children: "|"
								}),
								" Instagram",
								" ",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									style: { color: teal },
									children: "|"
								}),
								" YouTube"
							]
						})] })]
					})
				]
			})
		]
	});
});
InvoiceTemplate.displayName = "InvoiceTemplate";
function Section({ icon, title, color, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		style: {
			border: `1.5px solid ${color}`,
			borderRadius: "8px",
			overflow: "hidden",
			display: "flex",
			flexDirection: "column"
		},
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			style: {
				background: color,
				color: "#fff",
				padding: "6px 14px",
				display: "flex",
				alignItems: "center",
				gap: "8px"
			},
			children: [icon, /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				style: {
					fontSize: "11px",
					fontWeight: 800,
					letterSpacing: "0.5px"
				},
				children: title
			})]
		}), children]
	});
}
function FieldRow({ label, value }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		style: {
			display: "flex",
			alignItems: "flex-start",
			fontSize: "10px",
			lineHeight: 1.4
		},
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				style: {
					fontWeight: 600,
					width: "100px",
					flexShrink: 0,
					color: "#444"
				},
				children: label
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				style: {
					marginRight: "6px",
					color: "#777"
				},
				children: ":"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				style: {
					fontWeight: 700,
					color: "#111",
					flex: 1,
					wordBreak: "break-word"
				},
				children: value || "—"
			})
		]
	});
}
async function generatePdfFromHtml({ type, shop, invoice, customer, repair, items }) {
	return new Promise(async (resolve, reject) => {
		try {
			const container = document.createElement("div");
			container.style.position = "absolute";
			container.style.top = "-9999px";
			container.style.left = "-9999px";
			document.body.appendChild(container);
			const root = (0, import_client.createRoot)(container);
			(0, import_react_dom.flushSync)(() => {
				if (type === "invoice") root.render(/* @__PURE__ */ (0, import_jsx_runtime.jsx)(InvoiceTemplate, {
					shop,
					invoice,
					customer,
					repair,
					items
				}));
				else root.render(/* @__PURE__ */ (0, import_jsx_runtime.jsx)(IntakeReceiptTemplate, {
					shop,
					invoice,
					customer,
					repair,
					items
				}));
			});
			await new Promise((r) => setTimeout(r, 500));
			const imgData = await toJpeg(container.firstElementChild, {
				quality: 1,
				backgroundColor: "#ffffff",
				pixelRatio: 2
			});
			root.unmount();
			container.remove();
			const pdf = new import_jspdf_node_min.default({
				orientation: "portrait",
				unit: "pt",
				format: "a4"
			});
			const pdfWidth = pdf.internal.pageSize.getWidth();
			const pdfHeight = pdf.internal.pageSize.getHeight();
			const imgProps = pdf.getImageProperties(imgData);
			const imgHeight = imgProps.height * pdfWidth / imgProps.width;
			pdf.addImage(imgData, "JPEG", 0, 0, pdfWidth, imgHeight);
			if (imgHeight > pdfHeight) {
				pdf.deletePage(1);
				pdf.addPage("a4", "portrait");
				pdf.addImage(imgData, "JPEG", 0, 0, pdfWidth, pdfHeight);
			}
			resolve(pdf);
		} catch (e) {
			reject(e);
		}
	});
}
var invoiceSchema = objectType({
	invoice_no: stringType(),
	customer_id: stringType().nullable().optional(),
	repair_id: stringType().nullable().optional(),
	subtotal: numberType(),
	discount: numberType().nullable().optional(),
	tax_rate: numberType().nullable().optional(),
	tax_amount: numberType().nullable().optional(),
	total: numberType(),
	amount_paid: numberType().nullable().optional(),
	payment_status: stringType(),
	payment_method: stringType().nullable().optional(),
	notes: stringType().nullable().optional()
});
var getInvoicesFn = createServerFn({ method: "GET" }).handler(createSsrRpc("e4e1504ea552ff6d6734316e2b963e23cf8271826388f07ab906c2edee7af74c"));
var createInvoiceFn = createServerFn({ method: "POST" }).validator((data) => invoiceSchema.parse(data)).handler(createSsrRpc("fd28105b5287e4a1ddbfc0b218c909fa33894af5efeb33fd98742b5ac85138cb"));
createServerFn({ method: "POST" }).validator((data) => objectType({
	id: stringType(),
	data: anyType()
}).parse(data)).handler(createSsrRpc("ce61ffc04f347fb344a25beeb85110722cacbb0d2b62376e8dcdf0e4ce847e42"));
var deleteInvoiceFn = createServerFn({ method: "POST" }).validator((id) => stringType().parse(id)).handler(createSsrRpc("6f188c1f4d207f99de28499dd5452f9a59bffd593bec75e024f2f59c509894c5"));
var getInvoiceItemsFn = createServerFn({ method: "GET" }).validator((data) => objectType({ invoice_id: stringType() }).parse(data)).handler(createSsrRpc("190c2a44d3d3fd70e9737c8bbf6c336d30473a51511b2d5a5a0cd7b88688b720"));
var createInvoiceItemsFn = createServerFn({ method: "POST" }).validator((data) => arrayType(objectType({
	invoice_id: stringType(),
	description: stringType(),
	quantity: numberType(),
	unit_price: numberType(),
	total_price: numberType()
})).parse(data)).handler(createSsrRpc("d18de23211e95b78f7f1ce3a96ef1305acfb86f9e689253e7f1235844d98fc79"));
var QUICK_ITEMS = [
	{
		label: "Mobile Charger",
		price: 299
	},
	{
		label: "Screen Guard",
		price: 149
	},
	{
		label: "USB Cable",
		price: 199
	},
	{
		label: "Earphones",
		price: 399
	},
	{
		label: "Back Cover",
		price: 199
	},
	{
		label: "Battery Replacement",
		price: 899
	},
	{
		label: "Display Replacement",
		price: 1999
	},
	{
		label: "Diagnostic Charge",
		price: 200
	}
];
function BillingPage() {
	const qc = useQueryClient();
	const wa = useWaSender();
	const [open, setOpen] = (0, import_react.useState)(false);
	const [items, setItems] = (0, import_react.useState)([{
		description: "Repair charges",
		quantity: 1,
		unit_price: 0
	}]);
	const [discount, setDiscount] = (0, import_react.useState)(0);
	const [gst, setGst] = (0, import_react.useState)(18);
	const [customerId, setCustomerId] = (0, import_react.useState)("");
	const [repairId, setRepairId] = (0, import_react.useState)("");
	const [paymentMode, setPaymentMode] = (0, import_react.useState)("Cash");
	const [paymentStatus, setPaymentStatus] = (0, import_react.useState)("paid");
	const [invoiceNo, setInvoiceNo] = (0, import_react.useState)("");
	const [sendWa, setSendWa] = (0, import_react.useState)(true);
	const [previewPdfUrl, setPreviewPdfUrl] = (0, import_react.useState)(null);
	const { data: invoices = [], isLoading } = useQuery({
		queryKey: ["invoices"],
		queryFn: async () => {
			return await getInvoicesFn();
		}
	});
	const { data: customers = [] } = useQuery({
		queryKey: ["customers-min"],
		queryFn: async () => await getCustomersFn()
	});
	const { data: repairs = [] } = useQuery({
		queryKey: ["repairs-min"],
		queryFn: async () => await getRepairsFn()
	});
	const { data: profile } = useQuery({
		queryKey: ["profile"],
		queryFn: async () => {
			try {
				return await getProfileFn();
			} catch (e) {
				return null;
			}
		}
	});
	const subtotal = items.reduce((s, i) => s + i.quantity * i.unit_price, 0);
	const taxable = Math.max(0, subtotal - discount);
	const gstAmount = taxable * gst / 100;
	const total = taxable + gstAmount;
	const create = useMutation({
		mutationFn: async () => {
			if (items.length === 0 || items.every((i) => !i.description)) throw new Error("Add at least one item");
			const payload = {
				invoice_no: invoiceNo.trim() || `INV-${Date.now().toString().slice(-6)}`,
				customer_id: customerId || null,
				repair_id: repairId || null,
				subtotal,
				discount,
				tax_rate: gst,
				tax_amount: gstAmount,
				total,
				payment_method: paymentMode,
				payment_status: paymentStatus
			};
			const inv = await createInvoiceFn({ data: payload });
			const rows = items.filter((i) => i.description).map((i) => ({
				invoice_id: inv.id,
				description: i.description,
				quantity: i.quantity,
				unit_price: i.unit_price,
				total_price: i.quantity * i.unit_price
			}));
			if (rows.length) await createInvoiceItemsFn({ data: rows });
			return {
				...payload,
				id: inv.id,
				created_at: inv.created_at
			};
		},
		onSuccess: async (inv) => {
			toast.success(`Invoice ${inv.invoice_no} created`);
			qc.invalidateQueries({ queryKey: ["invoices"] });
			qc.invalidateQueries({ queryKey: ["dashboard-stats"] });
			setOpen(false);
			const shouldSend = sendWa;
			const savedCust = customerId;
			setItems([{
				description: "Repair charges",
				quantity: 1,
				unit_price: 0
			}]);
			setDiscount(0);
			setCustomerId("");
			setRepairId("");
			setInvoiceNo("");
			if (shouldSend && savedCust) setTimeout(() => shareWhatsApp(inv), 200);
		},
		onError: (e) => toast.error(e.message)
	});
	const del = useMutation({
		mutationFn: async (id) => {
			await deleteInvoiceFn({ data: id });
		},
		onSuccess: () => {
			qc.invalidateQueries({ queryKey: ["invoices"] });
			toast.success("Deleted");
		}
	});
	async function getPdfDoc(inv) {
		const lineItems = await getInvoiceItemsFn({ data: { invoice_id: inv.id } });
		const cust = customers.find((c) => c.id === inv.customer_id) ?? null;
		const rep = repairs.find((r) => r.id === inv.repair_id) ?? null;
		return generatePdfFromHtml({
			type: "invoice",
			shop: profile ?? null,
			invoice: inv,
			customer: cust,
			repair: rep,
			items: lineItems ?? []
		});
	}
	async function downloadPdf(inv) {
		const tId = toast.loading("Generating PDF...");
		try {
			(await getPdfDoc(inv)).save(`${inv.invoice_no}.pdf`);
			toast.success("Invoice downloaded", { id: tId });
		} catch (e) {
			toast.error(e.message || "Failed to generate PDF", { id: tId });
		}
	}
	async function previewPdf(inv) {
		const tId = toast.loading("Generating preview...");
		try {
			const pdfBlobUrl = (await getPdfDoc(inv)).output("bloburl").toString();
			setPreviewPdfUrl(pdfBlobUrl);
			toast.success("Preview ready", { id: tId });
		} catch (e) {
			console.error(e);
			toast.error(e.message || "Failed to generate preview", { id: tId });
		}
	}
	async function uploadAndGetUrl(inv) {
		(await getPdfDoc(inv)).save(`${inv.invoice_no}.pdf`);
		toast.info("PDF downloaded! Please attach it to the WhatsApp chat when it opens.", { duration: 8e3 });
		return "[Please attach downloaded PDF manually]";
	}
	function resolveWaPhone(cust) {
		const raw = (cust?.whatsapp?.trim() || cust?.phone?.trim() || "").replace(/\D/g, "");
		if (!raw) return null;
		return raw.length === 10 ? `91${raw}` : raw;
	}
	async function shareWhatsApp(inv) {
		const cust = customers.find((c) => c.id === inv.customer_id);
		if (!cust) return toast.error("Walk-in invoice — no customer to send to");
		const phone = resolveWaPhone(cust);
		if (!phone) return toast.error(`${cust.name} has no phone or WhatsApp number on file`);
		const t = toast.loading("Uploading PDF…");
		try {
			const link = await uploadAndGetUrl(inv);
			const tpl = profile?.wa_templates?.invoice ?? "Dear {name}, thank you for choosing {shop}.\n\nInvoice: {invoice_no}\nAmount: {amount}\n\nDownload your invoice here: {link}\n\nWe appreciate your business!";
			const msg = fillTemplate(tpl, {
				name: cust.name,
				invoice_no: inv.invoice_no,
				amount: inrPrecise(inv.total),
				shop: profile?.shop_name ?? "RK Labs",
				link
			});
			toast.success("PDF link ready", { id: t });
			wa.send({
				kind: "invoice",
				phone,
				recipientName: cust.name,
				message: msg,
				invoiceId: inv.id,
				repairId: inv.repair_id ?? null,
				title: `Invoice ${inv.invoice_no}`
			});
		} catch (e) {
			toast.error(e.message ?? "Failed to upload", { id: t });
		}
	}
	async function paymentReminder(inv) {
		const cust = customers.find((c) => c.id === inv.customer_id);
		if (!cust) return toast.error("Walk-in invoice — no customer to remind");
		const phone = resolveWaPhone(cust);
		if (!phone) return toast.error(`${cust.name} has no phone or WhatsApp number on file`);
		const tpl = profile?.wa_templates?.payment_reminder ?? "Dear {name}, gentle reminder: invoice {invoice_no} of {amount} is pending payment. — {shop}";
		const msg = fillTemplate(tpl, {
			name: cust.name,
			invoice_no: inv.invoice_no,
			amount: inrPrecise(inv.total),
			shop: profile?.shop_name ?? "RK Labs"
		});
		wa.send({
			kind: "payment_reminder",
			phone,
			recipientName: cust.name,
			message: msg,
			invoiceId: inv.id,
			repairId: inv.repair_id ?? null,
			title: `Payment reminder — ${inv.invoice_no}`
		});
	}
	const totalRevenue = invoices.filter((i) => i.payment_status === "paid").reduce((s, i) => s + Number(i.total), 0);
	const unpaid = invoices.filter((i) => i.payment_status !== "paid").reduce((s, i) => s + Number(i.total), 0);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-7xl space-y-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-6",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-1.5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
							className: "text-3xl font-bold tracking-tight",
							children: "Billing & GST Invoices"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm text-slate-400",
							children: "Manage invoices, payments, GST and customer billing"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Dialog, {
						open,
						onOpenChange: setOpen,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTrigger, {
							asChild: true,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
								className: "h-10 px-5 shadow-lg transition-transform hover:scale-105 active:scale-95",
								style: {
									background: "var(--gradient-primary)",
									color: "oklch(0.12 0.02 250)"
								},
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "mr-2 h-4 w-4" }), " New invoice"]
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
							className: "glass-strong max-h-[90vh] max-w-3xl overflow-y-auto",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, { children: "Create invoice" }) }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-4",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "grid grid-cols-2 gap-3",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "space-y-1.5",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Customer" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
													value: customerId,
													onChange: (e) => setCustomerId(e.target.value),
													className: "h-9 w-full rounded-md border border-input bg-input/40 px-3 text-sm",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
														value: "",
														children: "— Walk-in —"
													}), customers.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
														value: c.id,
														children: c.name
													}, c.id))]
												})]
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "space-y-1.5",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Repair ticket" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
													value: repairId,
													onChange: (e) => setRepairId(e.target.value),
													className: "h-9 w-full rounded-md border border-input bg-input/40 px-3 text-sm",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
														value: "",
														children: "— None —"
													}), repairs.map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
														value: r.id,
														children: r.ticket_no
													}, r.id))]
												})]
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "space-y-1.5",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Label, { children: [
												"Invoice number",
												" ",
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "text-xs text-muted-foreground",
													children: "(letters + numbers — leave blank to auto-generate)"
												})
											] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
												placeholder: "e.g. INV-2026-042 or RK/INV/0421",
												value: invoiceNo,
												onChange: (e) => setInvoiceNo(e.target.value),
												maxLength: 40
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "space-y-2",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Quick add — common items" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "flex flex-wrap gap-2",
												children: QUICK_ITEMS.map((q) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
													type: "button",
													size: "sm",
													variant: "outline",
													onClick: () => {
														setItems((prev) => {
															const empty = prev.findIndex((p) => !p.description.trim());
															const newItem = {
																description: q.label,
																quantity: 1,
																unit_price: q.price
															};
															if (empty >= 0) return prev.map((p, i) => i === empty ? newItem : p);
															return [...prev, newItem];
														});
													},
													children: [
														/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "mr-1 h-3 w-3" }),
														" ",
														q.label,
														" · ",
														inr(q.price)
													]
												}, q.label))
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "space-y-2",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Line items" }),
												items.map((it, idx) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "grid grid-cols-[1fr_70px_110px_110px_40px] gap-2",
													children: [
														/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
															placeholder: "Description",
															value: it.description,
															onChange: (e) => setItems(items.map((x, i) => i === idx ? {
																...x,
																description: e.target.value
															} : x))
														}),
														/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
															type: "number",
															min: 0,
															value: it.quantity,
															onChange: (e) => setItems(items.map((x, i) => i === idx ? {
																...x,
																quantity: Number(e.target.value)
															} : x))
														}),
														/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
															type: "number",
															step: "0.01",
															placeholder: "Unit ₹",
															value: it.unit_price,
															onChange: (e) => setItems(items.map((x, i) => i === idx ? {
																...x,
																unit_price: Number(e.target.value)
															} : x))
														}),
														/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
															className: "grid h-9 place-items-center rounded-md border border-white/10 bg-white/5 text-sm",
															children: inr(it.quantity * it.unit_price)
														}),
														/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
															type: "button",
															variant: "ghost",
															size: "icon",
															onClick: () => setItems(items.filter((_, i) => i !== idx)),
															children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "h-4 w-4" })
														})
													]
												}, idx)),
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
													type: "button",
													variant: "outline",
													size: "sm",
													onClick: () => setItems([...items, {
														description: "",
														quantity: 1,
														unit_price: 0
													}]),
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "mr-1 h-4 w-4" }), " Add line"]
												})
											]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "grid grid-cols-3 gap-3",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "space-y-1.5",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Discount (₹)" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
														type: "number",
														value: discount,
														onChange: (e) => setDiscount(Number(e.target.value))
													})]
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "space-y-1.5",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "GST %" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
														type: "number",
														value: gst,
														onChange: (e) => setGst(Number(e.target.value))
													})]
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "space-y-1.5",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Payment mode" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
														value: paymentMode,
														onChange: (e) => setPaymentMode(e.target.value),
														className: "h-9 w-full rounded-md border border-input bg-input/40 px-3 text-sm",
														children: [
															/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: "Cash" }),
															/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: "UPI" }),
															/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: "Card" }),
															/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: "Bank Transfer" })
														]
													})]
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "space-y-1.5",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Status" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
														value: paymentStatus,
														onChange: (e) => setPaymentStatus(e.target.value),
														className: "h-9 w-full rounded-md border border-input bg-input/40 px-3 text-sm",
														children: [
															/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
																value: "paid",
																children: "Paid"
															}),
															/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
																value: "partial",
																children: "Partial"
															}),
															/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
																value: "unpaid",
																children: "Unpaid"
															})
														]
													})]
												})
											]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "glass rounded-xl p-4 text-sm",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
													label: "Subtotal",
													value: inrPrecise(subtotal)
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
													label: "Discount",
													value: `- ${inrPrecise(discount)}`
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
													label: `GST (${gst}%)`,
													value: inrPrecise(gstAmount)
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "my-2 h-px bg-white/10" }),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
													label: "TOTAL",
													value: inrPrecise(total),
													bold: true
												})
											]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
											className: "flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-xs",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
												type: "checkbox",
												checked: sendWa,
												onChange: (e) => setSendWa(e.target.checked),
												disabled: !customerId,
												className: "h-4 w-4 accent-[var(--neon)]"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: ["Send invoice PDF to customer on WhatsApp after creating", !customerId && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "ml-1 text-muted-foreground",
												children: "(select a customer to enable)"
											})] })]
										})
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogFooter, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									onClick: () => create.mutate(),
									disabled: create.isPending,
									style: {
										background: "var(--gradient-primary)",
										color: "oklch(0.12 0.02 250)"
									},
									children: "Create invoice"
								}) })
							]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
						open: !!previewPdfUrl,
						onOpenChange: (o) => !o && setPreviewPdfUrl(null),
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
							className: "glass-strong max-h-[95vh] w-[95vw] max-w-5xl overflow-hidden p-0 flex flex-col border-white/20",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogHeader, {
									className: "p-4 border-b border-white/10 shrink-0 bg-slate-900/50",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, {
										className: "text-lg font-semibold tracking-tight",
										children: "Invoice Preview"
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "flex-1 min-h-[75vh] w-full bg-[#323639] relative",
									children: previewPdfUrl && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("iframe", {
										src: previewPdfUrl,
										className: "absolute inset-0 w-full h-full border-0 bg-white",
										title: "PDF Preview"
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogFooter, {
									className: "p-4 border-t border-white/10 shrink-0 bg-slate-900/50",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
										variant: "outline",
										className: "px-6",
										onClick: () => setPreviewPdfUrl(null),
										children: "Close"
									})
								})
							]
						})
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
						icon: Receipt,
						label: "Total Invoices",
						value: String(invoices.length),
						type: "primary"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
						icon: IndianRupee,
						label: "Collected Revenue",
						value: inr(totalRevenue),
						type: "success"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
						icon: IndianRupee,
						label: "Pending Payment",
						value: inr(unpaid),
						type: "warning"
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "rounded-2xl border border-white/10 bg-[#0f172a]/95 backdrop-blur-md overflow-hidden shadow-xl",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "overflow-x-auto",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
						className: "w-full text-sm whitespace-nowrap",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", {
							className: "bg-slate-900/50 text-[11px] uppercase tracking-widest text-slate-400",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "px-4 py-4 text-left font-semibold",
									children: "Invoice"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "px-4 py-4 text-left font-semibold",
									children: "Customer"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "px-4 py-4 text-left font-semibold",
									children: "Date"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "px-4 py-4 text-right font-semibold",
									children: "Total"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "px-4 py-4 text-left font-semibold",
									children: "Status"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "px-4 py-4 text-right font-semibold",
									children: "Actions"
								})
							] })
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tbody", {
							className: "divide-y divide-white/5",
							children: [
								isLoading && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tr", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									colSpan: 6,
									className: "py-16 text-center text-muted-foreground",
									children: "Loading invoices..."
								}) }),
								!isLoading && invoices.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tr", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									colSpan: 6,
									className: "py-16 text-center text-muted-foreground",
									children: "No invoices yet. Create your first invoice to start managing billing and GST records."
								}) }),
								invoices.map((inv) => {
									const c = customers.find((x) => x.id === inv.customer_id);
									return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
										className: "group transition-colors hover:bg-white/[0.02]",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
												className: "px-4 py-3.5 font-mono text-xs font-semibold text-slate-200",
												children: inv.invoice_no
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
												className: "px-4 py-3.5 font-medium text-slate-300",
												children: c?.name ?? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "text-slate-500",
													children: "Walk-in"
												})
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
												className: "px-4 py-3.5 text-slate-400",
												children: fmtDate(inv.created_at)
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
												className: "px-4 py-3.5 text-right font-semibold text-slate-200",
												children: inr(inv.total)
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
												className: "px-4 py-3.5",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
													variant: "outline",
													className: cn("px-2 py-0.5 text-[10px] uppercase tracking-wider font-bold rounded-md border", {
														paid: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
														partial: "bg-amber-500/10 text-amber-400 border-amber-500/20",
														unpaid: "bg-red-500/10 text-red-400 border-red-500/20"
													}[inv.payment_status]),
													children: inv.payment_status
												})
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
												className: "px-4 py-3.5 text-right",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "flex items-center justify-end gap-1 opacity-80 group-hover:opacity-100 transition-opacity",
													children: [
														/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
															size: "icon",
															variant: "ghost",
															className: "h-8 w-8 hover:bg-white/10 hover:text-white",
															title: "Preview PDF",
															onClick: () => previewPdf(inv),
															children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Eye, { className: "h-4 w-4" })
														}),
														/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
															size: "icon",
															variant: "ghost",
															className: "h-8 w-8 hover:bg-white/10 hover:text-white",
															title: "Download PDF",
															onClick: () => downloadPdf(inv),
															children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileDown, { className: "h-4 w-4" })
														}),
														/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
															size: "icon",
															variant: "ghost",
															className: "h-8 w-8 hover:bg-[var(--neon)]/20 hover:text-[var(--neon)] text-[var(--neon)]",
															title: "Send PDF on WhatsApp",
															onClick: () => shareWhatsApp(inv),
															children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Send, { className: "h-4 w-4" })
														}),
														inv.payment_status !== "paid" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
															size: "icon",
															variant: "ghost",
															className: "h-8 w-8 hover:bg-amber-500/20 hover:text-amber-400 text-amber-300",
															title: "Payment reminder",
															onClick: () => paymentReminder(inv),
															children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MessageCircle, { className: "h-4 w-4" })
														}),
														/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
															size: "icon",
															variant: "ghost",
															className: "h-8 w-8 hover:bg-red-500/20 hover:text-red-400 text-red-400/80",
															title: "Delete Invoice",
															onClick: () => {
																if (confirm(`Delete ${inv.invoice_no}?`)) del.mutate(inv.id);
															},
															children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "h-4 w-4" })
														})
													]
												})
											})
										]
									}, inv.id);
								})
							]
						})]
					})
				})
			})
		]
	});
}
function Row({ label, value, bold }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex justify-between py-1 " + (bold ? "text-base font-bold" : ""),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "text-muted-foreground",
			children: label
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: value })]
	});
}
function Stat({ icon: Icon, label, value, type }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-white/10 bg-[#0f172a]/80 backdrop-blur-xl p-5 shadow-lg transition-all hover:bg-white/5 hover:border-white/20",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-center justify-between",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "text-[11px] font-bold uppercase tracking-widest text-slate-400",
				children: label
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: cn("grid h-9 w-9 place-items-center rounded-xl border", {
					primary: "text-cyan-400 border-cyan-400/20 bg-cyan-400/10",
					success: "text-emerald-400 border-emerald-400/20 bg-emerald-400/10",
					warning: "text-amber-400 border-amber-400/20 bg-amber-400/10"
				}[type]),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "h-4 w-4" })
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-3 text-3xl font-bold tracking-tight text-slate-100",
			children: value
		})]
	});
}
//#endregion
export { BillingPage as component };
