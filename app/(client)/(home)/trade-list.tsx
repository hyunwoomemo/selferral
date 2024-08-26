"use client";
import { Button, buttonVariants } from "@/components/ui/button";
import { dummyTrade } from "@/dummy";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { useRouter } from "next/navigation";

// box-shadow: 0 0 45px rgba(0, 0, 0, 0.07);

const TradeItem = ({ data }: { data: any }) => {
  console.log("ddd", data);
  const router = useRouter();

  return (
    <div className="flex-1  mx-2 flex flex-col rounded-md   font-bold border border-gray-200 dark:border-gray-600">
      <div className="min-w-60 h-32  bg-background  rounded-t-md flex justify-center items-center text-black relative overflow-hidden border-b border-gray-200 dark:border-gray-600">
        {data.image_big && <Image src={data.image_big} fill className="object-cover md:object-contain" alt="exchange-image" />}
      </div>
      <div className="py-3 px-2">
        <p className="text-gray-800 dark:text-white">{data.name}</p>
        <div className="flex whitespace-pre">
          <p className="text-gray-900 dark:text-white font-bold pt-3">수수료 </p>
          <p className="text-orange-400 font-bold pt-3">{data.payback}%</p>
          <p className="text-gray-900 dark:text-white font-bold pt-3"> 페이백 +</p>
          <p className="text-orange-400 font-bold pt-3">{data.discount}%</p>
          <p className="text-gray-900 dark:text-white font-bold pt-3"> 할인</p>
        </div>
        <div className="flex whitespace-pre">
          <p className="text-gray-900 dark:text-gray-400 font-bold pt-3">지정가 </p>
          <p className="text-gray-900 dark:text-gray-400 font-bold pt-3">{data.limit_order}</p>
          <p className="text-gray-900 dark:text-gray-400 font-bold pt-3"> 시장가 </p>
          <p className="text-gray-900 dark:text-gray-400 font-bold pt-3">{data.market_order}</p>
          <p className="text-gray-900 dark:text-gray-400 font-bold pt-3"> / 1인 평균 환급금 </p>
          <p className="text-orange-400 font-bold pt-3">{Number(data.average_refund).toLocaleString()}</p>
        </div>
        <p className="p-1 bg-gray-100 dark:bg-gray-900 my-2 w-fit rounded-sm text-xs">{data.nameExt}</p>
      </div>

      <div className="w-full px-2">
        <Button
          onClick={() => router.push(`/exchange/${data.id}`)}
          className={cn(buttonVariants({ variant: "outline", size: "lg" }), "w-full mb-5 text-orange-400 border-orange-400 dark:text-orange-200 dark:border-orange-200 self-center")}
        >
          <p>페이백 시작하기</p>
        </Button>
      </div>
    </div>
  );
};

const TradeList = ({ data }) => {
  return (
    <div className="flex flex-wrap gap-10 py-10 max-w-screen-xl mx-auto">
      {data?.map((item, index) => (
        <TradeItem key={item.name + index} data={item} />
      ))}
    </div>
  );
};

export default TradeList;
