import { getAffiliateExchange, getExchange, getLinks } from "@/actions/trade/action";
import React from "react";
import Container from "./container";
import { cookies } from "next/headers";

const Page = async ({ params }) => {
  const data = await getAffiliateExchange(params.id);

  return (
    <div className="p-8 font-bold flex-auto pb-32">
      {/* 테이블 */}
      <h1 className="text-3xl pb-10">{data?.name}</h1>
      <Container data={data} exchangeId={params.id} />
    </div>
  );
};

export default Page;
