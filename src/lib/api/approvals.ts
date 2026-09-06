import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { Profile, Notification } from "../models";
import { requireAuth } from "../auth.server";

export const getApprovalsFn = createServerFn({ method: "GET" })
  .handler(async () => {
    const { session } = await requireAuth();
    
    // Validate admin access
    const currentUser = await Profile.findById(session.userId);
    if (!currentUser || currentUser.role !== "admin") {
      throw new Error("Unauthorized: Admins only");
    }

    const profiles = await Profile.find()
      .select("id full_name requested_role approval_status created_at approved_at rejection_reason role")
      .sort({ created_at: -1 });

    return profiles.map((p: any) => ({
      id: p._id.toString(),
      full_name: p.full_name,
      requested_role: p.requested_role,
      approval_status: p.approval_status || "pending",
      created_at: p.created_at.toISOString(),
      approved_at: p.approved_at?.toISOString(),
      rejection_reason: p.rejection_reason,
      role: p.role,
    }));
  });

export const decideApprovalFn = createServerFn({ method: "POST" })
  .validator((data) => z.object({
    id: z.string(),
    decision: z.enum(["approved", "rejected"]),
    role: z.string().optional(),
    reason: z.string().optional(),
  }).parse(data))
  .handler(async ({ data }) => {
    const { session } = await requireAuth();
    
    const currentUser = await Profile.findById(session.userId);
    if (!currentUser || currentUser.role !== "admin") {
      throw new Error("Unauthorized: Admins only");
    }

    const updateData: any = {
      approval_status: data.decision,
      approved_by: session.userId,
    };

    if (data.decision === "approved") {
      updateData.approved_at = new Date();
      if (data.role) {
        updateData.role = data.role;
      }
    } else {
      updateData.rejection_reason = data.reason || null;
    }

    await Profile.findByIdAndUpdate(data.id, updateData);

    const userProfile = await Profile.findById(data.id);
    const label = userProfile?.full_name ?? "The user";

    const rows: any[] = [
      {
        user_id: data.id,
        kind: data.decision === "approved" ? "approval_approved" : "approval_rejected",
        title: data.decision === "approved" ? "Your account was approved" : "Your account was not approved",
        body: data.decision === "approved"
          ? `Welcome to RK Repair Labs. You've been granted the ${data.role} role.`
          : data.reason ?? "Please contact the shop admin for details.",
      },
    ];

    rows.push({
      user_id: session.userId,
      kind: data.decision === "approved" ? "approval_approved_admin" : "approval_rejected_admin",
      title: data.decision === "approved"
        ? `${label} approved as ${data.role}`
        : `${label} was rejected`,
      body: data.decision === "rejected" && data.reason ? data.reason : null,
    });

    await Notification.insertMany(rows);

    return { success: true };
  });

export const changeRoleFn = createServerFn({ method: "POST" })
  .validator((data) => z.object({
    id: z.string(),
    role: z.string(),
  }).parse(data))
  .handler(async ({ data }) => {
    const { session } = await requireAuth();
    
    const currentUser = await Profile.findById(session.userId);
    if (!currentUser || currentUser.role !== "admin") {
      throw new Error("Unauthorized: Admins only");
    }

    await Profile.findByIdAndUpdate(data.id, { role: data.role });

    await Notification.create({
      user_id: data.id,
      kind: "role_changed",
      title: "Your role was updated",
      body: `An admin set your role to ${data.role}.`,
    });

    return { success: true };
  });
