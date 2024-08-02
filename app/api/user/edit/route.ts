// import executeQuery from "@/lib/db";
// import { NextRequest, NextResponse } from "next/server";

// export async function POST(req: NextRequest) {
//   const res = await req.json();

//   const { id, type } = res;

//   console.log(id, type);

//   if (type) {
//     const sql = `update selferral.users set type = ? where id = ?`;
//     const data = await executeQuery(sql, [type, id]);
//     const getData = JSON.parse(JSON.stringify(data));

//     console.log("dddd123", data);

//     if (getData.affectedRows > 0) {
//       return NextResponse.json({ CODE: "UE000", messgae: "유저 타입이 수정되었습니다." });
//     } else {
//       return NextResponse.json({ CODE: "UE002", messgae: "유저 타입이 수정에 실패했습니다." });
//     }
//   } else {
//     return NextResponse.json({ CODE: "UE001", messgae: "타입값이 존재하지 않거나 기존과 동일합니다." });
//   }
// }
