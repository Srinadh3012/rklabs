import mongoose from "mongoose";
import * as models from "../src/lib/models"; // Using relative path since it's in scripts/
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const MONGODB_URI = "mongodb+srv://manideepreddyeevuri_db_user:5DZyEEaGpiNELnYi@rklabs.8aldtqo.mongodb.net/?appName=rklabs";

async function buildIndexes() {
  await mongoose.connect(MONGODB_URI!);
  console.log("Connected to MongoDB.");

  console.log("Building indexes...");
  for (const [name, model] of Object.entries(models)) {
    if (model && (model as any).syncIndexes) {
      console.log(`Syncing indexes for ${name}...`);
      await (model as any).syncIndexes();
    }
  }

  console.log("Finished building all indexes.");
  process.exit(0);
}

buildIndexes().catch((err) => {
  console.error("Error building indexes:", err);
  process.exit(1);
});
