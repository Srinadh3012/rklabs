// =============================
// In-Memory Mock Store
// =============================
// Generic CRUD store that simulates a database collection.
// All data lives in-memory and resets on server restart.

import * as seed from "./data";
import type {
  Profile, Customer, Repair, RepairNote, Invoice, InvoiceItem,
  InventoryItem, StockMovement, Supplier, PurchaseOrder, PurchaseOrderItem,
  Expense, Notification, WaLog, Appointment,
} from "@/types/models";

// ---------------------------------------------------------------------------
// Generic collection
// ---------------------------------------------------------------------------

type WithId = { id: string };

class Collection<T extends WithId> {
  private items: Map<string, T>;

  constructor(seedData: T[] = []) {
    this.items = new Map(seedData.map((item) => [item.id, structuredClone(item)]));
  }

  private nextId(): string {
    return `mock-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
  }

  list(): T[] {
    return Array.from(this.items.values()).map((item) => structuredClone(item));
  }

  getById(id: string): T | null {
    const item = this.items.get(id);
    return item ? structuredClone(item) : null;
  }

  query(predicate: (item: T) => boolean): T[] {
    return this.list().filter(predicate);
  }

  create(data: Omit<T, "id"> & { id?: string }): T {
    const id = data.id || this.nextId();
    const item = { ...data, id } as unknown as T;
    this.items.set(id, structuredClone(item));
    return structuredClone(item);
  }

  update(id: string, data: Partial<T>): boolean {
    const existing = this.items.get(id);
    if (!existing) return false;
    const updated = { ...existing, ...data, id }; // prevent id overwrite
    this.items.set(id, updated);
    return true;
  }

  delete(id: string): boolean {
    return this.items.delete(id);
  }

  count(predicate?: (item: T) => boolean): number {
    if (!predicate) return this.items.size;
    return this.query(predicate).length;
  }
}

// ---------------------------------------------------------------------------
// Store singleton
// ---------------------------------------------------------------------------

class MockStore {
  profiles = new Collection<Profile>(seed.seedProfiles);
  customers = new Collection<Customer>(seed.seedCustomers);
  repairs = new Collection<Repair>(seed.seedRepairs);
  repairNotes = new Collection<RepairNote>(seed.seedRepairNotes);
  invoices = new Collection<Invoice>(seed.seedInvoices);
  invoiceItems = new Collection<InvoiceItem>(seed.seedInvoiceItems);
  inventory = new Collection<InventoryItem>(seed.seedInventory);
  stockMovements = new Collection<StockMovement>(seed.seedStockMovements);
  suppliers = new Collection<Supplier>(seed.seedSuppliers);
  purchaseOrders = new Collection<PurchaseOrder>(seed.seedPurchaseOrders);
  purchaseOrderItems = new Collection<PurchaseOrderItem>(seed.seedPurchaseOrderItems);
  expenses = new Collection<Expense>(seed.seedExpenses);
  notifications = new Collection<Notification>(seed.seedNotifications);
  waLogs = new Collection<WaLog>(seed.seedWaLogs);
  appointments = new Collection<Appointment>(seed.seedAppointments);
}

// Module-level singleton — persists across requests within the same server process
let _store: MockStore | undefined;

export function getStore(): MockStore {
  if (!_store) {
    _store = new MockStore();
  }
  return _store;
}

export type { Collection, MockStore };
