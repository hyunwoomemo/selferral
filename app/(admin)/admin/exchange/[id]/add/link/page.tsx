import { getExchange, getLinks } from "@/actions/trade/action";
import { cookies } from "next/headers";
import React from "react";
import Container from "./container";

const page = async ({ params }) => {
  const token = cookies().get("token");

  const links = await getLinks({ token: token?.value, exchange_id: params.id });
  const data = await getExchange(params.id);

  console.log("links", links);

  return (
    <div className="p-8 font-bold flex-auto pb-32">
      {/* 테이블 */}
      <h1 className="text-3xl pb-10">{data?.name}</h1>
      <Container data={data} exchangeId={params.id} token={token} />
    </div>
  );
};

export default page;
