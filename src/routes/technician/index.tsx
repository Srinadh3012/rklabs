import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/technician/")({
  beforeLoad: () => {
    throw redirect({
      to: "/technician/dashboard",
    });
  },
});
