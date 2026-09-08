import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";
import { requireAuth } from "../auth.server";

export const getProfileFn = createServerFn({ method: "GET" })
  .handler(async () => {
    const { session } = await requireAuth();
    const profileSnap = await getDoc(doc(db, "profiles", session.userId));
    if (!profileSnap.exists()) throw new Error("Profile not found");

    const profile = profileSnap.data();
    return {
      id: profileSnap.id,
      email: profile.email,
      full_name: profile.full_name,
      role: profile.role,
      requested_role: profile.requested_role,
      approval_status: profile.approval_status,
      approved_at: profile.approved_at,
      shop_name: profile.shop_name,
      shop_address: profile.shop_address,
      shop_phone: profile.shop_phone,
      shop_logo: profile.shop_logo,
      gst_number: profile.gst_number,
      gst_percent: profile.gst_percent,
      wa_templates: profile.wa_templates,
      auto_reminders: profile.auto_reminders,
    };
  });

export const updateProfileFn = createServerFn({ method: "POST" })
  .validator((data) => z.any().parse(data))
  .handler(async ({ data }) => {
    const { session } = await requireAuth();
    await updateDoc(doc(db, "profiles", session.userId), data);
    return { success: true };
  });
