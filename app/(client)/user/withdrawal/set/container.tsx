"use client";
import { setWithdrawal } from "@/actions/trade/action";
import { Button, buttonVariants } from "@/components/ui/button";
import Dropdown from "@/components/ui/dropdown";
import { cn } from "@/lib/utils";
import { getCookie } from "cookies-next";
import { revalidateTag } from "next/cache";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const Container = ({ data }) => {
  const [exchange, setExchange] = useState(data[0]);
  const [isVisible, setIsVisible] = useState(false);
  const [values, setValues] = useState({});
  const token = getCookie("token");
  const router = useRouter();

  const handleSubmit = async () => {
    const res = await setWithdrawal({ token, data: { exchange_id: exchange.exchange_id, ...values } });

    console.log("result", res);

    if (res.data === "aleady") {
      return window.alert("이미 등록되어있습니다.");
    }

    if (res.data === "ok") {
      router.back();
      setTimeout(() => {
        router.refresh();
      }, 100);
    }
  };

  return (
    <div className="mx-auto max-w-screen-xl">
      <div className="py-4 flex gap-4 flex-col">
        <p>거래소 선택</p>
        <div className="flex w-60">
          <Dropdown item={exchange} setItem={setExchange} data={data} isVisible={isVisible} setIsVisible={setIsVisible} />
        </div>
      </div>
      <div className="py-4 flex gap-4 flex-col">
        <p>출금 금액</p>
        <div className="flex w-60">
          <input className="bg-transparent p-3 border border-gray-400 rounded-lg" placeholder="금액을 입력해주세요." onChange={(e) => setValues((prev) => ({ ...prev, point: e.target.value }))} />
        </div>
      </div>
      <div className="py-4 flex gap-4 flex-col">
        <p>USDT 주소</p>
        <div className="flex w-80">
          <input
            className="bg-transparent p-3 border border-gray-400 rounded-lg"
            placeholder="주소를 입력해주세요."
            onChange={(e) => setValues((prev) => ({ ...prev, usdt_address: e.target.value }))}
          />
        </div>
      </div>
      <Button
        onClick={handleSubmit}
        // onClick={handleSetWithdrawal}
        className={cn(
          buttonVariants({ size: "lg", variant: "outline" }),
          "max-w-52   md:min-w-40  my-5 py-5 border border-orange-400 text-orange-400 text-lg dark:border-orange-200 dark:text-orange-200"
        )}
      >
        {"출금 신청"}
      </Button>
    </div>
  );
};

export default Container;
