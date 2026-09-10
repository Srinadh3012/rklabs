// =============================
// Database Service — Entry Point
// =============================
// Currently returns the in-memory mock store.
// When you choose a database provider, replace this with the real implementation.

export { getStore } from "./mock/store";
export type { MockStore, Collection } from "./mock/store";
