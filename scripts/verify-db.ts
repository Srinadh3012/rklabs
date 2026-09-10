import "dotenv/config";
import { db } from "../src/db";
import { customers } from "../src/db/schema/customers";
import { profiles } from "../src/db/schema/users";
import { eq } from "drizzle-orm";

async function verifyDb() {
  console.log("Starting DB verification...");

  // 0. Create a fake profile to satisfy FK constraints
  console.log("Creating test profile...");
  const newProfile = await db
    .insert(profiles)
    .values({
      email: "verify_test@example.com",
      full_name: "Test User",
      role: "admin",
      approval_status: "approved",
    })
    .returning();
  
  const ownerId = newProfile[0].id;
  console.log("Test profile created:", ownerId);

  // 1. CREATE
  console.log("Testing CREATE...");
  const newCustomer = await db
    .insert(customers)
    .values({
      name: "Test Verification Customer",
      email: "verify@example.com",
      phone: "1234567890",
      owner_id: ownerId,
    })
    .returning();
  
  if (!newCustomer[0]) throw new Error("CREATE failed!");
  const id = newCustomer[0].id;
  console.log("CREATE Success:", id);

  // 2. READ
  console.log("Testing READ...");
  const readCustomer = await db
    .select()
    .from(customers)
    .where(eq(customers.id, id));
  
  if (readCustomer.length === 0 || readCustomer[0].name !== "Test Verification Customer") {
    throw new Error("READ failed!");
  }
  console.log("READ Success.");

  // 3. UPDATE
  console.log("Testing UPDATE...");
  const updatedCustomer = await db
    .update(customers)
    .set({ name: "Updated Verification Customer" })
    .where(eq(customers.id, id))
    .returning();
  
  if (!updatedCustomer[0] || updatedCustomer[0].name !== "Updated Verification Customer") {
    throw new Error("UPDATE failed!");
  }
  console.log("UPDATE Success.");

  // 4. DELETE
  console.log("Testing DELETE...");
  await db.delete(customers).where(eq(customers.id, id));
  
  const checkDeleted = await db
    .select()
    .from(customers)
    .where(eq(customers.id, id));
  
  if (checkDeleted.length > 0) {
    throw new Error("DELETE failed!");
  }
  console.log("DELETE Success.");

  // Clean up profile
  await db.delete(profiles).where(eq(profiles.id, ownerId));
  console.log("Cleanup Success.");

  console.log("ALL DB VERIFICATIONS PASSED!");
  process.exit(0);
}

verifyDb().catch((err) => {
  console.error("Verification failed:", err);
  process.exit(1);
});
