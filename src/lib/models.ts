import mongoose, { Schema, Document } from "mongoose";

// Profile / User
export interface IProfile extends Document {
  email: string;
  passwordHash: string; // Added for local auth
  full_name?: string;
  role?: string; // Current actual role
  requested_role?: string;
  approval_status: "pending" | "approved" | "rejected";
  approved_at?: Date;
  approved_by?: string;
  rejection_reason?: string;
  shop_name?: string;
  shop_address?: string;
  shop_phone?: string;
  gst_number?: string;
  gst_percent?: number;
  wa_templates?: any;
  auto_reminders?: any;
  created_at: Date;
}
const profileSchema = new Schema<IProfile>({
  email: { type: String, required: true, unique: true },
  passwordHash: { type: String, required: true },
  full_name: String,
  role: { type: String, default: "user" },
  requested_role: String,
  approval_status: { type: String, enum: ["pending", "approved", "rejected"], default: "pending" },
  approved_at: Date,
  approved_by: String,
  rejection_reason: String,
  shop_name: String,
  shop_address: String,
  shop_phone: String,
  gst_number: String,
  gst_percent: Number,
  wa_templates: { type: Schema.Types.Mixed },
  auto_reminders: { type: Schema.Types.Mixed },
  created_at: { type: Date, default: Date.now },
});

// Customer
export interface ICustomer extends Document {
  name: string;
  phone?: string;
  whatsapp?: string;
  email?: string;
  address?: string;
  notes?: string;
  owner_id: string; // Could be ObjectId ref to Profile, using string for simplicity right now
  created_at: Date;
}
const customerSchema = new Schema<ICustomer>({
  name: { type: String, required: true },
  phone: String,
  whatsapp: String,
  email: String,
  address: String,
  notes: String,
  owner_id: { type: String, required: true, index: true },
  created_at: { type: Date, default: Date.now },
});

// Repair
export interface IRepair extends Document {
  ticket_no: string;
  status: string;
  device_type?: string;
  device_brand?: string;
  device_model?: string;
  imei?: string;
  password?: string;
  issue: string;
  technician_name?: string;
  estimated_cost?: number;
  final_cost?: number;
  estimated_completion?: Date;
  appointment_at?: Date;
  customer_id?: string;
  owner_id: string;
  assigned_at?: Date;
  completed_at?: Date;
  delivered_at?: Date;
  created_at: Date;
}
const repairSchema = new Schema<IRepair>({
  ticket_no: { type: String, required: true, unique: true },
  status: { type: String, default: "pending", index: true },
  device_type: String,
  device_brand: String,
  device_model: String,
  imei: String,
  password: String,
  issue: { type: String, required: true },
  technician_name: String,
  estimated_cost: Number,
  final_cost: Number,
  estimated_completion: Date,
  appointment_at: Date,
  customer_id: { type: String, index: true },
  owner_id: { type: String, required: true, index: true },
  assigned_at: Date,
  completed_at: Date,
  delivered_at: Date,
  created_at: { type: Date, default: Date.now },
});

// RepairNote
export interface IRepairNote extends Document {
  repair_id: string;
  note: string;
  task_done: boolean;
  technician_name?: string;
  completed_at?: Date;
  created_at: Date;
}
const repairNoteSchema = new Schema<IRepairNote>({
  repair_id: { type: String, required: true, index: true },
  note: { type: String, required: true },
  task_done: { type: Boolean, default: false },
  technician_name: String,
  completed_at: Date,
  created_at: { type: Date, default: Date.now },
});

// Invoice
export interface IInvoice extends Document {
  invoice_no: string;
  customer_id?: string;
  repair_id?: string;
  subtotal: number;
  discount?: number;
  tax_rate?: number;
  tax_amount?: number;
  total: number;
  amount_paid?: number;
  payment_status: string;
  payment_method?: string;
  notes?: string;
  owner_id: string;
  created_at: Date;
}
const invoiceSchema = new Schema<IInvoice>({
  invoice_no: { type: String, required: true },
  customer_id: { type: String, index: true },
  repair_id: { type: String, index: true },
  subtotal: { type: Number, required: true },
  discount: Number,
  tax_rate: Number,
  tax_amount: Number,
  total: { type: Number, required: true },
  amount_paid: Number,
  payment_status: { type: String, default: "unpaid" },
  payment_method: String,
  notes: String,
  owner_id: { type: String, required: true, index: true },
  created_at: { type: Date, default: Date.now },
});

// InvoiceItem
export interface IInvoiceItem extends Document {
  invoice_id: string;
  description: string;
  quantity: number;
  unit_price: number;
  total_price: number;
  created_at: Date;
}
const invoiceItemSchema = new Schema<IInvoiceItem>({
  invoice_id: { type: String, required: true, index: true },
  description: { type: String, required: true },
  quantity: { type: Number, required: true },
  unit_price: { type: Number, required: true },
  total_price: { type: Number, required: true },
  created_at: { type: Date, default: Date.now },
});

// InventoryItem
export interface IInventoryItem extends Document {
  name: string;
  quantity: number;
  cost_price?: number;
  selling_price?: number;
  low_stock_threshold?: number;
  category?: string;
  barcode?: string;
  owner_id: string;
  created_at: Date;
}
const inventoryItemSchema = new Schema<IInventoryItem>({
  name: { type: String, required: true },
  quantity: { type: Number, required: true, default: 0 },
  cost_price: Number,
  selling_price: Number,
  low_stock_threshold: Number,
  category: String,
  barcode: String,
  owner_id: { type: String, required: true, index: true },
  created_at: { type: Date, default: Date.now },
});

// Supplier
export interface ISupplier extends Document {
  name: string;
  contact_person?: string;
  phone?: string;
  email?: string;
  address?: string;
  notes?: string;
  owner_id: string;
  created_at: Date;
}
const supplierSchema = new Schema<ISupplier>({
  name: { type: String, required: true },
  contact_person: String,
  phone: String,
  email: String,
  address: String,
  notes: String,
  owner_id: { type: String, required: true, index: true },
  created_at: { type: Date, default: Date.now },
});

// PurchaseOrder
export interface IPurchaseOrder extends Document {
  po_number: string;
  supplier_id: string;
  status: string;
  total_amount: number;
  notes?: string;
  owner_id: string;
  received_at?: Date;
  created_at: Date;
}
const purchaseOrderSchema = new Schema<IPurchaseOrder>({
  po_number: { type: String, required: true },
  supplier_id: { type: String, required: true, index: true },
  status: { type: String, default: "pending" },
  total_amount: { type: Number, required: true, default: 0 },
  notes: String,
  owner_id: { type: String, required: true, index: true },
  received_at: Date,
  created_at: { type: Date, default: Date.now },
});

// PurchaseOrderItem
export interface IPurchaseOrderItem extends Document {
  po_id: string;
  item_id: string;
  quantity: number;
  unit_cost: number;
  total_cost: number;
}
const purchaseOrderItemSchema = new Schema<IPurchaseOrderItem>({
  po_id: { type: String, required: true, index: true },
  item_id: { type: String, required: true, index: true },
  quantity: { type: Number, required: true },
  unit_cost: { type: Number, required: true },
  total_cost: { type: Number, required: true },
});

// Expense
export interface IExpense extends Document {
  category: string;
  description: string;
  amount: number;
  date: string;
  receipt_url?: string;
  owner_id: string;
  created_at: Date;
}
const expenseSchema = new Schema<IExpense>({
  category: { type: String, required: true },
  description: { type: String, required: true },
  amount: { type: Number, required: true },
  date: { type: String, required: true }, // Stored as ISO string date to match Supabase
  receipt_url: String,
  owner_id: { type: String, required: true, index: true },
  created_at: { type: Date, default: Date.now },
});

// AppointmentEvent
export interface IAppointmentEvent extends Document {
  title: string;
  start_time: string;
  end_time: string;
  color?: string;
  notes?: string;
  repair_id?: string;
  owner_id: string;
  created_at: Date;
}
const appointmentEventSchema = new Schema<IAppointmentEvent>({
  title: { type: String, required: true },
  start_time: { type: String, required: true },
  end_time: { type: String, required: true },
  color: String,
  notes: String,
  repair_id: String,
  owner_id: { type: String, required: true, index: true },
  created_at: { type: Date, default: Date.now },
});

// StockMovement
export interface IStockMovement extends Document {
  item_id: string;
  type: string;
  quantity: number;
  reference_type?: string;
  reference_id?: string;
  notes?: string;
  owner_id: string;
  created_at: Date;
}
const stockMovementSchema = new Schema<IStockMovement>({
  item_id: { type: String, required: true, index: true },
  type: { type: String, required: true }, // e.g. "in", "out"
  quantity: { type: Number, required: true },
  reference_type: String,
  reference_id: String,
  notes: String,
  owner_id: { type: String, required: true, index: true },
  created_at: { type: Date, default: Date.now },
});

// Notification
export interface INotification extends Document {
  user_id: string;
  kind: string;
  title: string;
  body?: string;
  read_at?: Date;
  created_at: Date;
}
const notificationSchema = new Schema<INotification>({
  user_id: { type: String, required: true, index: true },
  kind: { type: String, required: true },
  title: { type: String, required: true },
  body: String,
  read_at: Date,
  created_at: { type: Date, default: Date.now },
});

// WaLog
export interface IWaLog extends Document {
  owner_id: string;
  repair_id?: string;
  invoice_id?: string;
  kind: string;
  recipient_name?: string;
  phone?: string;
  message: string;
  status: string;
  error?: string;
  created_at: Date;
}
const waLogSchema = new Schema<IWaLog>({
  owner_id: { type: String, required: true, index: true },
  repair_id: { type: String, index: true },
  invoice_id: { type: String, index: true },
  kind: { type: String, required: true },
  recipient_name: String,
  phone: String,
  message: { type: String, required: true },
  status: { type: String, required: true },
  error: String,
  created_at: { type: Date, default: Date.now },
});

// Compile models and ensure they don't overwrite on hot reloads
export const Profile = mongoose.models.Profile || mongoose.model<IProfile>("Profile", profileSchema);
export const Customer = mongoose.models.Customer || mongoose.model<ICustomer>("Customer", customerSchema);
export const Repair = mongoose.models.Repair || mongoose.model<IRepair>("Repair", repairSchema);
export const RepairNote = mongoose.models.RepairNote || mongoose.model<IRepairNote>("RepairNote", repairNoteSchema);
export const Invoice = mongoose.models.Invoice || mongoose.model<IInvoice>("Invoice", invoiceSchema);
export const InvoiceItem = mongoose.models.InvoiceItem || mongoose.model<IInvoiceItem>("InvoiceItem", invoiceItemSchema);
export const InventoryItem = mongoose.models.InventoryItem || mongoose.model<IInventoryItem>("InventoryItem", inventoryItemSchema);
export const Supplier = mongoose.models.Supplier || mongoose.model<ISupplier>("Supplier", supplierSchema);
export const PurchaseOrder = mongoose.models.PurchaseOrder || mongoose.model<IPurchaseOrder>("PurchaseOrder", purchaseOrderSchema);
export const PurchaseOrderItem = mongoose.models.PurchaseOrderItem || mongoose.model<IPurchaseOrderItem>("PurchaseOrderItem", purchaseOrderItemSchema);
export const Expense = mongoose.models.Expense || mongoose.model<IExpense>("Expense", expenseSchema);
export const AppointmentEvent = mongoose.models.AppointmentEvent || mongoose.model<IAppointmentEvent>("AppointmentEvent", appointmentEventSchema);
export const StockMovement = mongoose.models.StockMovement || mongoose.model<IStockMovement>("StockMovement", stockMovementSchema);
export const Notification = mongoose.models.Notification || mongoose.model<INotification>("Notification", notificationSchema);
export const WaLog = mongoose.models.WaLog || mongoose.model<IWaLog>("WaLog", waLogSchema);
