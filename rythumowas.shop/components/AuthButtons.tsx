"use client";

import { UserButton, useUser } from "@stackframe/stack";
import Link from "next/link";

export function AuthButtons() {
    const user = useUser();

    if (user) {
        return <UserButton />;
    }

    return (
        <Link href="/handler/sign-in" className="px-4 py-2 text-green-700 hover:text-green-800">
            Sign In
        </Link>
    );
}
