import { createServerFn } from "@tanstack/react-start";
import { Repair, Invoice, InventoryItem, Customer } from "../models";
import { requireAuth } from "../auth.server";

export const getDashboardStatsFn = createServerFn({ method: "GET" })
  .handler(async () => {
    await requireAuth();

    const startToday = new Date(); startToday.setHours(0, 0, 0, 0);
    const startMonth = new Date(); startMonth.setDate(1); startMonth.setHours(0, 0, 0, 0);

    const [reps, invs, its, customersCount] = await Promise.all([
      Repair.find().select("status created_at"),
      Invoice.find().select("total created_at payment_status"),
      InventoryItem.find().select("quantity cost_price low_stock_threshold"),
      Customer.countDocuments(),
    ]);

    const todayRepairs = reps.filter((r) => r.created_at >= startToday).length;
    const pending = reps.filter((r) => !["delivered", "cancelled"].includes(r.status)).length;
    const delivered = reps.filter((r) => r.status === "delivered").length;
    
    const revenue = invs.filter((i) => i.payment_status === "paid").reduce((s, i) => s + i.total, 0);
    const monthRevenue = invs.filter((i) => i.created_at >= startMonth && i.payment_status === "paid").reduce((s, i) => s + i.total, 0);
    
    const inventoryValue = its.reduce((s, i) => s + (i.cost_price || 0) * (i.quantity || 0), 0);
    const lowStock = its.filter((i) => (i.quantity || 0) <= (i.low_stock_threshold || 5)).length;

    // Last 7 days
    const dailyRepairs = Array.from({ length: 7 }).map((_, idx) => {
      const d = new Date(); d.setDate(d.getDate() - (6 - idx)); d.setHours(0, 0, 0, 0);
      const next = new Date(d); next.setDate(next.getDate() + 1);
      const count = reps.filter((r) => { const t = r.created_at; return t >= d && t < next; }).length;
      return { day: d.toLocaleDateString("en-IN", { weekday: "short" }), count };
    });

    // Last 6 months
    const monthlySales = Array.from({ length: 6 }).map((_, idx) => {
      const d = new Date(); d.setDate(1); d.setHours(0, 0, 0, 0); d.setMonth(d.getMonth() - (5 - idx));
      const next = new Date(d); next.setMonth(next.getMonth() + 1);
      const total = invs.filter((i) => { const t = i.created_at; return t >= d && t < next; }).reduce((s, i) => s + i.total, 0);
      return { month: d.toLocaleDateString("en-IN", { month: "short" }), total };
    });

    return { 
      todayRepairs, 
      pending, 
      delivered, 
      revenue, 
      monthRevenue, 
      inventoryValue, 
      lowStock, 
      customers: customersCount, 
      dailyRepairs, 
      monthlySales 
    };
  });
