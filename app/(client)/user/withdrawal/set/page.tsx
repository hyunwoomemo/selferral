import React from "react";
import Container from "./container";
import { getExchanges } from "@/actions/trade/action";

const Page = async () => {
  const exchanges = await getExchanges();

  console.log("ex", exchanges);

  return (
    <div className="p-4 bg-white dark:bg-gray-950">
      <Container data={exchanges.data} />
    </div>
  );
};

export default Page;
