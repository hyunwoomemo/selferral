import { Button, buttonVariants } from "@/components/ui/button";
import { dummyTrade } from "@/dummy";
import { cn } from "@/lib/utils";
import Image from "next/image";

const Page1 = ({ onClick, setSelectTrade, prev }: { onClick: () => void; setSelectTrade: (text: string) => void; prev: () => void }) => {
  return (
    <div className="px-2  text-xl font-bold">
      <Button
        onClick={prev}
        className={cn(buttonVariants({ size: "sm", variant: "outline" }), `absolute top-5 w-20 mb-5  text-orange-400 dark:text-orange-200 border border-orange-400 dark:border-orange-200`)}
      >
        <p>이전</p>
      </Button>
      <div>가장 자주 쓰는</div>
      <div>거래소 하나만 선택해주세요</div>
      <div className="font-normal text-[16px] text-gray-800 dark:text-gray-400 py-2">어떤 거래소를 이용하고 계신가요?</div>

      <div className="flex flex-wrap gap-5 py-10 justify-center">
        {dummyTrade.map((v) => (
          <div
            onClick={() => {
              onClick();
              setSelectTrade(v.name);
            }}
            className="min-w-[47%] flex items-center py-2 gap-2"
            key={v.name}
          >
            <div className="w-10 h-10 relative">
              <Image src={v.image} alt="image" />
            </div>
            <p>{v.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Page1;
