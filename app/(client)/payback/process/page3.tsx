import { Button, buttonVariants } from "@/components/ui/button";
import { dummyTrade } from "@/dummy";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

const Page3 = ({ selectTrade }: { selectTrade: string }) => {
  const [value, setValue] = useState(0);
  const router = useRouter();

  return (
    <div className="px-2 py-10 text-xl font-bold">
      <div>시드가</div>
      <div>얼마나 되시나요?</div>
      <div className="font-normal text-[16px] text-gray-800 dark:text-gray-400 py-2">{selectTrade}에 보유한 총 시드를 알려주세요</div>
      <input
        type="number"
        placeholder="시드를 입력해주세요"
        onChange={(e) => setValue(Number(e.target.value))}
        className="w-full my-20 px-5 py-5 bg-transparent outline-orange-400 dark:outline-orange-200"
      />
      <Button
        onClick={() => router.push("/payback/process/4")}
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

export default Page3;
