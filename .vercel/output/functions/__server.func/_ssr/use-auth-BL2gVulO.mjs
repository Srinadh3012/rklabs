import { o as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { r as meFn } from "./auth-BcHM1GNH.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/use-auth-BL2gVulO.js
var import_react = /* @__PURE__ */ __toESM(require_react());
function useAuth() {
	const [user, setUser] = (0, import_react.useState)(null);
	const [loading, setLoading] = (0, import_react.useState)(true);
	(0, import_react.useEffect)(() => {
		meFn().then(({ user }) => {
			setUser(user);
			setLoading(false);
		}).catch(() => {
			setUser(null);
			setLoading(false);
		});
	}, []);
	return {
		session: user ? { user } : null,
		user,
		loading
	};
}
//#endregion
export { useAuth as t };
