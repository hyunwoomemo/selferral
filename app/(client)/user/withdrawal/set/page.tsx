import React from "react";
import Container from "./container";
import { getExchanges } from "@/actions/trade/action";

const Page = async () => {
  const exchanges = await getExchanges();

  console.log("ex", exchanges);

  return (
    <div p-4 max-w-screen-xl mx-auto>
      <Container data={exchanges.data} />
    </div>
  );
};

export default Page;
