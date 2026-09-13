import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../lib/firebase";
import { syncUserFn } from "../lib/api/auth";

export interface User {
  id: string;
  email: string;
  role: string;
  approval_status?: string;
}

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser && firebaseUser.email) {
        try {
          // Sync with our backend to get the role
          const res = await syncUserFn({ data: { email: firebaseUser.email, uid: firebaseUser.uid } });
          setUser(res.user as User);
        } catch (e) {
          setUser({ id: firebaseUser.uid, email: firebaseUser.email, role: "user" });
        }
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return { session: user ? { user } : null, user, loading };
}
