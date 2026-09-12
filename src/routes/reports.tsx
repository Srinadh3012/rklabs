import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { BarChart3, TrendingUp, Users, Calendar } from "lucide-react";
import { format, subDays, startOfMonth, startOfYear } from "date-fns";

import { getReportsDataFn } from "@/lib/api/reports";
import { inr } from "@/lib/format";

export const Route = createFileRoute("/reports")({
  head: () => ({ meta: [{ title: "Reports — RK Labs" }] }),
  component: ReportsPage,
});

function ReportsPage() {
  const [range, setRange] = useState<"7d" | "30d" | "mtd" | "ytd">("30d");

  const fromDate =
    range === "7d"
      ? subDays(new Date(), 7)
      : range === "30d"
        ? subDays(new Date(), 30)
        : range === "mtd"
          ? startOfMonth(new Date())
          : startOfYear(new Date());

  const { data, isLoading } = useQuery({
    queryKey: ["reports", range],
    queryFn: async () => {
      return (await getReportsDataFn({ data: { from: fromDate.toISOString() } })) as {
        invoices: any[];
        repairs: any[];
        customers: any[];
      };
    },
  });

  const invoices = data?.invoices || [];
  const repairs = data?.repairs || [];
  const totalRevenue = invoices
    .filter((i) => i.payment_status === "paid")
    .reduce((s, i) => s + (i.total || 0), 0);

  const completedRepairs = repairs.filter((r) => r.status === "completed").length;
  const newCustomers = data?.customers.length || 0; // simplistic metric

  return (
    <div className="mx-auto max-w-7xl space-y-6">
      <header className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-6">
        <div className="space-y-1.5">
          <h1 className="text-3xl font-bold tracking-tight">Reports</h1>
          <p className="text-sm text-slate-400">Business performance metrics</p>
        </div>
        <div className="flex bg-black/20 p-1 border border-white/10 rounded-lg">
          {(["7d", "30d", "mtd", "ytd"] as const).map((r) => (
            <button
              key={r}
              onClick={() => setRange(r)}
              className={`px-3 py-1.5 text-sm font-medium rounded-md transition-colors ${
                range === r
                  ? "bg-white/10 text-white shadow-sm"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              {r === "7d" ? "Last 7 Days" : r === "30d" ? "Last 30 Days" : r === "mtd" ? "This Month" : "This Year"}
            </button>
          ))}
        </div>
      </header>

      {isLoading ? (
        <div className="py-12 text-center text-slate-500">Loading reports...</div>
      ) : (
        <>
          <div className="grid gap-4 sm:grid-cols-3">
            <Stat
              icon={TrendingUp}
              label="Revenue (Paid)"
              value={inr(totalRevenue)}
              color="#10b981"
            />
            <Stat
              icon={BarChart3}
              label="Completed Repairs"
              value={completedRepairs.toString()}
              color="#3b82f6"
            />
            <Stat
              icon={Users}
              label="Active Customers"
              value={newCustomers.toString()}
              color="#8b5cf6"
            />
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="rounded-2xl border border-white/10 bg-[#0f172a]/80 backdrop-blur-xl p-5 shadow-lg">
              <h2 className="text-lg font-semibold mb-4">Recent Invoices</h2>
              <div className="overflow-x-auto custom-scrollbar">
                <table className="w-full text-sm">
                  <thead className="text-left text-xs uppercase text-slate-400 border-b border-white/10">
                    <tr>
                      <th className="pb-3">Invoice #</th>
                      <th className="pb-3">Date</th>
                      <th className="pb-3 text-right">Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {invoices.slice(0, 5).map((i) => (
                      <tr key={i.id} className="border-b border-white/5">
                        <td className="py-3 text-slate-200">{i.invoice_no}</td>
                        <td className="py-3 text-slate-400">
                          {i.created_at ? format(new Date(i.created_at), "MMM d, yyyy") : "—"}
                        </td>
                        <td className="py-3 text-right text-slate-200">{inr(i.total)}</td>
                      </tr>
                    ))}
                    {invoices.length === 0 && (
                      <tr>
                        <td colSpan={3} className="py-4 text-center text-slate-500">
                          No invoices in this period
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="rounded-2xl border border-white/10 bg-[#0f172a]/80 backdrop-blur-xl p-5 shadow-lg">
              <h2 className="text-lg font-semibold mb-4">Recent Repairs</h2>
              <div className="overflow-x-auto custom-scrollbar">
                <table className="w-full text-sm">
                  <thead className="text-left text-xs uppercase text-slate-400 border-b border-white/10">
                    <tr>
                      <th className="pb-3">Customer</th>
                      <th className="pb-3">Status</th>
                      <th className="pb-3 text-right">Cost</th>
                    </tr>
                  </thead>
                  <tbody>
                    {repairs.slice(0, 5).map((r) => {
                      const cust = data?.customers.find((c) => c.id === r.customer_id);
                      return (
                        <tr key={r.id} className="border-b border-white/5">
                          <td className="py-3 text-slate-200">{cust?.name || "Unknown"}</td>
                          <td className="py-3 text-slate-400 capitalize">{r.status}</td>
                          <td className="py-3 text-right text-slate-200">
                            {inr(r.final_cost || r.estimated_cost || 0)}
                          </td>
                        </tr>
                      );
                    })}
                    {repairs.length === 0 && (
                      <tr>
                        <td colSpan={3} className="py-4 text-center text-slate-500">
                          No repairs in this period
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

function Stat({
  icon: Icon,
  label,
  value,
  color = "#22d3ee",
}: {
  icon: any;
  label: string;
  value: string;
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
          <div className="mt-2 text-2xl font-bold tracking-tight text-slate-100">{value}</div>
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
