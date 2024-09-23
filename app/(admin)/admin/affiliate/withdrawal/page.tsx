import { getExchanges } from "@/actions/trade/action";
import React from "react";
import ExchangeTab from "./exchange-tab";
import Container from "./container";
import { cookies } from "next/headers";

const Page = async () => {
  const exchanges = await getExchanges();

  return <Container exchanges={exchanges} />;
};

export default Page;
