import React from "react";
import Container from "./container";
import { cookies } from "next/headers";
import { getAdminBanner } from "@/actions/site/action";
import { getExchanges } from "@/actions/trade/action";
import { getBanners } from "@/actions/common/action";

const page = async () => {
  const banners = await getAdminBanner({ type: "all" });
  const exchanges = await getExchanges();
  // const banners = await getBanners();

  return (
    <div className="p-8 font-bold flex-auto pb-32">
      {/* 테이블 */}
      <h1 className="text-3xl pb-10">이벤트</h1>
      <Container data={banners.data.list} exchanges={exchanges.data} />
    </div>
  );
};

export default page;
