import { n as createServerFn } from "./server-De111qI3.mjs";
import { a as objectType, o as stringType } from "../_libs/zod.mjs";
import { t as createServerRpc } from "./createServerRpc-BBOL_uPN.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/ai.functions-IloZlJQa.js
var InputSchema = objectType({ text: stringType().min(1).max(2e3) });
var translateToEnglish_createServerFn_handler = createServerRpc({
	id: "2419784f4e39137736b6c58698b36b1aa6468ee5bb6d6790f626e323e18a3f64",
	name: "translateToEnglish",
	filename: "src/lib/ai.functions.ts"
}, (opts) => translateToEnglish.__executeServer(opts));
var translateToEnglish = createServerFn({ method: "POST" }).validator((data) => InputSchema.parse(data)).handler(translateToEnglish_createServerFn_handler, async ({ data }) => {
	const apiKey = process.env.AI_API_KEY;
	const apiUrl = process.env.AI_API_URL;
	if (!apiKey || !apiUrl) return { text: data.text };
	const res = await fetch(apiUrl, {
		method: "POST",
		headers: {
			"content-type": "application/json",
			authorization: `Bearer ${apiKey}`
		},
		body: JSON.stringify({
			model: process.env.AI_MODEL || "gpt-4o-mini",
			messages: [{
				role: "system",
				content: "You are a professional translator for a mobile & electronics repair shop in India. Translate the user's device issue description into clear, concise technical English. If it's already English, keep it but polish grammar. Return ONLY the translated text — no quotes, no prefix, no explanation."
			}, {
				role: "user",
				content: data.text
			}],
			temperature: .2
		})
	});
	if (!res.ok) {
		const body = await res.text().catch(() => "");
		throw new Error(`AI gateway ${res.status}: ${body.slice(0, 200)}`);
	}
	const out = (await res.json()).choices?.[0]?.message?.content?.trim();
	if (!out) throw new Error("Empty translation");
	return { text: out };
});
//#endregion
export { translateToEnglish_createServerFn_handler };
