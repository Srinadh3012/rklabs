import { createFileRoute, Outlet, Navigate } from "@tanstack/react-router";
import { useAuth } from "@/hooks/use-auth";
import { CustomerLayout } from "@/components/customer-layout";
import { Loader2 } from "lucide-react";

export const Route = createFileRoute("/customer")({
  ssr: false,
  component: CustomerGate,
});

function CustomerGate() {
  const { user, loading } = useAuth();
  
  if (loading) {
    return (
      <div className="grid min-h-screen place-items-center bg-[#020617]">
        <Loader2 className="h-6 w-6 animate-spin text-cyan-500" />
      </div>
    );
  }
  
  if (!user) {
    return <Navigate to="/auth" replace />;
  }

  // Basic RBAC check for UI level - actual protection is on the API
  if (user.role !== "customer" && user.role !== "admin") {
    return (
      <div className="grid min-h-screen place-items-center bg-[#020617] text-slate-200">
        <div className="text-center space-y-4">
          <h1 className="text-2xl font-bold text-red-400">Access Denied</h1>
          <p className="text-slate-400">You do not have access to the customer portal.</p>
          <a href="/dashboard" className="text-cyan-400 hover:underline">Go to Main Dashboard</a>
        </div>
      </div>
    );
  }

  return (
    <CustomerLayout>
      <Outlet />
    </CustomerLayout>
  );
}
