import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const data = [{}];
// box-shadow: 0 0 45px rgba(0, 0, 0, 0.07);

const EventItem = () => {
  return (
    <div className="flex-1  flex flex-col rounded-md shadow-[0_0_45px_rgba(0,0,0,0.07)] dark:border-gray-600 dark:border">
      <div className="min-w-60 h-32  bg-gray-200 dark:bg-gray-800 rounded-t-md flex justify-center items-center text-black">이미지</div>
      <div className="py-3 px-2">
        <p className="text-gray-800 dark:text-white">이벤트 타이틀</p>
        <p className="text-gray-900 dark:text-white font-bold pt-3">이벤트 내용</p>
        <p className="p-1 bg-gray-200 dark:bg-gray-900 my-2 w-fit rounded-sm text-xs">이벤트 남은 시간</p>
      </div>

      <div className="w-full px-2">
        <Button className={cn(buttonVariants({ variant: "outline", size: "lg" }), "w-full mb-5 text-orange-400 border-orange-400 dark:text-orange-200 dark:border-orange-200 self-center")}>
          <p>버튼 텍스트</p>
        </Button>
      </div>
    </div>
  );
};

const TradeList = () => {
  return (
    <div className="flex flex-wrap gap-10 py-20 max-w-screen-xl mx-auto">
      {Array(8)
        .fill()
        .map((v, i) => {
          return <EventItem key={i} />;
        })}
    </div>
  );
};

export default TradeList;
