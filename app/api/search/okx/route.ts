// import { uploadToCloudinary } from "@/app/action";
// import executeQuery from "@/lib/db";
// import { redirect } from "next/navigation";
// import { NextRequest, NextResponse } from "next/server";
// import { RestClientV5 } from "bybit-api";
// import crypto from "crypto";
// import CryptoJS from "crypto-js";

// export async function GET(req: NextRequest) {
//   // your auth check here if required

//   const searchParams = req.nextUrl.searchParams;
//   const exchange = searchParams.get("exchange");
//   const uid = searchParams.get("uid");
//

//   const timestamp = new Date().toISOString();
//   const endpoint = "/api/v5/affiliate/invitee/detail";
//   const passphrase = process.env.NEXT_PUBLIC_OKX_ACCESS_PASSPHRASE;
//   const queryString = `uid=${uid}`;
//   const apiKey = process.env.NEXT_PUBLIC_OKX_API_KEY;
//   const apiSecret = process.env.NEXT_PUBLIC_OKX_API_SECRET_KEY;

//   // Prehash string
//   const prehashString = `${timestamp}GET${endpoint}?${queryString}`;

//

//   // Signature
//   const signature = CryptoJS.enc.Base64.stringify(CryptoJS.HmacSHA256(prehashString, apiSecret));

//

//   const headers = {
//     "OK-ACCESS-KEY": apiKey,
//     "OK-ACCESS-SIGN": signature,
//     "OK-ACCESS-TIMESTAMP": timestamp,
//     "OK-ACCESS-PASSPHRASE": passphrase,
//     "Content-Type": "application/json",
//   };

//   const url = `https://www.okx.com${endpoint}`;

//   const res = await fetch(url, {
//     headers,
//   });

//   const data = await res.json();
//

//
//   if (res.ok) {
//
//     return NextResponse.json({ CODE: "US000", DATA: data });
//   } else {
//
//     return NextResponse.json({ CODE: "US001", message: "UID 검색에 실패했습니다." });
//   }
// }
