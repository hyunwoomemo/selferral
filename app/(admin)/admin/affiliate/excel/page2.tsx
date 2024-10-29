import React from "react";
import Container from "./container";
import { getAffiliateExchanges, getExcel } from "@/actions/trade/action";

const page = async ({ params }) => {
  const excel = await getExcel({ num: 10, page: params?.page || 1 });

  const exchanges = await getAffiliateExchanges();

  return <Container exchanges={exchanges.data} />;
};

export default page;
