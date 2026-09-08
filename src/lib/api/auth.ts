import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { collection, doc, getDoc, getDocs, setDoc, query, where, getCountFromServer } from "firebase/firestore";
import { db } from "../firebase";
import { createSession, clearSession, getSession } from "../auth.server";

const loginSchema = z.object({
  idToken: z.string(),
});

const registerSchema = z.object({
  idToken: z.string(),
  fullName: z.string().min(2),
  requestedRole: z.enum(["customer", "employee", "admin"]).default("customer"),
});

async function verifyFirebaseToken(idToken: string) {
  const apiKey = process.env.VITE_FIREBASE_API_KEY || "";
  const res = await fetch(`https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=${apiKey}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ idToken })
  });
  const data = await res.json();
  if (data.error) throw new Error(data.error.message || "Invalid Firebase Token");
  return data.users[0]; // { localId, email }
}

export const loginFn = createServerFn({ method: "POST" })
  .validator((data) => loginSchema.parse(data))
  .handler(async ({ data }) => {
    const firebaseUser = await verifyFirebaseToken(data.idToken);
    
    // Find profile by email
    const q = query(collection(db, "profiles"), where("email", "==", firebaseUser.email));
    const snap = await getDocs(q);
    
    if (snap.empty) {
      throw new Error("User profile not found in database. Please register first.");
    }

    const userDoc = snap.docs[0];
    const user = userDoc.data();

    await createSession({
      userId: userDoc.id,
      email: user.email,
      role: user.role || "user",
    });

    return { success: true, user: { id: userDoc.id, email: user.email, role: user.role } };
  });

export const registerFn = createServerFn({ method: "POST" })
  .validator((data) => registerSchema.parse(data))
  .handler(async ({ data }) => {
    const firebaseUser = await verifyFirebaseToken(data.idToken);
    
    // Check for existing profile
    const q = query(collection(db, "profiles"), where("email", "==", firebaseUser.email));
    const existing = await getDocs(q);
    if (!existing.empty) {
      throw new Error("Email already registered in database");
    }

    // First user becomes admin
    const countSnap = await getCountFromServer(collection(db, "profiles"));
    const isFirstUser = countSnap.data().count === 0;
    const role = isFirstUser ? "admin" : "user";

    // Use Firebase Auth UID as the document ID
    const profileData = {
      email: firebaseUser.email,
      full_name: data.fullName,
      requested_role: data.requestedRole,
      approval_status: isFirstUser ? "approved" : "pending",
      role,
      created_at: new Date().toISOString(),
    };

    await setDoc(doc(db, "profiles", firebaseUser.localId), profileData);

    if (isFirstUser) {
      await createSession({
        userId: firebaseUser.localId,
        email: firebaseUser.email,
        role,
      });
      return { success: true, status: "approved" };
    } else {
      return { success: true, status: "pending" };
    }
  });

export const logoutFn = createServerFn({ method: "POST" })
  .handler(async () => {
    clearSession();
    return { success: true };
  });

export const meFn = createServerFn({ method: "GET" })
  .handler(async () => {
    const session = await getSession();
    if (!session) return { user: null };

    const userSnap = await getDoc(doc(db, "profiles", session.userId));
    if (!userSnap.exists()) return { user: null };

    const user = userSnap.data();
    return { user: { 
      id: userSnap.id, 
      email: user.email, 
      role: user.role, 
      approval_status: user.approval_status, 
      requested_role: user.requested_role, 
      approved_at: user.approved_at, 
      rejection_reason: user.rejection_reason,
      shop_name: user.shop_name,
      shop_address: user.shop_address,
      shop_phone: user.shop_phone,
      shop_logo: user.shop_logo,
      gst_number: user.gst_number,
      wa_templates: user.wa_templates,
    } };
  });
