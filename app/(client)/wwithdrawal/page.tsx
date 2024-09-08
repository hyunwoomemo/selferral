"use client";
import { getWithdrawal } from "@/actions/user/action";
import { cookies } from "next/headers";
import React, { useState } from "react";
import { Icons } from "@/components/icons";
import CardLineChart from "./chart";
import Calendar from "./calendar";

type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];

const Page = () => {
  const [value, onChange] = useState<Value>(new Date());
  const [tab, setTab] = useState(0);

  return (
    <div className="">
      <div className="bg-gradient-to-b to-orange-200 from-orange-500 text-white ">
        <div className="p-4 py-10">
          <div className="font-bold">9월에 받은 페이백</div>
          <div className="flex justify-between">
            <div className="font-bold text-3xl pt-2">
              <span className="">0 </span>
              <span>USDT</span>
            </div>
            <Icons.chart />
          </div>
          <div className="my-5 p-5 rounded-2xl bg-white text-gray-600 font-bold flex flex-col gap-1">
            <div>이번 달 페이백</div>
            <div className="text-gray-800 text-xl">
              <span className="text-orange-400">0 USDT </span>
              <span>받았어요</span>
            </div>
            <CardLineChart />
          </div>
        </div>

        <div className="rounded-t-3xl bg-white h-full text-gray-600 p-4">
          <div className="w-full bg-gray-100 rounded-lg p-[3px] flex gap-[3px]">
            <div onClick={() => setTab(0)} className={`cursor-pointer flex-1 flex justify-center items-center ${tab === 0 ? "bg-white" : undefined} p-2 rounded-lg`}>
              페이백 내역
            </div>
            <div onClick={() => setTab(1)} className={`cursor-pointer flex-1 flex justify-center items-center ${tab === 1 ? "bg-white" : undefined} p-2 rounded-lg`}>
              분석 리포트
            </div>
          </div>

          {/* <Calendar onChange={onChange} value={value} /> */}
          {/* {tab === 0 && <Calendar />} */}
          {/* {tab === 1 && (
            <div className="p-2 pt-10">
              <div className="font-bold text-lg">이번달 분석 리포트</div>
              <div className="pt-6 flex flex-col gap-4">
                <div>이번 달 열심히 페이백 받아봐요!</div>
                <div>친구와 함께 테더럴을 사용해볼까요?</div>
                <div>
                  이번 달에 출금한 페이백은 총 <span className="font-bold text-orange-400">0 USDT</span>에요
                </div>
                <div>출금을 위해 거래를 시작해볼까요?</div>
              </div>
            </div>
          )} */}
        </div>
      </div>
    </div>
  );
};

export default Page;
