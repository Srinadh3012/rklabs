import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const schema = z.object({ ticket: z.string().trim().min(1).max(64) });

import { Repair, Customer, RepairNote } from "./models";

export const trackRepair = createServerFn({ method: "GET" })
  .validator((data: unknown) => schema.parse(data))
  .handler(async ({ data }) => {
    const ticket = data.ticket.toUpperCase();
    
    const repair = await Repair.findOne({ ticket_no: ticket }).select(
      "id ticket_no status device_type device_brand device_model imei issue technician_name estimated_cost final_cost estimated_completion appointment_at created_at assigned_at completed_at delivered_at customer_id"
    );
    
    if (!repair) return { found: false as const };

    let customer = null;
    if (repair.customer_id) {
      const c = await Customer.findById(repair.customer_id).select("name phone whatsapp email address");
      if (c) {
        customer = {
          name: c.name,
          phone: c.phone,
          whatsapp: c.whatsapp,
          email: c.email,
          address: c.address,
        };
      }
    }

    const notes = await RepairNote.find({ repair_id: repair._id.toString() })
      .select("id note task_done technician_name created_at completed_at")
      .sort({ created_at: 1 });

    return { 
      found: true as const, 
      repair: { ...repair.toObject(), id: repair._id.toString() }, 
      customer, 
      notes: notes.map(n => ({ ...n.toObject(), id: n._id.toString() })) 
    };
  });
