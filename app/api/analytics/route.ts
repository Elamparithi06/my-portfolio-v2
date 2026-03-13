import { NextResponse } from "next/server";
import { appendRecord } from "@/lib/server/storage";
import { getRequestMetadata } from "@/lib/server/requestMetadata";

type AnalyticsPayload = {
  path?: string;
  screenWidth?: number;
  screenHeight?: number;
  language?: string;
  timezone?: string;
};

export async function POST(request: Request) {
  let payload: AnalyticsPayload = {};

  try {
    payload = (await request.json()) as AnalyticsPayload;
  } catch {
    payload = {};
  }

  const metadata = getRequestMetadata(request);

  await appendRecord("visitors.json", {
    visitedAt: new Date().toISOString(),
    path: typeof payload.path === "string" ? payload.path : "/",
    screenWidth: typeof payload.screenWidth === "number" ? payload.screenWidth : null,
    screenHeight: typeof payload.screenHeight === "number" ? payload.screenHeight : null,
    language: typeof payload.language === "string" ? payload.language : "",
    timezone: typeof payload.timezone === "string" ? payload.timezone : "",
    ip: metadata.ip,
    referrer: metadata.referrer,
    userAgent: metadata.userAgent,
    location: metadata.location,
  });

  return NextResponse.json({ ok: true });
}
