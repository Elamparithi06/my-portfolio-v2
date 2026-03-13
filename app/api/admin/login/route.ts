import { NextResponse } from "next/server";
import {
  areAdminCredentialsConfigured,
  createAdminSessionValue,
  getAdminCookieName,
  isValidAdminLogin,
} from "@/lib/server/adminAuth";

function sanitizeNextPath(value: string | null) {
  if (!value || !value.startsWith("/")) {
    return "/admin/insights";
  }

  return value.startsWith("/admin") ? value : "/admin/insights";
}

export async function POST(request: Request) {
  if (!areAdminCredentialsConfigured()) {
    return NextResponse.redirect(new URL("/admin/login?error=setup", request.url), 303);
  }

  const formData = await request.formData();
  const username = String(formData.get("username") ?? "").trim();
  const password = String(formData.get("password") ?? "");
  const nextPath = sanitizeNextPath(String(formData.get("next") ?? "/admin/insights"));

  if (!isValidAdminLogin(username, password)) {
    return NextResponse.redirect(new URL(`/admin/login?error=invalid&next=${encodeURIComponent(nextPath)}`, request.url), 303);
  }

  const response = NextResponse.redirect(new URL(nextPath, request.url), 303);
  response.cookies.set({
    name: getAdminCookieName(),
    value: createAdminSessionValue(),
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 8,
  });

  return response;
}
