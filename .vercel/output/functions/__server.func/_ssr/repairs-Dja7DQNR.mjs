import { o as __toESM } from "../_runtime.mjs";
import { l as require_react_dom, u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { o as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { t as Button } from "./button-C1KSxKmF.mjs";
import { Ct as CalendarX, G as MapPin, I as Package, J as LoaderCircle, M as Phone, N as PenTool, O as Printer, Q as IndianRupee, St as Calendar, Tt as CalendarClock, U as MessageCircle, X as Laptop, Z as Languages, bt as Check, c as UserPlus, ft as Clock, gt as CircleCheck, j as Plus, m as Trash2, n as X, nt as FileText, o as User, pt as ClipboardList, r as Wrench, tt as Globe, v as SquarePen, w as Search, wt as CalendarPlus, y as Sparkles } from "../_libs/lucide-react.mjs";
import { L as isRedirect, S as useRouter } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as Input } from "./input-CCCvLIdb.mjs";
import { t as Textarea } from "./textarea-C3L8366G.mjs";
import { n as createServerFn } from "./server-De111qI3.mjs";
import { t as createSsrRpc } from "./createSsrRpc-CtdFS2cZ.mjs";
import { a as inrPdf, i as inr, n as fmtDate, o as inrPrecise, r as fmtDateTime, t as fillTemplate } from "./format-DOFCsm48.mjs";
import { n as googleCalendarUrl, t as downloadIcs } from "./calendar-C42Bqs_0.mjs";
import { a as objectType, o as stringType } from "../_libs/zod.mjs";
import { i as useQueryClient, n as useQuery, t as useMutation } from "../_libs/tanstack__react-query.mjs";
import { r as meFn } from "./auth-BcHM1GNH.mjs";
import { t as toast } from "../_libs/sonner.mjs";
import { t as Label } from "./label-BhFXZmyO.mjs";
import { i as getCustomersFn } from "./customers-Cs5FLpVT.mjs";
import { a as DialogTitle, i as DialogHeader, n as DialogContent, o as DialogTrigger, r as DialogFooter, t as Dialog } from "./dialog-CMoNC1Ou.mjs";
import { t as Badge } from "./badge-eXqQHFo7.mjs";
import { n as useWaSender } from "./wa-sender-D87O9muQ.mjs";
import { a as getAppointmentEventsFn, c as getWaLogsFn, i as deleteRepairFn, l as updateRepairFn, n as createRepairFn, o as getRepairNotesFn, r as createRepairNoteFn, s as getRepairsFn, t as createAppointmentEventFn, u as updateRepairNoteFn } from "./repairs-DllhEgbp.mjs";
import { t as require_client } from "../_libs/react-dom+scheduler.mjs";
import { t as require_jspdf_node_min } from "../_libs/jspdf.mjs";
import { t as QRCodeCanvas } from "../_libs/qrcode.react.mjs";
import { t as require_JsBarcode } from "../_libs/jsbarcode.mjs";
import { a as SelectValue, i as SelectTrigger, n as SelectContent, r as SelectItem, t as Select } from "./select-CsgUQnBO.mjs";
import { t as autoTable } from "../_libs/jspdf-autotable.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/repairs-Dja7DQNR.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var import_client = require_client();
var import_react_dom = /* @__PURE__ */ __toESM(require_react_dom());
var import_jspdf_node_min = /* @__PURE__ */ __toESM(require_jspdf_node_min());
var import_JsBarcode = /* @__PURE__ */ __toESM(require_JsBarcode());
function useServerFn(serverFn) {
	const router = useRouter();
	return import_react.useCallback(async (...args) => {
		try {
			const res = await serverFn(...args);
			if (isRedirect(res)) throw res;
			return res;
		} catch (err) {
			if (isRedirect(err)) {
				err.options._fromLocation = router.stores.location.get();
				return router.navigate(router.resolveRedirect(err).options);
			}
			throw err;
		}
	}, [router, serverFn]);
}
var InputSchema = objectType({ text: stringType().min(1).max(2e3) });
var translateToEnglish = createServerFn({ method: "POST" }).validator((data) => InputSchema.parse(data)).handler(createSsrRpc("2419784f4e39137736b6c58698b36b1aa6468ee5bb6d6790f626e323e18a3f64"));
function buildAdvanceReceiptPdf(input) {
	const { shop, ticket_no, created_at, customer, device, issue, estimated_cost, advance_amount, payment_mode } = input;
	const doc = new import_jspdf_node_min.default();
	doc.setFontSize(20);
	doc.setFont("helvetica", "bold");
	doc.text(shop?.shop_name || "RK Labs", 14, 20);
	doc.setFontSize(9);
	doc.setFont("helvetica", "normal");
	if (shop?.shop_address) doc.text(shop.shop_address, 14, 27);
	if (shop?.shop_phone) doc.text(`Phone: ${shop.shop_phone}`, 14, 32);
	if (shop?.gst_number) doc.text(`GSTIN: ${shop.gst_number}`, 14, 37);
	doc.setFontSize(14);
	doc.setFont("helvetica", "bold");
	doc.text("ADVANCE RECEIPT", 200, 20, { align: "right" });
	doc.setFontSize(9);
	doc.setFont("helvetica", "normal");
	doc.text(`Ticket: ${ticket_no}`, 200, 27, { align: "right" });
	doc.text(`Date: ${fmtDateTime(created_at)}`, 200, 32, { align: "right" });
	doc.setDrawColor(200);
	doc.line(14, 44, 200, 44);
	doc.setFont("helvetica", "bold");
	doc.text("Customer", 14, 52);
	doc.setFont("helvetica", "normal");
	doc.text(customer?.name || "Walk-in", 14, 58);
	if (customer?.phone) doc.text(`Phone: ${customer.phone}`, 14, 63);
	if (customer?.address) doc.text(customer.address, 14, 68);
	doc.setFont("helvetica", "bold");
	doc.text("Device", 120, 52);
	doc.setFont("helvetica", "normal");
	doc.text(`${device?.brand ?? ""} ${device?.model ?? ""}`.trim() || device?.type || "—", 120, 58);
	if (device?.type) doc.text(`Type: ${device.type}`, 120, 63);
	if (device?.imei) doc.text(`IMEI/SN: ${device.imei}`, 120, 68);
	autoTable(doc, {
		startY: 78,
		head: [["Reported Issue"]],
		body: [[issue]],
		theme: "grid",
		headStyles: { fillColor: [
			30,
			41,
			59
		] }
	});
	const y = doc.lastAutoTable.finalY + 10;
	const balance = Math.max(0, estimated_cost - advance_amount);
	autoTable(doc, {
		startY: y,
		theme: "plain",
		body: [
			["Estimated cost", inrPdf(estimated_cost)],
			["Advance received", inrPdf(advance_amount)],
			["Balance due (on delivery)", inrPdf(balance)],
			["Payment mode", payment_mode || "—"]
		],
		styles: { fontSize: 11 },
		columnStyles: {
			0: { fontStyle: "bold" },
			1: { halign: "right" }
		}
	});
	doc.setFontSize(8);
	doc.setTextColor(120);
	doc.text("Note: This is an advance receipt. Estimated cost may vary based on final diagnosis. Balance is payable at delivery.", 14, 275);
	doc.text("Customer Signature: ____________________", 14, 285);
	doc.text("Authorised Signatory", 200, 285, { align: "right" });
	return doc;
}
/**
* Renders a React SVG component into an invisible DOM node,
* draws it to a canvas, and returns a base64 PNG data URL
* perfectly suited for native jsPDF injection.
*/
async function getIconDataUrl(IconElement, color = "#000000", size = 24) {
	return new Promise((resolve, reject) => {
		const div = document.createElement("div");
		div.style.position = "absolute";
		div.style.left = "-9999px";
		div.style.top = "-9999px";
		div.style.width = `${size}px`;
		div.style.height = `${size}px`;
		document.body.appendChild(div);
		const root = (0, import_client.createRoot)(div);
		(0, import_react_dom.flushSync)(() => {
			root.render(/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				style: { color },
				children: IconElement
			}));
		});
		const svgElement = div.querySelector("svg");
		if (!svgElement) {
			root.unmount();
			div.remove();
			return reject(/* @__PURE__ */ new Error("No SVG element rendered by IconElement"));
		}
		svgElement.setAttribute("width", size.toString());
		svgElement.setAttribute("height", size.toString());
		const svgData = new XMLSerializer().serializeToString(svgElement);
		const svgBlob = new Blob([svgData], { type: "image/svg+xml;charset=utf-8" });
		const url = URL.createObjectURL(svgBlob);
		const img = new Image();
		img.crossOrigin = "anonymous";
		img.onload = () => {
			const canvas = document.createElement("canvas");
			const scale = 4;
			canvas.width = size * scale;
			canvas.height = size * scale;
			const ctx = canvas.getContext("2d");
			if (ctx) {
				ctx.scale(scale, scale);
				ctx.drawImage(img, 0, 0, size, size);
				resolve(canvas.toDataURL("image/png"));
			} else reject(/* @__PURE__ */ new Error("Failed to get 2D context"));
			URL.revokeObjectURL(url);
			root.unmount();
			div.remove();
		};
		img.onerror = (e) => {
			URL.revokeObjectURL(url);
			root.unmount();
			div.remove();
			reject(e);
		};
		img.src = url;
	});
}
function drawRibbon(doc, text, x, y, w, h, color, icon) {
	doc.setFillColor(color[0], color[1], color[2]);
	doc.rect(x, y, w - h, h, "F");
	doc.triangle(x + w - h, y, x + w, y, x + w - h, y + h, "F");
	doc.setTextColor(255, 255, 255);
	doc.setFont("helvetica", "bold");
	doc.setFontSize(7);
	if (icon) {
		doc.addImage(icon, "PNG", x + 5, y + 2, h - 4, h - 4);
		doc.text(text, x + h + 5, y + h - 4);
	} else doc.text(text, x + 8, y + h - 4);
}
async function buildIntakeReceiptPdf({ shop, invoice, customer, repair }) {
	const doc = new import_jspdf_node_min.default({
		orientation: "portrait",
		unit: "pt",
		format: "a4"
	});
	const teal = [
		0,
		138,
		154
	];
	const orange = [
		244,
		122,
		33
	];
	const darkBg = [
		17,
		24,
		39
	];
	const jobID = repair?.ticket_no || invoice?.invoice_no || "RKRL-JOB-001";
	let dateStr = "";
	let timeStr = "";
	try {
		const d = new Date(repair?.created_at || invoice?.created_at || Date.now());
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
	} catch (e) {}
	const verifyUrl = `https://rkrepairlabs.com/track/${jobID}`;
	const tempDiv = document.createElement("div");
	tempDiv.style.position = "absolute";
	tempDiv.style.left = "-9999px";
	document.body.appendChild(tempDiv);
	const root = (0, import_client.createRoot)(tempDiv);
	(0, import_react_dom.flushSync)(() => {
		root.render(/* @__PURE__ */ (0, import_jsx_runtime.jsx)(QRCodeCanvas, {
			id: `temp-qr-intake-${jobID}`,
			value: verifyUrl,
			size: 100,
			level: "M",
			marginSize: 1
		}));
	});
	await new Promise((resolve) => setTimeout(resolve, 50));
	const qrCanvas = document.getElementById(`temp-qr-intake-${jobID}`);
	const qrDataUrl = qrCanvas ? qrCanvas.toDataURL("image/png") : "";
	root.unmount();
	tempDiv.remove();
	const barcodeCanvas = document.createElement("canvas");
	(0, import_JsBarcode.default)(barcodeCanvas, jobID, {
		displayValue: false,
		margin: 0,
		height: 40,
		width: 2
	});
	const barcodeDataUrl = barcodeCanvas.toDataURL("image/png");
	const calendarIcon = await getIconDataUrl(/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Calendar, {}), "#ffffff", 14);
	const clockIcon = await getIconDataUrl(/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock, {}), "#ffffff", 14);
	const checkIcon = await getIconDataUrl(/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, {}), "#F47A21", 12);
	const checkWhiteIcon = await getIconDataUrl(/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, {}), "#ffffff", 14);
	const locIcon = await getIconDataUrl(/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, {}), "#F47A21", 16);
	const phoneIcon = await getIconDataUrl(/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Phone, {}), "#008A9A", 16);
	const webIcon = await getIconDataUrl(/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Globe, {}), "#008A9A", 16);
	const penIcon = await getIconDataUrl(/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PenTool, {}), "#008A9A", 32);
	const userWhite = await getIconDataUrl(/* @__PURE__ */ (0, import_jsx_runtime.jsx)(User, {}), "#ffffff", 14);
	const laptopWhite = await getIconDataUrl(/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Laptop, {}), "#ffffff", 14);
	const wrenchWhite = await getIconDataUrl(/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Wrench, {}), "#ffffff", 14);
	const packageWhite = await getIconDataUrl(/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Package, {}), "#ffffff", 14);
	const fileTextWhite = await getIconDataUrl(/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileText, {}), "#ffffff", 14);
	const rupeeWhite = await getIconDataUrl(/* @__PURE__ */ (0, import_jsx_runtime.jsx)(IndianRupee, {}), "#ffffff", 14);
	const marginX = 24;
	const drawHeader = (doc) => {
		doc.setFillColor(darkBg[0], darkBg[1], darkBg[2]);
		doc.rect(0, 0, 170, 170, "F");
		doc.triangle(170, 0, 240, 0, 170, 170, "F");
		doc.setDrawColor(teal[0], teal[1], teal[2]);
		doc.setLineWidth(3);
		doc.circle(85, 85, 65, "S");
		doc.setDrawColor(orange[0], orange[1], orange[2]);
		doc.setLineWidth(1);
		doc.circle(85, 85, 70, "S");
		doc.setFont("helvetica", "bold");
		doc.setTextColor(teal[0], teal[1], teal[2]);
		doc.setFontSize(54);
		doc.text("R", 50, 98);
		doc.setTextColor(orange[0], orange[1], orange[2]);
		doc.text("K", 92, 98);
		doc.setFillColor(255, 255, 255);
		doc.rect(35, 125, 100, 20, "F");
		doc.setTextColor(darkBg[0], darkBg[1], darkBg[2]);
		doc.setFontSize(9);
		doc.text("REPAIR LABS", 85, 139, { align: "center" });
		doc.setTextColor(teal[0], teal[1], teal[2]);
		doc.setFontSize(32);
		doc.text("RK", 230, 65);
		doc.setTextColor(orange[0], orange[1], orange[2]);
		doc.text("REPAIR LABS", 280, 65);
		doc.setTextColor(50, 50, 50);
		doc.setFontSize(10);
		doc.text("Expert hands - Trusted repairs", 230, 85);
		doc.setFontSize(8.5);
		doc.setTextColor(30, 30, 30);
		doc.text("LAPTOP REPAIR", 230, 110);
		doc.setTextColor(200, 200, 200);
		doc.text("|", 305, 110);
		doc.setTextColor(30, 30, 30);
		doc.text("MOBILE REPAIR", 315, 110);
		doc.setTextColor(200, 200, 200);
		doc.text("|", 385, 110);
		doc.setTextColor(30, 30, 30);
		doc.text("MACBOOK REPAIR", 230, 125);
		doc.setTextColor(200, 200, 200);
		doc.text("|", 315, 125);
		doc.setTextColor(30, 30, 30);
		doc.text("TABLET REPAIR", 325, 125);
		doc.setTextColor(10, 10, 10);
		doc.setFontSize(22);
		doc.setFont("helvetica", "bold");
		doc.text("REPAIR INTAKE", 571.28, 35, { align: "right" });
		doc.text("RECEIPT", 571.28, 60, { align: "right" });
		doc.setDrawColor(orange[0], orange[1], orange[2]);
		doc.setLineWidth(1.5);
		doc.rect(431.28, 75, 140, 45, "S");
		doc.setFillColor(teal[0], teal[1], teal[2]);
		doc.rect(461.28, 68, 80, 14, "F");
		doc.setTextColor(255, 255, 255);
		doc.setFontSize(8);
		doc.text("JOB ID", 501.28, 78, { align: "center" });
		doc.setTextColor(orange[0], orange[1], orange[2]);
		doc.setFontSize(18);
		doc.text(jobID, 501.28, 105, { align: "center" });
		doc.setFont("helvetica", "normal");
		doc.addImage(barcodeDataUrl, "PNG", 441.28, 125, 120, 30);
		doc.setDrawColor(teal[0], teal[1], teal[2]);
		doc.setLineWidth(3);
		doc.line(marginX, 150, 571.28, 150);
	};
	const drawFooter = (doc) => {
		const fY = 771.89;
		doc.setFillColor(darkBg[0], darkBg[1], darkBg[2]);
		doc.rect(marginX, fY, 547.28, 55, "F");
		doc.addImage(locIcon, "PNG", 39, 791.89, 14, 14);
		doc.setTextColor(220, 220, 220);
		doc.setFont("helvetica", "normal");
		doc.setFontSize(7);
		doc.text("14-13, Brindavan Gardens 1st Lane,", 59, 797.89);
		doc.text("Guntur - 522004, AP, India.", 59, 807.89);
		doc.addImage(phoneIcon, "PNG", 244, 791.89, 14, 14);
		doc.setTextColor(255, 255, 255);
		doc.text("+91 9666984949", 264, 797.89);
		doc.text("+91 9505225222", 264, 807.89);
		doc.addImage(webIcon, "PNG", 394, 791.89, 14, 14);
		doc.setTextColor(255, 255, 255);
		doc.text("rkrepairlabs.vercel.app", 414, 797.89);
		doc.setTextColor(150, 150, 150);
		doc.text("Facebook | Instagram | YouTube", 414, 807.89);
	};
	let currentY = 175;
	drawHeader(doc);
	const dateW = 532.28 / 2;
	const timeX = 305.14;
	doc.setDrawColor(teal[0], teal[1], teal[2]);
	doc.setLineWidth(.5);
	doc.setFillColor(255, 255, 255);
	doc.rect(marginX, currentY, dateW, 36, "S");
	doc.rect(timeX, currentY, dateW, 36, "S");
	doc.setFillColor(teal[0], teal[1], teal[2]);
	doc.rect(marginX, currentY, 36, 36, "F");
	doc.rect(timeX, currentY, 36, 36, "F");
	doc.addImage(calendarIcon, "PNG", 34, currentY + 10, 16, 16);
	doc.addImage(clockIcon, "PNG", 315.14, currentY + 10, 16, 16);
	doc.setTextColor(teal[0], teal[1], teal[2]);
	doc.setFontSize(9);
	doc.setFont("helvetica", "bold");
	doc.text("DATE", 72, currentY + 16);
	doc.text("TIME", 353.14, currentY + 16);
	doc.setTextColor(20, 20, 20);
	doc.setFontSize(11);
	doc.setFont("helvetica", "bold");
	doc.text(dateStr, 72, currentY + 30);
	doc.text(timeStr, 353.14, currentY + 30);
	doc.setDrawColor(200, 200, 200);
	doc.line(72, currentY + 32, 275.14, currentY + 32);
	doc.line(353.14, currentY + 32, 556.28, currentY + 32);
	currentY += 55;
	const leftColW = 280;
	const rightColW = 267.28 - 15;
	const rightX = 319;
	doc.setDrawColor(teal[0], teal[1], teal[2]);
	doc.setLineWidth(.5);
	doc.rect(marginX, currentY + 7, leftColW, 75, "S");
	drawRibbon(doc, "CUSTOMER DETAILS", 19, currentY, 140, 14, teal, userWhite);
	doc.setTextColor(100, 100, 100);
	doc.setFontSize(8);
	doc.text("Customer Name :", 39, currentY + 32);
	doc.text("Mobile No.         :", 39, currentY + 48);
	doc.text("Email ID            :", 39, currentY + 64);
	doc.setTextColor(20, 20, 20);
	doc.setFont("helvetica", "bold");
	doc.text(customer?.name || "Walk-in Customer", 109, currentY + 32);
	doc.text(customer?.phone || "N/A", 109, currentY + 48);
	doc.text(customer?.email || "N/A", 109, currentY + 64);
	doc.setDrawColor(200, 200, 200);
	doc.line(109, currentY + 35, 289, currentY + 35);
	doc.line(109, currentY + 51, 289, currentY + 51);
	doc.line(109, currentY + 67, 289, currentY + 67);
	doc.setFont("helvetica", "normal");
	currentY += 100;
	doc.setDrawColor(teal[0], teal[1], teal[2]);
	doc.rect(marginX, currentY + 7, leftColW, 105, "S");
	drawRibbon(doc, "DEVICE DETAILS", 19, currentY, 130, 14, teal, laptopWhite);
	doc.setTextColor(100, 100, 100);
	doc.setFontSize(8);
	doc.text("Device Type   :", 39, currentY + 32);
	doc.text("Brand/Model :", 39, currentY + 50);
	doc.text("Serial/IMEI   :", 39, currentY + 68);
	doc.text("Password       :", 39, currentY + 86);
	doc.setTextColor(20, 20, 20);
	doc.setFont("helvetica", "bold");
	doc.text(repair?.device_type || "N/A", 109, currentY + 32);
	doc.text(`${repair?.device_brand || ""} ${repair?.device_model || ""}`.trim() || "N/A", 109, currentY + 50);
	doc.text(repair?.imei || "N/A", 109, currentY + 68);
	doc.text(repair?.password || "N/A", 109, currentY + 86);
	doc.setDrawColor(200, 200, 200);
	doc.line(109, currentY + 35, 289, currentY + 35);
	doc.line(109, currentY + 53, 289, currentY + 53);
	doc.line(109, currentY + 71, 289, currentY + 71);
	doc.line(109, currentY + 89, 289, currentY + 89);
	doc.setFont("helvetica", "normal");
	currentY += 130;
	doc.setDrawColor(teal[0], teal[1], teal[2]);
	doc.rect(marginX, currentY + 7, leftColW, 75, "S");
	drawRibbon(doc, "REPORTED PROBLEM", 19, currentY, 140, 14, teal, wrenchWhite);
	doc.setTextColor(100, 100, 100);
	doc.setFontSize(8);
	doc.text("Reported Problem / Fault Description :", 39, currentY + 30);
	doc.setTextColor(20, 20, 20);
	doc.setFont("helvetica", "bold");
	doc.text(repair?.issue || "N/A", 39, currentY + 48);
	doc.setDrawColor(200, 200, 200);
	doc.line(39, currentY + 51, 289, currentY + 51);
	doc.line(39, currentY + 67, 289, currentY + 67);
	doc.setFont("helvetica", "normal");
	currentY += 100;
	doc.setDrawColor(teal[0], teal[1], teal[2]);
	doc.rect(marginX, currentY + 7, leftColW, 70, "S");
	drawRibbon(doc, "ACCESSORIES RECEIVED", 19, currentY, 160, 14, teal, packageWhite);
	doc.setTextColor(100, 100, 100);
	doc.setFontSize(8);
	doc.text("[ ] Charger     [ ] Battery     [ ] Bag     [ ] Box     [ ] Other", 39, currentY + 35);
	doc.text("Other Notes : ", 39, currentY + 58);
	doc.setDrawColor(200, 200, 200);
	doc.line(99, currentY + 60, 289, currentY + 60);
	let rightY = 175;
	doc.setDrawColor(teal[0], teal[1], teal[2]);
	doc.rect(rightX, rightY + 7, rightColW, 80, "S");
	drawRibbon(doc, "SCAN TO TRACK REPAIR STATUS", 314, rightY, 180, 14, teal);
	doc.addImage(qrDataUrl, "PNG", 334, rightY + 22, 55, 55);
	doc.setTextColor(50, 50, 50);
	doc.setFontSize(8);
	doc.text("Scan QR to", 399, rightY + 38);
	doc.text("check real-time", 399, rightY + 48);
	doc.text("repair status", 399, rightY + 58);
	doc.text("of your device.", 399, rightY + 68);
	doc.setDrawColor(orange[0], orange[1], orange[2]);
	doc.setLineWidth(1);
	doc.line(449, rightY + 73, 439, rightY + 73);
	doc.line(439, rightY + 73, 442, rightY + 70);
	rightY += 105;
	doc.setDrawColor(teal[0], teal[1], teal[2]);
	doc.rect(rightX, rightY + 7, rightColW, 125, "S");
	drawRibbon(doc, "DEVICE CONDITION AT INTAKE", 314, rightY, 170, 14, teal, fileTextWhite);
	doc.setTextColor(100, 100, 100);
	doc.setFontSize(8);
	doc.text("[ ] Power ON", 334, rightY + 34);
	doc.text("[ ] Power OFF", 334, rightY + 51);
	doc.text("[ ] Display OK", 334, rightY + 68);
	doc.text("[ ] No Display", 334, rightY + 85);
	doc.text("[ ] Screen Cracked", 334, rightY + 102);
	doc.text("[ ] Water Damage", 449, rightY + 34);
	doc.text("[ ] Physical Damage", 449, rightY + 51);
	doc.text("[ ] Scratches / Dents", 449, rightY + 68);
	doc.text("[ ] Missing Screws", 449, rightY + 85);
	doc.text("[ ] Other", 449, rightY + 102);
	doc.setDrawColor(200, 200, 200);
	doc.line(484, rightY + 104, 556.28, rightY + 104);
	rightY += 150;
	doc.setDrawColor(teal[0], teal[1], teal[2]);
	doc.rect(rightX, rightY + 7, rightColW, 85, "S");
	drawRibbon(doc, "ESTIMATED & PAYMENT DETAILS", 314, rightY, 175, 14, teal, rupeeWhite);
	doc.setTextColor(100, 100, 100);
	doc.setFontSize(8);
	doc.text("Inspection / Diagnosis Fee :", 334, rightY + 34);
	doc.text("Estimated Repair Cost       :", 334, rightY + 51);
	doc.text("Advance Paid                   :", 334, rightY + 68);
	doc.text("Expected Delivery Date     :", 334, rightY + 85);
	doc.setTextColor(20, 20, 20);
	doc.setFont("helvetica", "bold");
	doc.text(inrPrecise(200), 474, rightY + 34);
	doc.text(inrPrecise(invoice?.total || 0), 474, rightY + 51);
	doc.text(inrPrecise(0), 474, rightY + 68);
	doc.setDrawColor(200, 200, 200);
	doc.line(474, rightY + 37, 556.28, rightY + 37);
	doc.line(474, rightY + 54, 556.28, rightY + 54);
	doc.line(474, rightY + 71, 556.28, rightY + 71);
	doc.line(474, rightY + 88, 556.28, rightY + 88);
	doc.setFont("helvetica", "normal");
	currentY = Math.max(currentY + 85, rightY + 105);
	const footerY = 771.89;
	let remaining = footerY - currentY - 130;
	if (remaining < 30) {
		doc.addPage();
		drawHeader(doc);
		drawFooter(doc);
		currentY = 140;
		remaining = footerY - currentY - 130;
	}
	const gap = Math.min(60, Math.max(15, remaining / 2));
	currentY += gap;
	const sumW = 532.28 / 2;
	const totX = 305.14;
	doc.setFillColor(253, 242, 233);
	doc.rect(marginX, currentY + 5, sumW, 130, "F");
	drawRibbon(doc, "TERMS & CONDITIONS", 19, currentY, 130, 14, orange);
	doc.setTextColor(80, 80, 80);
	doc.setFontSize(8);
	doc.setFont("helvetica", "normal");
	(shop?.terms?.length ? shop.terms : [
		"Data backup is customer's responsibility.",
		"Not responsible for data loss.",
		"Warranty applies only to repaired parts.",
		"Collect within 30 days.",
		"You agree to the above terms."
	]).slice(0, 5).forEach((t, i) => {
		const row = i * 20;
		doc.addImage(checkIcon, "PNG", 39, currentY + 25 + row, 12, 12);
		const splitText = doc.splitTextToSize(t, 226.14);
		doc.text(splitText, 59, currentY + 34 + row);
	});
	doc.setDrawColor(200, 200, 200);
	doc.setLineWidth(.5);
	doc.rect(totX, currentY + 5, sumW, 130, "S");
	doc.setTextColor(100, 100, 100);
	doc.setFontSize(10);
	doc.setFont("helvetica", "italic");
	doc.text("Thank you for trusting", 320.14, currentY + 25);
	doc.setFont("helvetica", "bold");
	doc.setFontSize(16);
	doc.setTextColor(teal[0], teal[1], teal[2]);
	doc.text("RK", 320.14, currentY + 45);
	doc.setTextColor(orange[0], orange[1], orange[2]);
	doc.text("REPAIR LABS", 348.14, currentY + 45);
	doc.setFontSize(8);
	doc.setTextColor(100, 100, 100);
	doc.setFont("helvetica", "normal");
	doc.text("We'll get your device back in perfect shape!", 320.14, currentY + 62);
	doc.setFillColor(teal[0], teal[1], teal[2]);
	doc.rect(516.28, currentY + 12, 45, 45, "F");
	doc.triangle(516.28, currentY + 57, 538.78, currentY + 70, 561.28, currentY + 57, "F");
	doc.setTextColor(255, 255, 255);
	doc.setFontSize(7);
	doc.setFont("helvetica", "bold");
	doc.text("QUALITY", 538.78, currentY + 44, { align: "center" });
	doc.text("REPAIR", 538.78, currentY + 52, { align: "center" });
	doc.addImage(checkWhiteIcon, "PNG", 530.78, currentY + 17, 16, 16);
	doc.addImage(penIcon, "PNG", 320.14, currentY + 95, 24, 24);
	doc.setDrawColor(100, 100, 100);
	doc.setLineWidth(.5);
	doc.line(355.14, currentY + 115, 556.28, currentY + 115);
	doc.setFontSize(8);
	doc.setTextColor(teal[0], teal[1], teal[2]);
	doc.setFont("helvetica", "bold");
	doc.text("TECHNICIAN SIGNATURE", 455.71, currentY + 125, { align: "center" });
	if (doc.internal.getNumberOfPages() === 1) drawFooter(doc);
	return doc;
}
var STATUSES = [
	{
		v: "received",
		label: "Received"
	},
	{
		v: "diagnosis",
		label: "Diagnosis"
	},
	{
		v: "waiting_parts",
		label: "Waiting Parts"
	},
	{
		v: "in_progress",
		label: "In Progress"
	},
	{
		v: "completed",
		label: "Completed"
	},
	{
		v: "ready_delivery",
		label: "Ready for Delivery"
	},
	{
		v: "delivered",
		label: "Delivered"
	},
	{
		v: "cancelled",
		label: "Cancelled"
	}
];
var STATUS_COLOR = {
	received: "bg-blue-400 text-black border-blue-500 font-semibold",
	diagnosis: "bg-purple-400 text-black border-purple-500 font-semibold",
	waiting_parts: "bg-amber-400 text-black border-amber-500 font-semibold",
	in_progress: "bg-cyan-400 text-black border-cyan-500 font-semibold",
	completed: "bg-emerald-400 text-black border-emerald-500 font-semibold",
	ready_delivery: "bg-teal-400 text-black border-teal-500 font-semibold",
	delivered: "bg-green-400 text-black border-green-500 font-semibold",
	cancelled: "bg-red-400 text-black border-red-500 font-semibold"
};
var DEVICE_TYPES = [
	"Mobile",
	"Laptop",
	"Tablet",
	"Smart Watch",
	"Desktop"
];
var TIME_SLOTS = [
	"10:00",
	"10:30",
	"11:00",
	"11:30",
	"12:00",
	"12:30",
	"14:00",
	"14:30",
	"15:00",
	"15:30",
	"16:00",
	"16:30",
	"17:00",
	"17:30",
	"18:00",
	"18:30",
	"19:00"
];
function aiSuggest(issue) {
	const s = issue.toLowerCase();
	if (s.includes("water") || s.includes("liquid")) return "Likely water damage → clean board, check for corrosion, replace battery & display connectors.";
	if (s.includes("screen") || s.includes("display") || s.includes("crack")) return "Likely display assembly failure → replace LCD/OLED assembly.";
	if (s.includes("battery") || s.includes("drain") || s.includes("charge")) return "Likely battery degradation or charging IC → test battery health, inspect charging port.";
	if (s.includes("dead") || s.includes("not turning") || s.includes("on")) return "Likely power IC or motherboard fault → check power rails, inspect for shorted components.";
	if (s.includes("speaker") || s.includes("audio") || s.includes("mic")) return "Likely audio IC / speaker module failure → test with diagnostics, replace speaker.";
	if (s.includes("camera")) return "Likely camera module or flex fault → reseat connector, test with new camera module.";
	return "Run full diagnostics: power, charging, display, touch, sensors and audio.";
}
var EMPTY_FORM = {
	customer_id: "",
	device_type: "Mobile",
	device_brand: "",
	device_model: "",
	imei: "",
	issue: "",
	status: "received",
	estimated_completion: "",
	estimated_cost: 0,
	advance_amount: 0,
	payment_mode: "Cash",
	technician_notes: "",
	appointment_date: "",
	appointment_time: "",
	auto_send_wa: true,
	customer_mobile: ""
};
function RepairsPage() {
	const qc = useQueryClient();
	const [search, setSearch] = (0, import_react.useState)("");
	const [statusFilter, setStatusFilter] = (0, import_react.useState)("all");
	const [open, setOpen] = (0, import_react.useState)(false);
	const [editing, setEditing] = (0, import_react.useState)(null);
	const [detail, setDetail] = (0, import_react.useState)(null);
	const [form, setForm] = (0, import_react.useState)(EMPTY_FORM);
	const [custSearch, setCustSearch] = (0, import_react.useState)("");
	const [newCustOpen, setNewCustOpen] = (0, import_react.useState)(false);
	const [translating, setTranslating] = (0, import_react.useState)(false);
	const translate = useServerFn(translateToEnglish);
	const wa = useWaSender();
	const { data: repairs = [], isLoading } = useQuery({
		queryKey: ["repairs"],
		queryFn: async () => {
			return await getRepairsFn();
		}
	});
	const { data: customers = [] } = useQuery({
		queryKey: ["customers-min"],
		queryFn: async () => {
			return await getCustomersFn();
		}
	});
	const { data: profile } = useQuery({
		queryKey: ["profile"],
		queryFn: async () => {
			const { user } = await meFn();
			if (!user) return null;
			return user;
		}
	});
	const custMap = (0, import_react.useMemo)(() => new Map(customers.map((c) => [c.id, c])), [customers]);
	const selectedCustomer = form.customer_id ? custMap.get(form.customer_id) ?? null : null;
	const custSuggestions = (0, import_react.useMemo)(() => {
		const q = custSearch.trim().toLowerCase();
		if (!q || selectedCustomer) return [];
		return customers.filter((c) => c.name.toLowerCase().includes(q) || c.phone?.includes(q) || c.whatsapp?.includes(q)).slice(0, 6);
	}, [
		custSearch,
		customers,
		selectedCustomer
	]);
	function resetForm() {
		setForm(EMPTY_FORM);
		setCustSearch("");
		setEditing(null);
	}
	function loadEditing(r) {
		setEditing(r);
		setForm({
			customer_id: r.customer_id ?? "",
			device_type: r.device_type ?? "Mobile",
			device_brand: r.device_brand ?? "",
			device_model: r.device_model ?? "",
			imei: r.imei ?? "",
			issue: r.issue,
			status: r.status,
			estimated_completion: r.estimated_completion ?? "",
			estimated_cost: Number(r.estimated_cost ?? 0),
			advance_amount: 0,
			payment_mode: "Cash",
			technician_notes: r.technician_notes ?? "",
			appointment_date: r.appointment_at ? r.appointment_at.slice(0, 10) : "",
			appointment_time: r.appointment_at ? new Date(r.appointment_at).toISOString().slice(11, 16) : "",
			auto_send_wa: true,
			customer_mobile: r.customer_id ? custMap.get(r.customer_id)?.phone ?? custMap.get(r.customer_id)?.whatsapp ?? "" : ""
		});
		const c = r.customer_id ? custMap.get(r.customer_id) : null;
		setCustSearch(c?.name ?? "");
		setOpen(true);
	}
	const filtered = repairs.filter((r) => {
		if (statusFilter !== "all" && r.status !== statusFilter) return false;
		const q = search.toLowerCase();
		if (!q) return true;
		const c = r.customer_id ? custMap.get(r.customer_id) : null;
		return r.ticket_no.toLowerCase().includes(q) || r.imei?.toLowerCase().includes(q) || r.device_brand?.toLowerCase().includes(q) || c?.name.toLowerCase().includes(q);
	});
	const save = useMutation({
		mutationFn: async () => {
			if (!form.issue.trim()) throw new Error("Issue description is required");
			let appointment_at = null;
			if (form.appointment_date) {
				const t = form.appointment_time || "10:00";
				const d = /* @__PURE__ */ new Date(`${form.appointment_date}T${t}:00`);
				if (!isNaN(d.getTime())) appointment_at = d.toISOString();
			}
			const payload = {
				customer_id: form.customer_id || null,
				device_type: form.device_type || null,
				device_brand: form.device_brand || null,
				device_model: form.device_model || null,
				imei: form.imei || null,
				issue: form.issue,
				status: form.status,
				technician_notes: form.technician_notes || null,
				estimated_completion: form.estimated_completion || null,
				estimated_cost: Number(form.estimated_cost || 0),
				appointment_at
			};
			if (editing) {
				const data = await updateRepairFn({ data: {
					id: editing.id,
					data: payload
				} });
				return {
					row: {
						...editing,
						...data
					},
					isNew: false
				};
			}
			const data = await createRepairFn({ data: payload });
			return {
				row: {
					...payload,
					...data
				},
				isNew: true
			};
		},
		onSuccess: async ({ row, isNew }) => {
			qc.invalidateQueries({ queryKey: ["repairs"] });
			toast.success(editing ? "Ticket updated" : `Ticket ${row.ticket_no} created`);
			setOpen(false);
			if (isNew && form.advance_amount > 0) {
				const cust = form.customer_id ? custMap.get(form.customer_id) : null;
				try {
					const doc = buildAdvanceReceiptPdf({
						shop: profile ?? null,
						ticket_no: row.ticket_no,
						created_at: row.created_at,
						customer: cust ? {
							name: cust.name,
							phone: cust.phone,
							address: cust.address
						} : null,
						device: {
							type: form.device_type,
							brand: form.device_brand,
							model: form.device_model,
							imei: form.imei
						},
						issue: form.issue,
						estimated_cost: form.estimated_cost,
						advance_amount: form.advance_amount,
						payment_mode: form.payment_mode
					});
					if (cust?.whatsapp) {
						doc.save(`advance-${row.ticket_no}.pdf`);
						const tpl = profile?.wa_templates?.advance ?? "Dear {name}, thank you for choosing {shop}. We've received your {device} for repair.\n\nTicket Number: {ticket}\nAdvance Payment: {advance}\nEstimated Total: {total}\nBalance Due on Delivery: {balance}\n\nTrack your repair anytime with your ticket number. — {shop}";
						const msg = fillTemplate(tpl, {
							name: cust.name,
							device: [form.device_brand, form.device_model].filter(Boolean).join(" ") || form.device_type,
							ticket: row.ticket_no,
							advance: inrPrecise(form.advance_amount),
							total: inrPrecise(form.estimated_cost),
							balance: inrPrecise(Math.max(0, form.estimated_cost - form.advance_amount)),
							link: "Attached PDF",
							shop: profile?.shop_name ?? "RK Labs"
						});
						if (form.auto_send_wa) wa.send({
							kind: "advance",
							phone: cust.whatsapp,
							recipientName: cust.name,
							message: msg,
							repairId: row.id,
							title: `Advance receipt for ${row.ticket_no}`
						});
						else toast.success("Advance receipt downloaded", {
							description: `Send WhatsApp to ${cust.name}? (Attach the PDF manually)`,
							action: {
								label: "Preview & send",
								onClick: () => wa.send({
									kind: "advance",
									phone: cust.whatsapp,
									recipientName: cust.name,
									message: msg,
									repairId: row.id,
									title: `Advance receipt for ${row.ticket_no}`
								})
							},
							duration: 15e3
						});
					} else {
						doc.save(`advance-${row.ticket_no}.pdf`);
						toast.info("Advance receipt downloaded (add WhatsApp number to customer to send)");
					}
				} catch (e) {
					toast.error(`Advance receipt failed: ${e.message ?? e}`);
				}
			}
			resetForm();
		},
		onError: (e) => toast.error(e.message)
	});
	const updateStatus = useMutation({
		mutationFn: async ({ id, status }) => {
			await updateRepairFn({ data: {
				id,
				data: { status }
			} });
			return {
				id,
				status
			};
		},
		onSuccess: ({ status, id }) => {
			qc.invalidateQueries({ queryKey: ["repairs"] });
			const r = repairs.find((x) => x.id === id);
			const c = r?.customer_id ? custMap.get(r.customer_id) : null;
			const tplKey = status === "received" || status === "in_progress" || status === "ready_delivery" || status === "delivered" ? status : null;
			const tpl = tplKey && profile?.wa_templates?.[tplKey];
			if (tpl && c?.whatsapp && r) {
				const msg = fillTemplate(tpl, {
					name: c.name,
					device: [r.device_brand, r.device_model].filter(Boolean).join(" ") || r.device_type || "device",
					ticket: r.ticket_no,
					shop: profile?.shop_name ?? "RK Labs"
				});
				toast.success("Status updated", {
					description: `Send WhatsApp update to ${c.name}?`,
					action: {
						label: "Preview & send",
						onClick: () => wa.send({
							kind: "status_update",
							phone: c.whatsapp,
							recipientName: c.name,
							message: msg,
							repairId: r.id,
							title: `Status update — ${r.ticket_no}`
						})
					}
				});
			} else toast.success("Status updated");
		}
	});
	const del = useMutation({
		mutationFn: async (id) => {
			await deleteRepairFn({ data: id });
		},
		onSuccess: () => {
			qc.invalidateQueries({ queryKey: ["repairs"] });
			toast.success("Deleted");
		}
	});
	async function handleTranslate() {
		if (!form.issue.trim()) return;
		setTranslating(true);
		try {
			const res = await translate({ data: { text: form.issue } });
			setForm((f) => ({
				...f,
				issue: res.text
			}));
			toast.success("Translated to English");
		} catch (e) {
			toast.error(`Translate failed: ${e.message ?? e}`);
		} finally {
			setTranslating(false);
		}
	}
	const suggestion = form.issue.length > 4 ? aiSuggest(form.issue) : "";
	const balance = Math.max(0, form.estimated_cost - form.advance_amount);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-7xl space-y-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-6",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-1.5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "text-3xl font-bold tracking-tight",
						children: "Repairs"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-sm text-slate-400",
						children: [repairs.length, " tickets · workflow tracking · WhatsApp receipts"]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Dialog, {
					open,
					onOpenChange: (v) => {
						setOpen(v);
						if (!v) resetForm();
					},
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTrigger, {
						asChild: true,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							className: "h-10 px-5 shadow-lg transition-transform hover:scale-105 active:scale-95",
							style: {
								background: "var(--gradient-primary)",
								color: "oklch(0.12 0.02 250)"
							},
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "mr-2 h-4 w-4" }), " New ticket"]
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
						className: "glass-strong max-h-[90vh] max-w-2xl overflow-y-auto custom-scrollbar border-white/10 shadow-2xl",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogHeader, {
							className: "border-b border-white/10 pb-4 mb-4",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, {
								className: "text-xl tracking-tight",
								children: editing ? `Edit ${editing.ticket_no}` : "New repair ticket"
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
							onSubmit: (e) => {
								e.preventDefault();
								save.mutate();
							},
							className: "space-y-4",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-1.5",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
											className: "text-slate-300",
											children: "Customer"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "relative",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "flex gap-2",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
													placeholder: "Search by name, phone or WhatsApp…",
													value: custSearch,
													onChange: (e) => {
														setCustSearch(e.target.value);
														if (form.customer_id) setForm((f) => ({
															...f,
															customer_id: ""
														}));
													},
													className: "bg-black/20 border-white/10 focus:border-cyan-500/50"
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
													type: "button",
													variant: "outline",
													size: "icon",
													className: "shrink-0 border-white/10 bg-white/5 hover:bg-white/10 hover:text-cyan-400",
													onClick: () => setNewCustOpen(true),
													title: "Add new customer",
													children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(UserPlus, { className: "h-4 w-4" })
												})]
											}), custSuggestions.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "absolute z-20 mt-1 max-h-60 w-full overflow-y-auto rounded-xl border border-white/10 bg-[#0f172a] shadow-xl custom-scrollbar",
												children: custSuggestions.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
													type: "button",
													className: "flex w-full flex-col items-start gap-0.5 border-b border-white/5 px-4 py-3 text-left text-sm hover:bg-white/5 transition-colors",
													onClick: () => {
														setForm((f) => ({
															...f,
															customer_id: c.id,
															customer_mobile: f.customer_mobile || c.phone || c.whatsapp || ""
														}));
														setCustSearch(c.name);
													},
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
														className: "font-medium text-slate-200",
														children: c.name
													}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
														className: "text-xs text-slate-400",
														children: [c.phone ?? c.whatsapp ?? "—", c.address ? ` · ${c.address}` : ""]
													})]
												}, c.id))
											})]
										}),
										selectedCustomer && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "rounded-xl border border-cyan-500/20 bg-cyan-500/5 p-3 text-xs mt-2 shadow-sm",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "font-semibold text-cyan-400",
												children: selectedCustomer.name
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "text-cyan-400/70 mt-1",
												children: [
													selectedCustomer.phone && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
														className: "mr-2",
														children: ["📞 ", selectedCustomer.phone]
													}),
													selectedCustomer.whatsapp && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
														className: "mr-2",
														children: ["💬 ", selectedCustomer.whatsapp]
													}),
													selectedCustomer.address && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
														className: "mt-1",
														children: ["📍 ", selectedCustomer.address]
													})
												]
											})]
										})
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-1.5",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
											className: "text-slate-300",
											children: "Customer mobile number"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
											type: "tel",
											inputMode: "tel",
											placeholder: "e.g. 9876543210",
											value: form.customer_mobile,
											onChange: (e) => setForm((f) => ({
												...f,
												customer_mobile: e.target.value
											})),
											className: "bg-black/20 border-white/10 focus:border-cyan-500/50"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "text-[11px] text-slate-400",
											children: "Saved to the selected customer's record if their phone is empty."
										})
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "grid grid-cols-2 gap-4",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "space-y-1.5",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
												className: "text-slate-300",
												children: "Device type"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
												value: form.device_type,
												onChange: (e) => setForm((f) => ({
													...f,
													device_type: e.target.value
												})),
												className: "h-10 w-full rounded-md border border-white/10 bg-black/20 px-3 text-sm focus:border-cyan-500/50 outline-none",
												children: DEVICE_TYPES.map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
													value: t,
													className: "bg-[#0f172a]",
													children: t
												}, t))
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldC, {
											label: "Brand",
											value: form.device_brand,
											onChange: (v) => setForm((f) => ({
												...f,
												device_brand: v
											})),
											className: "bg-black/20 border-white/10 focus:border-cyan-500/50"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldC, {
											label: "Model",
											value: form.device_model,
											onChange: (v) => setForm((f) => ({
												...f,
												device_model: v
											})),
											className: "bg-black/20 border-white/10 focus:border-cyan-500/50"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldC, {
											label: "IMEI / Serial",
											value: form.imei,
											onChange: (v) => setForm((f) => ({
												...f,
												imei: v
											})),
											className: "bg-black/20 border-white/10 focus:border-cyan-500/50"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "space-y-1.5",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
												className: "text-slate-300",
												children: "Status"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
												value: form.status,
												onChange: (e) => setForm((f) => ({
													...f,
													status: e.target.value
												})),
												className: "h-10 w-full rounded-md border border-white/10 bg-black/20 px-3 text-sm focus:border-cyan-500/50 outline-none",
												children: STATUSES.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
													value: s.v,
													className: "bg-[#0f172a]",
													children: s.label
												}, s.v))
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldC, {
											label: "Estimated completion",
											type: "date",
											value: form.estimated_completion,
											onChange: (v) => setForm((f) => ({
												...f,
												estimated_completion: v
											})),
											className: "bg-black/20 border-white/10 focus:border-cyan-500/50"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldC, {
											label: "Estimated cost (₹)",
											type: "number",
											step: "0.01",
											value: String(form.estimated_cost),
											onChange: (v) => setForm((f) => ({
												...f,
												estimated_cost: Number(v || 0)
											})),
											className: "bg-black/20 border-white/10 focus:border-cyan-500/50"
										})
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "rounded-xl border border-white/10 bg-white/5 p-4 space-y-3 shadow-inner",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "text-xs font-bold uppercase tracking-wider text-cyan-400",
											children: "Appointment slot (optional)"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "grid grid-cols-2 gap-4",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldC, {
												label: "Appointment date",
												type: "date",
												value: form.appointment_date,
												min: (/* @__PURE__ */ new Date()).toISOString().slice(0, 10),
												onChange: (v) => setForm((f) => ({
													...f,
													appointment_date: v
												})),
												className: "bg-black/20 border-white/10 focus:border-cyan-500/50"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "space-y-1.5",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
													className: "text-slate-300",
													children: "Time slot"
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
													value: form.appointment_time,
													onChange: (e) => setForm((f) => ({
														...f,
														appointment_time: e.target.value
													})),
													disabled: !form.appointment_date,
													className: "h-10 w-full rounded-md border border-white/10 bg-black/20 px-3 text-sm disabled:opacity-50 focus:border-cyan-500/50 outline-none",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
														value: "",
														className: "bg-[#0f172a]",
														children: "Select a slot…"
													}), TIME_SLOTS.map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
														value: t,
														className: "bg-[#0f172a]",
														children: t
													}, t))]
												})]
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "text-[11px] text-slate-400",
											children: "Pick when the customer will drop off the device. Saved with the ticket."
										})
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-2",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex items-center justify-between",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
												className: "text-slate-300",
												children: "Issue description"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
												type: "button",
												size: "sm",
												variant: "ghost",
												className: "h-8 text-cyan-400 hover:text-cyan-300 hover:bg-cyan-400/10",
												onClick: handleTranslate,
												disabled: translating || !form.issue.trim(),
												children: [translating ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "mr-1.5 h-3.5 w-3.5 animate-spin" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Languages, { className: "mr-1.5 h-3.5 w-3.5" }), "Translate to English"]
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
											value: form.issue,
											onChange: (e) => setForm((f) => ({
												...f,
												issue: e.target.value
											})),
											placeholder: "Describe the problem in any language — Hindi, Tamil, Telugu, English, etc.",
											required: true,
											rows: 3,
											className: "bg-black/20 border-white/10 focus:border-cyan-500/50 resize-none min-h-[80px]"
										}),
										suggestion && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex gap-3 rounded-xl border border-cyan-500/20 bg-cyan-500/5 p-4 text-sm mt-2 shadow-sm",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "mt-0.5 h-4 w-4 shrink-0 text-cyan-400" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "text-slate-300",
												children: [
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
														className: "font-semibold text-cyan-400",
														children: "AI suggestion:"
													}),
													" ",
													suggestion
												]
											})]
										})
									]
								}),
								!editing && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "rounded-xl border border-white/10 bg-white/5 p-4 space-y-4 shadow-inner",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "text-xs font-bold uppercase tracking-wider text-emerald-400",
											children: "Advance payment (optional)"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "grid grid-cols-3 gap-4",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldC, {
													label: "Advance (₹)",
													type: "number",
													step: "0.01",
													value: String(form.advance_amount),
													onChange: (v) => setForm((f) => ({
														...f,
														advance_amount: Number(v || 0)
													})),
													className: "bg-black/20 border-white/10"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "space-y-1.5",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
														className: "text-slate-300",
														children: "Mode"
													}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
														value: form.payment_mode,
														onChange: (e) => setForm((f) => ({
															...f,
															payment_mode: e.target.value
														})),
														className: "h-10 w-full rounded-md border border-white/10 bg-black/20 px-3 text-sm focus:border-emerald-500/50 outline-none",
														children: [
															/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
																className: "bg-[#0f172a]",
																children: "Cash"
															}),
															/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
																className: "bg-[#0f172a]",
																children: "UPI"
															}),
															/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
																className: "bg-[#0f172a]",
																children: "Card"
															}),
															/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
																className: "bg-[#0f172a]",
																children: "Bank Transfer"
															})
														]
													})]
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "space-y-1.5",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
														className: "text-slate-300",
														children: "Balance due"
													}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
														className: "grid h-10 place-items-center rounded-md border border-white/10 bg-black/20 text-sm font-bold text-emerald-400",
														children: inr(balance)
													})]
												})
											]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
											className: "flex items-center gap-3 rounded-lg border border-white/10 bg-black/20 px-4 py-3 text-sm cursor-pointer hover:bg-white/5 transition-colors",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
												type: "checkbox",
												checked: form.auto_send_wa,
												onChange: (e) => setForm((f) => ({
													...f,
													auto_send_wa: e.target.checked
												})),
												className: "h-4 w-4 accent-emerald-500 rounded border-white/20"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-slate-300 text-sm",
												children: "One-click WhatsApp — auto-send advance receipt to customer"
											})]
										})
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-1.5 pt-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
										className: "text-slate-300",
										children: "Initial technician notes (optional)"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
										value: form.technician_notes,
										onChange: (e) => setForm((f) => ({
											...f,
											technician_notes: e.target.value
										})),
										rows: 2,
										className: "bg-black/20 border-white/10 resize-none min-h-[60px]"
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogFooter, {
									className: "pt-4 border-t border-white/10",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
										type: "submit",
										disabled: save.isPending,
										className: "shadow-lg transition-transform hover:scale-105 active:scale-95",
										style: {
											background: "var(--gradient-primary)",
											color: "oklch(0.12 0.02 250)"
										},
										children: save.isPending ? "Saving…" : editing ? "Save changes" : "Create ticket"
									})
								})
							]
						})]
					})]
				})]
			}),
			newCustOpen && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(QuickCustomerDialog, {
				onClose: () => setNewCustOpen(false),
				onCreated: (c) => {
					qc.invalidateQueries({ queryKey: ["customers-min"] });
					qc.invalidateQueries({ queryKey: ["customers"] });
					setForm((f) => ({
						...f,
						customer_id: c.id
					}));
					setCustSearch(c.name);
					setNewCustOpen(false);
				}
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "rounded-2xl border border-white/10 bg-[#0f172a]/80 backdrop-blur-xl p-4 shadow-lg",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mb-4 flex flex-wrap gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "relative flex-1 min-w-[220px]",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							placeholder: "Search ticket, IMEI, brand, customer…",
							value: search,
							onChange: (e) => setSearch(e.target.value),
							className: "pl-9 h-10 bg-black/20 border-white/10"
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
						value: statusFilter,
						onValueChange: setStatusFilter,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
							className: "h-10 w-48 bg-black/20 border-white/10 text-slate-200",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectContent, {
							className: "bg-[#0f172a] border-white/10",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
								value: "all",
								children: "All statuses"
							}), STATUSES.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
								value: s.v,
								children: s.label
							}, s.v))]
						})]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "overflow-x-auto custom-scrollbar",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
						className: "w-full text-sm whitespace-nowrap",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", {
							className: "bg-slate-900/50 text-xs uppercase tracking-wider text-slate-400",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "px-4 py-3 text-left rounded-tl-lg",
									children: "Ticket"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "px-4 py-3 text-left",
									children: "Customer"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "px-4 py-3 text-left",
									children: "Device"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "px-4 py-3 text-left",
									children: "Technician"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "px-4 py-3 text-left",
									children: "Status"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "px-4 py-3 text-right",
									children: "Est. cost"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "px-4 py-3 text-left",
									children: "ETA"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "px-4 py-3 text-right rounded-tr-lg",
									children: "Actions"
								})
							] })
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tbody", { children: [
							isLoading && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tr", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								colSpan: 8,
								className: "py-12 text-center text-slate-500",
								children: "Loading…"
							}) }),
							!isLoading && filtered.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tr", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								colSpan: 8,
								className: "py-12 text-center text-slate-500",
								children: "No repair tickets."
							}) }),
							filtered.map((r) => {
								const c = r.customer_id ? custMap.get(r.customer_id) : null;
								return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
									className: "group border-b border-white/5 hover:bg-white/[0.02] transition-colors",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
											className: "px-4 py-3 font-mono text-xs font-semibold",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
												className: "text-cyan-400 hover:text-cyan-300 hover:underline transition-colors",
												onClick: () => setDetail(r),
												children: r.ticket_no
											})
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
											className: "px-4 py-3 text-slate-200",
											children: c?.name ?? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-slate-500",
												children: "—"
											})
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
											className: "px-4 py-3 text-slate-400 truncate max-w-[200px]",
											title: [r.device_brand, r.device_model].filter(Boolean).join(" ") || r.device_type || "",
											children: [r.device_brand, r.device_model].filter(Boolean).join(" ") || r.device_type || "—"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
											className: "px-4 py-3 text-slate-400",
											children: r.technician_name ?? "—"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
											className: "px-4 py-3",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
												value: r.status,
												onChange: (e) => updateStatus.mutate({
													id: r.id,
													status: e.target.value
												}),
												className: "rounded-md border bg-black/40 px-2.5 py-1 text-[11px] uppercase tracking-wider outline-none cursor-pointer transition-colors " + STATUS_COLOR[r.status],
												children: STATUSES.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
													value: s.v,
													className: "bg-[#0f172a] text-slate-200 normal-case",
													children: s.label
												}, s.v))
											})
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
											className: "px-4 py-3 text-right font-medium text-slate-200",
											children: inr(r.estimated_cost)
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
											className: "px-4 py-3 text-slate-400",
											children: fmtDate(r.estimated_completion)
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
											className: "px-4 py-3 text-right",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity",
												children: [
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
														size: "icon",
														variant: "ghost",
														className: "h-8 w-8 text-slate-400 hover:text-slate-100 hover:bg-white/10",
														"aria-label": `Open details for ${r.ticket_no}`,
														title: "Open details",
														onClick: () => setDetail(r),
														children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ClipboardList, { className: "h-4 w-4" })
													}),
													c?.whatsapp && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
														size: "icon",
														variant: "ghost",
														className: "h-8 w-8 text-emerald-500 hover:text-emerald-400 hover:bg-emerald-400/10",
														"aria-label": `Send WhatsApp update for ${r.ticket_no}`,
														title: "Send WhatsApp update",
														onClick: () => wa.send({
															kind: "status_update",
															phone: c.whatsapp,
															recipientName: c.name,
															message: `Dear ${c.name}, update on your repair ticket ${r.ticket_no}: status is now ${r.status.replace(/_/g, " ")}. — ${profile?.shop_name ?? "RK Labs"}`,
															repairId: r.id,
															title: `Status update — ${r.ticket_no}`
														}),
														children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MessageCircle, { className: "h-4 w-4" })
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
														size: "icon",
														variant: "ghost",
														className: "h-8 w-8 text-slate-400 hover:text-cyan-400 hover:bg-cyan-400/10",
														"aria-label": `Edit ${r.ticket_no}`,
														onClick: () => loadEditing(r),
														children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SquarePen, { className: "h-4 w-4" })
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
														size: "icon",
														variant: "ghost",
														className: "h-8 w-8 text-slate-400 hover:text-red-400 hover:bg-red-400/10",
														"aria-label": `Delete ${r.ticket_no}`,
														onClick: () => {
															if (confirm(`Delete ${r.ticket_no}?`)) del.mutate(r.id);
														},
														children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "h-4 w-4" })
													})
												]
											})
										})
									]
								}, r.id);
							})
						] })]
					})
				})]
			}),
			detail && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RepairDetailDialog, {
				repair: detail,
				customer: detail.customer_id ? custMap.get(detail.customer_id) ?? null : null,
				profile: profile ?? null,
				onClose: () => setDetail(null)
			})
		]
	});
}
function FieldC({ label, value, onChange, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-1.5",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: label }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
			value,
			onChange: (e) => onChange(e.target.value),
			...props
		})]
	});
}
function QuickCustomerDialog({ onClose, onCreated }) {
	const [name, setName] = (0, import_react.useState)("");
	const [phone, setPhone] = (0, import_react.useState)("");
	const [whatsapp, setWhatsapp] = (0, import_react.useState)("");
	const [address, setAddress] = (0, import_react.useState)("");
	const [saving, setSaving] = (0, import_react.useState)(false);
	async function submit() {
		if (!name.trim()) return toast.error("Name is required");
		setSaving(true);
		try {
			const { createCustomerFn } = await import("./customers-Cs5FLpVT.mjs").then((n) => n.n);
			const data = await createCustomerFn({ data: {
				name,
				phone: phone || null,
				whatsapp: whatsapp || phone || null,
				address: address || null
			} });
			toast.success("Customer added");
			onCreated({
				id: data.id,
				name,
				phone,
				whatsapp,
				address
			});
		} catch (e) {
			toast.error(e.message);
		} finally {
			setSaving(false);
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
		open: true,
		onOpenChange: (v) => !v && onClose(),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
			className: "glass-strong max-w-md",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, { children: "Add new customer" }) }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-1.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Name *" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								value: name,
								onChange: (e) => setName(e.target.value)
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid grid-cols-2 gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-1.5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Phone" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									value: phone,
									onChange: (e) => setPhone(e.target.value)
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-1.5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "WhatsApp" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									value: whatsapp,
									onChange: (e) => setWhatsapp(e.target.value),
									placeholder: "Same as phone if empty"
								})]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-1.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Address" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								value: address,
								onChange: (e) => setAddress(e.target.value)
							})]
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogFooter, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					variant: "outline",
					onClick: onClose,
					children: "Cancel"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					onClick: submit,
					disabled: saving,
					style: {
						background: "var(--gradient-primary)",
						color: "oklch(0.12 0.02 250)"
					},
					children: saving ? "Adding…" : "Add customer"
				})] })
			]
		})
	});
}
function RepairDetailDialog({ repair, customer, profile, onClose }) {
	const qc = useQueryClient();
	const [newNote, setNewNote] = (0, import_react.useState)("");
	const [newTech, setNewTech] = (0, import_react.useState)(repair.technician_name ?? "");
	const { data: notes = [] } = useQuery({
		queryKey: ["repair-notes", repair.id],
		queryFn: async () => {
			return await getRepairNotesFn({ data: { repair_id: repair.id } });
		}
	});
	const addNote = useMutation({
		mutationFn: async () => {
			if (!newNote.trim()) throw new Error("Empty note");
			await createRepairNoteFn({ data: {
				repair_id: repair.id,
				note: newNote,
				technician_name: newTech || repair.technician_name || void 0
			} });
		},
		onSuccess: () => {
			setNewNote("");
			qc.invalidateQueries({ queryKey: ["repair-notes", repair.id] });
			toast.success("Note added");
		},
		onError: (e) => toast.error(e.message)
	});
	const toggleDone = useMutation({
		mutationFn: async (n) => {
			await updateRepairNoteFn({ data: {
				id: n.id,
				data: {
					task_done: !n.task_done,
					completed_at: !n.task_done ? (/* @__PURE__ */ new Date()).toISOString() : null
				}
			} });
		},
		onSuccess: () => qc.invalidateQueries({ queryKey: ["repair-notes", repair.id] })
	});
	async function printReceipt() {
		const tId = toast.loading("Generating branded receipt…");
		try {
			(await buildIntakeReceiptPdf({
				shop: profile ?? void 0,
				invoice: {
					created_at: repair.created_at,
					invoice_no: repair.ticket_no
				},
				customer: customer ?? void 0,
				repair
			})).save(`receipt-${repair.ticket_no}.pdf`);
			toast.success("Receipt downloaded", { id: tId });
		} catch (e) {
			console.error(e);
			toast.error(e.message || "Failed to generate receipt", { id: tId });
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
		open: true,
		onOpenChange: (v) => !v && onClose(),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
			className: "glass-strong max-h-[90vh] max-w-3xl overflow-y-auto",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogTitle, {
					className: "flex items-center justify-between gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: ["Ticket ", repair.ticket_no] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						size: "sm",
						variant: "outline",
						onClick: printReceipt,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Printer, { className: "mr-2 h-4 w-4" }), " Print receipt"]
					})]
				}) }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid gap-4 md:grid-cols-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "glass space-y-1 rounded-xl p-4 text-sm",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "text-xs uppercase tracking-wider text-muted-foreground",
								children: "Customer"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "font-semibold",
								children: customer?.name ?? "—"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "text-muted-foreground",
								children: customer?.phone
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "text-muted-foreground",
								children: customer?.address
							})
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "glass space-y-1 rounded-xl p-4 text-sm",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "text-xs uppercase tracking-wider text-muted-foreground",
								children: "Device"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "font-semibold",
								children: [repair.device_brand, repair.device_model].filter(Boolean).join(" ") || "—"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "text-muted-foreground",
								children: repair.device_type
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "text-muted-foreground",
								children: repair.imei && `IMEI: ${repair.imei}`
							})
						]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "glass rounded-xl p-4 text-sm",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "text-xs uppercase tracking-wider text-muted-foreground",
						children: "Issue"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-1",
						children: repair.issue
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppointmentPanel, {
					repair,
					customer,
					profile
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "glass rounded-xl p-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mb-3 text-xs uppercase tracking-wider text-muted-foreground",
						children: "Workflow timeline"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ol", {
						className: "space-y-2 text-sm",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TimelineItem, {
								label: "Received",
								at: repair.created_at
							}),
							repair.appointment_at && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TimelineItem, {
								label: "Appointment scheduled",
								at: repair.appointment_at,
								accent: true
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TimelineItem, {
								label: `Assigned to ${repair.technician_name ?? "technician"}`,
								at: repair.assigned_at
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TimelineItem, {
								label: "Completed",
								at: repair.completed_at
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TimelineItem, {
								label: "Delivered",
								at: repair.delivered_at
							})
						]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "glass rounded-xl p-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mb-3 flex items-center justify-between",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "text-xs uppercase tracking-wider text-muted-foreground",
								children: "Technician notes & tasks"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Badge, {
								variant: "outline",
								className: "border-white/20",
								children: [
									notes.filter((n) => n.task_done).length,
									"/",
									notes.length,
									" done"
								]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-2",
							children: [notes.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "text-sm text-muted-foreground",
								children: "No notes yet."
							}), notes.map((n) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-start gap-3 rounded-lg border border-white/5 bg-white/5 p-3 text-sm",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									onClick: () => toggleDone.mutate(n),
									className: "mt-0.5 grid h-5 w-5 place-items-center rounded border " + (n.task_done ? "border-emerald-500 bg-emerald-500/20 text-emerald-300" : "border-white/20"),
									children: n.task_done && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "h-3 w-3" })
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex-1",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: n.task_done ? "line-through text-muted-foreground" : "",
										children: n.note
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "mt-1 text-[11px] text-muted-foreground",
										children: [
											n.technician_name ?? "—",
											" · ",
											fmtDateTime(n.created_at),
											n.task_done && n.completed_at && ` · done ${fmtDateTime(n.completed_at)}`
										]
									})]
								})]
							}, n.id))]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-3 grid grid-cols-[180px_1fr_auto] gap-2",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									placeholder: "Technician name",
									value: newTech,
									onChange: (e) => setNewTech(e.target.value)
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									placeholder: "Add a note / task…",
									value: newNote,
									onChange: (e) => setNewNote(e.target.value),
									onKeyDown: (e) => e.key === "Enter" && addNote.mutate()
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									onClick: () => addNote.mutate(),
									disabled: addNote.isPending,
									children: "Add"
								})
							]
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(WaLogPanel, { repairId: repair.id })
			]
		})
	});
}
function TimelineItem({ label, at, accent }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
		className: "flex items-center gap-3",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-2.5 w-2.5 rounded-full " + (accent && at ? "bg-[var(--neon)] shadow-[0_0_8px_var(--neon)]" : at ? "bg-[var(--neon)] shadow-[0_0_8px_var(--neon)]" : "bg-white/15") }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: at ? accent ? "text-[var(--neon)] font-medium" : "" : "text-muted-foreground",
				children: label
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "ml-auto text-xs text-muted-foreground",
				children: at ? fmtDateTime(at) : "Pending"
			})
		]
	});
}
function AppointmentPanel({ repair, customer, profile }) {
	const qc = useQueryClient();
	const wa = useWaSender();
	const [editing, setEditing] = (0, import_react.useState)(false);
	const initDate = repair.appointment_at ? new Date(repair.appointment_at).toISOString().slice(0, 10) : "";
	const initTime = repair.appointment_at ? `${String(new Date(repair.appointment_at).getHours()).padStart(2, "0")}:${String(new Date(repair.appointment_at).getMinutes()).padStart(2, "0")}` : "";
	const [date, setDate] = (0, import_react.useState)(initDate);
	const [time, setTime] = (0, import_react.useState)(initTime || "10:00");
	const historyQ = useQuery({
		queryKey: ["appointment_events", repair.id],
		queryFn: async () => {
			return await getAppointmentEventsFn({ data: { repair_id: repair.id } });
		}
	});
	function autoNotify(next, action) {
		const device = [repair.device_brand, repair.device_model].filter(Boolean).join(" ") || repair.device_type || "device";
		const shop = profile?.shop_name ?? "RK Labs";
		const custMsg = next ? `Dear ${customer?.name ?? "there"}, your appointment for ${device} (Ticket ${repair.ticket_no}) is ${action} to ${new Date(next).toLocaleString("en-IN")}. — ${shop}` : `Dear ${customer?.name ?? "there"}, your appointment for ${device} (Ticket ${repair.ticket_no}) has been cancelled. Please contact us to rebook. — ${shop}`;
		const shopMsg = next ? `Appointment ${action}: Ticket ${repair.ticket_no} (${customer?.name ?? "walk-in"}) — ${device} at ${new Date(next).toLocaleString("en-IN")}.` : `Appointment cancelled: Ticket ${repair.ticket_no} (${customer?.name ?? "walk-in"}) — ${device}.`;
		if (customer?.whatsapp) wa.send({
			kind: "appointment",
			phone: customer.whatsapp,
			recipientName: customer.name,
			message: custMsg,
			repairId: repair.id,
			title: `Appointment ${action} — customer`
		});
		if (profile?.shop_phone) setTimeout(() => wa.send({
			kind: "appointment",
			phone: profile.shop_phone,
			recipientName: `${profile.shop_name ?? "Shop"} (internal)`,
			message: shopMsg,
			repairId: repair.id,
			title: `Appointment ${action} — shop copy`
		}), 400);
	}
	const update = useMutation({
		mutationFn: async (next) => {
			const previous_at = repair.appointment_at;
			const action = next ? previous_at ? "rescheduled" : "scheduled" : "cancelled";
			const { error } = await updateRepairFn({ data: {
				id: repair.id,
				data: { appointment_at: next }
			} });
			if (error) throw error;
			await createAppointmentEventFn({ data: {
				repair_id: repair.id,
				action,
				previous_at,
				new_at: next
			} });
			return {
				next,
				action
			};
		},
		onSuccess: ({ next, action }) => {
			qc.invalidateQueries({ queryKey: ["repairs"] });
			qc.invalidateQueries({ queryKey: ["appointment_events", repair.id] });
			setEditing(false);
			toast.success(`Appointment ${action}`);
			autoNotify(next, action);
		},
		onError: (e) => toast.error(e.message)
	});
	function saveNew() {
		if (!date) return toast.error("Pick a date");
		const iso = (/* @__PURE__ */ new Date(`${date}T${time || "10:00"}:00`)).toISOString();
		update.mutate(iso);
	}
	const calEvent = repair.appointment_at ? {
		title: `Repair drop-off — Ticket ${repair.ticket_no}`,
		description: `${[repair.device_brand, repair.device_model].filter(Boolean).join(" ") || repair.device_type || "Device"} — ${repair.issue}`,
		location: profile?.shop_address ?? void 0,
		start: new Date(repair.appointment_at),
		durationMinutes: 45
	} : null;
	const events = historyQ.data ?? [];
	const currentStatus = repair.appointment_at ? `Scheduled for ${fmtDateTime(repair.appointment_at)}` : events[0]?.action === "cancelled" ? "Cancelled" : "Not scheduled";
	const actionBadge = {
		scheduled: "bg-emerald-500/15 text-emerald-300 border-emerald-500/30",
		rescheduled: "bg-amber-500/15 text-amber-300 border-amber-500/30",
		cancelled: "bg-red-500/15 text-red-300 border-red-500/30"
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "glass rounded-xl border border-[var(--neon)]/20 p-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap items-start justify-between gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mb-1 inline-flex items-center gap-2 text-xs uppercase tracking-wider text-[var(--neon)]",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CalendarClock, { className: "h-3.5 w-3.5" }),
						" Appointment · ",
						currentStatus
					]
				}), repair.appointment_at ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "text-base font-semibold",
					children: fmtDateTime(repair.appointment_at)
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "text-sm text-muted-foreground",
					children: "No appointment scheduled."
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-wrap gap-2",
					children: [
						calEvent && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
							href: googleCalendarUrl(calEvent),
							target: "_blank",
							rel: "noreferrer",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
								size: "sm",
								variant: "outline",
								className: "glass",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CalendarPlus, { className: "mr-2 h-4 w-4" }), " Google"]
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							size: "sm",
							variant: "outline",
							className: "glass",
							onClick: () => downloadIcs(calEvent, `${repair.ticket_no}.ics`),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CalendarPlus, { className: "mr-2 h-4 w-4" }), " .ics"]
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							size: "sm",
							variant: "outline",
							className: "glass",
							onClick: () => setEditing((v) => !v),
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SquarePen, { className: "mr-2 h-4 w-4" }),
								" ",
								repair.appointment_at ? "Reschedule" : "Schedule"
							]
						}),
						repair.appointment_at && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							size: "sm",
							variant: "outline",
							className: "glass border-red-500/40 text-red-300 hover:bg-red-500/10",
							onClick: () => {
								if (confirm("Cancel this appointment?")) update.mutate(null);
							},
							disabled: update.isPending,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CalendarX, { className: "mr-2 h-4 w-4" }), " Cancel"]
						})
					]
				})]
			}),
			editing && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-3 grid grid-cols-[1fr_1fr_auto_auto] gap-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						type: "date",
						value: date,
						min: (/* @__PURE__ */ new Date()).toISOString().slice(0, 10),
						onChange: (e) => setDate(e.target.value)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
						value: time,
						onChange: (e) => setTime(e.target.value),
						className: "h-9 rounded-md border border-input bg-input/40 px-3 text-sm",
						children: TIME_SLOTS.map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: t,
							children: t
						}, t))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						size: "sm",
						onClick: saveNew,
						disabled: update.isPending,
						style: {
							background: "var(--gradient-primary)",
							color: "oklch(0.12 0.02 250)"
						},
						children: "Save"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						size: "sm",
						variant: "ghost",
						onClick: () => setEditing(false),
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "h-4 w-4" })
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mb-2 text-xs uppercase tracking-wider text-muted-foreground",
					children: "History"
				}), historyQ.isLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "text-sm text-muted-foreground",
					children: "Loading…"
				}) : events.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "text-sm text-muted-foreground",
					children: "No changes yet."
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "space-y-2",
					children: events.map((ev) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: "flex flex-wrap items-center gap-2 rounded-lg border border-white/5 bg-white/[0.02] px-3 py-2 text-sm",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: `rounded-full border px-2 py-0.5 text-xs capitalize ${actionBadge[ev.action]}`,
								children: ev.action
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-muted-foreground",
								children: ev.action === "cancelled" ? ev.previous_at ? `was ${fmtDateTime(ev.previous_at)}` : "—" : ev.action === "rescheduled" ? `${ev.previous_at ? fmtDateTime(ev.previous_at) : "—"} → ${ev.new_at ? fmtDateTime(ev.new_at) : "—"}` : ev.new_at ? fmtDateTime(ev.new_at) : "—"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "ml-auto text-xs text-muted-foreground",
								children: fmtDateTime(ev.created_at)
							})
						]
					}, ev.id))
				})]
			})
		]
	});
}
function WaLogPanel({ repairId }) {
	const { data: logs = [], isLoading } = useQuery({
		queryKey: ["wa-logs", repairId],
		queryFn: async () => {
			return await getWaLogsFn({ data: { repair_id: repairId } });
		},
		refetchInterval: 1e4
	});
	const statusClass = {
		sent: "bg-emerald-500/15 text-emerald-300 border-emerald-500/30",
		blocked: "bg-red-500/15 text-red-300 border-red-500/30",
		cancelled: "bg-white/10 text-muted-foreground border-white/20",
		no_phone: "bg-amber-500/15 text-amber-300 border-amber-500/30"
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "glass rounded-xl p-4",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mb-3 flex items-center justify-between",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "text-xs uppercase tracking-wider text-muted-foreground",
				children: "WhatsApp send log"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Badge, {
				variant: "outline",
				className: "border-white/20",
				children: [logs.length, " entries"]
			})]
		}), isLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "text-sm text-muted-foreground",
			children: "Loading…"
		}) : logs.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "text-sm text-muted-foreground",
			children: "No WhatsApp messages sent for this ticket yet."
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "space-y-2",
			children: logs.map((l) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "rounded-lg border border-white/5 bg-white/5 p-3 text-xs",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-wrap items-center gap-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
								variant: "outline",
								className: statusClass[l.status] ?? "border-white/20",
								children: l.status
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-semibold capitalize",
								children: l.kind.replace(/_/g, " ")
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "text-muted-foreground",
								children: ["→ ", l.recipient_name ?? l.phone ?? "—"]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "ml-auto text-muted-foreground",
								children: fmtDateTime(l.created_at)
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-2 whitespace-pre-wrap text-muted-foreground line-clamp-3",
						children: l.message
					}),
					l.error && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-1 text-red-300",
						children: ["Error: ", l.error]
					})
				]
			}, l.id))
		})]
	});
}
//#endregion
export { RepairsPage as component };
