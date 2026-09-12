import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { Calculator, DollarSign, TrendingDown, TrendingUp } from "lucide-react";
import { format, startOfMonth, endOfMonth } from "date-fns";

import { AppLayout } from "@/components/app-layout";
import { getPnlDataFn } from "@/lib/api/reports";
import { inr } from "@/lib/format";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

export const Route = createFileRoute("/pnl")({
  head: () => ({ meta: [{ title: "Profit & Loss — RK Labs" }] }),
  component: PnlPage,
});

function PnlPage() {
  const [fromDate, setFromDate] = useState(() => format(startOfMonth(new Date()), "yyyy-MM-dd"));
  const [toDate, setToDate] = useState(() => format(endOfMonth(new Date()), "yyyy-MM-dd"));

  const { data, isLoading } = useQuery({
    queryKey: ["pnl", fromDate, toDate],
    queryFn: async () => {
      // Add 1 day to toDate to make it inclusive
      const end = new Date(toDate);
      end.setDate(end.getDate() + 1);
      return (await getPnlDataFn({
        data: { from: new Date(fromDate).toISOString(), to: end.toISOString() },
      })) as {
        invoices: any[];
        invoiceItems: any[];
        inventory: any[];
        purchaseOrders: any[];
        expenses: any[];
      };
    },
  });

  const invoices = data?.invoices || [];
  const invoiceItems = data?.invoiceItems || [];
  const inventory = data?.inventory || [];
  const purchaseOrders = data?.purchaseOrders || [];
  const expenses = data?.expenses || [];

  // Calculate Income
  const totalRevenue = invoices.reduce((sum, inv) => sum + (inv.total || 0), 0);
  // Optional: add any direct income that is not an invoice here. For now just invoices.
  const grossIncome = totalRevenue;

  // Calculate COGS (Cost of Goods Sold)
  let cogs = 0;
  // Cost of inventory items sold via invoices
  for (const item of invoiceItems) {
    const invItem = inventory.find((i) => i.id === item.inventory_id || i.name === item.description);
    if (invItem && invItem.cost_price) {
      cogs += (invItem.cost_price * item.quantity);
    }
  }

  const grossProfit = grossIncome - cogs;

  // Calculate Operating Expenses
  const totalPurchaseOrders = purchaseOrders.reduce((sum, po) => sum + (po.total || 0), 0);
  const totalExpenses = expenses.reduce((sum, exp) => sum + (exp.amount || 0), 0);
  
  // Note: Depending on accounting preference, POs could be considered inventory asset additions rather than direct expenses. 
  // We'll list them as expenses for simplicity here if they aren't tracked as COGS.
  const totalOperatingExpenses = totalExpenses + totalPurchaseOrders;

  const netProfit = grossProfit - totalOperatingExpenses;
  const netMargin = grossIncome > 0 ? (netProfit / grossIncome) * 100 : 0;

  return (
    <AppLayout>
      <div className="mx-auto max-w-7xl space-y-6">
        <header className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-6">
        <div className="space-y-1.5">
          <h1 className="text-3xl font-bold tracking-tight">Profit & Loss</h1>
          <p className="text-sm text-slate-400">Financial statement analysis</p>
        </div>
        <div className="flex gap-4">
          <div className="space-y-1.5">
            <Label className="text-slate-400 text-xs uppercase tracking-wider">From</Label>
            <Input
              type="date"
              value={fromDate}
              onChange={(e) => setFromDate(e.target.value)}
              className="h-10 bg-black/20 border-white/10 text-slate-200"
            />
          </div>
          <div className="space-y-1.5">
            <Label className="text-slate-400 text-xs uppercase tracking-wider">To</Label>
            <Input
              type="date"
              value={toDate}
              onChange={(e) => setToDate(e.target.value)}
              className="h-10 bg-black/20 border-white/10 text-slate-200"
            />
          </div>
        </div>
      </header>

      {isLoading ? (
        <div className="py-12 text-center text-slate-500">Calculating financials...</div>
      ) : (
        <>
          <div className="grid gap-4 sm:grid-cols-4">
            <Stat
              icon={DollarSign}
              label="Gross Income"
              value={inr(grossIncome)}
              color="#3b82f6"
            />
            <Stat
              icon={TrendingDown}
              label="Cost of Goods (COGS)"
              value={inr(cogs)}
              color="#f59e0b"
            />
            <Stat
              icon={Calculator}
              label="Operating Expenses"
              value={inr(totalOperatingExpenses)}
              color="#ef4444"
            />
            <Stat
              icon={TrendingUp}
              label="Net Profit"
              value={inr(netProfit)}
              tone={netProfit < 0 ? "warn" : undefined}
              color={netProfit < 0 ? "#ef4444" : "#10b981"}
            />
          </div>

          <div className="rounded-2xl border border-white/10 bg-[#0f172a]/80 backdrop-blur-xl p-8 shadow-lg max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold mb-6 text-center tracking-tight">Statement of Profit and Loss</h2>
            
            <div className="space-y-6 text-sm">
              {/* Income */}
              <div>
                <h3 className="font-semibold text-slate-300 border-b border-white/10 pb-2 mb-3 uppercase tracking-wider">Income</h3>
                <div className="flex justify-between py-1.5 px-2">
                  <span className="text-slate-400">Sales / Services Revenue</span>
                  <span className="font-medium">{inr(grossIncome)}</span>
                </div>
                <div className="flex justify-between py-2 px-2 mt-2 bg-white/[0.02] rounded-md font-semibold">
                  <span className="text-slate-200">Total Income</span>
                  <span className="text-blue-400">{inr(grossIncome)}</span>
                </div>
              </div>

              {/* COGS */}
              <div>
                <h3 className="font-semibold text-slate-300 border-b border-white/10 pb-2 mb-3 uppercase tracking-wider">Cost of Goods Sold (COGS)</h3>
                <div className="flex justify-between py-1.5 px-2">
                  <span className="text-slate-400">Inventory Cost of Sold Items</span>
                  <span className="font-medium">{inr(cogs)}</span>
                </div>
                <div className="flex justify-between py-2 px-2 mt-2 bg-white/[0.02] rounded-md font-semibold">
                  <span className="text-slate-200">Gross Profit</span>
                  <span className={grossProfit >= 0 ? "text-emerald-400" : "text-red-400"}>
                    {inr(grossProfit)}
                  </span>
                </div>
              </div>

              {/* Expenses */}
              <div>
                <h3 className="font-semibold text-slate-300 border-b border-white/10 pb-2 mb-3 uppercase tracking-wider">Operating Expenses</h3>
                <div className="flex justify-between py-1.5 px-2">
                  <span className="text-slate-400">General Expenses</span>
                  <span className="font-medium">{inr(totalExpenses)}</span>
                </div>
                <div className="flex justify-between py-1.5 px-2">
                  <span className="text-slate-400">Purchase Orders (Restocking)</span>
                  <span className="font-medium">{inr(totalPurchaseOrders)}</span>
                </div>
                <div className="flex justify-between py-2 px-2 mt-2 bg-white/[0.02] rounded-md font-semibold">
                  <span className="text-slate-200">Total Expenses</span>
                  <span className="text-amber-400">{inr(totalOperatingExpenses)}</span>
                </div>
              </div>

              {/* Net Profit */}
              <div className="pt-4 border-t-2 border-white/10">
                <div className="flex justify-between items-center py-3 px-4 bg-black/40 rounded-lg">
                  <span className="text-lg font-bold text-slate-200">Net Profit</span>
                  <div className="text-right">
                    <span className={`text-xl font-bold ${netProfit >= 0 ? "text-emerald-400" : "text-red-400"}`}>
                      {inr(netProfit)}
                    </span>
                    <div className="text-xs text-slate-500 mt-0.5">
                      Net Margin: {netMargin.toFixed(1)}%
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </>
      )}
      </div>
    </AppLayout>
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
              "mt-2 text-xl font-bold tracking-tight " +
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
