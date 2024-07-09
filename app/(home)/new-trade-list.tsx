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
    <div className="flex flex-wrap md:grid md:grid-cols-[1.5fr_1fr_1fr_1fr_1fr] font-bold items-center bg-gradient-to-r to-gray-50 from-gray-100 dark:to-gray-800 dark:from-gray-900 p-4 rounded-md gap-4">
      <div className="flex items-center flex-1 min-w-full justify-between">
        <div className="flex items-center">
          <div className="min-w-[70px]">
            <div className="relative w-[50px]  h-[50px] flex items-center justify-center">
              <Image src={data.image} alt="exchange-logo" />
            </div>
          </div>
          <div>
            <p className="text-lg">{data.name}</p>
            <p className="text-gray-400">{data.tag}</p>
          </div>
        </div>
      </div>
      <div className=" flex whitespace-pre md:hidden">
        <p>페이백 </p>
        <p className="text-orange-400">{data.payback} + </p>
        <p>할인 </p>
        <p className="text-orange-400">{data.discount}</p>
      </div>
      <div
        className="flex whitespace-pre text-sm  md:hidden gap-2 p-1 px-2 bg-gray-200 dark:bg-gray-900 rounded-sm 
      text-gray-800 dark:text-gray-400"
      >
        <div className="flex ">
          <p>지정가 </p>
          <p className="text-orange-900 dark:text-orange-200">{data.limitOrder}</p>
          <p> 시장가 </p>
          <p className="text-orange-900 dark:text-orange-200">{data.marketOrder}</p>
        </div>
        <div>/</div>
        <div className="flex">
          <p>1인 평균 환급금 </p>
          <p className="text-orange-900 dark:text-orange-200">{data.averageRefund}</p>
        </div>
      </div>
      <div className="flex-1 justify-self-center hidden md:block">{data.averageRefund}</div>
      <div className="flex-1 justify-self-center  hidden md:block">{data.marketOrder}</div>
      <div className="flex-1 justify-self-center hidden md:block">{data.limitOrder}</div>
      <div className="p-1 px-2  bg-orange-100 dark:bg-gray-900 rounded-md  whitespace-pre flex-1 justify-center hidden md:flex flex-wrap">
        <p className="text-orange-500">{data.payback} </p>
        <p>페이백 + </p>
        <p className="text-orange-500">{data.discount} </p>
        <p>할인</p>
      </div>
    </div>
  );
};

const NewTradeList = () => {
  return (
    <div className="">
      <div className="flex flex-col flex-wrap gap-4 py-20 max-w-screen-xl mx-auto px-4">
        <div className="grid-cols-[1.5fr_1fr_1fr_1fr_1fr] p-4 font-bold text-gray-400 border-b border-orange-100 hidden md:grid">
          <div className="  ">거래소명</div>
          <div className=" justify-self-center ">1인 평균 환급금</div>
          <div className="  justify-self-center">지정가</div>
          <div className="  justify-self-center">시장가</div>
          <div className="  justify-self-center">페이백</div>
        </div>
        {dummyTrade.map((item, index) => (
          <TradeItem key={item.name + index} data={item} />
        ))}
      </div>
    </div>
  );
};

export default NewTradeList;
