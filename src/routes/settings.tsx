import { useState, useEffect } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { Settings, Save, Store, Link, FileText, BadgePercent } from "lucide-react";

import { AppLayout } from "@/components/app-layout";
import { getProfileFn, updateProfileFn } from "@/lib/api/settings";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export const Route = createFileRoute("/settings")({
  head: () => ({ meta: [{ title: "Settings — RK Labs" }] }),
  component: SettingsPage,
});

function SettingsPage() {
  const qc = useQueryClient();
  const { data: profile, isLoading } = useQuery({
    queryKey: ["settings_profile"],
    queryFn: async () => {
      const data = await getProfileFn();
      return data as any;
    },
  });

  const [formData, setFormData] = useState({
    shop_name: "",
    shop_address: "",
    shop_phone: "",
    shop_logo: "",
    gst_number: "",
    gst_percent: 0,
    full_name: "",
  });

  useEffect(() => {
    if (profile) {
      setFormData({
        shop_name: profile.shop_name || "",
        shop_address: profile.shop_address || "",
        shop_phone: profile.shop_phone || "",
        shop_logo: profile.shop_logo || "",
        gst_number: profile.gst_number || "",
        gst_percent: profile.gst_percent || 0,
        full_name: profile.full_name || "",
      });
    }
  }, [profile]);

  const update = useMutation({
    mutationFn: async (payload: any) => {
      await updateProfileFn({ data: payload });
    },
    onSuccess: () => {
      toast.success("Settings updated successfully");
      qc.invalidateQueries({ queryKey: ["settings_profile"] });
    },
    onError: (e: any) => toast.error(e.message),
  });

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    update.mutate(formData);
  }

  if (isLoading) {
    return (
      <AppLayout>
        <div className="p-8 text-center text-slate-500">Loading settings...</div>
      </AppLayout>
    );
  }

  return (
    <AppLayout>
      <div className="mx-auto max-w-4xl space-y-8">
        <header className="border-b border-white/10 pb-6">
        <h1 className="text-3xl font-bold tracking-tight">Shop Settings</h1>
        <p className="mt-1.5 text-sm text-slate-400">Configure your business profile and preferences</p>
      </header>

      <form onSubmit={handleSubmit} className="space-y-8">
        
        {/* Personal Details */}
        <section className="rounded-2xl border border-white/10 bg-[#0f172a]/80 backdrop-blur-xl p-6 shadow-lg space-y-4">
          <h2 className="text-xl font-semibold flex items-center gap-2 mb-4">
            <Settings className="w-5 h-5 text-cyan-400" />
            Account Details
          </h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-1.5">
              <Label className="text-slate-300">Email Address (Read-only)</Label>
              <Input
                value={profile?.email || ""}
                disabled
                className="bg-black/40 border-white/5 text-slate-400 cursor-not-allowed"
              />
            </div>
            <div className="space-y-1.5">
              <Label className="text-slate-300">Your Full Name</Label>
              <Input
                value={formData.full_name}
                onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
                className="bg-black/20 border-white/10 focus:border-cyan-500/50"
              />
            </div>
          </div>
        </section>

        {/* Business Details */}
        <section className="rounded-2xl border border-white/10 bg-[#0f172a]/80 backdrop-blur-xl p-6 shadow-lg space-y-4">
          <h2 className="text-xl font-semibold flex items-center gap-2 mb-4">
            <Store className="w-5 h-5 text-cyan-400" />
            Business Profile
          </h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-1.5 sm:col-span-2">
              <Label className="text-slate-300">Shop Name</Label>
              <Input
                value={formData.shop_name}
                onChange={(e) => setFormData({ ...formData, shop_name: e.target.value })}
                placeholder="RK Repair Labs"
                className="bg-black/20 border-white/10 focus:border-cyan-500/50"
              />
            </div>
            
            <div className="space-y-1.5 sm:col-span-2">
              <Label className="text-slate-300">Address</Label>
              <Input
                value={formData.shop_address}
                onChange={(e) => setFormData({ ...formData, shop_address: e.target.value })}
                placeholder="123 Main St..."
                className="bg-black/20 border-white/10 focus:border-cyan-500/50"
              />
            </div>

            <div className="space-y-1.5">
              <Label className="text-slate-300">Support Phone</Label>
              <Input
                value={formData.shop_phone}
                onChange={(e) => setFormData({ ...formData, shop_phone: e.target.value })}
                placeholder="+91 XXXXX XXXXX"
                className="bg-black/20 border-white/10 focus:border-cyan-500/50"
              />
            </div>

            <div className="space-y-1.5">
              <Label className="text-slate-300 flex items-center gap-1">
                <Link className="w-3 h-3" /> Logo URL
              </Label>
              <Input
                value={formData.shop_logo}
                onChange={(e) => setFormData({ ...formData, shop_logo: e.target.value })}
                placeholder="https://..."
                className="bg-black/20 border-white/10 focus:border-cyan-500/50"
              />
            </div>
          </div>
        </section>

        {/* Tax & Invoicing */}
        <section className="rounded-2xl border border-white/10 bg-[#0f172a]/80 backdrop-blur-xl p-6 shadow-lg space-y-4">
          <h2 className="text-xl font-semibold flex items-center gap-2 mb-4">
            <FileText className="w-5 h-5 text-cyan-400" />
            Tax & Invoicing
          </h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-1.5">
              <Label className="text-slate-300">GST Number / Tax ID</Label>
              <Input
                value={formData.gst_number}
                onChange={(e) => setFormData({ ...formData, gst_number: e.target.value })}
                className="bg-black/20 border-white/10 focus:border-cyan-500/50 uppercase"
              />
            </div>
            <div className="space-y-1.5">
              <Label className="text-slate-300 flex items-center gap-1">
                <BadgePercent className="w-3 h-3" /> Default Tax Rate (%)
              </Label>
              <Input
                type="number"
                step="0.1"
                value={formData.gst_percent}
                onChange={(e) => setFormData({ ...formData, gst_percent: parseFloat(e.target.value) || 0 })}
                className="bg-black/20 border-white/10 focus:border-cyan-500/50"
              />
            </div>
          </div>
        </section>

        <div className="flex justify-end">
          <Button
            type="submit"
            disabled={update.isPending}
            className="h-12 px-8 text-lg font-medium shadow-lg transition-transform hover:scale-105 active:scale-95"
            style={{ background: "var(--gradient-primary)", color: "oklch(0.12 0.02 250)" }}
          >
            <Save className="w-5 h-5 mr-2" />
            {update.isPending ? "Saving..." : "Save Changes"}
          </Button>
        </div>
      </form>
      </div>
    </AppLayout>
  );
}
