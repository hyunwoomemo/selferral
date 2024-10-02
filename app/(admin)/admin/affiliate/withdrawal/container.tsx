"use client";
import React, { useEffect, useMemo, useState } from "react";
import ExchangeTab from "./exchange-tab";
import { getWithdrawals, updateStep } from "@/actions/trade/action";
import Tab from "@/components/tab";
import { useToast } from "@/hooks/useToast";
import { useAtomValue } from "jotai";
import { exchangesAtom } from "@/app/store/trade";
import Dropdown from "@/components/ui/dropdown";
import Pagination from "@/components/pagination";
import Table from "@/components/ui/table";
import moment from "moment";

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

const Container = ({ exchanges }) => {
  const [tab, setTab] = useState("all");
  const [data, setData] = useState({ total: 0, list: [] });
  const [exchange, setExchange] = useState({});
  const [isVisible, setIsVisible] = useState(-1);
  const { addToast } = useToast();
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(1);

  console.log("isVsibile", isVisible);

  const storedExchanges = useAtomValue(exchangesAtom);

  const tableData = useMemo(() => {
    return data.list.map((item) => ({
      거래소: storedExchanges?.find((v) => v.exchange_id === item.exchange_id)?.name || item.exchange_id,
      금액: item.point,
      ["USDT 주소"]: item.usdt_address,
      유저: item.user_id,
      상태: (
        // <span className="flex justify-center items-center relative">
        //   <p className="cursor-pointer" onClick={() => setIsVisible((prev) => (prev === item.id ? -1 : item.id))}>
        //     {stepData.find((v) => v.value === item.step)?.label}
        //   </p>
        //   {isVisible === item.id && (
        //     <div className="absolute bg-white p-1 w-full items-center flex flex-col gap-2 top-[110%] z-30">
        //       {stepData
        //         .filter((v) => v.value !== item.step)
        //         .map((v, i) => (
        //           <div key={`${v.value} ${i}`} onClick={() => handleUpdateStep({ id: item.id, step: v.value })} className="hover:bg-gray-100 w-full text-center">
        //             {v.label}
        //           </div>
        //         ))}
        //     </div>
        //   )}
        // </span>
        <div className="cursor-pointer relative w-full flex justify-center">
          <span onClick={() => setIsVisible((prev) => (prev === item.id ? -1 : item.id))}>{stepData.find((v) => v.value === item.step)?.label}</span>

          {isVisible === item.id && (
            <div className="absolute bg-white p-1 w-full items-center flex flex-col gap-2 top-[110%] z-30">
              {stepData
                .filter((v) => v.value !== item.step)
                .map((v, i) => (
                  <div key={`${v.value} ${i}`} onClick={() => handleUpdateStep({ id: item.id, step: v.value })} className="hover:bg-gray-100 w-full text-center">
                    {v.label}
                  </div>
                ))}
            </div>
          )}
        </div>
      ),
      신청시간: moment(item.createtime).format("YYYY-MM-DD HH:mm"),
    }));
  }, [data, isVisible]);

  useEffect(() => {
    getWithdrawals({ exchangeId: tab === "all" ? 0 : tab, num: 10, page: page || 1 }).then((res) => {
      console.log("res123", res);
      setData(res.data);
      setTotal(res.data.total);
    });
  }, [tab, page]);

  console.log("res", data);
  const tabData = exchanges.data.map((v) => ({ label: v.name, value: v.exchange_id }));

  const handleUpdateStep = async ({ id, step }) => {
    const res = await updateStep({ withdrawlId: id, step });

    if (res.data === "OK") {
      getWithdrawals({ exchangeId: tab === "all" ? 0 : tab })
        .then((res) => setData(res.data))
        .finally(() => {
          setIsVisible(-1);
          addToast({ text: "출금 신청 상태가 수정되었습니다." });
        });
    }
  };

  return (
    <>
      {isVisible > -1 && <div onClick={() => setIsVisible(-1)} className="absolute top-0 right-0 left-0 bottom-0 bg-gray-50 opacity-40"></div>}

      <div className="font-bold flex-auto flex-col p-8 flex">
        <h1 className="text-3xl">출금 신청 리스트</h1>
        {/* <ExchangeTab tab={tab} setTab={setTab} data={exchanges.data} /> */}

        <div className="pt-5 pb-5">
          <Tab tab={tab} setTab={setTab} data={tabData} all />
        </div>
        {!data.total ? (
          <div>출금 신청 내역이 존재하지 않습니다.</div>
        ) : (
          <div className="h-full">
            <Table data={tableData} />
            <div className="pt-5">
              <Pagination page={page} setPage={setPage} total={total} offset={10} />
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Container;
