import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import {
  areAdminCredentialsConfigured,
  getAdminCookieName,
  isValidAdminSession,
} from "@/lib/server/adminAuth";

export function proxy(request: NextRequest) {
  if (!request.nextUrl.pathname.startsWith("/admin")) {
    return NextResponse.next();
  }

  if (!areAdminCredentialsConfigured()) {
    return new NextResponse("Not found", { status: 404 });
  }

  if (request.nextUrl.pathname === "/admin/login") {
    return NextResponse.next();
  }

  const sessionValue = request.cookies.get(getAdminCookieName())?.value;
  if (isValidAdminSession(sessionValue)) {
    return NextResponse.next();
  }

  const loginUrl = new URL("/admin/login", request.url);
  loginUrl.searchParams.set("next", request.nextUrl.pathname);
  return NextResponse.redirect(loginUrl);
}

export const config = {
  matcher: ["/admin/:path*"],
};
