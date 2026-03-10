import { NextResponse } from "next/server";

export async function POST() {
  return NextResponse.json(
    { error: "Contact form messaging is disabled." },
    { status: 410 },
  );
}
