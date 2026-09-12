import { createFileRoute } from "@tanstack/react-router";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { Check, X, Shield, Clock } from "lucide-react";

import { getApprovalsFn, decideApprovalFn, changeRoleFn } from "@/lib/api/approvals";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export const Route = createFileRoute("/approvals")({
  head: () => ({ meta: [{ title: "Approvals — RK Labs" }] }),
  component: ApprovalsPage,
});

function ApprovalsPage() {
  const qc = useQueryClient();
  const { data: users = [], isLoading } = useQuery({
    queryKey: ["approvals"],
    queryFn: async () => {
      const data = await getApprovalsFn();
      return data as any[];
    },
  });

  const decide = useMutation({
    mutationFn: async ({ id, decision, role, reason }: { id: string, decision: "approved" | "rejected", role?: string, reason?: string }) => {
      await decideApprovalFn({ data: { id, decision, role, reason } });
    },
    onSuccess: () => {
      toast.success("Saved decision");
      qc.invalidateQueries({ queryKey: ["approvals"] });
    },
    onError: (e: any) => toast.error(e.message),
  });

  const pending = users.filter((u) => u.approval_status === "pending" || !u.approval_status);
  const others = users.filter((u) => u.approval_status !== "pending" && u.approval_status);

  return (
    <div className="mx-auto max-w-7xl space-y-8">
      <header className="border-b border-white/10 pb-6">
        <h1 className="text-3xl font-bold tracking-tight">Access Approvals</h1>
        <p className="mt-1.5 text-sm text-slate-400">Manage user access and roles</p>
      </header>

      {/* Pending Approvals */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold flex items-center gap-2">
          <Clock className="h-5 w-5 text-amber-400" />
          Pending Requests ({pending.length})
        </h2>
        
        {isLoading ? (
          <div className="text-slate-500 py-8">Loading...</div>
        ) : pending.length === 0 ? (
          <div className="rounded-2xl border border-white/10 bg-[#0f172a]/80 backdrop-blur-xl p-8 text-center text-slate-400 shadow-lg">
            No pending approval requests.
          </div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {pending.map((u) => (
              <div key={u.id} className="rounded-xl border border-white/10 bg-black/20 p-5 space-y-4">
                <div>
                  <h3 className="font-medium text-lg">{u.full_name || "Unknown User"}</h3>
                  <p className="text-sm text-slate-400">Requested: <span className="text-cyan-400">{u.requested_role || "customer"}</span></p>
                </div>
                
                <div className="flex gap-2">
                  <Button 
                    className="flex-1 bg-emerald-500/20 text-emerald-400 hover:bg-emerald-500/30 hover:text-emerald-300"
                    onClick={() => decide.mutate({ id: u.id, decision: "approved", role: u.requested_role || "customer" })}
                    disabled={decide.isPending}
                  >
                    <Check className="w-4 h-4 mr-2" /> Approve
                  </Button>
                  <Button 
                    variant="outline"
                    className="flex-1 border-red-500/20 text-red-400 hover:bg-red-500/10 hover:text-red-300"
                    onClick={() => {
                      const reason = prompt("Reason for rejection:");
                      if (reason !== null) {
                        decide.mutate({ id: u.id, decision: "rejected", reason });
                      }
                    }}
                    disabled={decide.isPending}
                  >
                    <X className="w-4 h-4 mr-2" /> Reject
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Existing Users */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold flex items-center gap-2">
          <Shield className="h-5 w-5 text-cyan-400" />
          System Users
        </h2>
        
        <div className="rounded-2xl border border-white/10 bg-[#0f172a]/80 backdrop-blur-xl p-4 shadow-lg">
          <div className="overflow-x-auto custom-scrollbar">
            <table className="w-full text-sm whitespace-nowrap">
              <thead className="bg-slate-900/50 text-xs uppercase tracking-wider text-slate-400">
                <tr>
                  <th className="px-4 py-3 text-left rounded-tl-lg">User</th>
                  <th className="px-4 py-3 text-left">Status</th>
                  <th className="px-4 py-3 text-left">Role</th>
                </tr>
              </thead>
              <tbody>
                {!isLoading && others.length === 0 && (
                  <tr>
                    <td colSpan={3} className="px-4 py-8 text-center text-slate-500">
                      No users found.
                    </td>
                  </tr>
                )}
                {others.map((u) => (
                  <tr key={u.id} className="border-b border-white/5">
                    <td className="px-4 py-3 font-medium text-slate-200">
                      {u.full_name || "Unknown"}
                    </td>
                    <td className="px-4 py-3">
                      <Badge
                        variant="outline"
                        className={
                          u.approval_status === "approved"
                            ? "border-emerald-500/40 text-emerald-400 bg-emerald-500/10"
                            : "border-red-500/40 text-red-400 bg-red-500/10"
                        }
                      >
                        {u.approval_status}
                      </Badge>
                    </td>
                    <td className="px-4 py-3 text-slate-400">
                      <span className="capitalize">{u.role || u.requested_role || "none"}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </div>
  );
}
