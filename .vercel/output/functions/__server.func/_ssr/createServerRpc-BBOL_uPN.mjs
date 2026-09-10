import { t as TSS_SERVER_FUNCTION } from "./server-De111qI3.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/createServerRpc-BBOL_uPN.js
var createServerRpc = (serverFnMeta, splitImportFn) => {
	const url = "/_serverFn/" + serverFnMeta.id;
	return Object.assign(splitImportFn, {
		url,
		serverFnMeta,
		[TSS_SERVER_FUNCTION]: true
	});
};
//#endregion
export { createServerRpc as t };
