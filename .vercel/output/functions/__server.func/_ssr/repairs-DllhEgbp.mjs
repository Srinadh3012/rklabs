import { n as createServerFn } from "./server-De111qI3.mjs";
import { t as createSsrRpc } from "./createSsrRpc-CtdFS2cZ.mjs";
import { a as objectType, i as numberType, o as stringType, t as anyType } from "../_libs/zod.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/repairs-DllhEgbp.js
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
var getRepairsFn = createServerFn({ method: "GET" }).handler(createSsrRpc("9ba20e9dda33eae350a621448448e271f6f3738c0f1b0e724b19dccecfe7c834"));
var createRepairFn = createServerFn({ method: "POST" }).validator((data) => repairSchema.parse(data)).handler(createSsrRpc("d6132b538d29d6241266ca4c38ae009467cceaa5b4e1522a0f9aa925261d96aa"));
var updateRepairFn = createServerFn({ method: "POST" }).validator((data) => objectType({
	id: stringType(),
	data: repairSchema.partial()
}).parse(data)).handler(createSsrRpc("aaf4a1e7c1c2ec51cd2faf2d16aeb6ec636ded91e69d42bd27bfa2ab9886e657"));
var deleteRepairFn = createServerFn({ method: "POST" }).validator((id) => stringType().parse(id)).handler(createSsrRpc("ed9e3d230434f7dfb2e90c31b0d7d14b97fd65ac925937c1b1f86f9201726ea7"));
var getRepairNotesFn = createServerFn({ method: "GET" }).validator((data) => objectType({ repair_id: stringType() }).parse(data)).handler(createSsrRpc("0ce210377267bafe2dc752cbfde5b3672bc607fdaf328c57f0e53a96c4891a83"));
var createRepairNoteFn = createServerFn({ method: "POST" }).validator((data) => objectType({
	repair_id: stringType(),
	note: stringType(),
	technician_name: stringType().optional()
}).parse(data)).handler(createSsrRpc("a5bde80fea0ad563d1a96ae22c3ad96a06facc3b0c7e1674994a254ae249ac49"));
var updateRepairNoteFn = createServerFn({ method: "POST" }).validator((data) => objectType({
	id: stringType(),
	data: anyType()
}).parse(data)).handler(createSsrRpc("fb02b42f564189bf6de1e8005d07af710a1f747cb4889ea0e2d60772ce29ff10"));
var getAppointmentEventsFn = createServerFn({ method: "GET" }).validator((data) => objectType({ repair_id: stringType() }).parse(data)).handler(createSsrRpc("ad3b3995381504c4df0643b83e7002a31e8603eead71fc4275438afb52da5cdd"));
var createAppointmentEventFn = createServerFn({ method: "POST" }).validator((data) => objectType({
	repair_id: stringType(),
	action: stringType(),
	previous_at: stringType().nullable(),
	new_at: stringType().nullable()
}).parse(data)).handler(createSsrRpc("d86512ab3a280bf3e98d443a408e72c6b67537a998e0161a8e91942d91fa3dd0"));
var getWaLogsFn = createServerFn({ method: "GET" }).validator((data) => objectType({ repair_id: stringType() }).parse(data)).handler(createSsrRpc("eed332641bf098de8c6d619794c865580b9ebc3d4bc956faf9bd00b840794081"));
//#endregion
export { getAppointmentEventsFn as a, getWaLogsFn as c, deleteRepairFn as i, updateRepairFn as l, createRepairFn as n, getRepairNotesFn as o, createRepairNoteFn as r, getRepairsFn as s, createAppointmentEventFn as t, updateRepairNoteFn as u };
