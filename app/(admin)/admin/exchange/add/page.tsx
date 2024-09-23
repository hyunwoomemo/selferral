import { getExchange, getLinks } from "@/actions/trade/action";
import React from "react";
import Container from "./container";
import { cookies } from "next/headers";

const Page = async () => {
  const token = cookies().get("token");

  return (
    <div className="p-8 font-bold flex-auto pb-32">
      {/* 테이블 */}
      <h1 className="text-3xl pb-10">거래소 추가</h1>
      <Container token={token?.value} />
    </div>
  );
};

export default Page;
