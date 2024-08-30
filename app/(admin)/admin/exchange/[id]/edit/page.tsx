import { getExchange } from "@/actions/trade/action";
import React from "react";
import Container from "./container";
import { cookies } from "next/headers";

const Page = async ({ params }) => {
  const token = cookies().get("token");
  const data = await getExchange(params.id);

  console.log("params", params);

  return (
    <div className="p-8 font-bold flex-auto pb-32">
      {/* 테이블 */}
      <h1 className="text-3xl pb-10">{data?.name}</h1>
      <Container data={data} token={token.value} />
    </div>
  );
};

export default Page;
