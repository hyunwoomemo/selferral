import { getAffiliateExchange, getExchange, getLinks } from "@/actions/trade/action";
import React from "react";
import Container from "./container";
import { cookies } from "next/headers";
import { Button } from "@/components/ui/button";

const Page = async ({ params }) => {
  const data = await getAffiliateExchange(params.id);

  return (
    <div className="p-8 flex-auto pb-32">
      {/* 테이블 */}
      <h1 className="text-3xl pb-4">{data?.name}</h1>

      <Container data={data} exchangeId={params.id} />
    </div>
  );
};

export default Page;
