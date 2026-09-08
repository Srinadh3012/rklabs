import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { collection, doc, getDoc, getDocs, query, where, orderBy } from "firebase/firestore";
import { db } from "./firebase";

const schema = z.object({ ticket: z.string().trim().min(1).max(64) });

export const trackRepair = createServerFn({ method: "GET" })
  .validator((data: unknown) => schema.parse(data))
  .handler(async ({ data }) => {
    const ticket = data.ticket.toUpperCase();
    
    const q = query(collection(db, "repairs"), where("ticket_no", "==", ticket));
    const snap = await getDocs(q);
    
    if (snap.empty) return { found: false as const };

    const repairDoc = snap.docs[0];
    const repair = { id: repairDoc.id, ...repairDoc.data() };

    let customer = null;
    if ((repair as any).customer_id) {
      const custSnap = await getDoc(doc(db, "customers", (repair as any).customer_id));
      if (custSnap.exists()) {
        const c = custSnap.data();
        customer = {
          name: c.name,
          phone: c.phone,
          whatsapp: c.whatsapp,
          email: c.email,
          address: c.address,
        };
      }
    }

    const notesQ = query(collection(db, "repair_notes"), where("repair_id", "==", repairDoc.id), orderBy("created_at", "asc"));
    const notesSnap = await getDocs(notesQ);
    const notes = notesSnap.docs.map(d => ({ id: d.id, ...d.data() }));

    return { 
      found: true as const, 
      repair, 
      customer, 
      notes,
    };
  });
