import { n as createServerFn } from "./server-De111qI3.mjs";
import { t as anyType } from "../_libs/zod.mjs";
import { t as createServerRpc } from "./createServerRpc-BBOL_uPN.mjs";
import { t as getStore } from "./store-Db5axDNg.mjs";
import { i as requireAuth } from "./auth.server-CSvFL3TF.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/settings-Y7RiQlCh.js
var getProfileFn_createServerFn_handler = createServerRpc({
	id: "0afe6e96d120b8996364a39bb5bf6917b418569b57b958f5dc4491de671063cd",
	name: "getProfileFn",
	filename: "src/lib/api/settings.ts"
}, (opts) => getProfileFn.__executeServer(opts));
var getProfileFn = createServerFn({ method: "GET" }).handler(getProfileFn_createServerFn_handler, async () => {
	const { session } = await requireAuth();
	const profile = getStore().profiles.getById(session.userId);
	if (!profile) throw new Error("Profile not found");
	return {
		id: profile.id,
		email: profile.email,
		full_name: profile.full_name,
		role: profile.role,
		requested_role: profile.requested_role,
		approval_status: profile.approval_status,
		approved_at: profile.approved_at,
		shop_name: profile.shop_name,
		shop_address: profile.shop_address,
		shop_phone: profile.shop_phone,
		shop_logo: profile.shop_logo,
		gst_number: profile.gst_number,
		gst_percent: profile.gst_percent,
		wa_templates: profile.wa_templates,
		auto_reminders: profile.auto_reminders
	};
});
var updateProfileFn_createServerFn_handler = createServerRpc({
	id: "b828dcea50362ae6467e1ea1b1024c6d6ebbf10ce3d609052e85ac045777636f",
	name: "updateProfileFn",
	filename: "src/lib/api/settings.ts"
}, (opts) => updateProfileFn.__executeServer(opts));
var updateProfileFn = createServerFn({ method: "POST" }).validator((data) => anyType().parse(data)).handler(updateProfileFn_createServerFn_handler, async ({ data }) => {
	const { session } = await requireAuth();
	getStore().profiles.update(session.userId, data);
	return { success: true };
});
//#endregion
export { getProfileFn_createServerFn_handler, updateProfileFn_createServerFn_handler };
