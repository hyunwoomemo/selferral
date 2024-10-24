import { getWithdrawal } from "@/actions/user/action";

import { Button, buttonVariants } from "@/components/ui/button";
import Title from "@/components/ui/title";
import { cn } from "@/lib/utils";
import { cookies } from "next/headers";
import Link from "next/link";
import React from "react";

const stepData = [
  {
    value: 0,
    label: "신청",
  },
  {
    value: 1,
    label: "처리중",
  },
  {
    value: 2,
    label: "거절",
  },
  {
    value: 4,
    label: "완료",
  },
];

const Page = async ({ searchParams }) => {
  const withdrawal = await getWithdrawal({});

  const exchange_id = searchParams?.exchange_id;

  const data = withdrawal.data;

  const listData = data?.list.filter((v) => (exchange_id ? v.exchange_id == exchange_id : v));

  const exchange_name = data?.list.find((v) => v.exchange_id == exchange_id)?.exchange_name;

  const renderItem = () => {
    if (!data?.total) return <div>데이터가 존재하지 않습니다.</div>;

    // return data?.list.map((v, i) => <div key={i}>{i}</div>);

    return (
      <>
        <div className="grid grid-cols-4 border-b border-gray-100 bg-gray-100 py-2">
          <span className="flex justify-center text-gray-600">거래소</span>
          <span className="flex justify-center text-gray-600">금액</span>
          <span className="flex justify-center text-gray-600">USDT 주소</span>
          <span className="flex justify-center text-gray-600">상태</span>
        </div>
        <div className="grid grid-cols-4 place-items-center gap-4 border-b border-gray-100 dark:border-gray-800 py-2">
          {listData.map((v, i) => {
            return (
              <React.Fragment key={`${v.usdt_address} ${i}`}>
                <span className="flex justify-center ">{v.exchange_name}</span>
                <span className="flex justify-center">{Number(v.point).toLocaleString()}</span>
                <span className="truncate max-w-[50px] sm:max-w-[200px]">{v.usdt_address}</span>
                <span
                  className={cn(
                    "flex justify-center py-1 px-4 bg-orange-400 justify-self-center font-bold rounded-full",
                    v.step > -1 ? `bg-orange-${v.step + 1}00` : "bg-orange-500",
                    v.step < 4 ? "text-gray-600" : "text-white"
                  )}
                >
                  {stepData.find((v1) => v1.value === v.step).label}
                </span>
              </React.Fragment>
            );
          })}
        </div>
      </>
    );
  };

  return (
    <div className="p-2 flex-auto flex flex-col">
      {/* <div className="flex justify-between items-center">
        <div className="text-2xl font-bold">출금</div>
        <Link
          href={"/user/withdrawal/set"}
          // onClick={handleSetWithdrawal}
          className={cn(
            buttonVariants({ size: "lg", variant: "outline" }),
            "max-w-52   md:min-w-40  my-5 py-5 border border-orange-400 text-orange-400 text-lg dark:border-orange-200 dark:text-orange-200"
          )}
        >
          {"출금 신청"}
        </Link>
      </div> */}
      <Title
        text={exchange_id ? `${exchange_name} 출금 내역` : "출금 내역"}
        buttons={[
          exchange_id ? (
            <Link
              key={"allwithdrawal"}
              href={"/user/withdrawal"}
              className={cn(buttonVariants({ size: "sm", variant: "outline" }), " border border-orange-400 text-orange-400  dark:border-orange-200 dark:text-orange-200")}
            >
              전체 거래소 보기
            </Link>
          ) : undefined,
          <Link
            key={"withdrawalset"}
            href={"/user/withdrawal/set"}
            // onClick={handleSetWithdrawal}
            className={cn(buttonVariants({ size: "sm", variant: "outline" }), " border border-orange-400 text-orange-400  dark:border-orange-200 dark:text-orange-200")}
          >
            {"출금 신청"}
          </Link>,
        ]}
      />
      <div className="flex-auto  rounded-md  bg-white dark:bg-gray-950 my-5">{renderItem()}</div>
    </div>
  );
};

export default Page;
