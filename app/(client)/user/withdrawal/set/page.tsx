import React from "react";
import Container from "./container";
import { getExchanges } from "@/actions/trade/action";

const Page = async ({ searchParams }) => {
  const exchanges = await getExchanges();

  const exchangeId = searchParams.id;
  console.log("params", searchParams);

  console.log("ex", exchangeId);

  return (
    <div className="p-4 bg-white dark:bg-gray-950">
      <Container data={exchanges.data} exchangeId={exchangeId} />
    </div>
  );
};

export default Page;
