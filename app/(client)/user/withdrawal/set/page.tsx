import React from "react";
import Container from "./container";
import { getExchanges, getUidStatus } from "@/actions/trade/action";

const Page = async ({ searchParams }) => {
  const exchanges = await getExchanges();

  const exchangeId = searchParams.id;
  console.log("params", searchParams);
  const uidData = await getUidStatus({});

  console.log("ex123", exchanges, uidData.data.DATA);

  const data = await uidData.data.DATA.map((v) => {
    return {
      ...v,
      name: exchanges.data.find((v1) => v1.exchange_id === v.exchange_id)?.name,
      image_thumb: exchanges.data.find((v1) => v1.exchange_id === v.exchange_id)?.image_thumb,
      status: exchanges.data.find((v1) => v1.exchange_id === v.exchange_id)?.status,
    };
  });

  return (
    <div className="p-4 bg-white dark:bg-gray-950">
      <Container data={data} exchangeId={exchangeId} />
    </div>
  );
};

export default Page;
