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
          {data.list.map((v, i) => (
            <div key={i}>{v.id}</div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Container;
