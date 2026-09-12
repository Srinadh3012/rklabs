import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Plus, Search, Trash2, Edit, Receipt, CheckCircle, Clock } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { inr } from "@/lib/format";
import {
  getInvoicesFn,
  createInvoiceFn,
  updateInvoiceFn,
  deleteInvoiceFn,
} from "@/lib/api/invoices";

export const Route = createFileRoute("/billing")({
  head: () => ({ meta: [{ title: "Billing & Invoices — RK Labs" }] }),
  component: BillingPage,
});

type Invoice = {
  id: string;
  invoice_no: string;
  customer_id: string | null;
  repair_id: string | null;
  subtotal: number;
  discount: number | null;
  tax_rate: number | null;
  tax_amount: number | null;
  total: number;
  amount_paid: number | null;
  payment_status: string;
  payment_method: string | null;
  notes: string | null;
  created_at: string;
};

function BillingPage() {
  const qc = useQueryClient();
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<Invoice | null>(null);

  const { data: invoices = [], isLoading } = useQuery({
    queryKey: ["invoices"],
    queryFn: async () => {
      const data = await getInvoicesFn();
      return data as Invoice[];
    },
  });

  const filtered = invoices.filter(
    (i) =>
      !search ||
      i.invoice_no.toLowerCase().includes(search.toLowerCase()) ||
      i.notes?.toLowerCase().includes(search.toLowerCase())
  );

  const totalRevenue = invoices
    .filter((i) => i.payment_status === "paid")
    .reduce((s, i) => s + i.total, 0);
  const pendingRevenue = invoices
    .filter((i) => i.payment_status === "unpaid" || i.payment_status === "partial")
    .reduce((s, i) => s + (i.total - (i.amount_paid || 0)), 0);

  const save = useMutation({
    mutationFn: async (form: Partial<Invoice>) => {
      const payload = {
        invoice_no: form.invoice_no || `INV-${Date.now().toString().slice(-6)}`,
        subtotal: form.subtotal || 0,
        discount: form.discount || 0,
        tax_rate: form.tax_rate || 0,
        tax_amount: form.tax_amount || 0,
        total: form.total || 0,
        amount_paid: form.amount_paid || 0,
        payment_status: form.payment_status || "unpaid",
        payment_method: form.payment_method || null,
        notes: form.notes || null,
      };

      if (editing) {
        await updateInvoiceFn({ data: { id: editing.id, data: payload } });
      } else {
        await createInvoiceFn({ data: payload });
      }
    },
    onSuccess: () => {
      toast.success("Saved invoice");
      qc.invalidateQueries({ queryKey: ["invoices"] });
      setOpen(false);
      setEditing(null);
    },
    onError: (e: any) => toast.error(e.message),
  });

  const del = useMutation({
    mutationFn: async (id: string) => {
      await deleteInvoiceFn({ data: id });
    },
    onSuccess: () => {
      toast.success("Deleted invoice");
      qc.invalidateQueries({ queryKey: ["invoices"] });
    },
    onError: (e: any) => toast.error(e.message),
  });

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const sub = Number(fd.get("subtotal") || 0);
    const tax = Number(fd.get("tax_amount") || 0);
    const disc = Number(fd.get("discount") || 0);
    const total = sub + tax - disc;
    
    save.mutate({
      invoice_no: String(fd.get("invoice_no") || ""),
      subtotal: sub,
      discount: disc,
      tax_amount: tax,
      total: total,
      amount_paid: Number(fd.get("amount_paid") || 0),
      payment_status: String(fd.get("payment_status") || "unpaid"),
      payment_method: String(fd.get("payment_method") || ""),
      notes: String(fd.get("notes") || ""),
    });
  }

  return (
    <div className="mx-auto max-w-7xl space-y-6">
      <header className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-6">
        <div className="space-y-1.5">
          <h1 className="text-3xl font-bold tracking-tight">Billing</h1>
          <p className="text-sm text-slate-400">Manage invoices and payments</p>
        </div>
        <Dialog
          open={open}
          onOpenChange={(v) => {
            setOpen(v);
            if (!v) setEditing(null);
          }}
        >
          <DialogTrigger asChild>
            <Button
              className="h-10 px-5 shadow-lg transition-transform hover:scale-105 active:scale-95"
              style={{ background: "var(--gradient-primary)", color: "oklch(0.12 0.02 250)" }}
            >
              <Plus className="mr-2 h-4 w-4" /> Create invoice
            </Button>
          </DialogTrigger>
          <DialogContent className="glass-strong max-h-[90vh] overflow-y-auto custom-scrollbar border-white/10 shadow-2xl">
            <DialogHeader className="border-b border-white/10 pb-4 mb-4">
              <DialogTitle className="text-xl tracking-tight">
                {editing ? "Edit" : "Create"} invoice
              </DialogTitle>
            </DialogHeader>
            <form onSubmit={onSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <F
                  label="Invoice Number"
                  name="invoice_no"
                  defaultValue={editing?.invoice_no || `INV-${Date.now().toString().slice(-6)}`}
                  required
                  className="bg-black/20 border-white/10 focus:border-cyan-500/50"
                />
                <F
                  label="Subtotal (₹)"
                  name="subtotal"
                  type="number"
                  step="0.01"
                  defaultValue={editing?.subtotal ?? 0}
                  required
                  className="bg-black/20 border-white/10 focus:border-cyan-500/50"
                />
                <F
                  label="Discount (₹)"
                  name="discount"
                  type="number"
                  step="0.01"
                  defaultValue={editing?.discount ?? 0}
                  className="bg-black/20 border-white/10 focus:border-cyan-500/50"
                />
                <F
                  label="Tax Amount (₹)"
                  name="tax_amount"
                  type="number"
                  step="0.01"
                  defaultValue={editing?.tax_amount ?? 0}
                  className="bg-black/20 border-white/10 focus:border-cyan-500/50"
                />
                <F
                  label="Amount Paid (₹)"
                  name="amount_paid"
                  type="number"
                  step="0.01"
                  defaultValue={editing?.amount_paid ?? 0}
                  className="bg-black/20 border-white/10 focus:border-cyan-500/50"
                />
                <div className="space-y-1.5">
                  <Label className="text-slate-300">Payment Status</Label>
                  <select
                    name="payment_status"
                    defaultValue={editing?.payment_status ?? "unpaid"}
                    className="flex h-10 w-full rounded-md border bg-black/20 border-white/10 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500/50 text-white"
                  >
                    <option value="unpaid" className="bg-slate-900">Unpaid</option>
                    <option value="partial" className="bg-slate-900">Partial</option>
                    <option value="paid" className="bg-slate-900">Paid</option>
                  </select>
                </div>
                <div className="space-y-1.5">
                  <Label className="text-slate-300">Payment Method</Label>
                  <select
                    name="payment_method"
                    defaultValue={editing?.payment_method ?? ""}
                    className="flex h-10 w-full rounded-md border bg-black/20 border-white/10 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500/50 text-white"
                  >
                    <option value="" className="bg-slate-900">Select...</option>
                    <option value="cash" className="bg-slate-900">Cash</option>
                    <option value="card" className="bg-slate-900">Card</option>
                    <option value="upi" className="bg-slate-900">UPI</option>
                    <option value="bank" className="bg-slate-900">Bank Transfer</option>
                  </select>
                </div>
                <F
                  label="Notes"
                  name="notes"
                  defaultValue={editing?.notes ?? ""}
                  className="bg-black/20 border-white/10 focus:border-cyan-500/50"
                />
              </div>
              <DialogFooter className="pt-4 border-t border-white/10">
                <Button
                  type="submit"
                  disabled={save.isPending}
                  className="shadow-lg transition-transform hover:scale-105 active:scale-95"
                  style={{ background: "var(--gradient-primary)", color: "oklch(0.12 0.02 250)" }}
                >
                  Save
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </header>

      <div className="grid gap-4 sm:grid-cols-2">
        <Stat icon={CheckCircle} label="Total Paid Revenue" value={inr(totalRevenue)} color="#10b981" />
        <Stat
          icon={Clock}
          label="Pending Payments"
          value={inr(pendingRevenue)}
          tone={pendingRevenue > 0 ? "warn" : undefined}
          color="#f59e0b"
        />
      </div>

      <div className="rounded-2xl border border-white/10 bg-[#0f172a]/80 backdrop-blur-xl p-4 shadow-lg">
        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <Input
            placeholder="Search by invoice number…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9 h-10 bg-black/20 border-white/10 max-w-sm"
          />
        </div>
        <div className="overflow-x-auto custom-scrollbar">
          <table className="w-full text-sm whitespace-nowrap">
            <thead className="bg-slate-900/50 text-xs uppercase tracking-wider text-slate-400">
              <tr>
                <th className="px-4 py-3 text-left rounded-tl-lg">Invoice #</th>
                <th className="px-4 py-3 text-left">Date</th>
                <th className="px-4 py-3 text-left">Status</th>
                <th className="px-4 py-3 text-left">Method</th>
                <th className="px-4 py-3 text-right">Total</th>
                <th className="px-4 py-3 text-right">Paid</th>
                <th className="px-4 py-3 text-right rounded-tr-lg">Actions</th>
              </tr>
            </thead>
            <tbody>
              {isLoading && (
                <tr>
                  <td colSpan={7} className="px-4 py-12 text-center text-slate-500">
                    Loading…
                  </td>
                </tr>
              )}
              {!isLoading && filtered.length === 0 && (
                <tr>
                  <td colSpan={7} className="px-4 py-12 text-center text-slate-500">
                    No invoices found.
                  </td>
                </tr>
              )}
              {filtered.map((i) => (
                <tr
                  key={i.id}
                  className="group border-b border-white/5 hover:bg-white/[0.02] transition-colors"
                >
                  <td className="px-4 py-3 font-medium text-slate-200">
                    <div className="flex items-center gap-2">
                      <Receipt className="h-4 w-4 text-slate-500" />
                      {i.invoice_no}
                    </div>
                  </td>
                  <td className="px-4 py-3 text-slate-400">
                    {new Date(i.created_at).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-3">
                    <Badge
                      variant="outline"
                      className={
                        i.payment_status === "paid"
                          ? "border-emerald-500/40 text-emerald-400 bg-emerald-500/10"
                          : i.payment_status === "partial"
                            ? "border-amber-500/40 text-amber-400 bg-amber-500/10"
                            : "border-red-500/40 text-red-400 bg-red-500/10"
                      }
                    >
                      {i.payment_status.toUpperCase()}
                    </Badge>
                  </td>
                  <td className="px-4 py-3 text-slate-400">
                    {i.payment_method ? i.payment_method.toUpperCase() : "—"}
                  </td>
                  <td className="px-4 py-3 text-right font-medium text-slate-200">
                    {inr(i.total)}
                  </td>
                  <td className="px-4 py-3 text-right text-slate-400">
                    {inr(i.amount_paid || 0)}
                  </td>
                  <td className="px-4 py-3 text-right">
                    <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Button
                        size="icon"
                        variant="ghost"
                        className="h-8 w-8 text-slate-400 hover:text-cyan-400 hover:bg-cyan-400/10"
                        onClick={() => {
                          setEditing(i);
                          setOpen(true);
                        }}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        size="icon"
                        variant="ghost"
                        className="h-8 w-8 text-slate-400 hover:text-red-400 hover:bg-red-400/10"
                        onClick={() => {
                          if (confirm("Delete invoice?")) del.mutate(i.id);
                        }}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function F({
  label,
  className,
  ...props
}: { label: string; className?: string } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div className="space-y-1.5">
      <Label className="text-slate-300">{label}</Label>
      <Input className={className} {...props} />
    </div>
  );
}

function Stat({
  icon: Icon,
  label,
  value,
  tone,
  color = "#22d3ee",
}: {
  icon: any;
  label: string;
  value: string;
  tone?: "warn";
  color?: string;
}) {
  return (
    <div className="group relative overflow-hidden rounded-2xl border border-white/10 bg-[#0f172a]/80 backdrop-blur-xl p-5 shadow-lg transition-all hover:bg-white/5 hover:border-white/20 hover:-translate-y-0.5 hover:shadow-xl">
      <div
        className="pointer-events-none absolute -right-6 -top-6 h-24 w-24 rounded-full opacity-10 blur-2xl transition-opacity group-hover:opacity-20"
        style={{ background: color }}
      />
      <div className="flex items-start justify-between">
        <div>
          <div className="text-[11px] font-bold uppercase tracking-widest text-slate-400">
            {label}
          </div>
          <div
            className={
              "mt-2 text-2xl font-bold tracking-tight " +
              (tone === "warn" ? "text-red-400" : "text-slate-100")
            }
          >
            {value}
          </div>
        </div>
        <div
          className="grid h-9 w-9 place-items-center rounded-xl border border-white/5 bg-white/[0.02]"
          style={{ color }}
        >
          <Icon className="h-4 w-4" />
        </div>
      </div>
    </div>
  );
}
