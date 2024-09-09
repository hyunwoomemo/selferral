"use client";
import { BellRing } from "lucide-react";
import TradeReport from "./trade-report";
import { Suspense, useMemo } from "react";
import { useAtomValue } from "jotai";
import { paybackTestAtom } from "@/app/store/trade";
import Image from "next/image";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function Page() {
  const paybackTest = useAtomValue(paybackTestAtom);

  console.log("paybackTest", paybackTest);

  const image = useMemo(() => {}, [paybackTest]);

  const result = useMemo(() => {
    const ACTUAL_TRANSACTION_AMOUNT = paybackTest.seed * paybackTest.leverage;

    console.log("ACTUAL_TRANSACTION_AMOUNT", ACTUAL_TRANSACTION_AMOUNT);

    const COMMISSION_TRANSACTION =
      ((Number(ACTUAL_TRANSACTION_AMOUNT) * Number(paybackTest?.market_order?.replace("%", ""))) / 100) * 0.5 +
      ((Number(ACTUAL_TRANSACTION_AMOUNT) * Number(paybackTest?.limit_order?.replace("%", ""))) / 100) * 0.5;

    const DAILY_TOTAL_FEE = COMMISSION_TRANSACTION * paybackTest.number;
    console.log("DAILY_TOTAL_FEE", DAILY_TOTAL_FEE);

    const DAILY_PAYBACK = (DAILY_TOTAL_FEE * Number(paybackTest?.payback?.replace("%", ""))) / 100;
    console.log("DAILY_PAYBACK", DAILY_PAYBACK);
    console.log(" DAILY_PAYBACK * 30.42", DAILY_PAYBACK * 30.42);
    return (DAILY_PAYBACK * 30.42).toFixed(2);
  }, [paybackTest]);

  return (
    <div className="px-2 py-5 font-bold bg-white">
      <div className="font-bold text-xl">내 페이백 예상 금액은?</div>
      {/* <div className="flex gap-1 py-2">
        <div className="font-bold text-[18px] text-gray-400 ">AI가</div>
        <div className="font-bold text-[18px] text-oragne-400 dark:text-orange-400">24,237명</div>
        <div className="font-bold text-[18px] text-gray-400 ">을 꼼꼼하게 분석했어요</div>
      </div> */}
      <div className="py-5 my-10 px-5 bg-gray-50 dark:bg-gray-800 rounded-lg">
        <p className="text-gray-400">30일 기준 예상 페이백 금액</p>
        <div className="flex justify-between py-3 items-center">
          <p className="text-orange-400 text-lg">{Number(result).toLocaleString()}원</p>
          <Image src={paybackTest.image} width={30} height={30} alt="exchange-image" />
          {/* <p>아이콘</p> */}
        </div>
        {/* <div className="flex justify-between py-3 items-center mt-3 border-t-[1px] border-gray-200 dark:border-gray-700">
          <p className="text-gray-400 ">셀퍼럴 기준 금액</p>
          <p>5.7USDT</p>
        </div> */}
      </div>
      <div className="py-5 my-10 px-5 bg-gray-50 dark:bg-gray-800 rounded-lg">
        <div className="flex gap-4 items-center px-2">
          <BellRing />
          <div className="flex flex-wrap whitespace-pre">
            <p>트레이더님과 비슷한 셀퍼럴닷컴 회원은 매달 </p>
            <p className="text-orange-400">{Number(result).toLocaleString()}원</p>
            <p>을 페이백 받고 있어요</p>
          </div>
        </div>
      </div>
      {/* <TradeReport /> */}
      <Button className={cn(buttonVariants({ size: "sm", variant: "outline" }), "border border-orange-400 text-orange-400  dark:border-orange-200 dark:text-orange-200")}>
        {"페이백 신청하러 가기"}
      </Button>
    </div>
  );
}
