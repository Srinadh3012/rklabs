import { n as createServerFn } from "./server-De111qI3.mjs";
import { t as createSsrRpc } from "./createSsrRpc-CtdFS2cZ.mjs";
import { t as anyType } from "../_libs/zod.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/settings-RVr-3c2S.js
var getProfileFn = createServerFn({ method: "GET" }).handler(createSsrRpc("0afe6e96d120b8996364a39bb5bf6917b418569b57b958f5dc4491de671063cd"));
var updateProfileFn = createServerFn({ method: "POST" }).validator((data) => anyType().parse(data)).handler(createSsrRpc("b828dcea50362ae6467e1ea1b1024c6d6ebbf10ce3d609052e85ac045777636f"));
//#endregion
export { updateProfileFn as n, getProfileFn as t };
