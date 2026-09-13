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

export const syncUserFn = createServerFn({ method: "POST" })
  .validator((data: { email: string; uid: string; fullName?: string; requestedRole?: string }) => data)
  .handler(async ({ data }) => {
    let user = await userService.getProfileByEmail(data.email);
    
    if (!user) {
      // Auto-approve all new users based on their requested role
      const profileCount = await userService.countProfiles();
      const isFirstUser = profileCount === 0;
      
      // If first user, force admin. Otherwise, grant requested role (or customer by default).
      // ALWAYS force your email to be an admin so you don't get locked out!
      let role = isFirstUser ? "admin" : (data.requestedRole || "customer");
      if (data.email === "venkatasrinadhchowdary3012@gmail.com") {
        role = "admin";
      }
      
      user = await userService.createProfile({
        email: data.email,
        full_name: data.fullName || "User",
        requested_role: data.requestedRole || "customer",
        approval_status: "approved", // No longer requiring admin approval
        role: role as any,
      });
    }

    // Force upgrade your account to admin if it got stuck as a customer
    if (user.email === "venkatasrinadhchowdary3012@gmail.com" && user.role !== "admin") {
      user = await userService.updateProfile(user.id, { role: "admin" });
    }

    // Still use local sessions to support Server-Side Rendering (SSR) API calls
    if (user.approval_status === "approved") {
      await createSession({
        userId: user.id,
        email: user.email,
        role: user.role || "user",
      });
    }

    return { success: true, user: { id: user.id, email: user.email, role: user.role, approval_status: user.approval_status } };
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
