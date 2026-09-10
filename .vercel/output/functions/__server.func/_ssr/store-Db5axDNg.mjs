//#region node_modules/.nitro/vite/services/ssr/assets/store-Db5axDNg.js
(/* @__PURE__ */ new Date()).toISOString();
var daysAgo = (n) => (/* @__PURE__ */ new Date(Date.now() - n * 864e5)).toISOString();
var seedProfiles = [
	{
		id: "admin-001",
		email: "admin@rklabs.com",
		full_name: "Admin User",
		role: "admin",
		requested_role: "admin",
		approval_status: "approved",
		approved_at: daysAgo(30),
		shop_name: "RK Repair Labs",
		shop_address: "123 Main Street, Hyderabad, Telangana 500001",
		shop_phone: "+91-9876543210",
		gst_number: "36AABCU9603R1ZM",
		gst_percent: 18,
		created_at: daysAgo(30)
	},
	{
		id: "tech-001",
		email: "tech@rklabs.com",
		full_name: "Ravi Kumar",
		role: "employee",
		requested_role: "employee",
		approval_status: "approved",
		approved_at: daysAgo(25),
		created_at: daysAgo(28)
	},
	{
		id: "pending-001",
		email: "new@rklabs.com",
		full_name: "Pending User",
		role: "user",
		requested_role: "customer",
		approval_status: "pending",
		created_at: daysAgo(1)
	}
];
var seedCustomers = [
	{
		id: "cust-001",
		name: "Rahul Sharma",
		phone: "+91-9988776655",
		whatsapp: "+91-9988776655",
		email: "rahul@example.com",
		address: "45 MG Road, Hyderabad",
		notes: "Regular customer",
		owner_id: "admin-001",
		created_at: daysAgo(20)
	},
	{
		id: "cust-002",
		name: "Priya Reddy",
		phone: "+91-9876001122",
		whatsapp: "+91-9876001122",
		email: "priya@example.com",
		address: "12 Jubilee Hills, Hyderabad",
		notes: null,
		owner_id: "admin-001",
		created_at: daysAgo(15)
	},
	{
		id: "cust-003",
		name: "Mohammed Ali",
		phone: "+91-9123456789",
		whatsapp: "+91-9123456789",
		email: null,
		address: "78 Charminar Area, Hyderabad",
		notes: "Prefers WhatsApp communication",
		owner_id: "admin-001",
		created_at: daysAgo(10)
	},
	{
		id: "cust-004",
		name: "Lakshmi Devi",
		phone: "+91-8765432100",
		whatsapp: null,
		email: "lakshmi@example.com",
		address: "56 Banjara Hills, Hyderabad",
		notes: null,
		owner_id: "admin-001",
		created_at: daysAgo(5)
	},
	{
		id: "cust-005",
		name: "Venkat Rao",
		phone: "+91-9001234567",
		whatsapp: "+91-9001234567",
		email: "venkat@example.com",
		address: "22 Madhapur, Hyderabad",
		notes: "Business account",
		owner_id: "admin-001",
		created_at: daysAgo(3)
	}
];
var seedRepairs = [
	{
		id: "rep-001",
		ticket_no: "TK-100001",
		customer_id: "cust-001",
		device_type: "Mobile",
		device_brand: "Samsung",
		device_model: "Galaxy S24",
		imei: "356789012345678",
		issue: "Screen cracked, display not working",
		status: "in_progress",
		technician_notes: "AMOLED panel needs full replacement",
		estimated_completion: daysAgo(-2),
		estimated_cost: 8500,
		owner_id: "admin-001",
		created_at: daysAgo(5)
	},
	{
		id: "rep-002",
		ticket_no: "TK-100002",
		customer_id: "cust-002",
		device_type: "Laptop",
		device_brand: "Dell",
		device_model: "Inspiron 15",
		imei: null,
		issue: "Not turning on, charging light blinking",
		status: "diagnosed",
		technician_notes: "Motherboard capacitor issue detected",
		estimated_completion: daysAgo(-3),
		estimated_cost: 4500,
		owner_id: "admin-001",
		created_at: daysAgo(4)
	},
	{
		id: "rep-003",
		ticket_no: "TK-100003",
		customer_id: "cust-003",
		device_type: "Mobile",
		device_brand: "Apple",
		device_model: "iPhone 15 Pro",
		imei: "123456789012345",
		issue: "Battery draining fast, overheating",
		status: "waiting_parts",
		technician_notes: "Battery degraded to 67%, ordering replacement",
		estimated_completion: daysAgo(-5),
		estimated_cost: 3200,
		owner_id: "admin-001",
		created_at: daysAgo(3)
	},
	{
		id: "rep-004",
		ticket_no: "TK-100004",
		customer_id: "cust-004",
		device_type: "Tablet",
		device_brand: "Apple",
		device_model: "iPad Air M2",
		imei: null,
		issue: "Charging port loose, intermittent charging",
		status: "completed",
		technician_notes: "Port replaced, tested with multiple cables",
		estimated_completion: daysAgo(0),
		estimated_cost: 2e3,
		final_cost: 1800,
		owner_id: "admin-001",
		created_at: daysAgo(7)
	},
	{
		id: "rep-005",
		ticket_no: "TK-100005",
		customer_id: "cust-005",
		device_type: "Mobile",
		device_brand: "OnePlus",
		device_model: "12R",
		imei: "998877665544332",
		issue: "Water damage, speaker not working",
		status: "received",
		technician_notes: null,
		estimated_completion: null,
		estimated_cost: null,
		owner_id: "admin-001",
		created_at: daysAgo(1)
	},
	{
		id: "rep-006",
		ticket_no: "TK-100006",
		customer_id: "cust-001",
		device_type: "Mobile",
		device_brand: "Xiaomi",
		device_model: "Redmi Note 13 Pro",
		imei: "112233445566778",
		issue: "Camera blur, autofocus not working",
		status: "delivered",
		technician_notes: "Camera module replaced",
		estimated_completion: daysAgo(2),
		estimated_cost: 2500,
		final_cost: 2500,
		owner_id: "admin-001",
		created_at: daysAgo(10)
	}
];
var seedRepairNotes = [
	{
		id: "rn-001",
		repair_id: "rep-001",
		note: "Customer dropped off device, visible crack on screen",
		technician_name: "Ravi Kumar",
		task_done: true,
		created_at: daysAgo(5)
	},
	{
		id: "rn-002",
		repair_id: "rep-001",
		note: "Ordered Samsung AMOLED panel from supplier",
		technician_name: "Ravi Kumar",
		task_done: true,
		created_at: daysAgo(4)
	},
	{
		id: "rn-003",
		repair_id: "rep-001",
		note: "Panel arrived, starting replacement",
		technician_name: "Ravi Kumar",
		task_done: false,
		created_at: daysAgo(1)
	},
	{
		id: "rn-004",
		repair_id: "rep-002",
		note: "Initial diagnosis: board-level issue",
		technician_name: "Ravi Kumar",
		task_done: true,
		created_at: daysAgo(3)
	},
	{
		id: "rn-005",
		repair_id: "rep-004",
		note: "Repair complete, tested all functions",
		technician_name: "Ravi Kumar",
		task_done: true,
		created_at: daysAgo(1)
	}
];
var seedInvoices = [
	{
		id: "inv-001",
		invoice_no: "INV-2024-001",
		customer_id: "cust-004",
		repair_id: "rep-004",
		subtotal: 1800,
		discount: 0,
		tax_rate: 18,
		tax_amount: 324,
		total: 2124,
		amount_paid: 2124,
		payment_status: "paid",
		payment_method: "UPI",
		owner_id: "admin-001",
		created_at: daysAgo(1)
	},
	{
		id: "inv-002",
		invoice_no: "INV-2024-002",
		customer_id: "cust-001",
		repair_id: "rep-006",
		subtotal: 2500,
		discount: 200,
		tax_rate: 18,
		tax_amount: 414,
		total: 2714,
		amount_paid: 2714,
		payment_status: "paid",
		payment_method: "Cash",
		owner_id: "admin-001",
		created_at: daysAgo(3)
	},
	{
		id: "inv-003",
		invoice_no: "INV-2024-003",
		customer_id: "cust-002",
		repair_id: "rep-002",
		subtotal: 4500,
		discount: 0,
		tax_rate: 18,
		tax_amount: 810,
		total: 5310,
		amount_paid: 0,
		payment_status: "unpaid",
		payment_method: null,
		notes: "Pending diagnosis confirmation",
		owner_id: "admin-001",
		created_at: daysAgo(2)
	}
];
var seedInvoiceItems = [
	{
		id: "ii-001",
		invoice_id: "inv-001",
		description: "USB-C Charging Port Replacement",
		quantity: 1,
		unit_price: 800,
		total_price: 800,
		created_at: daysAgo(1)
	},
	{
		id: "ii-002",
		invoice_id: "inv-001",
		description: "Labor Charge — Port Replacement",
		quantity: 1,
		unit_price: 1e3,
		total_price: 1e3,
		created_at: daysAgo(1)
	},
	{
		id: "ii-003",
		invoice_id: "inv-002",
		description: "Camera Module — Xiaomi Redmi Note 13 Pro",
		quantity: 1,
		unit_price: 1800,
		total_price: 1800,
		created_at: daysAgo(3)
	},
	{
		id: "ii-004",
		invoice_id: "inv-002",
		description: "Service Charge",
		quantity: 1,
		unit_price: 700,
		total_price: 700,
		created_at: daysAgo(3)
	}
];
var seedInventory = [
	{
		id: "item-001",
		name: "Samsung AMOLED Screen (S24)",
		sku: "SCR-SAM-S24",
		category: "Screens",
		cost_price: 5500,
		selling_price: 8e3,
		stock_level: 3,
		quantity: 3,
		min_stock_level: 2,
		location: "Shelf A1",
		owner_id: "admin-001",
		created_at: daysAgo(20)
	},
	{
		id: "item-002",
		name: "iPhone 15 Battery",
		sku: "BAT-IP15",
		category: "Batteries",
		cost_price: 1200,
		selling_price: 2500,
		stock_level: 8,
		quantity: 8,
		min_stock_level: 5,
		location: "Shelf B2",
		owner_id: "admin-001",
		created_at: daysAgo(20)
	},
	{
		id: "item-003",
		name: "USB-C Charging Port (Universal)",
		sku: "PRT-USBC-UNI",
		category: "Ports",
		cost_price: 150,
		selling_price: 500,
		stock_level: 25,
		quantity: 25,
		min_stock_level: 10,
		location: "Drawer C1",
		owner_id: "admin-001",
		created_at: daysAgo(20)
	},
	{
		id: "item-004",
		name: "Xiaomi Camera Module (Note 13 Pro)",
		sku: "CAM-XI-N13P",
		category: "Cameras",
		cost_price: 1200,
		selling_price: 2200,
		stock_level: 1,
		quantity: 1,
		min_stock_level: 3,
		location: "Shelf A3",
		owner_id: "admin-001",
		created_at: daysAgo(15)
	},
	{
		id: "item-005",
		name: "Laptop RAM 8GB DDR4",
		sku: "RAM-8G-DDR4",
		category: "Components",
		cost_price: 1400,
		selling_price: 2500,
		stock_level: 6,
		quantity: 6,
		min_stock_level: 3,
		location: "Shelf D1",
		owner_id: "admin-001",
		created_at: daysAgo(15)
	},
	{
		id: "item-006",
		name: "Screen Protector (Tempered Glass)",
		sku: "ACC-TGLASS",
		category: "Accessories",
		cost_price: 50,
		selling_price: 250,
		stock_level: 50,
		quantity: 50,
		min_stock_level: 20,
		location: "Counter",
		owner_id: "admin-001",
		created_at: daysAgo(10)
	}
];
var seedStockMovements = [
	{
		id: "sm-001",
		item_id: "item-003",
		type: "out",
		quantity: 1,
		reference_id: "rep-004",
		reference_type: "repair",
		notes: "Used for iPad charging port repair",
		owner_id: "admin-001",
		created_at: daysAgo(2)
	},
	{
		id: "sm-002",
		item_id: "item-004",
		type: "out",
		quantity: 1,
		reference_id: "rep-006",
		reference_type: "repair",
		notes: "Used for Xiaomi camera replacement",
		owner_id: "admin-001",
		created_at: daysAgo(4)
	},
	{
		id: "sm-003",
		item_id: "item-002",
		type: "in",
		quantity: 10,
		reference_id: "po-001",
		reference_type: "purchase_order",
		notes: "Restocked from supplier",
		owner_id: "admin-001",
		created_at: daysAgo(8)
	}
];
var seedSuppliers = [{
	id: "sup-001",
	name: "Mobile Parts Hub",
	contact_person: "Suresh Kumar",
	phone: "+91-9876500001",
	email: "suresh@mobilepartshub.com",
	address: "Gachibowli, Hyderabad",
	gst_number: "36AABCS1234R1Z5",
	notes: "Primary screen supplier",
	owner_id: "admin-001",
	created_at: daysAgo(25)
}, {
	id: "sup-002",
	name: "TechSpare India",
	contact_person: "Anita Patel",
	phone: "+91-9876500002",
	email: "anita@techspare.in",
	address: "Secunderabad, Telangana",
	gst_number: "36AABCT5678R1Z8",
	notes: "Battery and charger supplier",
	owner_id: "admin-001",
	created_at: daysAgo(20)
}];
var seedPurchaseOrders = [{
	id: "po-001",
	po_number: "PO-100001",
	supplier_id: "sup-002",
	total_amount: 12e3,
	notes: "Battery restock order",
	status: "received",
	received_at: daysAgo(8),
	owner_id: "admin-001",
	created_at: daysAgo(12)
}, {
	id: "po-002",
	po_number: "PO-100002",
	supplier_id: "sup-001",
	total_amount: 16500,
	notes: "Screen panels order",
	status: "pending",
	received_at: null,
	owner_id: "admin-001",
	created_at: daysAgo(2)
}];
var seedPurchaseOrderItems = [{
	id: "poi-001",
	po_id: "po-001",
	item_id: "item-002",
	quantity: 10,
	unit_cost: 1200,
	total_cost: 12e3
}, {
	id: "poi-002",
	po_id: "po-002",
	item_id: "item-001",
	quantity: 3,
	unit_cost: 5500,
	total_cost: 16500
}];
var seedExpenses = [
	{
		id: "exp-001",
		category: "Rent",
		description: "Monthly shop rent",
		amount: 25e3,
		expense_date: daysAgo(5).slice(0, 10),
		date: daysAgo(5).slice(0, 10),
		owner_id: "admin-001",
		created_at: daysAgo(5)
	},
	{
		id: "exp-002",
		category: "Electricity",
		description: "Monthly electricity bill",
		amount: 3500,
		expense_date: daysAgo(3).slice(0, 10),
		date: daysAgo(3).slice(0, 10),
		owner_id: "admin-001",
		created_at: daysAgo(3)
	},
	{
		id: "exp-003",
		category: "Miscellaneous",
		description: "Cleaning supplies",
		amount: 800,
		expense_date: daysAgo(1).slice(0, 10),
		date: daysAgo(1).slice(0, 10),
		owner_id: "admin-001",
		created_at: daysAgo(1)
	}
];
var seedNotifications = [
	{
		id: "notif-001",
		user_id: "admin-001",
		kind: "approval_approved_admin",
		title: "User approved as employee",
		body: null,
		read_at: daysAgo(20),
		created_at: daysAgo(25)
	},
	{
		id: "notif-002",
		user_id: "admin-001",
		kind: "low_stock",
		title: "Low stock alert",
		body: "Xiaomi Camera Module (Note 13 Pro) is below minimum stock level.",
		read_at: null,
		created_at: daysAgo(1)
	},
	{
		id: "notif-003",
		user_id: "tech-001",
		kind: "approval_approved",
		title: "Your account was approved",
		body: "Welcome to RK Repair Labs. You've been granted the employee role.",
		read_at: daysAgo(24),
		created_at: daysAgo(25)
	}
];
var seedWaLogs = [{
	id: "wa-001",
	owner_id: "admin-001",
	repair_id: "rep-004",
	invoice_id: "inv-001",
	kind: "invoice",
	recipient_name: "Lakshmi Devi",
	phone: "+91-8765432100",
	message: "Invoice INV-2024-001 for ₹2,124 has been generated.",
	status: "sent",
	error: null,
	created_at: daysAgo(1)
}, {
	id: "wa-002",
	owner_id: "admin-001",
	repair_id: "rep-006",
	invoice_id: null,
	kind: "delivery",
	recipient_name: "Rahul Sharma",
	phone: "+91-9988776655",
	message: "Your device is ready for pickup!",
	status: "sent",
	error: null,
	created_at: daysAgo(2)
}];
var seedAppointments = [{
	id: "apt-001",
	repair_id: "rep-001",
	title: "Scheduled pickup",
	start_time: daysAgo(-2),
	end_time: daysAgo(-2),
	notes: "Customer will pick up after 5 PM",
	owner_id: "admin-001",
	created_at: daysAgo(3)
}];
var Collection = class {
	items;
	constructor(seedData = []) {
		this.items = new Map(seedData.map((item) => [item.id, structuredClone(item)]));
	}
	nextId() {
		return `mock-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
	}
	list() {
		return Array.from(this.items.values()).map((item) => structuredClone(item));
	}
	getById(id) {
		const item = this.items.get(id);
		return item ? structuredClone(item) : null;
	}
	query(predicate) {
		return this.list().filter(predicate);
	}
	create(data) {
		const id = data.id || this.nextId();
		const item = {
			...data,
			id
		};
		this.items.set(id, structuredClone(item));
		return structuredClone(item);
	}
	update(id, data) {
		const existing = this.items.get(id);
		if (!existing) return false;
		const updated = {
			...existing,
			...data,
			id
		};
		this.items.set(id, updated);
		return true;
	}
	delete(id) {
		return this.items.delete(id);
	}
	count(predicate) {
		if (!predicate) return this.items.size;
		return this.query(predicate).length;
	}
};
var MockStore = class {
	profiles = new Collection(seedProfiles);
	customers = new Collection(seedCustomers);
	repairs = new Collection(seedRepairs);
	repairNotes = new Collection(seedRepairNotes);
	invoices = new Collection(seedInvoices);
	invoiceItems = new Collection(seedInvoiceItems);
	inventory = new Collection(seedInventory);
	stockMovements = new Collection(seedStockMovements);
	suppliers = new Collection(seedSuppliers);
	purchaseOrders = new Collection(seedPurchaseOrders);
	purchaseOrderItems = new Collection(seedPurchaseOrderItems);
	expenses = new Collection(seedExpenses);
	notifications = new Collection(seedNotifications);
	waLogs = new Collection(seedWaLogs);
	appointments = new Collection(seedAppointments);
};
var _store;
function getStore() {
	if (!_store) _store = new MockStore();
	return _store;
}
//#endregion
export { getStore as t };
