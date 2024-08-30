import { getExchanges } from "@/actions/trade/action";
import React from "react";
import ExchangeTab from "./exchange-tab";
import Container from "./container";
import { cookies } from "next/headers";

const Page = async () => {
  const exchanges = await getExchanges();
  const { value: token } = cookies().get("token");

  return <Container exchanges={exchanges} token={token} />;
};

export default Page;
