import createMiddleware from "next-intl/middleware";
import { NextRequest, NextResponse } from "next/server";
import { routing } from "./lib/i18n/routing";

const intlMiddleware = createMiddleware(routing);

export default function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Admin routes: check for session cookie
  if (pathname.startsWith("/admin") && !pathname.startsWith("/admin/login")) {
    const sessionToken =
      request.cookies.get("next-auth.session-token") ||
      request.cookies.get("__Secure-next-auth.session-token");

    if (!sessionToken) {
      const loginUrl = new URL("/admin/login", request.url);
      loginUrl.searchParams.set("callbackUrl", pathname);
      return NextResponse.redirect(loginUrl);
    }
    return NextResponse.next();
  }

  // API routes: skip intl
  if (pathname.startsWith("/api")) {
    return NextResponse.next();
  }

  // All other routes: apply intl middleware
  return intlMiddleware(request);
}

export const config = {
  matcher: [
    // Match all pathnames except static files and _next
    "/((?!_next/static|_next/image|favicon.ico|public|fonts|patterns|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
