import { getExchanges } from "@/actions/trade/action";
import React from "react";
import ExchangeTab from "./exchange-tab";
import Container from "./container";
import { cookies } from "next/headers";
import { getAllUser } from "@/actions/user/action";

const Page = async () => {
  const exchanges = await getExchanges();
  const users = await getAllUser();

  console.log("users", users);

  return <Container exchanges={exchanges} users={users.DATA} />;
};

export default Page;
