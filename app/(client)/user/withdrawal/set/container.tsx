"use client";
import { setWithdrawal } from "@/actions/trade/action";
import { Button, buttonVariants } from "@/components/ui/button";
import Dropdown from "@/components/ui/dropdown";
import { useToast } from "@/hooks/useToast";
import { cn } from "@/lib/utils";
import { getCookie } from "cookies-next";
import { revalidateTag } from "next/cache";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect, useMemo, useState } from "react";

const Container = ({ data, exchangeId }) => {
  const { addToast } = useToast();

  const dropdownData = useMemo(() => {
    return data.map((v) => ({ label: v.name, value: v.exchange_id, icon: <Image width={30} height={30} alt="logo" src={v.image_thumb} /> }));
  }, [data]);

  const [exchange, setExchange] = useState(dropdownData[0]);
  const [isVisible, setIsVisible] = useState(false);
  const [values, setValues] = useState({});
  const token = getCookie("token");
  const router = useRouter();

  console.log("dropdownData", exchangeId);

  useEffect(() => {
    setExchange(dropdownData.find((v) => v.value == exchangeId));
  }, [dropdownData, exchangeId]);

  const handleSubmit = async () => {
    if (values.point < 100) {
      return addToast({ text: "최소 100USDT 이상부터 출금신청 가능합니다" });
    }

    const res = await setWithdrawal({ token, data: { exchange_id: exchange.value, ...values } });

    if (res.data === "aleady") {
      return window.alert("이미 등록되어있습니다.");
    }

    if (res.data === "ok") {
      addToast({ text: "출금 신청이 완료되었습니다." });
      router.back();
      setTimeout(() => {
        router.refresh();
      }, 100);
    }
  };

  const handleDropdownClick = (value) => {
    setExchange(value);
  };

  return (
    <div className="mx-auto max-w-screen-xl">
      <div className="py-4 flex gap-4 flex-col">
        <p>거래소 선택</p>
        <div className="flex w-60">
          <Dropdown value={exchange} placeholder={"거래소를 선택해주세요."} dropdownClick={handleDropdownClick} data={dropdownData} isVisible={isVisible} setIsVisible={setIsVisible} minWidth={160} />
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
        disabled={!exchange || !values.point || !values.usdt_address}
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
