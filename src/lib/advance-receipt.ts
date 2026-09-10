import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { fmtDateTime, inrPdf } from "@/lib/format";

export type AdvanceReceiptInput = {
  shop: {
    shop_name?: string | null;
    shop_address?: string | null;
    shop_phone?: string | null;
    gst_number?: string | null;
  } | null;
  ticket_no: string;
  created_at: string;
  customer: { name?: string; phone?: string | null; address?: string | null } | null;
  device: {
    type?: string | null;
    brand?: string | null;
    model?: string | null;
    imei?: string | null;
  } | null;
  issue: string;
  estimated_cost: number;
  advance_amount: number;
  payment_mode?: string | null;
};

export function buildAdvanceReceiptPdf(input: AdvanceReceiptInput) {
  const {
    shop,
    ticket_no,
    created_at,
    customer,
    device,
    issue,
    estimated_cost,
    advance_amount,
    payment_mode,
  } = input;
  const doc = new jsPDF();
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
    headStyles: { fillColor: [30, 41, 59] },
  });

  const y = (doc as any).lastAutoTable.finalY + 10;
  const balance = Math.max(0, estimated_cost - advance_amount);
  autoTable(doc, {
    startY: y,
    theme: "plain",
    body: [
      ["Estimated cost", inrPdf(estimated_cost)],
      ["Advance received", inrPdf(advance_amount)],
      ["Balance due (on delivery)", inrPdf(balance)],
      ["Payment mode", payment_mode || "—"],
    ],
    styles: { fontSize: 11 },
    columnStyles: { 0: { fontStyle: "bold" }, 1: { halign: "right" } },
  });

  doc.setFontSize(8);
  doc.setTextColor(120);
  doc.text(
    "Note: This is an advance receipt. Estimated cost may vary based on final diagnosis. Balance is payable at delivery.",
    14,
    275,
  );
  doc.text("Customer Signature: ____________________", 14, 285);
  doc.text("Authorised Signatory", 200, 285, { align: "right" });
  return doc;
}
