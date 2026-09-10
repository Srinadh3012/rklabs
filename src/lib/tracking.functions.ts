import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { getStore } from "../services/database";

const schema = z.object({ ticket: z.string().trim().min(1).max(64) });

export const trackRepair = createServerFn({ method: "GET" })
  .validator((data: unknown) => schema.parse(data))
  .handler(async ({ data }) => {
    const ticket = data.ticket.toUpperCase();
    const store = getStore();

    const repairs = store.repairs.query((r) => r.ticket_no === ticket);
    if (repairs.length === 0) return { found: false as const };

    const repair = repairs[0];

    let customer = null;
    if (repair.customer_id) {
      const cust = store.customers.getById(repair.customer_id);
      if (cust) {
        customer = {
          name: cust.name,
          phone: cust.phone,
          whatsapp: cust.whatsapp,
          email: cust.email,
          address: cust.address,
        };
      }
    }

    const notes = store.repairNotes
      .query((n) => n.repair_id === repair.id)
      .sort((a, b) => a.created_at.localeCompare(b.created_at));

    return {
      found: true as const,
      repair,
      customer,
      notes,
    };
  });
