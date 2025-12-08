"use client";

import Link from "next/link";
import { useRole } from "./RoleProvider";

export function NavLinks() {
  const { activeRole } = useRole();

  return (
    <div className="flex items-center gap-4">
      <Link href="/shop" className="px-4 py-2 text-green-700 hover:text-green-800">
        Shop
      </Link>
      {activeRole === "farmer" && (
        <Link href="/farmer/dashboard" className="px-4 py-2 text-green-700 hover:text-green-800">
          Farmer
        </Link>
      )}
      {activeRole === "admin" && (
        <Link href="/admin" className="px-4 py-2 text-green-700 hover:text-green-800">
          Admin
        </Link>
      )}
    </div>
  );
}

