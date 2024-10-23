import { getExchanges, getUidList, getUidListById, getUidRegisterStatus } from "@/actions/trade/action";
import { getAllUser } from "@/actions/user/action";
import Table from "@/components/ui/table";
import moment from "moment";
import { cookies } from "next/headers";
import React from "react";

const page = async () => {
  const data = await getUidRegisterStatus({ status: 1, exchange_id: 0, rownum: 10, page: 1 });

  const exchangeData = await getExchanges();

  const users = await getAllUser();

  const a = await getUidList({});

  const tableData = await data.data.list.map((v) => ({
    UID: v.user_uid,
    거래소명: exchangeData?.data?.find((v) => v.exchange_id == v.exchange_id)?.name,
    유저: users.DATA.find((user) => user.id == v.user_id).email,
    커미션: v.point ? `${parseInt(v.point).toLocaleString()} USDT` : 0,
    등록일: moment(v.createtime).format("YYYY-MM-DD HH:mm"),
  }));

  return (
    <div className="font-bold flex-auto flex-col p-8 flex">
      <div className="flex justify-between">
        <h1 className="text-3xl">UID 등록 완료</h1>
      </div>
      <div className="pt-10">
        <Table data={tableData} wide />
      </div>
    </div>
  );
};

export default page;
