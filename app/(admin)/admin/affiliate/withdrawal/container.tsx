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
import { cn } from "@/lib/utils";
import { ArrowDown01, ArrowUp01 } from "lucide-react";

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

const Container = ({ exchanges, users }) => {
  const [tab, setTab] = useState("all");
  const [data, setData] = useState({ total: 0, list: [] });
  const [exchange, setExchange] = useState({});
  const [isVisible, setIsVisible] = useState(-1);
  const { addToast } = useToast();
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(1);

  const [sort, setSort] = useState({
    createtime: "desc",
  });

  const handleSort = (type, value) => {
    setSort((prev) => ({ [type]: value }));
  };

  const headerData = [
    {
      label: "거래소",
      sort: () => handleSort("exchange_id", sort.exchange_id == "desc" ? "asc" : "desc"),
      sortKey: "exchange_id",
    },
    {
      label: "금액",
      sort: () => handleSort("point", sort.point == "desc" ? "asc" : "desc"),
      sortKey: "point",
    },
    {
      label: "USDT 주소",
    },
    {
      label: "유저",
      sort: () => handleSort("user_id", sort.user_id == "desc" ? "asc" : "desc"),
      sortKey: "user_id",
    },
    {
      label: "상태",
      sort: () => handleSort("step", sort.step == "desc" ? "asc" : "desc"),
      sortKey: "step",
    },
    {
      label: "신청시간",
      sort: () => handleSort("createtime", sort.createtime == "desc" ? "asc" : "desc"),
      sortKey: "createtime",
    },
  ];

  console.log("exchanges", exchanges);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [page]);

  const tableData = useMemo(() => {
    return data.list.map((item) => ({
      거래소: exchanges.data?.find((v) => v.exchange_id === item.exchange_id)?.name || item.exchange_id,
      금액: Number(item.point).toLocaleString(),
      ["USDT 주소"]: item.usdt_address,
      유저: users.find((v) => v.id === item.user_id)?.email,
      상태: (
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
      신청시간: moment(item.createtime).add(9, "hour").format("YYYY-MM-DD HH:mm"),
    }));
  }, [data, isVisible]);

  useEffect(() => {
    getWithdrawals({ exchangeId: tab === "all" ? 0 : tab, num: 10, page: page || 1, order: Object.keys(sort)[0], orderby: Object.entries(sort)[0][1] }).then((res) => {
      console.log("res123", res);
      setData(res.data);
      setTotal(res.data.total);
    });
  }, [tab, page, sort]);

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
            {/* <Table data={tableData} /> */}
            <div className={cn("bg-gray-50 my-4")}>
              <div className={`flex border-b p-3 px-5 bg-orange-100`}>
                {headerData
                  // .filter((v) => v !== "accordion")
                  .map((v) => (
                    <div className="flex-1 flex justify-center items-center gap-1" key={v}>
                      {v.label}
                      {v.sort ? (
                        sort[v.sortKey] == "desc" ? (
                          <ArrowUp01 onClick={v.sort} size={20} />
                        ) : (
                          <ArrowDown01 className={sort[v.sortKey] == "asc" ? "" : "opacity-30"} onClick={v.sort} size={20} />
                        )
                      ) : undefined}
                    </div>
                  ))}
              </div>
              {tableData.map((v, rowIndex) => {
                return (
                  <div key={v.id || rowIndex} className="bg-white">
                    <div className={`border-b p-5  hover:bg-orange-50 `} style={{ display: "flex", alignItems: "center" }}>
                      {Object.entries(v)
                        .filter(([key]) => key !== "accordion")
                        .map(([key, value], colIndex) => {
                          return (
                            <div id={"tableitem"} className=" flex-1 max-w-full  flex justify-center text-start cursor-pointer" key={`${key}-${colIndex}-${rowIndex}`}>
                              {value}
                            </div>
                          );
                        })}
                    </div>
                    {v.accordion}
                  </div>
                );
              })}
            </div>
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
