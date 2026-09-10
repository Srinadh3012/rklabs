import { n as createServerFn } from "./server-De111qI3.mjs";
import { a as objectType, i as numberType, o as stringType, t as anyType } from "../_libs/zod.mjs";
import { t as createServerRpc } from "./createServerRpc-BBOL_uPN.mjs";
import { t as getStore } from "./store-Db5axDNg.mjs";
import { i as requireAuth } from "./auth.server-CSvFL3TF.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/repairs-BYmNgN7E.js
var repairSchema = objectType({
	customer_id: stringType().nullable().optional(),
	device_type: stringType().nullable().optional(),
	device_brand: stringType().nullable().optional(),
	device_model: stringType().nullable().optional(),
	imei: stringType().nullable().optional(),
	issue: stringType().min(1),
	status: stringType(),
	technician_notes: stringType().nullable().optional(),
	estimated_completion: stringType().nullable().optional(),
	estimated_cost: numberType().nullable().optional(),
	appointment_at: stringType().nullable().optional(),
	ticket_no: stringType().optional()
});
var getRepairsFn_createServerFn_handler = createServerRpc({
	id: "9ba20e9dda33eae350a621448448e271f6f3738c0f1b0e724b19dccecfe7c834",
	name: "getRepairsFn",
	filename: "src/lib/api/repairs.ts"
}, (opts) => getRepairsFn.__executeServer(opts));
var getRepairsFn = createServerFn({ method: "GET" }).handler(getRepairsFn_createServerFn_handler, async () => {
	await requireAuth();
	return getStore().repairs.list().sort((a, b) => b.created_at.localeCompare(a.created_at));
});
var createRepairFn_createServerFn_handler = createServerRpc({
	id: "d6132b538d29d6241266ca4c38ae009467cceaa5b4e1522a0f9aa925261d96aa",
	name: "createRepairFn",
	filename: "src/lib/api/repairs.ts"
}, (opts) => createRepairFn.__executeServer(opts));
var createRepairFn = createServerFn({ method: "POST" }).validator((data) => repairSchema.parse(data)).handler(createRepairFn_createServerFn_handler, async ({ data }) => {
	const { session } = await requireAuth();
	const store = getStore();
	const ticket_no = data.ticket_no || `TK-${Date.now().toString().slice(-6)}`;
	const now = (/* @__PURE__ */ new Date()).toISOString();
	return {
		id: store.repairs.create({
			...data,
			ticket_no,
			owner_id: session.userId,
			created_at: now
		}).id,
		ticket_no,
		created_at: now
	};
});
var updateRepairFn_createServerFn_handler = createServerRpc({
	id: "aaf4a1e7c1c2ec51cd2faf2d16aeb6ec636ded91e69d42bd27bfa2ab9886e657",
	name: "updateRepairFn",
	filename: "src/lib/api/repairs.ts"
}, (opts) => updateRepairFn.__executeServer(opts));
var updateRepairFn = createServerFn({ method: "POST" }).validator((data) => objectType({
	id: stringType(),
	data: repairSchema.partial()
}).parse(data)).handler(updateRepairFn_createServerFn_handler, async ({ data }) => {
	await requireAuth();
	const store = getStore();
	store.repairs.update(data.id, data.data);
	const repair = store.repairs.getById(data.id);
	return {
		id: data.id,
		ticket_no: repair?.ticket_no
	};
});
var deleteRepairFn_createServerFn_handler = createServerRpc({
	id: "ed9e3d230434f7dfb2e90c31b0d7d14b97fd65ac925937c1b1f86f9201726ea7",
	name: "deleteRepairFn",
	filename: "src/lib/api/repairs.ts"
}, (opts) => deleteRepairFn.__executeServer(opts));
var deleteRepairFn = createServerFn({ method: "POST" }).validator((id) => stringType().parse(id)).handler(deleteRepairFn_createServerFn_handler, async ({ data }) => {
	await requireAuth();
	const store = getStore();
	store.repairs.delete(data);
	const notes = store.repairNotes.query((n) => n.repair_id === data);
	for (const note of notes) store.repairNotes.delete(note.id);
	return { success: true };
});
var getRepairNotesFn_createServerFn_handler = createServerRpc({
	id: "0ce210377267bafe2dc752cbfde5b3672bc607fdaf328c57f0e53a96c4891a83",
	name: "getRepairNotesFn",
	filename: "src/lib/api/repairs.ts"
}, (opts) => getRepairNotesFn.__executeServer(opts));
var getRepairNotesFn = createServerFn({ method: "GET" }).validator((data) => objectType({ repair_id: stringType() }).parse(data)).handler(getRepairNotesFn_createServerFn_handler, async ({ data }) => {
	await requireAuth();
	return getStore().repairNotes.query((n) => n.repair_id === data.repair_id).sort((a, b) => b.created_at.localeCompare(a.created_at));
});
var createRepairNoteFn_createServerFn_handler = createServerRpc({
	id: "a5bde80fea0ad563d1a96ae22c3ad96a06facc3b0c7e1674994a254ae249ac49",
	name: "createRepairNoteFn",
	filename: "src/lib/api/repairs.ts"
}, (opts) => createRepairNoteFn.__executeServer(opts));
var createRepairNoteFn = createServerFn({ method: "POST" }).validator((data) => objectType({
	repair_id: stringType(),
	note: stringType(),
	technician_name: stringType().optional()
}).parse(data)).handler(createRepairNoteFn_createServerFn_handler, async ({ data }) => {
	await requireAuth();
	return { id: getStore().repairNotes.create({
		...data,
		task_done: false,
		created_at: (/* @__PURE__ */ new Date()).toISOString()
	}).id };
});
var updateRepairNoteFn_createServerFn_handler = createServerRpc({
	id: "fb02b42f564189bf6de1e8005d07af710a1f747cb4889ea0e2d60772ce29ff10",
	name: "updateRepairNoteFn",
	filename: "src/lib/api/repairs.ts"
}, (opts) => updateRepairNoteFn.__executeServer(opts));
var updateRepairNoteFn = createServerFn({ method: "POST" }).validator((data) => objectType({
	id: stringType(),
	data: anyType()
}).parse(data)).handler(updateRepairNoteFn_createServerFn_handler, async ({ data }) => {
	await requireAuth();
	getStore().repairNotes.update(data.id, data.data);
	return { success: true };
});
var getAppointmentEventsFn_createServerFn_handler = createServerRpc({
	id: "ad3b3995381504c4df0643b83e7002a31e8603eead71fc4275438afb52da5cdd",
	name: "getAppointmentEventsFn",
	filename: "src/lib/api/repairs.ts"
}, (opts) => getAppointmentEventsFn.__executeServer(opts));
var getAppointmentEventsFn = createServerFn({ method: "GET" }).validator((data) => objectType({ repair_id: stringType() }).parse(data)).handler(getAppointmentEventsFn_createServerFn_handler, async ({ data }) => {
	await requireAuth();
	return getStore().appointments.query((a) => a.repair_id === data.repair_id).sort((a, b) => b.created_at.localeCompare(a.created_at)).map((e) => ({
		id: e.id,
		action: e.title,
		previous_at: e.start_time,
		new_at: e.end_time,
		note: e.notes,
		created_at: e.created_at
	}));
});
var createAppointmentEventFn_createServerFn_handler = createServerRpc({
	id: "d86512ab3a280bf3e98d443a408e72c6b67537a998e0161a8e91942d91fa3dd0",
	name: "createAppointmentEventFn",
	filename: "src/lib/api/repairs.ts"
}, (opts) => createAppointmentEventFn.__executeServer(opts));
var createAppointmentEventFn = createServerFn({ method: "POST" }).validator((data) => objectType({
	repair_id: stringType(),
	action: stringType(),
	previous_at: stringType().nullable(),
	new_at: stringType().nullable()
}).parse(data)).handler(createAppointmentEventFn_createServerFn_handler, async ({ data }) => {
	const { session } = await requireAuth();
	return { id: getStore().appointments.create({
		repair_id: data.repair_id,
		title: data.action,
		start_time: data.previous_at || "",
		end_time: data.new_at || "",
		owner_id: session.userId,
		created_at: (/* @__PURE__ */ new Date()).toISOString()
	}).id };
});
var getWaLogsFn_createServerFn_handler = createServerRpc({
	id: "eed332641bf098de8c6d619794c865580b9ebc3d4bc956faf9bd00b840794081",
	name: "getWaLogsFn",
	filename: "src/lib/api/repairs.ts"
}, (opts) => getWaLogsFn.__executeServer(opts));
var getWaLogsFn = createServerFn({ method: "GET" }).validator((data) => objectType({ repair_id: stringType() }).parse(data)).handler(getWaLogsFn_createServerFn_handler, async ({ data }) => {
	await requireAuth();
	return getStore().waLogs.query((w) => w.repair_id === data.repair_id).sort((a, b) => b.created_at.localeCompare(a.created_at));
});
//#endregion
export { createAppointmentEventFn_createServerFn_handler, createRepairFn_createServerFn_handler, createRepairNoteFn_createServerFn_handler, deleteRepairFn_createServerFn_handler, getAppointmentEventsFn_createServerFn_handler, getRepairNotesFn_createServerFn_handler, getRepairsFn_createServerFn_handler, getWaLogsFn_createServerFn_handler, updateRepairFn_createServerFn_handler, updateRepairNoteFn_createServerFn_handler };
