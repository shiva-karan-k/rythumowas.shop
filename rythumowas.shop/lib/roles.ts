export type Role = "admin" | "farmer" | "customer";

const ADMIN_EMAILS = (process.env.NEXT_PUBLIC_ADMIN_EMAILS ?? "")
  .split(",")
  .map((e) => e.trim().toLowerCase())
  .filter(Boolean);

const STORAGE_KEY = "rm_active_role";

export function getRolesForUser(userEmail?: string | null): Role[] {
  if (!userEmail) {
    return ["customer"];
  }
  const isAdmin = ADMIN_EMAILS.includes(userEmail.toLowerCase());
  return isAdmin ? ["admin", "farmer", "customer"] : ["farmer", "customer"];
}

export function loadStoredRole(): Role | null {
  if (typeof window === "undefined") return null;
  const stored = window.localStorage.getItem(STORAGE_KEY);
  if (stored === "admin" || stored === "farmer" || stored === "customer") {
    return stored;
  }
  return null;
}

export function storeRole(role: Role) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(STORAGE_KEY, role);
}

