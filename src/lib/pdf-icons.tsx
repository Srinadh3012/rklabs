import { createRoot } from "react-dom/client";
import { flushSync } from "react-dom";

/**
 * Renders a React SVG component into an invisible DOM node, 
 * draws it to a canvas, and returns a base64 PNG data URL 
 * perfectly suited for native jsPDF injection.
 */
export async function getIconDataUrl(IconElement: React.ReactElement, color = "#000000", size = 24): Promise<string> {
  return new Promise((resolve, reject) => {
    const div = document.createElement("div");
    // Ensure it's hidden and off-screen
    div.style.position = "absolute";
    div.style.left = "-9999px";
    div.style.top = "-9999px";
    div.style.width = `${size}px`;
    div.style.height = `${size}px`;
    document.body.appendChild(div);

    const root = createRoot(div);
    flushSync(() => {
      // The wrapper sets text color which lucide "currentColor" inherits
      root.render(
        <div style={{ color }}>
          {IconElement}
        </div>
      );
    });

    const svgElement = div.querySelector("svg");
    if (!svgElement) {
      root.unmount();
      div.remove();
      return reject(new Error("No SVG element rendered by IconElement"));
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
      // Scale by 4x for high-res crispness in PDF
      const scale = 4;
      canvas.width = size * scale;
      canvas.height = size * scale;
      const ctx = canvas.getContext("2d");
      
      if (ctx) {
        ctx.scale(scale, scale);
        ctx.drawImage(img, 0, 0, size, size);
        const dataUrl = canvas.toDataURL("image/png");
        resolve(dataUrl);
      } else {
        reject(new Error("Failed to get 2D context"));
      }
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
