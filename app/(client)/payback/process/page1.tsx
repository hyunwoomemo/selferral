"use client";
import { paybackTestAtom, selectedTradeAtom } from "@/app/store/trade";
import { Button, buttonVariants } from "@/components/ui/button";
import { dummyTrade } from "@/dummy";
import { cn } from "@/lib/utils";
import { useAtom, useSetAtom } from "jotai";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";

const Page1 = ({ exchanges }) => {
  const router = useRouter();
  const setSelectTrade = useSetAtom(selectedTradeAtom);
  const setPaybackTest = useSetAtom(paybackTestAtom);
  // const params = useSearchParams();

  // const uid = params.get("uid");

  return (
    <div className="px-2 py-10 text-xl font-bold bg-white">
      {/* <Button
        onClick={prev}
        className={cn(buttonVariants({ size: "sm", variant: "outline" }), `absolute top-5 w-20 mb-5  text-orange-400 dark:text-orange-200 border border-orange-400 dark:border-orange-200`)}
      >
        <p>이전</p>
      </Button> */}
      <div>가장 자주 쓰는</div>
      <div>거래소 하나만 선택해주세요</div>
      <div className="font-normal text-[16px] text-gray-800 dark:text-gray-400 py-2">어떤 거래소를 이용하고 계신가요?</div>

      <div className="flex flex-wrap gap-5 py-10 px-5 items-center">
        {exchanges.map((v) => (
          <div
            onClick={() => {
              router.push("/payback/process/2");
              setPaybackTest((prev) => {
                console.log("psdf", prev);
                return { ...prev, name: v.name, id: v.exchange_id, market_order: v.market_order, limit_order: v.limit_order, payback: v.payback, image: v.image_thumb, uid };
              });
            }}
            className="min-w-[47%] flex items-center py-2  cursor-pointer gap-4"
            key={v.name}
          >
            {v.image_thumb && (
              <div className="w-10 h-10 relative flex justify-center items-center">
                <Image src={v.image_thumb} width={30} height={30} alt="image" />
              </div>
            )}
            <p>{v.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Page1;
