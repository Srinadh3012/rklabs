import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { collection, doc, getDocs, updateDoc, query, orderBy, where, writeBatch } from "firebase/firestore";
import { db } from "../firebase";
import { requireAuth } from "../auth.server";

export const getNotificationsFn = createServerFn({ method: "GET" })
  .handler(async () => {
    const { session } = await requireAuth();
    
    const q = query(
      collection(db, "notifications"), 
      where("user_id", "==", session.userId), 
      orderBy("created_at", "desc")
    );
    const snap = await getDocs(q);
    
    return snap.docs.slice(0, 25).map((d) => {
      const n = d.data();
      return {
        id: d.id,
        kind: n.kind,
        title: n.title,
        body: n.body,
        read_at: n.read_at || null,
        created_at: n.created_at,
      };
    });
  });

export const markNotificationsReadFn = createServerFn({ method: "POST" })
  .validator((data) => z.array(z.string()).parse(data))
  .handler(async ({ data }) => {
    await requireAuth();
    
    const now = new Date().toISOString();
    const batch = writeBatch(db);
    for (const id of data) {
      batch.update(doc(db, "notifications", id), { read_at: now });
    }
    await batch.commit();
    
    return { success: true };
  });
