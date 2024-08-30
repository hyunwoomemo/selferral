import { getWithdrawal } from "@/actions/user/action";
import { cookies } from "next/headers";
import React from "react";

const Page = async () => {
  const token = cookies().get("token");
  console.log("token", token);
  const withdrawal = await getWithdrawal({ token: token.value });

  const data = withdrawal.data;

  const renderItem = () => {
    if (!data.total) return <div>데이터가 존재하지 않습니다.</div>;

    return data.list.map((v, i) => <div>{i}</div>);
  };

  return (
    <div className="p-4 max-w-screen-xl mx-auto">
      <div className="text-3xl font-bold">출금</div>
      <div className="py-4">{renderItem()}</div>
    </div>
  );
};

export default Page;
