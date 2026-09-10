import React from "react";
import { createRoot } from "react-dom/client";
import { flushSync } from "react-dom";
import jsPDF from "jspdf";
import { toJpeg } from "html-to-image";
import { IntakeReceiptTemplate } from "@/components/intake-receipt-template";
import { InvoiceTemplate } from "@/components/invoice-template";

export type PdfDataInput = {
  type: "invoice" | "intake";
  shop?: any;
  invoice?: any;
  customer?: any;
  repair?: any;
  items?: any[];
};

export async function generatePdfFromHtml({ type, shop, invoice, customer, repair, items }: PdfDataInput): Promise<jsPDF> {
  return new Promise(async (resolve, reject) => {
    try {
      // Create a temporary container
      const container = document.createElement("div");
      container.style.position = "absolute";
      container.style.top = "-9999px";
      container.style.left = "-9999px";

      document.body.appendChild(container);
      const root = createRoot(container);

      // Render the component synchronously
      flushSync(() => {
        if (type === "invoice") {
          root.render(
            <InvoiceTemplate
              shop={shop} invoice={invoice} customer={customer} repair={repair} items={items}
            />
          );
        } else {
          root.render(
            <IntakeReceiptTemplate
              shop={shop} invoice={invoice} customer={customer} repair={repair} items={items}
            />
          );
        }
      });

      // Wait a moment for fonts, SVGs, and QR codes to fully render
      await new Promise(r => setTimeout(r, 500));

      const imgData = await toJpeg(container.firstElementChild as HTMLElement, {
        quality: 1.0,
        backgroundColor: "#ffffff",
        pixelRatio: 2,
      });

      // Clean up DOM
      root.unmount();
      container.remove();

      // Calculate A4 dimensions (jsPDF uses points by default, A4 is 595.28 x 841.89)
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "pt",
        format: "a4",
      });

      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();

      const imgProps = pdf.getImageProperties(imgData);
      const imgHeight = (imgProps.height * pdfWidth) / imgProps.width;

      pdf.addImage(imgData, "JPEG", 0, 0, pdfWidth, imgHeight);

      // If content overflows A4 height, we might need multiple pages, but IntakeReceiptTemplate is designed to fit in one A4 page.
      if (imgHeight > pdfHeight) {
        // If it happens to be slightly larger, let's just scale it to fit one page.
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
