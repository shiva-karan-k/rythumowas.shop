"use client";

import { useEffect, useState } from "react";
import { useRole } from "./RoleProvider";
import { useUser } from "@stackframe/stack";

export function RoleSwitcher() {
  const { activeRole, roles, setActiveRole } = useRole();
  const user = useUser();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setReady(true);
  }, []);

  if (!user || !ready || roles.length <= 1 || !activeRole) {
    return null;
  }

  return (
    <div className="flex items-center gap-2 text-sm">
      <span className="text-gray-600">Role:</span>
      <select
        value={activeRole}
        onChange={(e) => setActiveRole(e.target.value as any)}
        className="border rounded px-2 py-1 text-sm"
      >
        {roles.map((r) => (
          <option key={r} value={r}>
            {r}
          </option>
        ))}
      </select>
    </div>
  );
}

