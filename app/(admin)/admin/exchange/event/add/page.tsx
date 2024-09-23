import Input from "@/components/input";
import Switch from "@/components/ui/switch";
import React from "react";
import Container from "./container";
import { cookies } from "next/headers";
import { getAdminBanner } from "@/actions/site/action";
import { getExchanges } from "@/actions/trade/action";

const page = async () => {
  const token = cookies().get("token");

  const banners = await getAdminBanner({ type: "all", token: token?.value });
  const exchanges = await getExchanges();

  console.log(";bbbb", banners);

  return (
    <div className="p-8 font-bold flex-auto pb-32">
      {/* 테이블 */}
      <h1 className="text-3xl pb-10">이벤트 추가</h1>

      <Container token={token?.value} banners={banners.data.list} exchanges={exchanges.data} />
    </div>
  );
};

export default page;
