import { getExchanges, getUidRegisterStatus } from "@/actions/trade/action";
import { getAllUser } from "@/actions/user/action";
import { Button } from "@/components/ui/button";
import Dropdown from "@/components/ui/dropdown";
import Table from "@/components/ui/table";
import moment from "moment";
import { cookies } from "next/headers";
import Link from "next/link";
import React from "react";
import RegisterDropdown from "./register-dropdown";

const page = async () => {
  const token = cookies().get("token");

  const data = await getUidRegisterStatus({ token: token?.value, status: 0, exchange_id: 0, rownum: 20, page: 1 });

  console.log("data123", data?.data?.list);

  const exchangeData = await getExchanges();

  const users = await getAllUser();

  const tableData = await data?.data?.list.map((v) => ({
    거래소명: exchangeData?.data?.find((v1) => v1.exchange_id == v.exchange_id)?.name,
    유저: users.DATA.find((user) => user.id == v.user_id).email,
    UID: v.user_uid,
    신청일: moment(v.createtime).format("YYYY-MM-DD HH:mm"),
    "": <RegisterDropdown id={v.id} />,
  }));

  return (
    <div className="font-bold flex-auto flex-col p-8 flex">
      <div className="flex justify-between">
        <h1 className="text-3xl">UID 등록 대기</h1>
      </div>
      <div className="pt-10">{tableData?.length > 0 && <Table data={tableData} wide />}</div>
    </div>
  );
};

export default page;
