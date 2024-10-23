"use client";
import { BellRing } from "lucide-react";
import TradeReport from "./trade-report";
import { Suspense, useEffect, useMemo, useState } from "react";
import { useAtomValue } from "jotai";
import { paybackTestAtom } from "@/app/store/trade";
import Image from "next/image";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Lottie from "react-lottie-player";
import lottieJson from "@/assets/loading.json";
import Table from "@/components/ui/table";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Page() {
  const paybackTest = useAtomValue(paybackTestAtom);

  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 3000);
  }, []);

  const tableData = [
    {
      거래소: (
        <div className="flex gap-2">
          <Image src={paybackTest.image} width={30} height={30} alt="exchange-image" />
          <p className="text-xl">{paybackTest.name}</p>
        </div>
      ),
      분석대상: "76,520명",
      분석일치율: "97%",
    },
  ];

  const year = new Date().getFullYear();

  const month = new Date().getMonth() + 1;

  const image = useMemo(() => {}, [paybackTest]);

  const result = useMemo(() => {
    const ACTUAL_TRANSACTION_AMOUNT = paybackTest.seed * paybackTest.leverage;

    const COMMISSION_TRANSACTION =
      ((Number(ACTUAL_TRANSACTION_AMOUNT) * Number(paybackTest?.market_order?.replace("%", ""))) / 100) * 0.5 +
      ((Number(ACTUAL_TRANSACTION_AMOUNT) * Number(paybackTest?.limit_order?.replace("%", ""))) / 100) * 0.5;

    const DAILY_TOTAL_FEE = COMMISSION_TRANSACTION * paybackTest.number;

    const DAILY_PAYBACK = (DAILY_TOTAL_FEE * Number(paybackTest?.payback?.replace("%", ""))) / 100;

    return (DAILY_PAYBACK * 30.42).toFixed(2);
  }, [paybackTest]);

  const tableData2 = useMemo(() => {
    return Array(6)
      .fill("")
      .map((v, i) => {
        const y = month + i > 12 ? year + 1 : year;
        const m = month + i > 12 ? month + i - 12 : month + i;

        return {
          날짜: `${y}년 ${String(m).padStart(2, "0")}월`,
          금액: <p className="text-orange-500 font-bold">{`+${Number(result).toLocaleString()} USDT`}</p>,
        };
      });
  }, [year, month, result]);

  if (isLoading) {
    return (
      <div>
        <div className="absolute left-1/2 md:top-[30%] translate-x-[-50%] translate-y-[-50%] flex justify-center md:text-2xl font-bold text-gray-600">페이백 예상 금액을 계산 중입니다...</div>
        <Lottie loop animationData={lottieJson} play />
      </div>
    );
  }

  return (
    <div className="px-2 py-5 font-bold bg-white">
      <div className="font-bold text-xl">내 페이백 예상 금액은?</div>
      {/* <div className="flex gap-1 py-2">
        <div className="font-bold text-[18px] text-gray-400 ">AI가</div>
        <div className="font-bold text-[18px] text-oragne-400 dark:text-orange-400">24,237명</div>
        <div className="font-bold text-[18px] text-gray-400 ">을 꼼꼼하게 분석했어요</div>
      </div> */}
      <div className="my-10 px-5 bg-gray-800 flex flex-col items-center py-10 dark:bg-gray-800 rounded-lg">
        <p className="text-gray-50 ">30일 기준 예상 페이백 금액</p>
        <div className="flex justify-between py-3 items-center">
          <p className="text-orange-400 text-2xl font-bold">{Number(result).toLocaleString()} USDT</p>
          {/* <p>아이콘</p> */}
        </div>
        {/* <div className="flex justify-between py-3 items-center mt-3 border-t-[1px] border-gray-200 dark:border-gray-700">
          <p className="text-gray-400 ">셀퍼럴 기준 금액</p>
          <p>5.7USDT</p>
        </div> */}

        <div className="flex-1 w-[80%] py-10">
          <Table data={tableData} bodyClassname="bg-gray-50 rounded-b-md" headerClassname="bg-orange-400 rounded-t-md text-gray-50" textColor="white" />
        </div>

        <div className="py-10">
          <Link href={"/exchange"} className={cn(buttonVariants({ size: "lg" }), "bg-orange-400")}>
            {"다음"}
          </Link>
        </div>
      </div>
      <div className="pt-20">
        <div className="flex flex-col items-center">
          <div className="text-2xl pb-5 font-bold">거래수수료,</div>
          <div>
            <p className="flex gap-1">
              이제는 <p className="text-orange-400 font-bold">남김없이 환급</p> 해드릴게요.
            </p>
            <p className="text-center">최대수수료 할인도 기본이에요.</p>
          </div>
          <div className="py-10 flex flex-col items-center">
            <p className="flex gap-1">셀퍼럴닷컴과 6개월만 함께하면</p>
            <p className="text-center py-5 text-3xl text-orange-400 font-bold">{Number(result * 6).toLocaleString()} USDT를 받아요</p>
          </div>
        </div>
      </div>

      <div className="flex-1 w-full  mx-auto">
        <Table data={tableData2} bodyClassname="bg-gray-50 rounded-b-md" headerClassname="bg-orange-400 rounded-t-md text-gray-50" textColor="white" />
      </div>

      {/* <div className="py-5 my-10 px-5 bg-gray-50 dark:bg-gray-800 rounded-lg">
        <div className="flex gap-4 items-center px-2">
          <BellRing />
          <div className="flex flex-wrap whitespace-pre">
            <p>트레이더님과 비슷한 셀퍼럴닷컴 회 USDT은 매달 </p>
            <p className="text-orange-400">{Number(result).toLocaleString()} USDT</p>
            <p>을 페이백 받고 있어요</p>
          </div>
        </div>
      </div> */}
      {/* <TradeReport /> */}
      <div className="py-10 flex justify-center">
        <Button
          onClick={() => {
            router.push("/exchange");
          }}
          className={cn(buttonVariants({ size: "lg" }), "bg-orange-400 text-lg mx-auto w-1/2")}
        >
          {"페이백 신청하러 가기"}
        </Button>
      </div>
    </div>
  );
}
