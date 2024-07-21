import executeQuery from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const id = await req.json();

  if (!id) return NextResponse.json({ CODE: "ED001", message: "ID는 필수입니다." });

  const sql = "delete from selferral.exchanges where id = ?";
  const data = await executeQuery(sql, id);

  if (data.affectedRows > 0) {
    return NextResponse.json({ CODE: "ED000" });
  } else {
    return NextResponse.json({ CODE: "ED002", message: "거래소 삭제에 실패했습니다." });
  }
}
