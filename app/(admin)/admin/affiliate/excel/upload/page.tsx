import { getAffiliateExchanges } from "@/actions/trade/action";
import React from "react";
import Container from "./container";

const page = async () => {
  const exchanges = await getAffiliateExchanges();

  return <Container exchanges={exchanges.data}></Container>;
};

export default page;
