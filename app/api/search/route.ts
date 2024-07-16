import { uploadToCloudinary } from "@/app/action";
import executeQuery from "@/lib/db";
import { redirect } from "next/navigation";
import { NextRequest, NextResponse } from "next/server";
import { RestClientV5 } from "bybit-api";

export async function GET(req: NextRequest) {
  // your auth check here if required

  const API_KEY = "zc6raJ8Gb5IGmXyVe9";
  const API_SECRET = "ljaJgCDXFkuUVxpHnSFZMU3Bo11r6oPY1uFv";
  const useTestnet = false;

  const client = new RestClientV5({
    key: API_KEY,
    secret: API_SECRET,
    testnet: useTestnet,
  });

  client.getCoinInfo().then((res) => console.log("getCoinInfo", res));
  client.getAffiliateUserInfo({ uid: "229526031" }).then((res) => console.log("getAffilateUserInfo", res));

  // const res = await fetch("https://api-testnet.bybit.com/v5/user/aff-customer-info?uid=229526031", {
  //   method: "GET",
  //   headers: {
  //     apiKey: "zc6raJ8Gb5IGmXyVe9",
  //     secret: "ljaJgCDXFkuUVxpHnSFZMU3Bo11r6oPY1uFv",
  //   },
  // });

  // const data = await res.json();

  // console.log("dddzzzzz", data);

  return NextResponse.json({ message: "성공!!" });
}
