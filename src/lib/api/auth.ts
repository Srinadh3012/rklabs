import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { userService } from "@/services/user.service";
import { createSession, clearSession, getSession } from "../auth.server";

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

const registerSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  fullName: z.string().min(2),
  requestedRole: z.enum(["customer", "employee", "admin"]).default("customer"),
});

export const loginFn = createServerFn({ method: "POST" })
  .validator((data) => loginSchema.parse(data))
  .handler(async ({ data }) => {
    // Find profile by email
    let user = await userService.getProfileByEmail(data.email);
    
    // MOCK DB BYPASS FOR DEMO
    if (!user && data.password === "Password123!") {
      user = {
        id: "mock-demo-user",
        email: data.email,
        role: "admin",
        approval_status: "approved",
      } as any;
    }

    if (!user) {
      throw new Error("User profile not found. Please register first.");
    }

    // Mock password check — in development, accept "Password123!" or any password
    // In production, this will be replaced with real auth
    if (data.password !== "Password123!" && process.env.NODE_ENV === "production") {
      throw new Error("Invalid credentials");
    }

    if (user.approval_status !== "approved") {
      throw new Error(
        user.approval_status === "pending"
          ? "Your account is pending admin approval."
          : "Your account was not approved. Please contact the shop admin.",
      );
    }

    await createSession({
      userId: user.id,
      email: user.email,
      role: user.role || "user",
    });

    return { success: true, user: { id: user.id, email: user.email, role: user.role } };
  });

export const registerFn = createServerFn({ method: "POST" })
  .validator((data) => registerSchema.parse(data))
  .handler(async ({ data }) => {
    // Check for existing profile
    const existing = await userService.getProfileByEmail(data.email);
    if (existing) {
      throw new Error("Email already registered");
    }

    // First user becomes admin
    const profileCount = await userService.countProfiles();
    const isFirstUser = profileCount === 0;
    const role = isFirstUser ? "admin" : "user";

    const profile = await userService.createProfile({
      email: data.email,
      full_name: data.fullName,
      requested_role: data.requestedRole,
      approval_status: isFirstUser ? "approved" : "pending",
      role,
    });

    if (isFirstUser) {
      await createSession({
        userId: profile.id,
        email: profile.email,
        role,
      });
      return { success: true, status: "approved" };
    } else {
      return { success: true, status: "pending" };
    }
  });

export const logoutFn = createServerFn({ method: "POST" }).handler(async () => {
  clearSession();
  return { success: true };
});

export const meFn = createServerFn({ method: "GET" }).handler(async () => {
  const session = await getSession();
  if (!session) return { user: null };

  // MOCK DB BYPASS FOR DEMO
  if (session.userId === "mock-demo-user") {
    return {
      user: {
        id: "mock-demo-user",
        email: session.email,
        role: "admin",
        approval_status: "approved",
      } as any
    };
  }

  const user = await userService.getProfileById(session.userId);
  if (!user) return { user: null };

  return {
    user: {
      id: user.id,
      email: user.email,
      role: user.role,
      approval_status: user.approval_status,
      requested_role: user.requested_role,
      approved_at: user.approved_at,
      rejection_reason: user.rejection_reason,
      shop_name: user.shop_name,
      shop_address: user.shop_address,
      shop_phone: user.shop_phone,
      shop_logo: user.shop_logo,
      gst_number: user.gst_number,
      wa_templates: user.wa_templates,
    },
  };
});
