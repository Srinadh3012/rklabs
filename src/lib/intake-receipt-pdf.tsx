import jsPDF from "jspdf";
import { createRoot } from "react-dom/client";
import { flushSync } from "react-dom";
import { QRCodeCanvas } from "qrcode.react";
import JsBarcode from "jsbarcode";
import { inrPrecise } from "./format";
import { getIconDataUrl } from "./pdf-icons";
import {
  Calendar,
  Clock,
  CheckCircle2,
  MapPin,
  Phone,
  Globe,
  PenTool,
  User,
  Laptop,
  Wrench,
  Package,
  FileText,
  IndianRupee,
} from "lucide-react";

export type IntakeReceiptPdfInput = {
  shop?: any;
  invoice?: any;
  customer?: any;
  repair?: any;
  items?: any[];
};

function drawRibbon(
  doc: jsPDF,
  text: string,
  x: number,
  y: number,
  w: number,
  h: number,
  color: [number, number, number],
  icon?: string,
) {
  doc.setFillColor(color[0], color[1], color[2]);
  doc.rect(x, y, w - h, h, "F");
  doc.triangle(x + w - h, y, x + w, y, x + w - h, y + h, "F");

  doc.setTextColor(255, 255, 255);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(7);

  if (icon) {
    doc.addImage(icon, "PNG", x + 5, y + 2, h - 4, h - 4);
    doc.text(text, x + h + 5, y + h - 4);
  } else {
    doc.text(text, x + 8, y + h - 4);
  }
}

export async function buildIntakeReceiptPdf({
  shop,
  invoice,
  customer,
  repair,
}: IntakeReceiptPdfInput) {
  const doc = new jsPDF({ orientation: "portrait", unit: "pt", format: "a4" });

  const teal: [number, number, number] = [0, 138, 154];
  const orange: [number, number, number] = [244, 122, 33];
  const darkBg: [number, number, number] = [17, 24, 39];
  const lightGray: [number, number, number] = [241, 245, 249];

  const jobID = repair?.ticket_no || invoice?.invoice_no || "RKRL-JOB-001";

  let dateStr = "";
  let timeStr = "";
  try {
    const d = new Date(repair?.created_at || invoice?.created_at || Date.now());
    if (!isNaN(d.getTime())) {
      dateStr = d.toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      });
      timeStr = d.toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" });
    }
  } catch (e) {}

  const verifyUrl = `https://rkrepairlabs.com/track/${jobID}`;

  const tempDiv = document.createElement("div");
  tempDiv.style.position = "absolute";
  tempDiv.style.left = "-9999px";
  document.body.appendChild(tempDiv);
  const root = createRoot(tempDiv);

  flushSync(() => {
    root.render(
      <QRCodeCanvas
        id={`temp-qr-intake-${jobID}`}
        value={verifyUrl}
        size={100}
        level="M"
        marginSize={1}
      />,
    );
  });

  await new Promise((resolve) => setTimeout(resolve, 50));
  const qrCanvas = document.getElementById(`temp-qr-intake-${jobID}`) as HTMLCanvasElement;
  const qrDataUrl = qrCanvas ? qrCanvas.toDataURL("image/png") : "";

  root.unmount();
  tempDiv.remove();

  const barcodeCanvas = document.createElement("canvas");
  JsBarcode(barcodeCanvas, jobID, { displayValue: false, margin: 0, height: 40, width: 2 });
  const barcodeDataUrl = barcodeCanvas.toDataURL("image/png");

  // Load Icons
  const calendarIcon = await getIconDataUrl(<Calendar />, "#ffffff", 14);
  const clockIcon = await getIconDataUrl(<Clock />, "#ffffff", 14);
  const checkIcon = await getIconDataUrl(<CheckCircle2 />, "#F47A21", 12);
  const checkWhiteIcon = await getIconDataUrl(<CheckCircle2 />, "#ffffff", 14);
  const locIcon = await getIconDataUrl(<MapPin />, "#F47A21", 16);
  const phoneIcon = await getIconDataUrl(<Phone />, "#008A9A", 16);
  const webIcon = await getIconDataUrl(<Globe />, "#008A9A", 16);
  const penIcon = await getIconDataUrl(<PenTool />, "#008A9A", 32);

  const userWhite = await getIconDataUrl(<User />, "#ffffff", 14);
  const laptopWhite = await getIconDataUrl(<Laptop />, "#ffffff", 14);
  const wrenchWhite = await getIconDataUrl(<Wrench />, "#ffffff", 14);
  const packageWhite = await getIconDataUrl(<Package />, "#ffffff", 14);
  const fileTextWhite = await getIconDataUrl(<FileText />, "#ffffff", 14);
  const rupeeWhite = await getIconDataUrl(<IndianRupee />, "#ffffff", 14);

  const pw = 595.28;
  const ph = 841.89;
  const marginX = 24;

  const drawHeader = (doc: jsPDF) => {
    // 1. Enlarge left background block
    doc.setFillColor(darkBg[0], darkBg[1], darkBg[2]);
    doc.rect(0, 0, 170, 170, "F");
    doc.triangle(170, 0, 240, 0, 170, 170, "F");

    // 2. Enlarge logo
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

    // 3. Center Branding - Strong and Large
    doc.setTextColor(teal[0], teal[1], teal[2]);
    doc.setFontSize(32);
    doc.text("RK", 230, 65);
    doc.setTextColor(orange[0], orange[1], orange[2]);
    doc.text("REPAIR LABS", 280, 65);

    doc.setTextColor(50, 50, 50);
    doc.setFontSize(10);
    doc.text("Expert hands - Trusted repairs", 230, 85);

    // Services
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

    // Right side - Title & Number
    doc.setTextColor(10, 10, 10);
    doc.setFontSize(22);
    doc.setFont("helvetica", "bold");
    doc.text("REPAIR INTAKE", pw - marginX, 35, { align: "right" });
    doc.text("RECEIPT", pw - marginX, 60, { align: "right" });

    // Badge (larger)
    doc.setDrawColor(orange[0], orange[1], orange[2]);
    doc.setLineWidth(1.5);
    doc.rect(pw - marginX - 140, 75, 140, 45, "S");

    doc.setFillColor(teal[0], teal[1], teal[2]);
    doc.rect(pw - marginX - 110, 68, 80, 14, "F");
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(8);
    doc.text("JOB ID", pw - marginX - 70, 78, { align: "center" });

    doc.setTextColor(orange[0], orange[1], orange[2]);
    doc.setFontSize(18);
    doc.text(jobID, pw - marginX - 70, 105, { align: "center" });
    doc.setFont("helvetica", "normal");

    doc.addImage(barcodeDataUrl, "PNG", pw - marginX - 130, 125, 120, 30);

    // Bottom teal border
    doc.setDrawColor(teal[0], teal[1], teal[2]);
    doc.setLineWidth(3);
    doc.line(marginX, 150, pw - marginX, 150);
  };

  const drawFooter = (doc: jsPDF) => {
    const fY = ph - 70;
    doc.setFillColor(darkBg[0], darkBg[1], darkBg[2]);
    doc.rect(marginX, fY, pw - marginX * 2, 55, "F");

    // Column 1
    doc.addImage(locIcon, "PNG", marginX + 15, fY + 20, 14, 14);
    doc.setTextColor(220, 220, 220);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(7);
    doc.text("14-13, Brindavan Gardens 1st Lane,", marginX + 35, fY + 26);
    doc.text("Guntur - 522004, AP, India.", marginX + 35, fY + 36);

    // Column 2
    doc.addImage(phoneIcon, "PNG", marginX + 220, fY + 20, 14, 14);
    doc.setTextColor(255, 255, 255);
    doc.text("+91 9666984949", marginX + 240, fY + 26);
    doc.text("+91 9505225222", marginX + 240, fY + 36);

    // Column 3
    doc.addImage(webIcon, "PNG", marginX + 370, fY + 20, 14, 14);
    doc.setTextColor(255, 255, 255);
    doc.text("rkrepairlabs.vercel.app", marginX + 390, fY + 26);
    doc.setTextColor(150, 150, 150);
    doc.text("Facebook | Instagram | YouTube", marginX + 390, fY + 36);
  };

  let currentY = 175;
  drawHeader(doc);

  // Date and Time Row
  const dateW = (pw - marginX * 2 - 15) / 2;
  const timeX = marginX + dateW + 15;

  doc.setDrawColor(teal[0], teal[1], teal[2]);
  doc.setLineWidth(0.5);
  doc.setFillColor(255, 255, 255);
  doc.rect(marginX, currentY, dateW, 36, "S");
  doc.rect(timeX, currentY, dateW, 36, "S");

  doc.setFillColor(teal[0], teal[1], teal[2]);
  doc.rect(marginX, currentY, 36, 36, "F");
  doc.rect(timeX, currentY, 36, 36, "F");

  doc.addImage(calendarIcon, "PNG", marginX + 10, currentY + 10, 16, 16);
  doc.addImage(clockIcon, "PNG", timeX + 10, currentY + 10, 16, 16);

  doc.setTextColor(teal[0], teal[1], teal[2]);
  doc.setFontSize(9);
  doc.setFont("helvetica", "bold");
  doc.text("DATE", marginX + 48, currentY + 16);
  doc.text("TIME", timeX + 48, currentY + 16);

  doc.setTextColor(20, 20, 20);
  doc.setFontSize(11);
  doc.setFont("helvetica", "bold");
  doc.text(dateStr, marginX + 48, currentY + 30);
  doc.text(timeStr, timeX + 48, currentY + 30);

  doc.setDrawColor(200, 200, 200);
  doc.line(marginX + 48, currentY + 32, marginX + dateW - 15, currentY + 32);
  doc.line(timeX + 48, currentY + 32, timeX + dateW - 15, currentY + 32);

  currentY += 55;

  const leftColW = 280;
  const rightColW = pw - marginX * 2 - leftColW - 15;
  const rightX = marginX + leftColW + 15;

  // ==== LEFT COLUMN ====

  // CUSTOMER DETAILS
  doc.setDrawColor(teal[0], teal[1], teal[2]);
  doc.setLineWidth(0.5);
  doc.rect(marginX, currentY + 7, leftColW, 75, "S");
  drawRibbon(doc, "CUSTOMER DETAILS", marginX - 5, currentY, 140, 14, teal, userWhite);

  doc.setTextColor(100, 100, 100);
  doc.setFontSize(8);
  doc.text("Customer Name :", marginX + 15, currentY + 32);
  doc.text("Mobile No.         :", marginX + 15, currentY + 48);
  doc.text("Email ID            :", marginX + 15, currentY + 64);

  doc.setTextColor(20, 20, 20);
  doc.setFont("helvetica", "bold");
  doc.text(customer?.name || "Walk-in Customer", marginX + 85, currentY + 32);
  doc.text(customer?.phone || "N/A", marginX + 85, currentY + 48);
  doc.text(customer?.email || "N/A", marginX + 85, currentY + 64);

  doc.setDrawColor(200, 200, 200);
  doc.line(marginX + 85, currentY + 35, marginX + leftColW - 15, currentY + 35);
  doc.line(marginX + 85, currentY + 51, marginX + leftColW - 15, currentY + 51);
  doc.line(marginX + 85, currentY + 67, marginX + leftColW - 15, currentY + 67);
  doc.setFont("helvetica", "normal");

  currentY += 100;

  // DEVICE DETAILS
  doc.setDrawColor(teal[0], teal[1], teal[2]);
  doc.rect(marginX, currentY + 7, leftColW, 105, "S");
  drawRibbon(doc, "DEVICE DETAILS", marginX - 5, currentY, 130, 14, teal, laptopWhite);

  doc.setTextColor(100, 100, 100);
  doc.setFontSize(8);
  doc.text("Device Type   :", marginX + 15, currentY + 32);
  doc.text("Brand/Model :", marginX + 15, currentY + 50);
  doc.text("Serial/IMEI   :", marginX + 15, currentY + 68);
  doc.text("Password       :", marginX + 15, currentY + 86);

  doc.setTextColor(20, 20, 20);
  doc.setFont("helvetica", "bold");
  doc.text(repair?.device_type || "N/A", marginX + 85, currentY + 32);
  doc.text(
    `${repair?.device_brand || ""} ${repair?.device_model || ""}`.trim() || "N/A",
    marginX + 85,
    currentY + 50,
  );
  doc.text(repair?.imei || "N/A", marginX + 85, currentY + 68);
  doc.text(repair?.password || "N/A", marginX + 85, currentY + 86);

  doc.setDrawColor(200, 200, 200);
  doc.line(marginX + 85, currentY + 35, marginX + leftColW - 15, currentY + 35);
  doc.line(marginX + 85, currentY + 53, marginX + leftColW - 15, currentY + 53);
  doc.line(marginX + 85, currentY + 71, marginX + leftColW - 15, currentY + 71);
  doc.line(marginX + 85, currentY + 89, marginX + leftColW - 15, currentY + 89);
  doc.setFont("helvetica", "normal");

  currentY += 130;

  // REPORTED PROBLEM
  doc.setDrawColor(teal[0], teal[1], teal[2]);
  doc.rect(marginX, currentY + 7, leftColW, 75, "S");
  drawRibbon(doc, "REPORTED PROBLEM", marginX - 5, currentY, 140, 14, teal, wrenchWhite);

  doc.setTextColor(100, 100, 100);
  doc.setFontSize(8);
  doc.text("Reported Problem / Fault Description :", marginX + 15, currentY + 30);
  doc.setTextColor(20, 20, 20);
  doc.setFont("helvetica", "bold");
  doc.text(repair?.issue || "N/A", marginX + 15, currentY + 48);
  doc.setDrawColor(200, 200, 200);
  doc.line(marginX + 15, currentY + 51, marginX + leftColW - 15, currentY + 51);
  doc.line(marginX + 15, currentY + 67, marginX + leftColW - 15, currentY + 67);
  doc.setFont("helvetica", "normal");

  currentY += 100;

  // ACCESSORIES RECEIVED
  doc.setDrawColor(teal[0], teal[1], teal[2]);
  doc.rect(marginX, currentY + 7, leftColW, 70, "S");
  drawRibbon(doc, "ACCESSORIES RECEIVED", marginX - 5, currentY, 160, 14, teal, packageWhite);

  doc.setTextColor(100, 100, 100);
  doc.setFontSize(8);
  doc.text(
    "[ ] Charger     [ ] Battery     [ ] Bag     [ ] Box     [ ] Other",
    marginX + 15,
    currentY + 35,
  );
  doc.text("Other Notes : ", marginX + 15, currentY + 58);
  doc.setDrawColor(200, 200, 200);
  doc.line(marginX + 75, currentY + 60, marginX + leftColW - 15, currentY + 60);

  // ==== RIGHT COLUMN ====
  let rightY = 175;

  // TRACK REPAIR STATUS (QR)
  doc.setDrawColor(teal[0], teal[1], teal[2]);
  doc.rect(rightX, rightY + 7, rightColW, 80, "S");
  drawRibbon(doc, "SCAN TO TRACK REPAIR STATUS", rightX - 5, rightY, 180, 14, teal);

  doc.addImage(qrDataUrl, "PNG", rightX + 15, rightY + 22, 55, 55);
  doc.setTextColor(50, 50, 50);
  doc.setFontSize(8);
  doc.text("Scan QR to", rightX + 80, rightY + 38);
  doc.text("check real-time", rightX + 80, rightY + 48);
  doc.text("repair status", rightX + 80, rightY + 58);
  doc.text("of your device.", rightX + 80, rightY + 68);

  // Simulated curved orange arrow
  doc.setDrawColor(orange[0], orange[1], orange[2]);
  doc.setLineWidth(1);
  doc.line(rightX + 130, rightY + 73, rightX + 120, rightY + 73);
  doc.line(rightX + 120, rightY + 73, rightX + 123, rightY + 70);

  rightY += 105;

  // DEVICE CONDITION AT INTAKE
  doc.setDrawColor(teal[0], teal[1], teal[2]);
  doc.rect(rightX, rightY + 7, rightColW, 125, "S");
  drawRibbon(doc, "DEVICE CONDITION AT INTAKE", rightX - 5, rightY, 170, 14, teal, fileTextWhite);

  doc.setTextColor(100, 100, 100);
  doc.setFontSize(8);

  // Left col
  doc.text("[ ] Power ON", rightX + 15, rightY + 34);
  doc.text("[ ] Power OFF", rightX + 15, rightY + 51);
  doc.text("[ ] Display OK", rightX + 15, rightY + 68);
  doc.text("[ ] No Display", rightX + 15, rightY + 85);
  doc.text("[ ] Screen Cracked", rightX + 15, rightY + 102);
  // Right col
  doc.text("[ ] Water Damage", rightX + 130, rightY + 34);
  doc.text("[ ] Physical Damage", rightX + 130, rightY + 51);
  doc.text("[ ] Scratches / Dents", rightX + 130, rightY + 68);
  doc.text("[ ] Missing Screws", rightX + 130, rightY + 85);
  doc.text("[ ] Other", rightX + 130, rightY + 102);

  doc.setDrawColor(200, 200, 200);
  doc.line(rightX + 165, rightY + 104, rightX + rightColW - 15, rightY + 104);

  rightY += 150;

  // ESTIMATED & PAYMENT DETAILS
  doc.setDrawColor(teal[0], teal[1], teal[2]);
  doc.rect(rightX, rightY + 7, rightColW, 85, "S");
  drawRibbon(doc, "ESTIMATED & PAYMENT DETAILS", rightX - 5, rightY, 175, 14, teal, rupeeWhite);

  doc.setTextColor(100, 100, 100);
  doc.setFontSize(8);
  doc.text("Inspection / Diagnosis Fee :", rightX + 15, rightY + 34);
  doc.text("Estimated Repair Cost       :", rightX + 15, rightY + 51);
  doc.text("Advance Paid                   :", rightX + 15, rightY + 68);
  doc.text("Expected Delivery Date     :", rightX + 15, rightY + 85);

  doc.setTextColor(20, 20, 20);
  doc.setFont("helvetica", "bold");
  doc.text(inrPrecise(200), rightX + 155, rightY + 34);
  doc.text(inrPrecise(invoice?.total || 0), rightX + 155, rightY + 51);
  doc.text(inrPrecise(0), rightX + 155, rightY + 68);

  doc.setDrawColor(200, 200, 200);
  doc.line(rightX + 155, rightY + 37, rightX + rightColW - 15, rightY + 37);
  doc.line(rightX + 155, rightY + 54, rightX + rightColW - 15, rightY + 54);
  doc.line(rightX + 155, rightY + 71, rightX + rightColW - 15, rightY + 71);
  doc.line(rightX + 155, rightY + 88, rightX + rightColW - 15, rightY + 88);
  doc.setFont("helvetica", "normal");

  currentY = Math.max(currentY + 85, rightY + 105);

  // Dynamic Spacing Calculation
  const footerY = ph - 70;
  // Blocks: Terms/Signature (130) = 130 total fixed height
  let remaining = footerY - currentY - 130;
  if (remaining < 30) {
    doc.addPage();
    drawHeader(doc);
    drawFooter(doc);
    currentY = 140;
    remaining = footerY - currentY - 130;
  }

  // Cap the gap
  const gap = Math.min(60, Math.max(15, remaining / 2));

  currentY += gap;

  const sumW = (pw - marginX * 2 - 15) / 2;
  const totX = marginX + sumW + 15;

  // Terms Box (Left)
  doc.setFillColor(253, 242, 233);
  doc.rect(marginX, currentY + 5, sumW, 130, "F");

  drawRibbon(doc, "TERMS & CONDITIONS", marginX - 5, currentY, 130, 14, orange);

  doc.setTextColor(80, 80, 80);
  doc.setFontSize(8);
  doc.setFont("helvetica", "normal");
  const terms = shop?.terms?.length
    ? shop.terms
    : [
        "Data backup is customer's responsibility.",
        "Not responsible for data loss.",
        "Warranty applies only to repaired parts.",
        "Collect within 30 days.",
        "You agree to the above terms.",
      ];
  terms.slice(0, 5).forEach((t: string, i: number) => {
    const row = i * 20;
    doc.addImage(checkIcon, "PNG", marginX + 15, currentY + 25 + row, 12, 12);
    const splitText = doc.splitTextToSize(t, sumW - 40);
    doc.text(splitText, marginX + 35, currentY + 34 + row);
  });

  // Thanks & Signature box (Right)
  doc.setDrawColor(200, 200, 200);
  doc.setLineWidth(0.5);
  doc.rect(totX, currentY + 5, sumW, 130, "S");

  // Thanks Box
  doc.setTextColor(100, 100, 100);
  doc.setFontSize(10);
  doc.setFont("helvetica", "italic");
  doc.text("Thank you for trusting", totX + 15, currentY + 25);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(16);
  doc.setTextColor(teal[0], teal[1], teal[2]);
  doc.text("RK", totX + 15, currentY + 45);
  doc.setTextColor(orange[0], orange[1], orange[2]);
  doc.text("REPAIR LABS", totX + 43, currentY + 45);

  doc.setFontSize(8);
  doc.setTextColor(100, 100, 100);
  doc.setFont("helvetica", "normal");
  doc.text("We'll get your device back in perfect shape!", totX + 15, currentY + 62);

  // Quality Badge simulate (Top Right)
  doc.setFillColor(teal[0], teal[1], teal[2]);
  doc.rect(totX + sumW - 55, currentY + 12, 45, 45, "F");
  doc.triangle(
    totX + sumW - 55,
    currentY + 57,
    totX + sumW - 32.5,
    currentY + 70,
    totX + sumW - 10,
    currentY + 57,
    "F",
  );
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(7);
  doc.setFont("helvetica", "bold");
  doc.text("QUALITY", totX + sumW - 32.5, currentY + 44, { align: "center" });
  doc.text("REPAIR", totX + sumW - 32.5, currentY + 52, { align: "center" });
  doc.addImage(checkWhiteIcon, "PNG", totX + sumW - 40.5, currentY + 17, 16, 16);

  // Authorized Signatory Box (Bottom)
  doc.addImage(penIcon, "PNG", totX + 15, currentY + 95, 24, 24);
  doc.setDrawColor(100, 100, 100);
  doc.setLineWidth(0.5);
  doc.line(totX + 50, currentY + 115, totX + sumW - 15, currentY + 115);
  doc.setFontSize(8);
  doc.setTextColor(teal[0], teal[1], teal[2]);
  doc.setFont("helvetica", "bold");
  doc.text("TECHNICIAN SIGNATURE", totX + 50 + (sumW - 65) / 2, currentY + 125, {
    align: "center",
  });

  const pageCount = (doc as any).internal.getNumberOfPages();
  if (pageCount === 1) {
    drawFooter(doc);
  }

  return doc;
}
