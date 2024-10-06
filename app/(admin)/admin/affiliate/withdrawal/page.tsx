import { getExchanges } from "@/actions/trade/action";
import React from "react";
import ExchangeTab from "./exchange-tab";
import Container from "./container";
import { cookies } from "next/headers";
import { getAllUser } from "@/actions/user/action";
import { revalidateTag } from "next/cache";

const Page = async () => {
  const exchanges = await getExchanges();
  const users = await getAllUser();

  revalidateTag("users");

  return <Container exchanges={exchanges} users={users.DATA} />;
};

export default Page;
