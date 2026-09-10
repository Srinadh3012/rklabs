export const inr = (n: number | null | undefined) =>
  n == null
    ? "₹0"
    : new Intl.NumberFormat("en-IN", {
        style: "currency",
        currency: "INR",
        maximumFractionDigits: 0,
      }).format(Number(n));

export const inrPrecise = (n: number | null | undefined) =>
  n == null
    ? "₹0.00"
    : new Intl.NumberFormat("en-IN", {
        style: "currency",
        currency: "INR",
        minimumFractionDigits: 2,
      }).format(Number(n));

// PDF-safe rupee formatter — jsPDF's built-in Helvetica cannot render the
// U+20B9 ₹ glyph and prints garbled characters ("¹"), so we use "Rs." for PDFs.
export const inrPdf = (n: number | null | undefined) => {
  const num = n == null ? 0 : Number(n);
  const formatted = new Intl.NumberFormat("en-IN", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(num);
  return `Rs. ${formatted}`;
};

export const fmtDate = (d: string | Date | null | undefined) => {
  if (!d) return "—";
  const date = typeof d === "string" ? new Date(d) : d;
  return new Intl.DateTimeFormat("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(date);
};

export const fmtDateTime = (d: string | Date | null | undefined) => {
  if (!d) return "—";
  const date = typeof d === "string" ? new Date(d) : d;
  return new Intl.DateTimeFormat("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);
};

export function fillTemplate(
  tpl: string,
  vars: Record<string, string | number | null | undefined>,
) {
  return tpl.replace(/\{(\w+)\}/g, (_, k) => String(vars[k] ?? ""));
}
