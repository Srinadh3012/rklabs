import { getCookie, setCookie, deleteCookie } from "@tanstack/react-start/server";
import jwt from "jsonwebtoken";
import { doc, getDoc } from "firebase/firestore";
import { db } from "./firebase";

const JWT_SECRET = process.env.JWT_SECRET || "fallback_secret_please_change_in_production";
const COOKIE_NAME = "auth_session";

export interface SessionPayload {
  userId: string;
  email: string;
  role: string;
}

export async function createSession(payload: SessionPayload) {
  const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "7d" });
  setCookie(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7, // 7 days
  });
}

export function clearSession() {
  deleteCookie(COOKIE_NAME);
}

export async function getSession(): Promise<SessionPayload | null> {
  const token = getCookie(COOKIE_NAME);
  if (!token) return null;

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as SessionPayload;
    return decoded;
  } catch (error) {
    return null;
  }
}

export async function requireAuth() {
  const session = await getSession();
  if (!session) {
    throw new Error("Unauthorized");
  }
  
  const userSnap = await getDoc(doc(db, "profiles", session.userId));
  if (!userSnap.exists()) {
    throw new Error("User not found");
  }
  
  return { session, user: { id: userSnap.id, ...userSnap.data() } };
}
