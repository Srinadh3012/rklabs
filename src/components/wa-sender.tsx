import { createContext, useCallback, useContext, useState, type ReactNode } from "react";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { MessageCircle, X, Copy } from "lucide-react";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";

import { logWaMessageFn } from "@/lib/api/wa";

export type WaSendRequest = {
  kind: "advance" | "status_update" | "invoice" | "payment_reminder" | "appointment" | "generic";
  phone: string | null | undefined;
  recipientName?: string | null;
  message: string;
  repairId?: string | null;
  invoiceId?: string | null;
  title?: string;
};

type Ctx = { send: (req: WaSendRequest) => void };
const WaCtx = createContext<Ctx | null>(null);

export function useWaSender() {
  const c = useContext(WaCtx);
  if (!c) throw new Error("WaSenderProvider missing");
  return c;
}

async function insertLog(req: WaSendRequest, status: "sent" | "blocked" | "cancelled" | "no_phone", error?: string) {
  try {
    await logWaMessageFn({ data: {
      repair_id: req.repairId ?? null,
      invoice_id: req.invoiceId ?? null,
      kind: req.kind,
      recipient_name: req.recipientName ?? null,
      phone: req.phone ?? null,
      message: req.message,
      status,
      error: error ?? null,
    }});
  } catch {
    /* swallow */
  }
}

export function WaSenderProvider({ children }: { children: ReactNode }) {
  const qc = useQueryClient();
  const [req, setReq] = useState<WaSendRequest | null>(null);
  const [text, setText] = useState("");

  const send = useCallback((r: WaSendRequest) => {
    setReq(r);
    setText(r.message);
  }, []);

  function close() { setReq(null); setText(""); }

  function refreshLogs() {
    if (req?.repairId) qc.invalidateQueries({ queryKey: ["wa-logs", req.repairId] });
    if (req?.invoiceId) qc.invalidateQueries({ queryKey: ["wa-logs-invoice", req.invoiceId] });
  }

  async function openNow() {
    if (!req) return;
    const finalReq = { ...req, message: text };
    if (!finalReq.phone) {
      await insertLog(finalReq, "no_phone", "No WhatsApp number for recipient");
      toast.error("No WhatsApp number for this recipient");
      refreshLogs();
      close();
      return;
    }
    const digits = finalReq.phone.replace(/\D/g, "");
    // Use web.whatsapp.com directly instead of wa.me — wa.me redirects
    // through api.whatsapp.com which some ISPs / firewalls block
    // (ERR_BLOCKED_BY_RESPONSE).
    const url = `https://web.whatsapp.com/send?phone=${digits}&text=${encodeURIComponent(finalReq.message)}`;
    const fallbackUrl = `https://wa.me/${digits}?text=${encodeURIComponent(finalReq.message)}`;
    const w = window.open(url, "_blank", "noopener");
    if (w) {
      await insertLog(finalReq, "sent");
      toast.success(`WhatsApp opened for ${finalReq.recipientName ?? digits}`, {
        description: "If WhatsApp Web doesn't load, try the fallback link.",
        action: { label: "Try wa.me", onClick: () => window.open(fallbackUrl, "_blank", "noopener") },
        duration: 8000,
      });
    } else {
      await insertLog(finalReq, "blocked", "Popup blocked");
      toast.error("WhatsApp blocked by browser", {
        description: "Allow popups for this site, or copy the message and send manually.",
        action: { label: "Retry", onClick: () => window.open(url, "_blank", "noopener") },
        duration: 15000,
      });
    }
    refreshLogs();
    close();
  }

  async function cancel() {
    if (req) {
      await insertLog({ ...req, message: text }, "cancelled");
      refreshLogs();
    }
    close();
  }

  async function copyMsg() {
    try {
      await navigator.clipboard.writeText(text);
      toast.success("Message copied");
    } catch {
      toast.error("Copy failed");
    }
  }

  return (
    <WaCtx.Provider value={{ send }}>
      {children}
      <Dialog open={!!req} onOpenChange={(v) => { if (!v) cancel(); }}>
        <DialogContent className="glass-strong max-w-lg">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <MessageCircle className="h-5 w-5 text-[var(--neon)]" />
              {req?.title ?? "Preview WhatsApp message"}
            </DialogTitle>
          </DialogHeader>
          {req && (
            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="glass rounded-lg p-3">
                  <div className="uppercase tracking-wider text-muted-foreground">Recipient</div>
                  <div className="mt-1 font-semibold">{req.recipientName ?? "—"}</div>
                  <div className="text-muted-foreground">{req.phone ?? "No number on file"}</div>
                </div>
                <div className="glass rounded-lg p-3">
                  <div className="uppercase tracking-wider text-muted-foreground">Type</div>
                  <div className="mt-1 font-semibold capitalize">{req.kind.replace(/_/g, " ")}</div>
                  <div className="text-muted-foreground">Logged on ticket / invoice</div>
                </div>
              </div>
              <div className="space-y-1.5">
                <Label className="flex items-center justify-between">
                  <span>Message preview (editable)</span>
                  <button type="button" onClick={copyMsg} className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground">
                    <Copy className="h-3 w-3" /> Copy
                  </button>
                </Label>
                <Textarea value={text} onChange={(e) => setText(e.target.value)} rows={10} className="font-mono text-xs leading-relaxed" />
                <div className="text-[11px] text-muted-foreground">
                  Verify greeting, ticket number and amounts before opening WhatsApp.
                </div>
              </div>
            </div>
          )}
          <DialogFooter className="gap-2">
            <Button variant="outline" onClick={cancel}>
              <X className="mr-2 h-4 w-4" /> Cancel
            </Button>
            <Button
              onClick={openNow}
              disabled={!req?.phone}
              style={{ background: "var(--gradient-primary)", color: "oklch(0.12 0.02 250)" }}
            >
              <MessageCircle className="mr-2 h-4 w-4" /> Open WhatsApp
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </WaCtx.Provider>
  );
}
