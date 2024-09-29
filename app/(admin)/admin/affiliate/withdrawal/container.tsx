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

  const storedExchanges = useAtomValue(exchangesAtom);

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

        <div className="pt-5 pb-10">
          <Tab tab={tab} setTab={setTab} data={tabData} all />
        </div>
        {!data.total ? (
          <div>출금 신청 내역이 존재하지 않습니다.</div>
        ) : (
          <div className="h-full">
            <div className="flex flex-col gap-0 md:max-w-[80dvw] overflow-x-auto h-full">
              <div className="">
                <div className="flex gap-10 py-5 border-b-2">
                  <span className="flex justify-center min-w-[180px]">거래소</span>
                  <span className="flex justify-center min-w-[180px]">금액</span>
                  <span className="flex justify-center min-w-[180px]">USDT 주소</span>
                  <span className="flex justify-center min-w-[180px]">유저</span>
                  <span className="flex justify-center min-w-[180px]">상태</span>
                </div>
              </div>
              <div className="flex flex-col flex-auto">
                {data.list.map((item, index) => (
                  <div className="flex py-5 items-center" key={`${item.exchange_id} ${index}`}>
                    <div className="flex items-center  gap-10">
                      <span className="min-w-[180px] flex justify-center">{storedExchanges?.find((v) => v.exchange_id === item.exchange_id)?.name || item.exchange_id}</span>
                      <span className="flex justify-center items-center min-w-[180px]">{item.point}</span>
                      <span className="flex justify-center items-center min-w-[180px]">{item.usdt_address}</span>
                      <span className="flex justify-center items-center min-w-[180px]">{item.user_id}</span>
                      {/* <span className="flex justify-center items-center min-w-[180px] relative">
                      <span onClick={() => setIsVisible((prev) => (prev === item.id ? -1 : item.id))}>{stepData.find((v) => v.value === item.step).label}</span>
                      <div className={`absolute flex flex-col gap-4 top-10 items-center  ${isVisible === item.id ? "block" : "hidden"} bg-gray-700 z-10 p-3 rounded-lg`}>
                        {stepData
                          .filter((v) => v.value !== item.step)
                          .map((v) => (
                            <span key={v.value} onClick={() => handleUpdateStep({ id: item.id, step: v.value })}>
                              {v.label}
                            </span>
                          ))}
                      </div>
                    </span> */}
                      <span className="flex justify-center items-center min-w-[180px] relative">
                        {/* <Dropdown
                        value={stepData.find((v) => v.value === item.step)}
                        // placeholder={stepData.find((v) => v.value === item.step).label}
                        minWidth={100}
                        data={stepData.filter((v) => v.value !== item.step)}
                        isVisible={isVisible}
                        setIsVisible={setIsVisible}
                        dropdownClick={(v) => handleUpdateStep({ id: item.id, step: v.value })}
                      /> */}
                        <p onClick={() => setIsVisible((prev) => (prev === item.id ? -1 : item.id))}>{stepData.find((v) => v.value === item.step)?.label}</p>
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
                      </span>
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
              {total > 10 && <Pagination page={page} setPage={setPage} total={total} offset={10} />}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Container;
