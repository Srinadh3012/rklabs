import { createServerFn } from "@tanstack/react-start";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../firebase";
import { requireAuth } from "../auth.server";

export const getDashboardStatsFn = createServerFn({ method: "GET" })
  .handler(async () => {
    await requireAuth();

    const startToday = new Date(); startToday.setHours(0, 0, 0, 0);
    const startMonth = new Date(); startMonth.setDate(1); startMonth.setHours(0, 0, 0, 0);

    const [repsSnap, invsSnap, itsSnap, custsSnap] = await Promise.all([
      getDocs(collection(db, "repairs")),
      getDocs(collection(db, "invoices")),
      getDocs(collection(db, "inventory")),
      getDocs(collection(db, "customers")),
    ]);

    const reps = repsSnap.docs.map(d => d.data());
    const invs = invsSnap.docs.map(d => d.data());
    const its = itsSnap.docs.map(d => d.data());

    const todayRepairs = reps.filter((r: any) => new Date(r.created_at) >= startToday).length;
    const pending = reps.filter((r: any) => !["delivered", "cancelled"].includes(r.status)).length;
    const delivered = reps.filter((r: any) => r.status === "delivered").length;
    
    const revenue = invs.filter((i: any) => i.payment_status === "paid").reduce((s: number, i: any) => s + Number(i.total), 0);
    const monthRevenue = invs.filter((i: any) => new Date(i.created_at) >= startMonth && i.payment_status === "paid").reduce((s: number, i: any) => s + Number(i.total), 0);
    
    const inventoryValue = its.reduce((s: number, i: any) => s + (Number(i.cost_price) || 0) * (Number(i.quantity) || 0), 0);
    const lowStock = its.filter((i: any) => (Number(i.quantity) || 0) <= (Number(i.low_stock_threshold || i.min_stock_level) || 5)).length;

    // Last 7 days
    const dailyRepairs = Array.from({ length: 7 }).map((_, idx) => {
      const d = new Date(); d.setDate(d.getDate() - (6 - idx)); d.setHours(0, 0, 0, 0);
      const next = new Date(d); next.setDate(next.getDate() + 1);
      const count = reps.filter((r: any) => { const t = new Date(r.created_at); return t >= d && t < next; }).length;
      return { day: d.toLocaleDateString("en-IN", { weekday: "short" }), count };
    });

    // Last 6 months
    const monthlySales = Array.from({ length: 6 }).map((_, idx) => {
      const d = new Date(); d.setDate(1); d.setHours(0, 0, 0, 0); d.setMonth(d.getMonth() - (5 - idx));
      const next = new Date(d); next.setMonth(next.getMonth() + 1);
      const total = invs.filter((i: any) => { const t = new Date(i.created_at); return t >= d && t < next; }).reduce((s: number, i: any) => s + Number(i.total), 0);
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
      customers: custsSnap.size, 
      dailyRepairs, 
      monthlySales 
    };
  });
