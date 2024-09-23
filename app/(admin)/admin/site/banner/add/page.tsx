import { getExchange, getExchanges } from "@/actions/trade/action";
import React from "react";
import { cookies } from "next/headers";
import Container from "./container";

const Page = async ({ params }) => {
  const token = cookies().get("token");

  return (
    <div className="p-8 font-bold flex-auto pb-32">
      {/* 테이블 */}
      {/* <h1 className="text-3xl pb-10">{data?.name}</h1> */}
      <Container token={token?.value} />
    </div>
  );
};

export default Page;
