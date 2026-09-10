import { db } from "../src/db";
import { profiles, customers, inventory } from "../src/db/schema";

async function runSeed() {
  console.log("Seeding database...");

  try {
    // 1. Create a dummy profile
    const insertedProfile = await db
      .insert(profiles)
      .values({
        email: "test@example.com",
        full_name: "Test Admin",
        role: "admin",
        shop_name: "Test Repair Shop",
      })
      .returning();
    const ownerId = insertedProfile[0].id;
    console.log("Created Profile:", ownerId);

    // 2. Create some customers
    await db.insert(customers).values([
      { name: "Alice Smith", phone: "1234567890", owner_id: ownerId },
      { name: "Bob Jones", phone: "0987654321", owner_id: ownerId },
    ]);
    console.log("Created Customers");

    // 3. Create some inventory
    await db.insert(inventory).values([
      {
        name: "iPhone Screen",
        cost_price: 20.0,
        selling_price: 50.0,
        quantity: 10,
        owner_id: ownerId,
      },
      {
        name: "Samsung Battery",
        cost_price: 15.0,
        selling_price: 35.0,
        quantity: 5,
        owner_id: ownerId,
      },
    ]);
    console.log("Created Inventory");

    console.log("Seeding complete!");
  } catch (error) {
    console.error("Error seeding database:", error);
  }
}

runSeed();
