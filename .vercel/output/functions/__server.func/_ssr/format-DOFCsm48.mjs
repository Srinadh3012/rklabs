//#region node_modules/.nitro/vite/services/ssr/assets/format-DOFCsm48.js
var inr = (n) => n == null ? "₹0" : new Intl.NumberFormat("en-IN", {
	style: "currency",
	currency: "INR",
	maximumFractionDigits: 0
}).format(Number(n));
var inrPrecise = (n) => n == null ? "₹0.00" : new Intl.NumberFormat("en-IN", {
	style: "currency",
	currency: "INR",
	minimumFractionDigits: 2
}).format(Number(n));
var inrPdf = (n) => {
	const num = n == null ? 0 : Number(n);
	return `Rs. ${new Intl.NumberFormat("en-IN", {
		minimumFractionDigits: 2,
		maximumFractionDigits: 2
	}).format(num)}`;
};
var fmtDate = (d) => {
	if (!d) return "—";
	const date = typeof d === "string" ? new Date(d) : d;
	return new Intl.DateTimeFormat("en-IN", {
		day: "2-digit",
		month: "short",
		year: "numeric"
	}).format(date);
};
var fmtDateTime = (d) => {
	if (!d) return "—";
	const date = typeof d === "string" ? new Date(d) : d;
	return new Intl.DateTimeFormat("en-IN", {
		day: "2-digit",
		month: "short",
		year: "numeric",
		hour: "2-digit",
		minute: "2-digit"
	}).format(date);
};
function fillTemplate(tpl, vars) {
	return tpl.replace(/\{(\w+)\}/g, (_, k) => String(vars[k] ?? ""));
}
//#endregion
export { inrPdf as a, inr as i, fmtDate as n, inrPrecise as o, fmtDateTime as r, fillTemplate as t };
