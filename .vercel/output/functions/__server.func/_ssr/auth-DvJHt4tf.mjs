import { n as createServerFn } from "./server-De111qI3.mjs";
import { a as objectType, o as stringType, r as enumType } from "../_libs/zod.mjs";
import { t as createServerRpc } from "./createServerRpc-BBOL_uPN.mjs";
import { t as getStore } from "./store-Db5axDNg.mjs";
import { n as createSession, r as getSession, t as clearSession } from "./auth.server-CSvFL3TF.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/auth-DvJHt4tf.js
var loginSchema = objectType({
	email: stringType().email(),
	password: stringType().min(1)
});
var registerSchema = objectType({
	email: stringType().email(),
	password: stringType().min(8),
	fullName: stringType().min(2),
	requestedRole: enumType([
		"customer",
		"employee",
		"admin"
	]).default("customer")
});
var loginFn_createServerFn_handler = createServerRpc({
	id: "49e81d250cc00a4875d77f85bf80aea36511c3d9997dda31f596ff7f9f830340",
	name: "loginFn",
	filename: "src/lib/api/auth.ts"
}, (opts) => loginFn.__executeServer(opts));
var loginFn = createServerFn({ method: "POST" }).validator((data) => loginSchema.parse(data)).handler(loginFn_createServerFn_handler, async ({ data }) => {
	const profiles = getStore().profiles.query((p) => p.email === data.email);
	if (profiles.length === 0) throw new Error("User profile not found. Please register first.");
	const user = profiles[0];
	if (data.password !== "Password123!" && true) throw new Error("Invalid credentials");
	if (user.approval_status !== "approved") throw new Error(user.approval_status === "pending" ? "Your account is pending admin approval." : "Your account was not approved. Please contact the shop admin.");
	await createSession({
		userId: user.id,
		email: user.email,
		role: user.role || "user"
	});
	return {
		success: true,
		user: {
			id: user.id,
			email: user.email,
			role: user.role
		}
	};
});
var registerFn_createServerFn_handler = createServerRpc({
	id: "2af02125f768d82e18801f68744ff7506f6f8ff3f8eb1fa50085baf214e1b6bd",
	name: "registerFn",
	filename: "src/lib/api/auth.ts"
}, (opts) => registerFn.__executeServer(opts));
var registerFn = createServerFn({ method: "POST" }).validator((data) => registerSchema.parse(data)).handler(registerFn_createServerFn_handler, async ({ data }) => {
	const store = getStore();
	if (store.profiles.query((p) => p.email === data.email).length > 0) throw new Error("Email already registered");
	const isFirstUser = store.profiles.count() === 0;
	const role = isFirstUser ? "admin" : "user";
	const profile = store.profiles.create({
		email: data.email,
		full_name: data.fullName,
		requested_role: data.requestedRole,
		approval_status: isFirstUser ? "approved" : "pending",
		role,
		created_at: (/* @__PURE__ */ new Date()).toISOString()
	});
	if (isFirstUser) {
		await createSession({
			userId: profile.id,
			email: profile.email,
			role
		});
		return {
			success: true,
			status: "approved"
		};
	} else return {
		success: true,
		status: "pending"
	};
});
var logoutFn_createServerFn_handler = createServerRpc({
	id: "83ce0b4df7d11026640aba583cb21ea47d37e14be0e421e5cb2b96643e6aca4c",
	name: "logoutFn",
	filename: "src/lib/api/auth.ts"
}, (opts) => logoutFn.__executeServer(opts));
var logoutFn = createServerFn({ method: "POST" }).handler(logoutFn_createServerFn_handler, async () => {
	clearSession();
	return { success: true };
});
var meFn_createServerFn_handler = createServerRpc({
	id: "57a86541bf624e4bdd259db478e0bbd80035c74b8246c0452d36f03bf0e98a85",
	name: "meFn",
	filename: "src/lib/api/auth.ts"
}, (opts) => meFn.__executeServer(opts));
var meFn = createServerFn({ method: "GET" }).handler(meFn_createServerFn_handler, async () => {
	const session = await getSession();
	if (!session) return { user: null };
	const user = getStore().profiles.getById(session.userId);
	if (!user) return { user: null };
	return { user: {
		id: user.id,
		email: user.email,
		role: user.role,
		approval_status: user.approval_status,
		requested_role: user.requested_role,
		approved_at: user.approved_at,
		rejection_reason: user.rejection_reason,
		shop_name: user.shop_name,
		shop_address: user.shop_address,
		shop_phone: user.shop_phone,
		shop_logo: user.shop_logo,
		gst_number: user.gst_number,
		wa_templates: user.wa_templates
	} };
});
//#endregion
export { loginFn_createServerFn_handler, logoutFn_createServerFn_handler, meFn_createServerFn_handler, registerFn_createServerFn_handler };
