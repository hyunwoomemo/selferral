"use client";
import { Button, buttonVariants } from "@/components/ui/button";
import { dummyTrade } from "@/dummy";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { useRouter } from "next/navigation";

const data = [{}];
// box-shadow: 0 0 45px rgba(0, 0, 0, 0.07);

const TradeItem = ({ data }: { data: any }) => {
  const router = useRouter();

  return (
    <div className="flex-1  flex flex-col rounded-md shadow-[0_0_45px_rgba(0,0,0,0.07)] dark:border-gray-600 dark:border font-bold">
      <div className="min-w-60 h-32  bg-gray-200 dark:bg-gray-800 rounded-t-md flex justify-center items-center text-black">
        <Image src={data.image} alt="exchange-image" />
      </div>
      <div className="py-3 px-2">
        <p className="text-gray-800 dark:text-white">{data.name}</p>
        <div className="flex whitespace-pre">
          <p className="text-gray-900 dark:text-white font-bold pt-3">수수료 </p>
          <p className="text-orange-400 font-bold pt-3">{data.payback}</p>
          <p className="text-gray-900 dark:text-white font-bold pt-3"> 페이백 +</p>
          <p className="text-orange-400 font-bold pt-3">{data.discount}</p>
          <p className="text-gray-900 dark:text-white font-bold pt-3"> 할인</p>
        </div>
        <p className="p-1 bg-gray-200 dark:bg-gray-900 my-2 w-fit rounded-sm text-xs">Lorem ipsum dolor sit.</p>
      </div>

      <div className="w-full px-2">
        <Button
          onClick={() => router.push(`/exchange/${data.name}`)}
          className={cn(buttonVariants({ variant: "outline", size: "lg" }), "w-full mb-5 text-orange-400 border-orange-400 dark:text-orange-200 dark:border-orange-200 self-center")}
        >
          <p>페이백 시작하기</p>
        </Button>
      </div>
    </div>
  );
};

const TradeList = () => {
  return (
    <div className="flex flex-wrap gap-10 py-20 max-w-screen-xl mx-auto">
      {dummyTrade.map((item, index) => (
        <TradeItem key={item.name + index} data={item} />
      ))}
    </div>
  );
};

export default TradeList;
