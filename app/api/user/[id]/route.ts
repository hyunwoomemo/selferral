import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const body = req.json();

  console.log(body);

  return NextResponse.json({ message: "test" });
}
