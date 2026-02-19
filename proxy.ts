import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const SHORT_CODE_PATTERN = /^[A-Za-z0-9_-]{4,64}$/;
const PUBLIC_FILE_PATTERN = /\.[^/]+$/;
const API_POST_ROUTES = new Set(["/api/resolve", "/api/testing-emails"]);

function withSecurityHeaders(response: NextResponse) {
  response.headers.set("X-Frame-Options", "DENY");
  response.headers.set("X-Content-Type-Options", "nosniff");
  response.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
  response.headers.set("Permissions-Policy", "camera=(), microphone=(), geolocation=()");
  return response;
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (PUBLIC_FILE_PATTERN.test(pathname) || pathname.startsWith("/_next")) {
    return withSecurityHeaders(NextResponse.next());
  }

  if (pathname === "/") {
    return withSecurityHeaders(NextResponse.next());
  }

  if (pathname.startsWith("/api/")) {
    if (!API_POST_ROUTES.has(pathname)) {
      return withSecurityHeaders(NextResponse.json({ error: "Not Found" }, { status: 404 }));
    }

    if (request.method !== "POST") {
      return withSecurityHeaders(NextResponse.json({ error: "Method Not Allowed" }, { status: 405 }));
    }

    return withSecurityHeaders(NextResponse.next());
  }

  const pathSegments = pathname.split("/").filter(Boolean);
  const isShortCodeRoute = pathSegments.length === 1 && SHORT_CODE_PATTERN.test(pathSegments[0]);

  if (isShortCodeRoute) {
    return withSecurityHeaders(NextResponse.next());
  }

  const redirectUrl = new URL("/", request.url);
  return withSecurityHeaders(NextResponse.redirect(redirectUrl));
}

export const config = {
  matcher: ["/:path*"]
};
