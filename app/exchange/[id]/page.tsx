import { Button, buttonVariants } from "@/components/ui/button";
import { dummyTrade } from "@/dummy";
import { cn } from "@/lib/utils";
import Image from "next/image";

export default function Page({ params }) {
  console.log("params", params);

  return (
    <div className="p-5 md:px-10">
      <h2 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black py-10">{dummyTrade.find((v) => v.name === params.id).name}</h2>
      <div className="md:flex gap-10">
        <div style={{ flex: 1 }} className="h-full flex flex-col">
          <div className="flex h-full justify-center items-center py-5 bg-gray-200 dark:bg-gray-800 rounded-md relative min-h-40">
            <Image src={dummyTrade.find((v) => v.name.toLowerCase() === params.id.toLowerCase())?.image} />
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
              <p>50%</p>
            </div>
            <div className="flex-1 min-w-[400px] ">
              <p>수수료 할인</p>
              <p>50%</p>
            </div>
            <div className=" flex-1 min-w-[400px]">
              <p>수수료 할인</p>
              <p>50%</p>
            </div>
            <div className=" flex-1 min-w-[400px]">
              <p>수수료 할인</p>
              <p>50%</p>
            </div>
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
