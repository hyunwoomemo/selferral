"use client";

import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";

const Page = () => {
  const router = useRouter();

  return (
    <div className="p-2">
      <div className="py-3 text-2xl font-bold">
        <p className="">지금 다른 사람들이</p>
        <p>돌려받는 수수료는 얼마?</p>
        <p className="text-gray-400  text-[16px] py-3 ">간단하게 조회하세요. 40초면 끝나요!</p>
      </div>
      <div className="w-full px-2">
        <Button
          onClick={() => router.push("/payback/process")}
          className={cn(buttonVariants({ variant: "outline", size: "lg" }), "w-full mb-5 text-orange-400 border-orange-400 dark:text-orange-200 dark:border-orange-200 self-center")}
        >
          <p>나도 거래 수수료 환급받기</p>
        </Button>
      </div>
    </div>
  );
};

export default Page;
