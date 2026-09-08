import { useEffect, useState } from "react";
import { createFileRoute, useNavigate, Link, Navigate } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Wrench, Loader2, Clock, XCircle } from "lucide-react";
import { toast } from "sonner";

import { useAuth } from "@/hooks/use-auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { loginFn, registerFn } from "@/lib/api/auth";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/lib/firebase";

type StoredStatus = { email: string; status: "pending" | "rejected"; reason?: string; at: string };
const STATUS_KEY = "rk_signup_status";

export const Route = createFileRoute("/auth")({
  head: () => ({
    meta: [
      { title: "Sign in — RK Repair Labs" },
      { name: "description", content: "Sign in to the RK Repair Labs shop dashboard, or create a customer or employee account to get started." },
      { property: "og:title", content: "Sign in — RK Repair Labs" },
      { property: "og:description", content: "Access your RK Repair Labs shop dashboard, or request a customer or employee account." },
      { property: "og:url", content: "https://rklabs.syncailabs.in/auth" },
    ],
    links: [{ rel: "canonical", href: "https://rklabs.syncailabs.in/auth" }],
  }),
  component: AuthPage,
});

function AuthPage() {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const [busy, setBusy] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [requestedRole, setRequestedRole] = useState<"customer" | "employee">("customer");
  const [stored, setStored] = useState<StoredStatus | null>(null);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STATUS_KEY);
      if (raw) setStored(JSON.parse(raw));
    } catch {}
  }, []);

  if (!loading && user) return <Navigate to="/dashboard" replace />;

  function persistStatus(next: StoredStatus | null) {
    setStored(next);
    if (next) localStorage.setItem(STATUS_KEY, JSON.stringify(next));
    else localStorage.removeItem(STATUS_KEY);
  }

  async function checkApprovalAndRoute(status?: string, reason?: string) {
    if (status === "pending" || status === "rejected") {
      persistStatus({ email, status, reason, at: new Date().toISOString() });
      toast.error(
        status === "rejected"
          ? "Your account was not approved. Please contact the shop admin."
          : "Your account is pending admin approval. You'll be able to sign in once approved.",
      );
      return false;
    }
    persistStatus(null);
    return true;
  }

  async function signIn(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    try {
      // 1. Authenticate with Firebase
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const idToken = await userCredential.user.getIdToken();
      
      // 2. Establish server session
      const res = await loginFn({ data: { idToken } });
      setBusy(false);
      toast.success("Welcome back");
      window.location.href = "/dashboard";
    } catch (error: any) {
      setBusy(false);
      // Firebase throws errors with .code or .message
      const errorMsg = error.code ? error.code.replace('auth/', '').replace(/-/g, ' ') : (error.message || "Invalid credentials");
      return toast.error(errorMsg);
    }
  }

  async function signUp(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    try {
      // 1. Create account with Firebase
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const idToken = await userCredential.user.getIdToken();
      
      // 2. Sync profile to server and establish session
      const res = await registerFn({ data: { idToken, fullName, requestedRole } });
      setBusy(false);
      if (res.status === "approved") {
        persistStatus(null);
        toast.success("Shop admin account created");
        window.location.href = "/dashboard";
        return;
      }
      persistStatus({ email, status: "pending", at: new Date().toISOString() });
      toast.success("Account created — waiting for admin approval");
    } catch (error: any) {
      setBusy(false);
      const errorMsg = error.code ? error.code.replace('auth/', '').replace(/-/g, ' ') : (error.message || "Failed to create account");
      return toast.error(errorMsg);
    }
  }



  return (
    <div className="relative min-h-screen overflow-hidden">
      <div className="pointer-events-none absolute inset-0" style={{ background: "var(--gradient-glow)" }} />
      <main className="container relative mx-auto flex min-h-screen max-w-md flex-col justify-center px-6 py-12">
        <Link to="/" className="mb-8 flex items-center gap-2">
          <div className="grid h-9 w-9 place-items-center rounded-lg" style={{ background: "var(--gradient-primary)" }}>
            <Wrench className="h-5 w-5 text-background" />
          </div>
          <span className="text-lg font-bold">RK Labs</span>
        </Link>

        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="glass-strong rounded-2xl p-8 shadow-[var(--shadow-glow)]">
          <h1 className="text-2xl font-bold">Repair Management System</h1>
          <p className="mt-1 text-sm text-muted-foreground">Sign in to your shop dashboard.</p>

          {stored && (
            <div
              className={`mt-4 flex items-start gap-3 rounded-xl border p-3 text-sm ${
                stored.status === "pending"
                  ? "border-amber-500/30 bg-amber-500/10 text-amber-200"
                  : "border-red-500/30 bg-red-500/10 text-red-200"
              }`}
            >
              {stored.status === "pending" ? <Clock className="mt-0.5 h-4 w-4 shrink-0" /> : <XCircle className="mt-0.5 h-4 w-4 shrink-0" />}
              <div className="flex-1">
                <div className="font-medium">
                  {stored.status === "pending" ? "Pending admin approval" : "Signup rejected"}
                </div>
                <div className="mt-0.5 text-xs opacity-90">
                  {stored.email}
                  {stored.status === "rejected" && stored.reason ? ` · ${stored.reason}` : ""}
                </div>
              </div>
              <button
                type="button"
                onClick={() => persistStatus(null)}
                className="text-xs underline opacity-70 hover:opacity-100"
              >
                Dismiss
              </button>
            </div>
          )}


          <Tabs defaultValue="signin" className="mt-6">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="signin">Sign in</TabsTrigger>
              <TabsTrigger value="signup">Create account</TabsTrigger>
            </TabsList>

            <TabsContent value="signin">
              <form onSubmit={signIn} className="space-y-4 pt-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="pw">Password</Label>
                  <Input id="pw" type="password" required value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>
                <Button type="submit" disabled={busy} className="w-full" style={{ background: "var(--gradient-primary)", color: "oklch(0.12 0.02 250)" }}>
                  {busy && <Loader2 className="mr-2 h-4 w-4 animate-spin" />} Sign in
                </Button>
              </form>
            </TabsContent>

            <TabsContent value="signup">
              <form onSubmit={signUp} className="space-y-4 pt-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full name</Label>
                  <Input id="name" required value={fullName} onChange={(e) => setFullName(e.target.value)} />
                </div>
                <div className="space-y-2">
                  <Label>I am a</Label>
                  <div className="grid grid-cols-2 gap-2">
                    {(["customer", "employee"] as const).map((r) => (
                      <button
                        key={r}
                        type="button"
                        onClick={() => setRequestedRole(r)}
                        className={`rounded-lg border px-3 py-2 text-sm capitalize transition ${
                          requestedRole === r
                            ? "border-[var(--neon)]/60 bg-[var(--neon)]/10 text-[var(--neon)]"
                            : "border-white/10 bg-white/[0.02] text-muted-foreground hover:text-foreground"
                        }`}
                      >
                        {r}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email2">Email</Label>
                  <Input id="email2" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="pw2">Password</Label>
                  <Input id="pw2" type="password" required minLength={8} value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>
                <Button type="submit" disabled={busy} className="w-full" style={{ background: "var(--gradient-primary)", color: "oklch(0.12 0.02 250)" }}>
                  {busy && <Loader2 className="mr-2 h-4 w-4 animate-spin" />} Create account
                </Button>
                <p className="text-xs text-muted-foreground">
                  New accounts require admin approval before sign-in. The very first account created on this shop becomes the admin.
                </p>
              </form>
            </TabsContent>

          </Tabs>
        </motion.div>
      </main>
    </div>
  );
}
