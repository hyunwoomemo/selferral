import { getExchange, getLinks } from "@/actions/trade/action";
import React from "react";
import Container from "./container";
import { cookies } from "next/headers";

const Page = async ({ params }) => {
  const token = cookies().get("token");

  const links = await getLinks({ token: token?.value, exchange_id: params.id });

  console.log("params", params, links);
  const data = await links.data.find((v) => v.id == params.linkId);

  console.log("paramsparams", data);

  return (
    <div className="p-8 font-bold flex-auto pb-32">
      {/* 테이블 */}
      <h1 className="text-3xl pb-10">{data?.name}</h1>
      <Container data={data} token={token?.value} exchangeId={params.id} />
    </div>
  );
};

export default Page;
