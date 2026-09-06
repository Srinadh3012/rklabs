import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { Notification } from "../models";
import { requireAuth } from "../auth.server";

export const getNotificationsFn = createServerFn({ method: "GET" })
  .handler(async () => {
    const { session } = await requireAuth();
    
    const notifications = await Notification.find({ user_id: session.userId })
      .sort({ created_at: -1 })
      .limit(25);

    return notifications.map((n: any) => ({
      id: n._id.toString(),
      kind: n.kind,
      title: n.title,
      body: n.body,
      read_at: n.read_at?.toISOString() || null,
      created_at: n.created_at.toISOString(),
    }));
  });

export const markNotificationsReadFn = createServerFn({ method: "POST" })
  .validator((data) => z.array(z.string()).parse(data))
  .handler(async ({ data }) => {
    const { session } = await requireAuth();
    
    await Notification.updateMany(
      { _id: { $in: data }, user_id: session.userId },
      { $set: { read_at: new Date() } }
    );
    
    return { success: true };
  });
