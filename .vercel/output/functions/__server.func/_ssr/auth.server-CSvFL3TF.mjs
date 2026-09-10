import { o as __toESM } from "../_runtime.mjs";
import { i as getCookie, r as deleteCookie$1, s as setCookie$1 } from "./server-De111qI3.mjs";
import { t as getStore } from "./store-Db5axDNg.mjs";
import { t as require_jsonwebtoken } from "../_libs/jsonwebtoken+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/auth.server-CSvFL3TF.js
var import_jsonwebtoken = /* @__PURE__ */ __toESM(require_jsonwebtoken());
var JWT_SECRET = process.env.JWT_SECRET || "fallback_secret_please_change_in_production";
var COOKIE_NAME = "auth_session";
async function createSession(payload) {
	const token = import_jsonwebtoken.default.sign(payload, JWT_SECRET, { expiresIn: "7d" });
	setCookie$1(COOKIE_NAME, token, {
		httpOnly: true,
		secure: true,
		sameSite: "lax",
		path: "/",
		maxAge: 604800
	});
}
function clearSession() {
	deleteCookie$1(COOKIE_NAME);
}
async function getSession() {
	const token = getCookie(COOKIE_NAME);
	if (!token) return null;
	try {
		return import_jsonwebtoken.default.verify(token, JWT_SECRET);
	} catch (error) {
		return null;
	}
}
async function requireAuth() {
	const session = await getSession();
	if (!session) throw new Error("Unauthorized");
	const user = getStore().profiles.getById(session.userId);
	if (!user) throw new Error("User not found");
	return {
		session,
		user
	};
}
//#endregion
export { requireAuth as i, createSession as n, getSession as r, clearSession as t };
