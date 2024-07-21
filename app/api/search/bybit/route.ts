import { uploadToCloudinary } from "@/app/action";
import executeQuery from "@/lib/db";
import { redirect } from "next/navigation";
import { NextRequest, NextResponse } from "next/server";
import { RestClientV5 } from "bybit-api";
import crypto from "crypto";

export async function GET(req: NextRequest) {
  // your auth check here if required

  const searchParams = req.nextUrl.searchParams;
  const exchange = searchParams.get("exchange");
  const uid = searchParams.get("uid");
  console.log("uid", exchange, uid, searchParams);

  const apiKey = process.env.NEXT_PUBLIC_BYBIT_API_KEY;
  const apiSecret = process.env.NEXT_PUBLIC_BYBIT_API_SECRET_KEY;
  const recvWindow = 5000;
  const endpoint = "/v5/user/aff-customer-info";
  const queryString = `uid=${uid}`;

  function getTimestamp() {
    return Date.now();
  }

  function getSignature(apiSecret, params) {
    return crypto.createHmac("sha256", apiSecret).update(params).digest("hex");
  }

  const timestamp = getTimestamp();
  const paramStr = `${timestamp}${apiKey}${recvWindow}${queryString}`;
  const signature = getSignature(apiSecret, paramStr);

  const headers = {
    "X-BAPI-API-KEY": apiKey,
    "X-BAPI-TIMESTAMP": timestamp.toString(),
    "X-BAPI-RECV-WINDOW": recvWindow.toString(),
    "X-BAPI-SIGN": signature,
  };

  const url = `https://api.bybit.com${endpoint}?${queryString}`;

  const res = await fetch(url, { headers });

  const data = await res.json();
  console.log(data);

  console.log("1111");
  if (res.ok) {
    console.log("2222");
    return NextResponse.json({ CODE: "US000", DATA: data });
  } else {
    console.log("3333");
    return NextResponse.json({ CODE: "US001", message: "UID 검색에 실패했습니다." });
  }
}
