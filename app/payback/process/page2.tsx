import { Button, buttonVariants } from "@/components/ui/button";
import { dummyTrade } from "@/dummy";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { useState } from "react";

const Page2 = ({ onClick, prev }: { onClick: () => void }) => {
  const [value, setValue] = useState(0);

  return (
    <div className="px-2 text-xl font-bold">
      {/* <Button
        onClick={prev}
        className={cn(buttonVariants({ size: "sm", variant: "outline" }), `absolute top-5 w-20 mb-5  text-orange-400 dark:text-orange-200 border border-orange-400 dark:border-orange-200`)}
      >
        <p>이전</p>
      </Button> */}
      <div>레버리지 얼마나</div>
      <div>레버리지 얼마나요?</div>
      <div className="font-normal text-[16px] text-gray-800 dark:text-gray-400 py-2">평균적인 레버리지 배율을 알려주세요</div>
      <input
        type="number"
        placeholder="1 ~ 125 (숫자를 입력해주세요)"
        onChange={(e) => setValue(e.target.value)}
        className="w-full my-20 px-5 py-5 bg-transparent outline-orange-400 dark:outline-orange-200"
      />
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

export default Page2;
