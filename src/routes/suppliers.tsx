import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Plus, Search, Trash2, Edit, Truck } from "lucide-react";
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
import { AppLayout } from "@/components/app-layout";
import {
  getSuppliersFn,
  createSupplierFn,
  updateSupplierFn,
  deleteSupplierFn,
} from "@/lib/api/inventory";

export const Route = createFileRoute("/suppliers")({
  head: () => ({ meta: [{ title: "Suppliers — RK Labs" }] }),
  component: SuppliersPage,
});

type Supplier = {
  id: string;
  name: string;
  contact_person: string | null;
  phone: string | null;
  email: string | null;
  address: string | null;
  gst_number: string | null;
  notes: string | null;
};

function SuppliersPage() {
  const qc = useQueryClient();
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<Supplier | null>(null);

  const { data: suppliers = [], isLoading } = useQuery({
    queryKey: ["suppliers"],
    queryFn: async () => {
      const data = await getSuppliersFn();
      return data as Supplier[];
    },
  });

  const filtered = suppliers.filter(
    (s) =>
      !search ||
      s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.contact_person?.toLowerCase().includes(search.toLowerCase()) ||
      s.email?.toLowerCase().includes(search.toLowerCase())
  );

  const save = useMutation({
    mutationFn: async (form: Partial<Supplier>) => {
      const payload = {
        name: form.name!,
        contact_person: form.contact_person,
        phone: form.phone,
        email: form.email,
        address: form.address,
        gst_number: form.gst_number,
        notes: form.notes,
      };

      if (editing) {
        await updateSupplierFn({ data: { id: editing.id, data: payload } });
      } else {
        await createSupplierFn({ data: payload });
      }
    },
    onSuccess: () => {
      toast.success("Saved supplier");
      qc.invalidateQueries({ queryKey: ["suppliers"] });
      setOpen(false);
      setEditing(null);
    },
    onError: (e: any) => toast.error(e.message),
  });

  const del = useMutation({
    mutationFn: async (id: string) => {
      await deleteSupplierFn({ data: id });
    },
    onSuccess: () => {
      toast.success("Deleted supplier");
      qc.invalidateQueries({ queryKey: ["suppliers"] });
    },
    onError: (e: any) => toast.error(e.message),
  });

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    save.mutate({
      name: String(fd.get("name")),
      contact_person: String(fd.get("contact_person") || "") || null,
      phone: String(fd.get("phone") || "") || null,
      email: String(fd.get("email") || "") || null,
      address: String(fd.get("address") || "") || null,
      gst_number: String(fd.get("gst_number") || "") || null,
      notes: String(fd.get("notes") || "") || null,
    });
  }

  return (
    <AppLayout>
      <div className="mx-auto max-w-7xl space-y-6">
        <header className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-6">
        <div className="space-y-1.5">
          <h1 className="text-3xl font-bold tracking-tight">Suppliers</h1>
          <p className="text-sm text-slate-400">Manage vendors and parts suppliers</p>
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
              <Plus className="mr-2 h-4 w-4" /> Add supplier
            </Button>
          </DialogTrigger>
          <DialogContent className="glass-strong max-h-[90vh] overflow-y-auto custom-scrollbar border-white/10 shadow-2xl">
            <DialogHeader className="border-b border-white/10 pb-4 mb-4">
              <DialogTitle className="text-xl tracking-tight">
                {editing ? "Edit" : "Add new"} supplier
              </DialogTitle>
            </DialogHeader>
            <form onSubmit={onSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <F
                  label="Company Name"
                  name="name"
                  defaultValue={editing?.name}
                  required
                  className="bg-black/20 border-white/10 focus:border-cyan-500/50"
                />
                <F
                  label="Contact Person"
                  name="contact_person"
                  defaultValue={editing?.contact_person ?? ""}
                  className="bg-black/20 border-white/10 focus:border-cyan-500/50"
                />
                <F
                  label="Phone"
                  name="phone"
                  defaultValue={editing?.phone ?? ""}
                  className="bg-black/20 border-white/10 focus:border-cyan-500/50"
                />
                <F
                  label="Email"
                  name="email"
                  type="email"
                  defaultValue={editing?.email ?? ""}
                  className="bg-black/20 border-white/10 focus:border-cyan-500/50"
                />
                <F
                  label="GST Number"
                  name="gst_number"
                  defaultValue={editing?.gst_number ?? ""}
                  className="bg-black/20 border-white/10 focus:border-cyan-500/50"
                />
                <F
                  label="Notes"
                  name="notes"
                  defaultValue={editing?.notes ?? ""}
                  className="bg-black/20 border-white/10 focus:border-cyan-500/50"
                />
              </div>
              <F
                label="Address"
                name="address"
                defaultValue={editing?.address ?? ""}
                className="bg-black/20 border-white/10 focus:border-cyan-500/50"
              />
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

      <div className="rounded-2xl border border-white/10 bg-[#0f172a]/80 backdrop-blur-xl p-4 shadow-lg">
        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <Input
            placeholder="Search suppliers…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9 h-10 bg-black/20 border-white/10 max-w-sm"
          />
        </div>
        <div className="overflow-x-auto custom-scrollbar">
          <table className="w-full text-sm whitespace-nowrap">
            <thead className="bg-slate-900/50 text-xs uppercase tracking-wider text-slate-400">
              <tr>
                <th className="px-4 py-3 text-left rounded-tl-lg">Name</th>
                <th className="px-4 py-3 text-left">Contact</th>
                <th className="px-4 py-3 text-left">Phone</th>
                <th className="px-4 py-3 text-left">Email</th>
                <th className="px-4 py-3 text-right rounded-tr-lg">Actions</th>
              </tr>
            </thead>
            <tbody>
              {isLoading && (
                <tr>
                  <td colSpan={5} className="px-4 py-12 text-center text-slate-500">
                    Loading…
                  </td>
                </tr>
              )}
              {!isLoading && filtered.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-4 py-12 text-center text-slate-500">
                    No suppliers found.
                  </td>
                </tr>
              )}
              {filtered.map((s) => (
                <tr
                  key={s.id}
                  className="group border-b border-white/5 hover:bg-white/[0.02] transition-colors"
                >
                  <td className="px-4 py-3 font-medium text-slate-200">
                    <div className="flex items-center gap-2">
                      <Truck className="h-4 w-4 text-slate-500" />
                      {s.name}
                    </div>
                  </td>
                  <td className="px-4 py-3 text-slate-400">{s.contact_person ?? "—"}</td>
                  <td className="px-4 py-3 text-slate-400">{s.phone ?? "—"}</td>
                  <td className="px-4 py-3 text-slate-400">{s.email ?? "—"}</td>
                  <td className="px-4 py-3 text-right">
                    <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Button
                        size="icon"
                        variant="ghost"
                        className="h-8 w-8 text-slate-400 hover:text-cyan-400 hover:bg-cyan-400/10"
                        onClick={() => {
                          setEditing(s);
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
                          if (confirm("Delete supplier?")) del.mutate(s.id);
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
    </AppLayout>
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
