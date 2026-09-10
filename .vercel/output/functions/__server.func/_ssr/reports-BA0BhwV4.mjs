import { n as createServerFn } from "./server-De111qI3.mjs";
import { t as createSsrRpc } from "./createSsrRpc-CtdFS2cZ.mjs";
import { a as objectType, i as numberType, o as stringType } from "../_libs/zod.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/reports-BA0BhwV4.js
var getPnlDataFn = createServerFn({ method: "POST" }).validator((data) => objectType({
	from: stringType(),
	to: stringType()
}).parse(data)).handler(createSsrRpc("2cc51368a2ec11c45e2a641feb18fe49cdafa226f21aa2b155dc77a7827fb36c"));
var createExpenseFn = createServerFn({ method: "POST" }).validator((data) => objectType({
	category: stringType(),
	description: stringType().nullable().optional(),
	amount: numberType(),
	expense_date: stringType()
}).parse(data)).handler(createSsrRpc("c76ba0c3191eb9b47ea84d69b55d87a1c4dcec734c7275e9c3c9076fe69058ff"));
var deleteExpenseFn = createServerFn({ method: "POST" }).validator((id) => stringType().parse(id)).handler(createSsrRpc("f2b404b245ce544567bb0c1db4c7d4c76233c2c66d7e651e29172c5d0989740c"));
var getReportsDataFn = createServerFn({ method: "POST" }).validator((data) => objectType({ from: stringType() }).parse(data)).handler(createSsrRpc("ce582482b532f40fd4e98207336e9e5e3659223f291fe7203c82b5bf09f9ebce"));
//#endregion
export { getReportsDataFn as i, deleteExpenseFn as n, getPnlDataFn as r, createExpenseFn as t };
