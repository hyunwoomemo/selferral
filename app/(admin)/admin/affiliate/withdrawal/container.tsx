"use client";
import React, { useEffect, useMemo, useState } from "react";
import ExchangeTab from "./exchange-tab";
import { getWithdrawals } from "@/actions/trade/action";
import Tab from "@/components/tab";

const Container = ({ exchanges, token }) => {
  const [tab, setTab] = useState("all");
  const [data, setData] = useState({ total: 0, list: [] });

  useEffect(() => {
    getWithdrawals({ exchangeId: tab === "all" ? 0 : tab, token }).then((res) => setData(res.data));
  }, [tab]);

  const tabData = exchanges.data.map((v) => ({ label: v.name, value: v.exchange_id }));

  console.log("exchanges", exchanges, data);

  return (
    <div className="font-bold flex-auto flex-col p-8 flex">
      <h1 className="text-3xl">출금 신청 리스트</h1>
      {/* <ExchangeTab tab={tab} setTab={setTab} data={exchanges.data} /> */}

      <Tab tab={tab} setTab={setTab} data={tabData} all />
      {!data.total ? (
        <div>출금 신청 내역이 존재하지 않습니다.</div>
      ) : (
        <div>
          <div className="flex flex-col gap-0 md:max-w-[80dvw] overflow-x-auto">
            <div className="">
              <div className="flex gap-10 py-5 border-b-2">
                <span className="flex justify-center min-w-[180px]">거래소</span>
                <span className="flex justify-center min-w-[180px]">금액</span>
                <span className="flex justify-center min-w-[180px]">USDT 주소</span>
                <span className="flex justify-center min-w-[180px]">유저</span>
                <span className="flex justify-center min-w-[180px]">상태</span>
              </div>
            </div>
            <div className="flex flex-col">
              {data.list.map((item, index) => (
                <div className="flex py-5 items-center" key={item.id}>
                  <div className="flex items-center  gap-10">
                    <span className="min-w-[180px] flex justify-center">{item.exchange_id}</span>
                    <span className="flex justify-center items-center min-w-[180px]">{item.point}</span>
                    <span className="flex justify-center items-center min-w-[180px]">{item.usdt_address}</span>
                    <span className="flex justify-center items-center min-w-[180px]">{item.user_id}</span>
                    <span className="flex justify-center items-center min-w-[180px]">{item.step}</span>
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
        </div>
      )}
    </div>
  );
};

export default Container;
