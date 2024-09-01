// import { getExchange } from "@/app/action";
import { getExchanges } from "@/actions/trade/action";
import { Button, buttonVariants } from "@/components/ui/button";
import { dummyTrade } from "@/dummy";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

export default async function Page({ params }) {
  // const exchangeData = await getExchange(params.id);

  // const data = await fetch("https://api.xn--3l2b13oekp.com/exchange/getExchanges");
  // const json = await data.json();

  const data = await getExchanges();

  const exchangeData = data.data.find((v) => v.id == Number(params.id));

  console.log("exchangeData", exchangeData);

  // console.log(exchangeData);

  return (
    <div className="p-5 md:px-10 overflow-x-hidden max-w-screen-xl mx-auto">
      <h2 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black py-10">{exchangeData.name}</h2>
      <div className="md:flex gap-10">
        <div style={{ flex: 1 }} className="h-full flex flex-col">
          <div className="flex h-full justify-center items-center py-5 rounded-md relative min-h-20">
            {exchangeData.image_thumb && <Image src={exchangeData.image_thumb} height={100} width={100} alt="image" />}
          </div>
          <Button
            // onClick={() => router.push(`/exchange/${exchangeData.name}`)}
            className={cn(buttonVariants({ variant: "outline", size: "lg" }), "w-full my-5 text-orange-400 border-orange-400 dark:text-orange-200 dark:border-orange-200")}
          >
            <p>페이백 계정 만들기</p>
          </Button>
        </div>
        <div style={{ flex: 5 }}>
          <div className="flex flex-wrap gap-5 p-3 border border-gray-200 dark:border-gray-700 rounded-md">
            <div className="flex-1 min-w-[400px] ">
              <p>수수료 할인</p>
              <p>{exchangeData.discount}%</p>
            </div>
            <div className="flex-1 min-w-[400px] ">
              <p>페이백을 감안한 수수료</p>
              <div className="flex gap-2">
                <div className="flex whitespace-pre-wrap">
                  <p>지정가 </p>
                  <p>{exchangeData.limit_order}</p>
                </div>
                <div className="flex whitespace-pre-wrap">
                  <p>시장가 </p>
                  <p>{exchangeData.market_order}</p>
                </div>
              </div>
            </div>
            <div className=" flex-1 min-w-[400px]">
              <p>수수료 페이백</p>
              <p>{exchangeData.payback}%</p>
            </div>
            {/* <div className=" flex-1 min-w-[400px]">
              <p>수수료 할인</p>
              <p>50%</p>
            </div> */}
          </div>
          <div className="flex gap-5">
            <Link
              href={exchangeData.customer_url}
              target="_blank"
              // onClick={() => router.push(`/exchange/${exchangeData.name}`)}
              className={cn(buttonVariants({ variant: "outline", size: "lg" }), " my-5 text-gray-400 border-gray-400 dark:text-gray-200 dark:border-gray-200")}
            >
              <p>고객센터</p>
            </Link>
            <Link
              href={exchangeData.blog_url}
              target="_blank"
              // onClick={() => router.push(`/exchange/${exchangeData.name}`)}
              className={cn(buttonVariants({ variant: "outline", size: "lg" }), " my-5 text-gray-400 border-gray-400 dark:text-gray-200 dark:border-gray-200")}
            >
              <p>블로그</p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
