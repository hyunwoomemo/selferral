import { Button, buttonVariants } from "@/components/ui/button";
import { dummyTrade } from "@/dummy";
import { cn } from "@/lib/utils";
import Image from "next/image";

const Page1 = () => {
  return (
    <div className="px-2 py-5 text-xl font-bold">
      <div>가장 자주 쓰는</div>
      <div>거래소 하나만 선택해주세요</div>
      <div className="font-normal text-[16px] text-gray-800 dark:text-gray-400 py-2">어떤 거래소를 이용하고 계신가요?</div>

      <div className="flex flex-wrap gap-5 py-10 justify-center">
        {dummyTrade.map((v) => (
          <div className="min-w-[47%] flex items-center py-2 gap-2" key={v.name}>
            <div className="w-10 h-10 relative">
              <Image src={v.image} alt="image" />
            </div>
            <p>{v.name}</p>
          </div>
        ))}
      </div>

      <div className="flex gap-4 w-full justify-center">
        <Button className={cn(buttonVariants({ variant: "outline", size: "lg" }), "border border-orange-400 dark:border-orange-200 text-orange-400 dark:text-orange-200 w-fit px-16")}>
          <p>이전</p>
        </Button>
        <Button className={cn(buttonVariants({ variant: "outline", size: "lg" }), "border border-orange-400 dark:border-orange-200 text-orange-400 dark:text-orange-200 w-fit px-16")}>
          <p>다음</p>
        </Button>
      </div>
    </div>
  );
};

export default Page1;
