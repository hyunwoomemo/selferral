import { getExchange } from "@/app/action";
import { Button, buttonVariants } from "@/components/ui/button";
import { dummyTrade } from "@/dummy";
import { cn } from "@/lib/utils";
import Image from "next/image";

export default async function Page({ params }) {
  console.log("params", params);
  const data = await getExchange(params.id);

  console.log(data);

  return (
    <div className="p-5 md:px-10 overflow-x-hidden">
      <h2 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black py-10">{data.name}</h2>
      <div className="md:flex gap-10">
        <div style={{ flex: 1 }} className="h-full flex flex-col">
          <div className="flex h-full justify-center items-center py-5 rounded-md relative min-h-20">
            <Image src={data.round_image} height={100} width={100} />
          </div>
          <Button
            // onClick={() => router.push(`/exchange/${data.name}`)}
            className={cn(buttonVariants({ variant: "outline", size: "lg" }), "w-full my-5 text-orange-400 border-orange-400 dark:text-orange-200 dark:border-orange-200")}
          >
            <p>페이백 계정 만들기</p>
          </Button>
        </div>
        <div style={{ flex: 5 }}>
          <div className="flex flex-wrap gap-5 p-3 border border-gray-200 dark:border-gray-700 rounded-md">
            <div className="flex-1 min-w-[400px] ">
              <p>수수료 할인</p>
              <p>{data.discount}%</p>
            </div>
            <div className="flex-1 min-w-[400px] ">
              <p>페이백을 감안한 수수료</p>
              <div className="flex gap-2">
                <div className="flex whitespace-pre-wrap">
                  <p>지정가 </p>
                  <p>{data.limit_order}</p>
                </div>
                <div className="flex whitespace-pre-wrap">
                  <p>시장가 </p>
                  <p>{data.market_order}</p>
                </div>
              </div>
            </div>
            <div className=" flex-1 min-w-[400px]">
              <p>수수료 페이백</p>
              <p>{data.payback}%</p>
            </div>
            {/* <div className=" flex-1 min-w-[400px]">
              <p>수수료 할인</p>
              <p>50%</p>
            </div> */}
          </div>
          <div className="flex gap-5">
            <Button
              // onClick={() => router.push(`/exchange/${data.name}`)}
              className={cn(buttonVariants({ variant: "outline", size: "lg" }), " my-5 text-gray-400 border-gray-400 dark:text-gray-200 dark:border-gray-200")}
            >
              <p>고객센터</p>
            </Button>
            <Button
              // onClick={() => router.push(`/exchange/${data.name}`)}
              className={cn(buttonVariants({ variant: "outline", size: "lg" }), " my-5 text-gray-400 border-gray-400 dark:text-gray-200 dark:border-gray-200")}
            >
              <p>블로그</p>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
