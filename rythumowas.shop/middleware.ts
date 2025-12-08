import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Middleware disabled for now to avoid edge errors; keep no-op.
export function middleware(_request: NextRequest) {
  return NextResponse.next();
}

// Empty matcher prevents the middleware from running.
export const config = {
  matcher: [],
};
