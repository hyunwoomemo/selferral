import { BellRing } from "lucide-react";
import TradeReport from "./trade-report";
import { Suspense } from "react";

export default function Page() {
  return (
    <div className="px-2 py-5 font-bold">
      <div className="font-bold text-xl">내 페이백 예상 금액은?</div>
      <div className="flex gap-1 py-2">
        <div className="font-bold text-[18px] text-gray-400 ">AI가</div>
        <div className="font-bold text-[18px] text-oragne-400 dark:text-orange-400">24,237명</div>
        <div className="font-bold text-[18px] text-gray-400 ">을 꼼꼼하게 분석했어요</div>
      </div>
      <div className="py-5 my-10 px-5 bg-gray-100 dark:bg-gray-800 rounded-md">
        <p className="text-gray-400">30일 기준 예상 페이백 금액</p>
        <div className="flex justify-between py-3 items-center">
          <p className="text-orange-400 text-lg">1만원</p>
          <p>아이콘</p>
        </div>
        <div className="flex justify-between py-3 items-center mt-3 border-t-[1px] border-gray-200 dark:border-gray-700">
          <p className="text-gray-400 ">셀퍼럴 기준 금액</p>
          <p>5.7USDT</p>
        </div>
      </div>
      <div className="py-5 my-10 px-5 bg-gray-100 dark:bg-gray-800 rounded-md">
        <div className="flex gap-4 items-center px-2">
          <BellRing />
          <div className="flex flex-wrap whitespace-pre">
            <p>트레이더님과 비슷한 테더맥스 회원은 매달 </p>
            <p className="text-orange-400">1만원</p>
            <p>을 페이백 받고 있어요</p>
          </div>
        </div>
      </div>
      <Suspense>
        <TradeReport />
      </Suspense>
    </div>
  );
}
