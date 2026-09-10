import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { getStore } from "@/services/database";
import { requireAuth } from "../auth.server";

export const getNotificationsFn = createServerFn({ method: "GET" }).handler(async () => {
  const { session } = await requireAuth();
  const store = getStore();

  const notifs = store.notifications
    .query((n) => n.user_id === session.userId)
    .sort((a, b) => b.created_at.localeCompare(a.created_at))
    .slice(0, 25);

  return notifs.map((n) => ({
    id: n.id,
    kind: n.kind,
    title: n.title,
    body: n.body,
    read_at: n.read_at || null,
    created_at: n.created_at,
  }));
});

export const markNotificationsReadFn = createServerFn({ method: "POST" })
  .validator((data) => z.array(z.string()).parse(data))
  .handler(async ({ data }) => {
    await requireAuth();
    const store = getStore();
    const now = new Date().toISOString();

    for (const id of data) {
      store.notifications.update(id, { read_at: now });
    }

    return { success: true };
  });
