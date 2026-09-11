import 'dotenv/config';
import { db } from './src/db';
import { sql } from 'drizzle-orm';

async function test() {
  try {
    const result = await db.execute(sql`SELECT 1 as connected`);
    console.log("Database connected successfully! Response:", result);
  } catch (err) {
    console.error("Database connection failed:", err);
  }
}

test();
