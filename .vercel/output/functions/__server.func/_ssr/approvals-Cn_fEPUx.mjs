import { n as createServerFn } from "./server-De111qI3.mjs";
import { a as objectType, o as stringType, r as enumType } from "../_libs/zod.mjs";
import { t as createServerRpc } from "./createServerRpc-BBOL_uPN.mjs";
import { t as getStore } from "./store-Db5axDNg.mjs";
import { i as requireAuth } from "./auth.server-CSvFL3TF.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/approvals-Cn_fEPUx.js
var getApprovalsFn_createServerFn_handler = createServerRpc({
	id: "725209e8770b575be5fb29edb5c9df2ad795060be8abade2b786f144b5c9d3c5",
	name: "getApprovalsFn",
	filename: "src/lib/api/approvals.ts"
}, (opts) => getApprovalsFn.__executeServer(opts));
var getApprovalsFn = createServerFn({ method: "GET" }).handler(getApprovalsFn_createServerFn_handler, async () => {
	const { session, user } = await requireAuth();
	if (user.role !== "admin") throw new Error("Unauthorized: Admins only");
	return getStore().profiles.list().sort((a, b) => b.created_at.localeCompare(a.created_at)).map((p) => ({
		id: p.id,
		full_name: p.full_name,
		requested_role: p.requested_role,
		approval_status: p.approval_status || "pending",
		created_at: p.created_at,
		approved_at: p.approved_at,
		rejection_reason: p.rejection_reason,
		role: p.role
	}));
});
var decideApprovalFn_createServerFn_handler = createServerRpc({
	id: "8fd37b624adf198fc97b4324cd58a7464b3a8e3c9659ea70ccf1d070e9e95205",
	name: "decideApprovalFn",
	filename: "src/lib/api/approvals.ts"
}, (opts) => decideApprovalFn.__executeServer(opts));
var decideApprovalFn = createServerFn({ method: "POST" }).validator((data) => objectType({
	id: stringType(),
	decision: enumType(["approved", "rejected"]),
	role: stringType().optional(),
	reason: stringType().optional()
}).parse(data)).handler(decideApprovalFn_createServerFn_handler, async ({ data }) => {
	const { session, user } = await requireAuth();
	if (user.role !== "admin") throw new Error("Unauthorized: Admins only");
	const store = getStore();
	const updateData = {
		approval_status: data.decision,
		approved_by: session.userId
	};
	if (data.decision === "approved") {
		updateData.approved_at = (/* @__PURE__ */ new Date()).toISOString();
		if (data.role) updateData.role = data.role;
	} else updateData.rejection_reason = data.reason || null;
	store.profiles.update(data.id, updateData);
	const now = (/* @__PURE__ */ new Date()).toISOString();
	store.notifications.create({
		user_id: data.id,
		kind: data.decision === "approved" ? "approval_approved" : "approval_rejected",
		title: data.decision === "approved" ? "Your account was approved" : "Your account was not approved",
		body: data.decision === "approved" ? `Welcome to RK Repair Labs. You've been granted the ${data.role} role.` : data.reason ?? "Please contact the shop admin for details.",
		created_at: now
	});
	store.notifications.create({
		user_id: session.userId,
		kind: data.decision === "approved" ? "approval_approved_admin" : "approval_rejected_admin",
		title: data.decision === "approved" ? `User approved as ${data.role}` : `User was rejected`,
		body: data.decision === "rejected" && data.reason ? data.reason : null,
		created_at: now
	});
	return { success: true };
});
var changeRoleFn_createServerFn_handler = createServerRpc({
	id: "9781e8eaa83a4002270af1b13e0b25c9f246042d75af05c8e3471aa374e957fe",
	name: "changeRoleFn",
	filename: "src/lib/api/approvals.ts"
}, (opts) => changeRoleFn.__executeServer(opts));
var changeRoleFn = createServerFn({ method: "POST" }).validator((data) => objectType({
	id: stringType(),
	role: stringType()
}).parse(data)).handler(changeRoleFn_createServerFn_handler, async ({ data }) => {
	const { session, user } = await requireAuth();
	if (user.role !== "admin") throw new Error("Unauthorized: Admins only");
	const store = getStore();
	store.profiles.update(data.id, { role: data.role });
	store.notifications.create({
		user_id: data.id,
		kind: "role_changed",
		title: "Your role was updated",
		body: `An admin set your role to ${data.role}.`,
		created_at: (/* @__PURE__ */ new Date()).toISOString()
	});
	return { success: true };
});
//#endregion
export { changeRoleFn_createServerFn_handler, decideApprovalFn_createServerFn_handler, getApprovalsFn_createServerFn_handler };
