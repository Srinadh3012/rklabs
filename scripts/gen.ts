import fs from "fs";
import path from "path";

const entities = [
  { name: "Customer", table: "customers", schema: "customers" },
  { name: "Inventory", table: "inventory", schema: "inventory" },
  { name: "Repair", table: "repairs", schema: "repairs" },
  { name: "Invoice", table: "invoices", schema: "billing" },
  { name: "Supplier", table: "suppliers", schema: "customers" },
  { name: "Expense", table: "expenses", schema: "billing" },
  { name: "PurchaseOrder", table: "purchaseOrders", schema: "billing" },
];

const reposDir = path.join(process.cwd(), "src", "repositories");
const servicesDir = path.join(process.cwd(), "src", "services");

if (!fs.existsSync(reposDir)) fs.mkdirSync(reposDir, { recursive: true });
if (!fs.existsSync(servicesDir)) fs.mkdirSync(servicesDir, { recursive: true });

for (const e of entities) {
  const repoCode = `import { db } from "@/db";
import { ${e.table} } from "@/db/schema";
import { eq, desc } from "drizzle-orm";

export class ${e.name}Repository {
  async getAll() {
    return await db.select().from(${e.table}).orderBy(desc(${e.table}.created_at));
  }

  async getById(id: string) {
    const result = await db.select().from(${e.table}).where(eq(${e.table}.id, id));
    return result[0] || null;
  }

  async create(data: any) {
    const result = await db.insert(${e.table}).values(data).returning();
    return result[0];
  }

  async update(id: string, data: any) {
    const result = await db.update(${e.table}).set(data).where(eq(${e.table}.id, id)).returning();
    return result[0];
  }

  async delete(id: string) {
    await db.delete(${e.table}).where(eq(${e.table}.id, id));
    return true;
  }
}

export const ${e.name.toLowerCase()}Repository = new ${e.name}Repository();
`;

  const serviceCode = `import { ${e.name.toLowerCase()}Repository } from "@/repositories/${e.name.toLowerCase()}.repository";

export class ${e.name}Service {
  async get${e.name}s() {
    return await ${e.name.toLowerCase()}Repository.getAll();
  }

  async get${e.name}ById(id: string) {
    return await ${e.name.toLowerCase()}Repository.getById(id);
  }

  async create${e.name}(data: any) {
    return await ${e.name.toLowerCase()}Repository.create(data);
  }

  async update${e.name}(id: string, data: any) {
    return await ${e.name.toLowerCase()}Repository.update(id, data);
  }

  async delete${e.name}(id: string) {
    return await ${e.name.toLowerCase()}Repository.delete(id);
  }
}

export const ${e.name.toLowerCase()}Service = new ${e.name}Service();
`;

  fs.writeFileSync(path.join(reposDir, e.name.toLowerCase() + ".repository.ts"), repoCode);
  fs.writeFileSync(path.join(servicesDir, e.name.toLowerCase() + ".service.ts"), serviceCode);
}
console.log("Done generating repos and services.");
