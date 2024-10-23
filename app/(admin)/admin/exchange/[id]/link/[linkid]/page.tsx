import { getExchange, getLinks } from "@/actions/trade/action";
import { cookies } from "next/headers";
import React from "react";
import Container from "./container";

const page = async ({ params }) => {
  const links = await getLinks({ exchange_id: params.id });
  const data = await getExchange(params.id);

  const link = await links.data.find((v) => v.id == params.linkid);

  return (
    <div className="p-8 font-bold flex-auto pb-32">
      {/* 테이블 */}
      <h1 className="text-3xl pb-10">{data?.name}</h1>
      <Container data={data} exchangeId={params.id} linkId={params.linkid} link={link} />
    </div>
  );
};

export default page;
