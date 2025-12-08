import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Currently no auth middleware applied; this keeps a no-op middleware
// to avoid TypeScript and Edge bundling errors.
export function middleware(_request: NextRequest) {
  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
