import { getWithdrawal } from "@/actions/user/action";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { cookies } from "next/headers";
import Link from "next/link";
import React from "react";

const Page = async () => {
  const token = cookies().get("token");
  console.log("token", token);
  const withdrawal = await getWithdrawal({ token: token.value });

  const data = withdrawal.data;

  console.log("data", data);

  const renderItem = () => {
    if (!data?.total) return <div>데이터가 존재하지 않습니다.</div>;

    return data.list.map((v, i) => <div key={i}>{i}</div>);
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
