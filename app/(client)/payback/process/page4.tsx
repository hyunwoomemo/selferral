import { paybackTestAtom } from "@/app/store/trade";
import { Button, buttonVariants } from "@/components/ui/button";
import { dummyTrade } from "@/dummy";
import { cn } from "@/lib/utils";
import { useSetAtom } from "jotai";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

const Page4 = () => {
  const [value, setValue] = useState(0);
  const router = useRouter();
  const setPaybackTest = useSetAtom(paybackTestAtom);

  const onClick = (value) => {
    setPaybackTest((prev) => ({ ...prev, number: value }));
    router.push("/payback/result");
  };

  return (
    <div className="px-2 py-10 text-xl font-bold bg-white">
      <div>하루에 몇 번 정도</div>
      <div>거래하시나요?</div>
      <div className="font-normal text-[16px] text-gray-800 dark:text-gray-400 py-2">거래 성향을 알려주세요</div>

      <div className="flex flex-col gap-5 mx-5 mt-10">
        <div
          onClick={() => onClick(1)}
          className="cursor-pointer border border-gray-400 dark:border-gray-800 hover:border-orange-400 hover:dark:border-orange-200 p-3 text-[16px] rounded-lg flex justify-center items-center hover:text-orange-400 hover:dark:text-orange-200"
        >
          하루에 1번 할까 말까해요
        </div>
        <div
          onClick={() => onClick(1.5)}
          className="cursor-pointer border border-gray-400 dark:border-gray-800 hover:border-orange-400 hover:dark:border-orange-200 p-3 text-[16px] rounded-lg flex justify-center items-center hover:text-orange-400 hover:dark:text-orange-200"
        >
          하루에 1회 - 2회 거래해요
        </div>
        <div
          onClick={() => onClick(3.5)}
          className="cursor-pointer border border-gray-400 dark:border-gray-800 hover:border-orange-400 hover:dark:border-orange-200 p-3 text-[16px] rounded-lg flex justify-center items-center hover:text-orange-400 hover:dark:text-orange-200"
        >
          하루에 2회 - 5회 거래해요
        </div>
        <div
          onClick={() => onClick(7.5)}
          className="cursor-pointer border border-gray-400 dark:border-gray-800 hover:border-orange-400 hover:dark:border-orange-200 p-3 text-[16px] rounded-lg flex justify-center items-center hover:text-orange-400 hover:dark:text-orange-200"
        >
          하루에 5회 - 10회 거래해요
        </div>
        <div
          onClick={() => onClick(10)}
          className="cursor-pointer border border-gray-400 dark:border-gray-800 hover:border-orange-400 hover:dark:border-orange-200 p-3 text-[16px] rounded-lg flex justify-center items-center hover:text-orange-400 hover:dark:text-orange-200"
        >
          하루에 10회 이상 거래해요
        </div>
      </div>
    </div>
  );
};

export default Page4;
