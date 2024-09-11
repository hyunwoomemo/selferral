// import { getExchange } from "@/app/action";
import { getExchanges } from "@/actions/trade/action";
import { Button, buttonVariants } from "@/components/ui/button";
import Title from "@/components/ui/title";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

export default async function Page({ params }) {
  const data = await getExchanges();

  const exchangeData = await data.data.find((v) => v.id == Number(params.id));

  return (
    <div className="p-5 md:px-10 overflow-x-hidden ">
      {/* <h2 className="text-3xl font-black py-10">{exchangeData.name}</h2> */}
      <Title
        text={exchangeData.name}
        size="lg"
        bold
        // buttons={[
        //   <Link
        //     key={"customer"}
        //     href={exchangeData.customer_url ? exchangeData.customer_url : ""}
        //     target="_blank"
        //     // onClick={() => router.push(`/exchange/${exchangeData.name}`)}
        //     className={cn(buttonVariants({ variant: "outline", size: "lg" }), " my-5 text-gray-400 border-gray-400 dark:text-gray-400 dark:border-gray-400")}
        //   >
        //     <p>고객센터</p>
        //   </Link>,
        //   <Link
        //     key={"blog"}
        //     href={exchangeData.blog_url ? exchangeData.blog_url : ""}
        //     target="_blank"
        //     // onClick={() => router.push(`/exchange/${exchangeData.name}`)}
        //     className={cn(buttonVariants({ variant: "outline", size: "lg" }), " my-5 text-gray-400 border-gray-400 dark:text-gray-400 dark:border-gray-400")}
        //   >
        //     <p>블로그</p>
        //   </Link>,
        // ]}
      />
      <div className="md:flex gap-10">
        <div className="flex flex-col flex-1 justify-between py-3">
          <div className="flex flex-1 h-full justify-center items-center py-2 rounded-lg relative min-h-20">
            {exchangeData.image_thumb && <Image className="mb-5" src={exchangeData.image_thumb} height={100} width={100} alt="image" />}
          </div>
          <Link
            href={exchangeData.affiliate_join_url}
            target="_blank"
            className={cn(buttonVariants({ variant: "outline", size: "lg" }), "w-full   text-orange-400 border-orange-400 dark:text-orange-200 dark:border-orange-200")}
          >
            <p>페이백 계정 만들기</p>
          </Link>
        </div>
        <div style={{ flex: 5, display: "flex", flexDirection: "column" }}>
          <div className="flex-1 flex flex-wrap md:gap-2 border-gray-400  border md:border-none  rounded-lg">
            <div className="min-w-[250px] flex-1 border-b md:border p-2 border-gray-400 dark:border-gray-700 md:rounded-md flex flex-col gap-2  ">
              <p className="text-gray-500">수수료 할인</p>
              <p className="font-bold">{exchangeData.discount}%</p>
            </div>
            <div className="min-w-[250px] flex-1 border-b md:border border-gray-400 dark:border-gray-700 p-2 md:rounded-md flex flex-col gap-2">
              <p className="text-gray-500">페이백을 감안한 수수료</p>
              <div className="flex gap-2">
                <div className="flex whitespace-pre-wrap">
                  <p className="font-bold">지정가 </p>
                  <p className="font-bold">{exchangeData.limit_order}</p>
                </div>
                <div className="flex whitespace-pre-wrap">
                  <p className="font-bold">시장가 </p>
                  <p className="font-bold">{exchangeData.market_order}</p>
                </div>
              </div>
            </div>
            <div className=" min-w-[250px] flex-1  md:border border-gray-400 dark:border-gray-700 p-2 md:rounded-md flex flex-col gap-2 ">
              <p className="text-gray-500">수수료 페이백</p>
              <p className="font-bold">{exchangeData.payback}%</p>
            </div>
            {/* <div className=" flex-1 border p-2 rounded-md ">
              <p>수수료 할인</p>
              <p>50%</p>
            </div> */}
          </div>
          <div className="flex-1 flex flex-wrap gap-2 py-3  border-gray-400 dark:border-gray-700 rounded-lg">
            <div className="flex-1 text-center">
              <div className="bg-orange-400 py-2 flex-1 text-white font-bold rounded-t-md">이미 계정이 있으시다구요? 해결방법 Click!</div>
              <div className="flex border-l border-r border-b border-gray-400 dark:border-gray-700 ">
                <Link
                  key={"customer"}
                  href={exchangeData.customer_url ? exchangeData.customer_url : ""}
                  target="_blank"
                  // onClick={() => router.push(`/exchange/${exchangeData.name}`)}
                  className={cn(buttonVariants({ size: "lg" }), "border-r border-gray-400 dark:border-gray-700  text-gray-400  dark:text-gray-400  flex-1 rounded-none bg-white dark:bg-background")}
                >
                  <p className="text-gray-800 font-bold md:text-lg">고객센터</p>
                </Link>
                <Link
                  key={"blog"}
                  href={exchangeData.blog_url ? exchangeData.blog_url : ""}
                  target="_blank"
                  // onClick={() => router.push(`/exchange/${exchangeData.name}`)}
                  className={cn(buttonVariants({ size: "lg" }), "  text-gray-400 dark:text-gray-400 flex-1 rounded-none bg-white dark:bg-background")}
                >
                  <p className="text-gray-800 font-bold md:text-lg">블로그</p>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
