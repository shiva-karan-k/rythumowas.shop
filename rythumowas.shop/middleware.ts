import { stackServerApp } from "@/lib/stack";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Export the middleware function for Next.js 16
export async function middleware(request: NextRequest) {
  // Use Stack Auth middleware
  const stackMiddleware = stackServerApp.middleware;
  if (typeof stackMiddleware === 'function') {
    return await stackMiddleware(request);
  }
  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};
