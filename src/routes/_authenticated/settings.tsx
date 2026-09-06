import { useState, useEffect } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";

export const Route = createFileRoute("/_authenticated/settings")({
  head: () => ({ meta: [{ title: "Settings — RK Labs" }] }),
  component: SettingsPage,
});

const DEFAULT_TEMPLATES: Record<string, string> = {
  received: "Hi {name}, we have received your {device} for repair. Ticket: {ticket}. — {shop}",
  in_progress: "Hi {name}, work has started on your {device} (Ticket {ticket}). We will update you soon. — {shop}",
  ready_delivery: "Hi {name}, your {device} (Ticket {ticket}) is ready for delivery. Please visit us. — {shop}",
  delivered: "Hi {name}, thanks for choosing {shop}. Your {device} (Ticket {ticket}) is delivered. We appreciate a review!",
  payment_reminder: "Hi {name}, gentle reminder: invoice {invoice_no} of {amount} is pending. — {shop}",
  invoice: "Hi {name}, your invoice {invoice_no} of {amount} from {shop}. Download: {link}",
};

const TEMPLATE_LABELS: Record<string, string> = {
  received: "Repair received",
  in_progress: "Work in progress",
  ready_delivery: "Ready for delivery",
  delivered: "Delivered (review request)",
  payment_reminder: "Payment reminder",
  invoice: "Invoice delivery",
};

import { getProfileFn, updateProfileFn } from "@/lib/api/settings";

function SettingsPage() {
  const qc = useQueryClient();
  const { data: profile, isLoading } = useQuery({
    queryKey: ["profile"],
    queryFn: async () => {
      try {
        return await getProfileFn();
      } catch (e) {
        return null;
      }
    },
  });

  const [templates, setTemplates] = useState<Record<string, string>>(DEFAULT_TEMPLATES);
  const [autoReminders, setAutoReminders] = useState(false);

  useEffect(() => {
    if (profile?.wa_templates) setTemplates({ ...DEFAULT_TEMPLATES, ...profile.wa_templates });
    if (profile?.auto_reminders != null) setAutoReminders(profile.auto_reminders);
  }, [profile]);

  const saveShop = useMutation({
    mutationFn: async (form: any) => {
      await updateProfileFn({ data: form });
    },
    onSuccess: () => { toast.success("Saved"); qc.invalidateQueries({ queryKey: ["profile"] }); },
    onError: (e: any) => toast.error(e.message),
  });

  const saveTemplates = useMutation({
    mutationFn: async () => {
      await updateProfileFn({ data: { wa_templates: templates, auto_reminders: autoReminders } });
    },
    onSuccess: () => { toast.success("WhatsApp templates saved"); qc.invalidateQueries({ queryKey: ["profile"] }); },
    onError: (e: any) => toast.error(e.message),
  });

  function onShopSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    saveShop.mutate({
      full_name: String(fd.get("full_name") || ""),
      shop_name: String(fd.get("shop_name") || ""),
      shop_address: String(fd.get("shop_address") || ""),
      shop_phone: String(fd.get("shop_phone") || ""),
      gst_number: String(fd.get("gst_number") || ""),
      gst_percent: Number(fd.get("gst_percent") || 18),
    });
  }

  if (isLoading) return <div className="text-slate-500">Loading…</div>;

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <header className="border-b border-white/10 pb-6">
        <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
        <p className="mt-1.5 text-sm text-slate-400">Shop details, WhatsApp templates, and reminder automation.</p>
      </header>

      <form onSubmit={onShopSubmit} className="rounded-2xl border border-white/10 bg-[#0f172a]/80 backdrop-blur-xl p-6 shadow-lg space-y-6">
        <h2 className="text-lg font-bold tracking-tight text-slate-200">Shop details</h2>
        <div className="grid grid-cols-2 gap-5">
          <F label="Your name" name="full_name" defaultValue={profile?.full_name ?? ""} />
          <F label="Shop name" name="shop_name" defaultValue={profile?.shop_name ?? "RK Labs"} />
          <F label="Shop phone" name="shop_phone" defaultValue={profile?.shop_phone ?? ""} />
          <F label="GSTIN" name="gst_number" defaultValue={profile?.gst_number ?? ""} />
          <F label="Default GST %" name="gst_percent" type="number" step="0.01" defaultValue={profile?.gst_percent ?? 18} />
        </div>
        <F label="Shop address" name="shop_address" defaultValue={profile?.shop_address ?? ""} />
        <div className="flex justify-end pt-2">
          <Button type="submit" disabled={saveShop.isPending} className="shadow-lg transition-transform hover:scale-105 active:scale-95" style={{ background: "var(--gradient-primary)", color: "oklch(0.12 0.02 250)" }}>
            Save shop
          </Button>
        </div>
      </form>

      <div className="rounded-2xl border border-white/10 bg-[#0f172a]/80 backdrop-blur-xl p-6 shadow-lg space-y-6">
        <div className="flex items-start justify-between gap-4 border-b border-white/10 pb-5">
          <div>
            <h2 className="text-lg font-bold tracking-tight text-slate-200">WhatsApp templates</h2>
            <p className="mt-1 text-sm text-slate-400">Use placeholders: <code className="rounded bg-black/30 px-1.5 py-0.5 font-mono text-cyan-400">{"{name} {device} {ticket} {shop} {invoice_no} {amount} {link}"}</code></p>
          </div>
          <div className="flex items-center gap-3 bg-white/5 rounded-lg px-4 py-2 border border-white/5">
            <Label htmlFor="auto" className="text-sm font-semibold text-slate-300">Auto status reminders</Label>
            <Switch id="auto" checked={autoReminders} onCheckedChange={setAutoReminders} className="data-[state=checked]:bg-cyan-500" />
          </div>
        </div>
        <div className="grid gap-5">
          {Object.keys(DEFAULT_TEMPLATES).map((key) => (
            <div key={key} className="space-y-2">
              <Label className="text-sm font-semibold uppercase tracking-widest text-slate-400">{TEMPLATE_LABELS[key]}</Label>
              <Textarea
                rows={2}
                value={templates[key] ?? ""}
                onChange={(e) => setTemplates({ ...templates, [key]: e.target.value })}
                className="resize-none bg-black/20 border-white/10 focus:border-cyan-500/50 text-slate-200 placeholder:text-slate-600"
              />
            </div>
          ))}
        </div>
        <div className="flex justify-between pt-4 border-t border-white/10">
          <Button type="button" variant="outline" className="border-white/10 bg-white/5 hover:bg-white/10 text-slate-300" onClick={() => setTemplates(DEFAULT_TEMPLATES)}>Reset defaults</Button>
          <Button onClick={() => saveTemplates.mutate()} disabled={saveTemplates.isPending} className="shadow-lg transition-transform hover:scale-105 active:scale-95" style={{ background: "var(--gradient-primary)", color: "oklch(0.12 0.02 250)" }}>
            Save templates
          </Button>
        </div>
      </div>
    </div>
  );
}

function F({ label, ...props }: { label: string } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div className="space-y-2">
      <Label className="text-sm font-medium text-slate-300">{label}</Label>
      <Input {...props} className="bg-black/20 border-white/10 focus:border-cyan-500/50 text-slate-200" />
    </div>
  );
}
