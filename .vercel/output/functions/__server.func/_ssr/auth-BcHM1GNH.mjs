import { n as createServerFn } from "./server-De111qI3.mjs";
import { t as createSsrRpc } from "./createSsrRpc-CtdFS2cZ.mjs";
import { a as objectType, o as stringType, r as enumType } from "../_libs/zod.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/auth-BcHM1GNH.js
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
var loginFn = createServerFn({ method: "POST" }).validator((data) => loginSchema.parse(data)).handler(createSsrRpc("49e81d250cc00a4875d77f85bf80aea36511c3d9997dda31f596ff7f9f830340"));
var registerFn = createServerFn({ method: "POST" }).validator((data) => registerSchema.parse(data)).handler(createSsrRpc("2af02125f768d82e18801f68744ff7506f6f8ff3f8eb1fa50085baf214e1b6bd"));
var logoutFn = createServerFn({ method: "POST" }).handler(createSsrRpc("83ce0b4df7d11026640aba583cb21ea47d37e14be0e421e5cb2b96643e6aca4c"));
var meFn = createServerFn({ method: "GET" }).handler(createSsrRpc("57a86541bf624e4bdd259db478e0bbd80035c74b8246c0452d36f03bf0e98a85"));
//#endregion
export { registerFn as i, logoutFn as n, meFn as r, loginFn as t };
