import Input from "@/components/input";
import Switch from "@/components/ui/switch";
import React from "react";
import Container from "./container";
import { cookies } from "next/headers";
import { getAdminBanner } from "@/actions/site/action";
import { getExchanges } from "@/actions/trade/action";

const page = async () => {
  const banners = await getAdminBanner({ type: "all" });
  const exchanges = await getExchanges();

  return (
    <div className="p-8 font-bold flex-auto pb-32">
      {/* 테이블 */}
      <h1 className="text-3xl pb-10">이벤트 추가</h1>

      <Container banners={banners.data.list} exchanges={exchanges.data} />
    </div>
  );
};

export default page;
