import Tab from "@/components/tab";
import React from "react";
import Container from "./container";
import { getExchanges, getUidRegisterStatus } from "@/actions/trade/action";
import { cookies } from "next/headers";
import { getAllUser } from "@/actions/user/action";
import moment from "moment";
import RegisterDropdown from "./standby/register-dropdown";
import Table from "@/components/ui/table";
import ServerPagination from "@/components/ui/server-pagination";

const page = async ({ searchParams }) => {
  const data = await getUidRegisterStatus({ status: searchParams.type || 0, exchange_id: 0, rownum: 20, page: searchParams.page || 1 });

  console.log("data13123123", data.data);

  const exchangeData = await getExchanges();

  const users = await getAllUser();

  const tableData = await data?.data?.list.map((v) => {
    // if (searchParams.type == 0) {
    return {
      거래소명: exchangeData?.data?.find((v1) => v1.exchange_id == v.exchange_id)?.name,
      유저: users.DATA.find((user) => user.id == v.user_id).email,
      UID: v.user_uid,
      커미션: v.point || 0,
      신청일: moment(v.createtime).format("YYYY-MM-DD HH:mm"),
      "": <RegisterDropdown id={v.id} type={searchParams.type} />,
    };
    // } else {
    //   return {
    //     거래소명: exchangeData?.data?.find((v1) => v1.exchange_id == v.exchange_id)?.name,
    //     유저: users.DATA.find((user) => user.id == v.user_id).email,
    //     UID: v.user_uid,
    //     신청일: moment(v.createtime).format("YYYY-MM-DD HH:mm"),
    //   };
    // }
  });

  return (
    <div className="font-bold flex-auto flex-col p-8 flex h-full gap-3">
      <div className="flex justify-between">
        <h1 className="text-3xl">UID</h1>
      </div>
      <div className="py-5">
        <Container />
      </div>
      <div className="flex-1">{tableData?.length > 0 ? <Table data={tableData} wide /> : <div className="p-2">데이터가 존재하지 않습니다.</div>}</div>
      {/* <ServerPagination offset={20} total={data.data.total} link={`/admin/user/uid?type=${searchParams.type || 0}`} /> */}
    </div>
  );
};

export default page;
