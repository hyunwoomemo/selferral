import { Button, buttonVariants } from "@/components/ui/button";
import { dummyTrade } from "@/dummy";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { useState } from "react";

const Page4 = ({ onClick, selectTrade }: { onClick: () => void; selectTrade: string }) => {
  const [value, setValue] = useState(0);

  return (
    <div className="px-2 py-5 text-xl font-bold">
      <div>하루에 몇 번 정도</div>
      <div>거래하시나요?</div>
      <div className="font-normal text-[16px] text-gray-800 dark:text-gray-400 py-2">거래 성향을 알려주세요</div>

      <div className="flex flex-col gap-5 mx-5 mt-10">
        <div className="border border-orange-400 dark:border-orange-200 p-5 rounded-md flex justify-center items-center">하루에 1번 할까 말까해요</div>
        <div className="border border-orange-400 dark:border-orange-200 p-5 rounded-md flex justify-center items-center">하루에 1회 - 2회 거래해요</div>
        <div className="border border-orange-400 dark:border-orange-200 p-5 rounded-md flex justify-center items-center">하루에 2회 - 5회 거래해요</div>
        <div className="border border-orange-400 dark:border-orange-200 p-5 rounded-md flex justify-center items-center">하루에 5회 - 10회 거래해요</div>
        <div className="border border-orange-400 dark:border-orange-200 p-5 rounded-md flex justify-center items-center">하루에 10회 이상 거래해요</div>
      </div>

      <Button
        onClick={onClick}
        className={cn(
          buttonVariants({ size: "lg", variant: "outline" }),
          `w-40 transition-opacity duration-300 ${value ? "opacity-100" : "opacity-0"} text-orange-400 dark:text-orange-200 border border-orange-400 dark:border-orange-200`
        )}
      >
        <p>다음</p>
      </Button>
    </div>
  );
};

export default Page4;
