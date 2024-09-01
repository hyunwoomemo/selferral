import { getWithdrawal } from "@/actions/user/action";

import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { revalidateTag } from "next/cache";
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

const Page = async () => {
  const token = cookies().get("token");
  console.log("token", token);
  const withdrawal = await getWithdrawal({ token: token.value });

  const data = withdrawal.data;

  console.log("data", data);

  const renderItem = () => {
    if (!data?.total) return <div>데이터가 존재하지 않습니다.</div>;

    // return data.list.map((v, i) => <div key={i}>{i}</div>);

    return (
      <div className="flex flex-col gap-0 md:max-w-[80dvw] overflow-x-auto">
        <div className="">
          <div className="flex gap-10 py-5 border-b-2">
            <span className="flex justify-center min-w-[180px]">거래소</span>
            <span className="flex justify-center min-w-[180px]">금액</span>
            <span className="flex justify-center min-w-[180px]">USDT 주소</span>
            <span className="flex justify-center min-w-[180px]">상태</span>
          </div>
        </div>
        <div className="flex flex-col flex-auto">
          {data.list.map((item, index) => (
            <div className="flex py-5 items-center" key={item.id}>
              <div className="flex items-center  gap-10">
                <span className="min-w-[180px] flex justify-center">{item.exchange_name}</span>
                <span className="flex justify-center items-center min-w-[180px]">{item.point}</span>
                <span className="flex justify-center items-center min-w-[180px]">{item.usdt_address}</span>
                <span className="flex justify-center items-center min-w-[180px]">{stepData.find((v) => v.value === item.step).label}</span>
              </div>
              {/* <div className="absolute right-10 flex gap-8">
              <Link href={`/admin/exchange/edit?id=${exchange.id}`}>
                <Pencil />
              </Link>
              <DeleteButton id={exchange.id} />
            </div> */}
            </div>
          ))}
        </div>
        {/* 옵션 */}
      </div>
    );
  };

  const handleSetWithdrawal = () => {};

  return (
    <div className="p-4 max-w-screen-xl mx-auto">
      <div className="text-3xl font-bold">출금</div>
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
      <div className="py-4">{renderItem()}</div>
    </div>
  );
};

export default Page;
