import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { getStore } from "@/services/database";
import { requireAuth } from "../auth.server";

export const getApprovalsFn = createServerFn({ method: "GET" }).handler(async () => {
  const { session, user } = await requireAuth();

  if (user.role !== "admin") {
    throw new Error("Unauthorized: Admins only");
  }

  const store = getStore();
  return store.profiles
    .list()
    .sort((a, b) => b.created_at.localeCompare(a.created_at))
    .map((p) => ({
      id: p.id,
      full_name: p.full_name,
      requested_role: p.requested_role,
      approval_status: p.approval_status || "pending",
      created_at: p.created_at,
      approved_at: p.approved_at,
      rejection_reason: p.rejection_reason,
      role: p.role,
    }));
});

export const decideApprovalFn = createServerFn({ method: "POST" })
  .validator((data) =>
    z
      .object({
        id: z.string(),
        decision: z.enum(["approved", "rejected"]),
        role: z.string().optional(),
        reason: z.string().optional(),
      })
      .parse(data),
  )
  .handler(async ({ data }) => {
    const { session, user } = await requireAuth();

    if (user.role !== "admin") {
      throw new Error("Unauthorized: Admins only");
    }

    const store = getStore();
    const updateData: Record<string, unknown> = {
      approval_status: data.decision,
      approved_by: session.userId,
    };

    if (data.decision === "approved") {
      updateData.approved_at = new Date().toISOString();
      if (data.role) {
        updateData.role = data.role;
      }
    } else {
      updateData.rejection_reason = data.reason || null;
    }

    store.profiles.update(data.id, updateData as any);

    // Create notifications
    const now = new Date().toISOString();
    store.notifications.create({
      user_id: data.id,
      kind: data.decision === "approved" ? "approval_approved" : "approval_rejected",
      title:
        data.decision === "approved"
          ? "Your account was approved"
          : "Your account was not approved",
      body:
        data.decision === "approved"
          ? `Welcome to RK Repair Labs. You've been granted the ${data.role} role.`
          : (data.reason ?? "Please contact the shop admin for details."),
      created_at: now,
    });

    store.notifications.create({
      user_id: session.userId,
      kind: data.decision === "approved" ? "approval_approved_admin" : "approval_rejected_admin",
      title: data.decision === "approved" ? `User approved as ${data.role}` : `User was rejected`,
      body: data.decision === "rejected" && data.reason ? data.reason : null,
      created_at: now,
    });

    return { success: true };
  });

export const changeRoleFn = createServerFn({ method: "POST" })
  .validator((data) => z.object({ id: z.string(), role: z.string() }).parse(data))
  .handler(async ({ data }) => {
    const { session, user } = await requireAuth();

    if (user.role !== "admin") {
      throw new Error("Unauthorized: Admins only");
    }

    const store = getStore();
    store.profiles.update(data.id, { role: data.role } as any);

    store.notifications.create({
      user_id: data.id,
      kind: "role_changed",
      title: "Your role was updated",
      body: `An admin set your role to ${data.role}.`,
      created_at: new Date().toISOString(),
    });

    return { success: true };
  });
