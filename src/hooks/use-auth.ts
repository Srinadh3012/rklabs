import { useEffect, useState } from "react";
import { meFn } from "../lib/api/auth";

export interface User {
  id: string;
  email: string;
  role: string;
}

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    meFn().then(({ user }) => {
      setUser(user);
      setLoading(false);
    }).catch(() => {
      setUser(null);
      setLoading(false);
    });
  }, []);

  return { session: user ? { user } : null, user, loading };
}
