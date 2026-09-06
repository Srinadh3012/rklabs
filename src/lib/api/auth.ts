import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import bcrypt from "bcryptjs";
import { Profile } from "../models";
import connectToDatabase from "../mongodb";
import { createSession, clearSession, getSession } from "../auth.server";

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
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
    await connectToDatabase();
    
    const user = await Profile.findOne({ email: data.email });
    if (!user) {
      throw new Error("Invalid credentials");
    }

    const isValid = await bcrypt.compare(data.password, user.passwordHash);
    if (!isValid) {
      throw new Error("Invalid credentials");
    }

    // Checking approval status might be necessary if we add it to the model.
    // For now, allow login.

    await createSession({
      userId: user._id.toString(),
      email: user.email,
      role: user.role || "user",
    });

    return { success: true, user: { id: user._id.toString(), email: user.email, role: user.role } };
  });

export const registerFn = createServerFn({ method: "POST" })
  .validator((data) => registerSchema.parse(data))
  .handler(async ({ data }) => {
    await connectToDatabase();
    
    const existingUser = await Profile.findOne({ email: data.email });
    if (existingUser) {
      throw new Error("Email already in use");
    }

    // First user created becomes admin by default, otherwise requestedRole or pending
    const isFirstUser = (await Profile.countDocuments()) === 0;
    const role = isFirstUser ? "admin" : "user"; // Simplified for this migration

    const passwordHash = await bcrypt.hash(data.password, 10);
    
    const newUser = await Profile.create({
      email: data.email,
      passwordHash,
      full_name: data.fullName,
      requested_role: data.requestedRole,
      approval_status: isFirstUser ? "approved" : "pending",
      role,
      created_at: new Date(),
    });

    // Auto-login only if approved
    if (newUser.approval_status === "approved") {
      await createSession({
        userId: newUser._id.toString(),
        email: newUser.email,
        role: newUser.role || "user",
      });
      return { success: true, status: "approved" };
    } else {
      return { success: true, status: "pending" };
    }
  });

export const logoutFn = createServerFn({ method: "POST" })
  .handler(async () => {
    clearSession();
    return { success: true };
  });

export const meFn = createServerFn({ method: "GET" })
  .handler(async () => {
    await connectToDatabase();
    const session = await getSession();
    if (!session) return { user: null };

    const user = await Profile.findById(session.userId);
    if (!user) return { user: null };

    return { user: { 
      id: user._id.toString(), 
      email: user.email, 
      role: user.role, 
      approval_status: user.approval_status, 
      requested_role: user.requested_role, 
      approved_at: user.approved_at?.toISOString(), 
      rejection_reason: user.rejection_reason,
      shop_name: user.shop_name,
      shop_address: user.shop_address,
      shop_phone: user.shop_phone,
      gst_number: user.gst_number,
      wa_templates: user.wa_templates
    } };
  });
