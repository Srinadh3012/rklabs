import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import { Profile } from "../src/lib/models"; 
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const MONGODB_URI = "mongodb+srv://manideepreddyeevuri_db_user:5DZyEEaGpiNELnYi@rklabs.8aldtqo.mongodb.net/?appName=rklabs";

if (!MONGODB_URI) {
  console.error("Missing MONGODB_URI in .env");
  process.exit(1);
}

async function seed() {
  await mongoose.connect(MONGODB_URI!);
  console.log("Connected to MongoDB.");

  const admins = [
    { email: "admin@rklabs.com", name: "Admin User", role: "admin" },
    { email: "superadmin@rklabs.com", name: "Super Admin", role: "admin" } // superadmin can just use the admin role, but we can add more granular permissions if needed.
  ];

  const defaultPassword = "Password123!";
  const salt = await bcrypt.genSalt(10);
  const passwordHash = await bcrypt.hash(defaultPassword, salt);

  for (const admin of admins) {
    const existing = await Profile.findOne({ email: admin.email });
    if (existing) {
      console.log(`User ${admin.email} already exists. Updating role to admin...`);
      existing.role = admin.role;
      existing.approval_status = "approved";
      await existing.save();
    } else {
      console.log(`Creating ${admin.email}...`);
      await Profile.create({
        email: admin.email,
        passwordHash: passwordHash,
        full_name: admin.name,
        role: admin.role,
        approval_status: "approved",
      });
      console.log(`${admin.email} created with default password: ${defaultPassword}`);
    }
  }

  console.log("Seed complete.");
  process.exit(0);
}

seed().catch((err) => {
  console.error("Seed error:", err);
  process.exit(1);
});
