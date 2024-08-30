import { getExchange, getUidList } from "@/actions/trade/action";
import React from "react";
import Container from "./container";
import { cookies } from "next/headers";
import AddBtn from "../list/add-btn";

const Page = async ({ params }) => {
  const token = cookies().get("token");
  const data = await getExchange(params.id);

  const uid = await getUidList({ id: params.id, token: token.value });

  console.log("uid", uid.data.list);

  return (
    <div className="font-bold flex-auto flex-col p-8 flex">
      <h1 className="text-3xl">{data.name}</h1>
      <Container uid={uid} />
      <AddBtn text={"수정"} id={params.id} />
    </div>
  );
};

export default Page;
