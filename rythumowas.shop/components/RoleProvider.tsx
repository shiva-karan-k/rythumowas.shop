"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { useUser } from "@stackframe/stack";
import { getRolesForUser, loadStoredRole, Role, storeRole } from "@/lib/roles";

type RoleContextValue = {
  activeRole: Role | null;
  roles: Role[];
  setActiveRole: (role: Role) => void;
};

const RoleContext = createContext<RoleContextValue | undefined>(undefined);

export function RoleProvider({ children }: { children: React.ReactNode }) {
  const user = useUser();
  const roles = useMemo(
    () => getRolesForUser(user?.primaryEmail),
    [user?.primaryEmail]
  );
  const [activeRole, setActiveRoleState] = useState<Role | null>(null);

  useEffect(() => {
    if (!user) {
      setActiveRoleState(null);
      return;
    }
    const stored = loadStoredRole();
    const initial = stored && roles.includes(stored) ? stored : roles[0];
    setActiveRoleState(initial);
    storeRole(initial);
  }, [user, roles]);

  const setActiveRole = (role: Role) => {
    if (!roles.includes(role)) return;
    setActiveRoleState(role);
    storeRole(role);
  };

  return (
    <RoleContext.Provider value={{ activeRole, roles, setActiveRole }}>
      {children}
    </RoleContext.Provider>
  );
}

export function useRole() {
  const ctx = useContext(RoleContext);
  if (!ctx) {
    throw new Error("useRole must be used within RoleProvider");
  }
  return ctx;
}

