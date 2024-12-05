import { getWithdrawal } from "@/actions/user/action";
import { Button, buttonVariants } from "@/components/ui/button";
import Title from "@/components/ui/title";
import { cn } from "@/lib/utils";
import Link from "next/link";
import React from "react";

const stepData = [
  { value: 0, label: "신청" },
  { value: 1, label: "처리중" },
  { value: 2, label: "거절" },
  { value: 4, label: "완료" },
];

const Page = async ({ searchParams }) => {
  let withdrawal;

  try {
    withdrawal = await getWithdrawal({});
  } catch (error) {
    console.error("Error fetching withdrawal data:", error);
    return <div>데이터를 불러오는 중 오류가 발생했습니다. 다시 시도해 주세요.</div>;
  }

  // Ensure 'withdrawal' and 'withdrawal.data' are defined
  const data = withdrawal?.data;
  if (!data || !data.list || data.list.length === 0) {
    return <div className="p-4">데이터가 존재하지 않습니다.</div>;
  }

  const exchange_id = searchParams?.exchange_id;
  const listData = data.list.filter((v) => (exchange_id ? v.exchange_id == exchange_id : v));
  const exchange_name = data.list.find((v) => v.exchange_id == exchange_id)?.exchange_name;

  const renderItem = () => (
    <>
      <div className="grid grid-cols-4 border-b border-gray-100 bg-gray-100 py-2">
        <span className="flex justify-center text-gray-600">거래소</span>
        <span className="flex justify-center text-gray-600">금액</span>
        <span className="flex justify-center text-gray-600">USDT 주소</span>
        <span className="flex justify-center text-gray-600">상태</span>
      </div>
      <div className="grid grid-cols-4 place-items-center gap-4 border-b border-gray-100 dark:border-gray-800 py-2">
        {listData.map((v, i) => (
          <React.Fragment key={`${v.usdt_address}-${i}`}>
            <span className="flex justify-center">{v.exchange_name}</span>
            <span className="flex justify-center">{Number(v.point).toLocaleString()}</span>
            <span className="truncate max-w-[50px] sm:max-w-[200px]">{v.usdt_address}</span>
            <span className={cn("flex justify-center py-1 px-4 font-bold rounded-full", v.step > -1 ? `bg-orange-${v.step + 1}00` : "bg-orange-500", v.step < 4 ? "text-gray-600" : "text-white")}>
              {stepData.find((step) => step.value === v.step)?.label || "알 수 없음"}
            </span>
          </React.Fragment>
        ))}
      </div>
    </>
  );

  return (
    <div className="p-2 flex-auto flex flex-col">
      <Title
        text={exchange_id ? `${exchange_name} 출금 내역` : "출금 내역"}
        buttons={[
          exchange_id && (
            <Link
              key="allwithdrawal"
              href="/user/withdrawal"
              className={cn(buttonVariants({ size: "sm", variant: "outline" }), "border border-orange-400 text-orange-400 dark:border-orange-200 dark:text-orange-200")}
            >
              전체 거래소 보기
            </Link>
          ),
          <Link
            key="withdrawalset"
            href="/user/withdrawal/set"
            className={cn(buttonVariants({ size: "sm", variant: "outline" }), "border border-orange-400 text-orange-400 dark:border-orange-200 dark:text-orange-200")}
          >
            출금 신청
          </Link>,
        ]}
      />
      <div className="flex-auto rounded-md bg-white dark:bg-gray-950 my-5">{renderItem()}</div>
    </div>
  );
};

export default Page;
