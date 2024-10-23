import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const body = req.json();

  return NextResponse.json({ message: "test" });
}
