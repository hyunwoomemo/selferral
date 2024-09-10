"use client";
import { Button, buttonVariants } from "@/components/ui/button";
import { dummyTrade } from "@/dummy";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { useRouter } from "next/navigation";

// box-shadow: 0 0 45px rgba(0, 0, 0, 0.07);

const TradeItem = ({ data }: { data: any }) => {
  const router = useRouter();

  return (
    <div
      className="flex flex-wrap md:grid md:grid-cols-[1.5fr_1fr_1fr_1fr_1fr] font-bold items-center  p-3 px-4 border-b border-gray-100 dark:border-gray-800   gap-0 cursor-pointer"
      onClick={() => router.push(`/exchange/${data.id}`)}
    >
      <div className="flex items-center flex-1 min-w-full justify-between">
        <div className="flex items-center pl-2">
          <div className="min-w-[70px]">
            <div className="relative w-[50px]  h-[50px] flex items-center justify-center">{data.image_thumb && <Image src={data.image_thumb} width={50} height={50} alt="exchange-logo" />}</div>
          </div>
          <div>
            <p className="text-sm md:text-lg">{data.name}</p>
            <p className="text-gray-400">{data.nameExt}</p>
          </div>
        </div>
      </div>
      <div className=" flex whitespace-pre md:hidden">
        <p>페이백 </p>
        <p className="text-orange-400">{data?.payback?.replaceAll("%", "") && data?.payback?.replaceAll("%", "") != "null" && `${data?.payback?.replaceAll("%", "")}%`} </p>
        {data?.discount?.replaceAll("%", "") && data?.discount?.replaceAll("%", "") != "null" && (
          <>
            <p>+ </p>
            <p>할인 </p>
            <p className="text-orange-400">{data?.discount?.replaceAll("%", "")}%</p>
          </>
        )}
      </div>
      <div
        className="flex whitespace-pre text-sm  md:hidden gap-2 p-1 px-2 bg-gray-50 dark:bg-gray-900 rounded-sm 
      text-gray-800 dark:text-gray-400"
      >
        <div className="flex ">
          <p>지정가 </p>
          <p className="text-orange-400 dark:text-orange-200">{data?.limit_order?.replace("%", "") && data?.limit_order?.replace("%", "") !== "null" && `${data?.limit_order?.replace("%", "")}%`}</p>
          <p> 시장가 </p>
          <p className="text-orange-400 dark:text-orange-200">
            {data?.market_order?.replace("%", "") && data?.market_order?.replace("%", "") !== "null" && `${data?.market_order?.replace("%", "")}%`}
          </p>
        </div>
        {/* <div>/</div> */}
        {/* <div className="flex">
          <p>1인 평균 환급금 </p>
          <p className="text-orange-900 dark:text-orange-200">{Number(data.average_refund).toLocaleString()}</p>
        </div> */}
      </div>
      <div className="flex-1 justify-self-center  hidden md:block">
        {data?.limit_order?.replace("%", "") && data?.limit_order?.replace("%", "") !== "null" && `${data?.limit_order?.replace("%", "")}%`}
      </div>
      <div className="flex-1 justify-self-center hidden md:block">
        {data?.market_order?.replace("%", "") && data?.market_order?.replace("%", "") !== "null" && `${data?.market_order?.replace("%", "")}%`}
      </div>
      <div className="flex-1 justify-self-center hidden md:block">{data?.payback?.replace("%", "") && data?.payback?.replace("%", "") !== "null" && `${data.payback?.replace("%", "")}%`}</div>
      <div className="flex-1 justify-self-center hidden md:block">{data?.discount?.replace("%", "") && data?.discount?.replace("%", "") !== "null" && `${data?.discount?.replace("%", "")}%`}</div>
    </div>
  );
};

const NewTradeList = ({ data }) => {
  return (
    <div className="flex flex-col flex-auto bg-white dark:bg-gray-950 my-5">
      <div className="flex flex-col flex-wrap  py-10">
        <div className="grid-cols-[1.5fr_2fr_1fr_1fr] p-0 font-bold text-gray-100  hidden md:grid">
          <div className="  "></div>
          <div className="  justify-self-center white tracking-widest font-bold text-gray-600">페이백을 감안한 수수료율</div>
          <div className=" justify-self-center "></div>
          <div className="  justify-self-center"></div>
          <div className="  justify-self-center"></div>
        </div>
        <div className="grid-cols-[1.5fr_1fr_1fr_1fr_1fr] p-4 font-bold text-gray-400 border-b border-gray-100 dark:border-gray-800   hidden md:grid ">
          <div className="pl-2">거래소명</div>
          {/* <div className=" justify-self-center ">1인 평균 환급금</div> */}
          <div className="  justify-self-center">지정가</div>
          <div className="  justify-self-center">시장가</div>
          <div className="  justify-self-center">페이백</div>
          <div className="  justify-self-center">할인</div>
        </div>
        {data?.map((item, index) => (
          <TradeItem key={item.name + index} data={item} />
        ))}
      </div>
    </div>
  );
};

export default NewTradeList;
