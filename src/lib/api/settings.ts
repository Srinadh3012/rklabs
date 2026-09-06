import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { Profile } from "../models";
import { requireAuth } from "../auth.server";

export const getProfileFn = createServerFn({ method: "GET" })
  .handler(async () => {
    const { session } = await requireAuth();
    const profile = await Profile.findById(session.userId);
    if (!profile) throw new Error("Profile not found");

    return {
      id: profile._id.toString(),
      email: profile.email,
      full_name: profile.full_name,
      role: profile.role,
      requested_role: profile.requested_role,
      approval_status: profile.approval_status,
      approved_at: profile.approved_at?.toISOString(),
      shop_name: profile.shop_name,
      shop_address: profile.shop_address,
      shop_phone: profile.shop_phone,
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
    await Profile.findByIdAndUpdate(session.userId, data);
    return { success: true };
  });
