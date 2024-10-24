"use client";
import { userAtom } from "@/app/store/user";
import { useAtomValue } from "jotai";
import { ChevronsRight, CircleDollarSign, CircleUserRound, User } from "lucide-react";
import moment from "moment";
import Link from "next/link";
import React from "react";
import { useMemo } from "react";
import { RefreshCw } from "lucide-react";
import { revalidate } from "@/actions/common/action";
import { useState } from "react";
import { useEffect } from "react";
import { cn } from "@/lib/utils";
import MyTrade from "./my-trade";

const MyReward = ({ uidData, exchanges }) => {
  const user = useAtomValue(userAtom);
  const [refresh, setRefresh] = useState(false);

  const usdt = useMemo(() => {
    return uidData.data?.DATA?.filter((v) => exchanges.data.find((v1) => v1.exchange_id === v.exchange_id)?.status === 1).reduce((result, cur) => {
      if (cur.point) {
        result = result + Number(cur.point);
      }

      return result;
    }, 0);
  }, [uidData]);

  useEffect(() => {
    if (refresh) {
      setTimeout(() => {
        setRefresh(false);
      }, 1000);
    }
  }, [refresh]);

  useEffect(() => {
    if (usdt === 0) {
      setRefresh(true);
    }
  }, [usdt]);

  return (
    <>
      {user && Object.keys(user).length > 0 && (
        <div className="px-4 py-10">
          <div className="flex gap-6 font-bold flex-col sm:flex-row md:max-w-[50%]">
            <div className="rounded-3xl bg-gradient-to-l to-orange-400 dark:to-[#db6a00] from-orange-500 dark:from-[#c45f00]  border-0 border-orange-500 flex-1  text-white p-5">
              <div className="flex justify-between">
                <div>
                  <div>나의 리워드</div>
                  <div>
                    <span className="text-xl md:text-3xl">{usdt?.toLocaleString() || 0} </span>
                    <span>USDT</span>
                  </div>
                </div>
                <RefreshCw
                  className={cn("cursor-pointer", refresh ? "refresh" : "")}
                  onClick={() => {
                    setRefresh(true);
                    revalidate("uidlist");
                  }}
                />
              </div>
              <div className="border-t my-5 border-gray-50 opacity-30"></div>
              <Link href={"/user/withdrawal"} className="flex gap-2 justify-between cursor-pointer">
                <div className="flex gap-2">
                  <CircleDollarSign />
                  <div>출금 신청</div>
                </div>
                <ChevronsRight />
              </Link>
            </div>
            {/* <Link href={"/user"} className="rounded-3xl border-2 border-orange-400 dark:border-[#db6a00] flex-1 flex flex-col text-gray-600 dark:text-gray-300 p-5">
              <div className="flex gap-2 items-center">
                <CircleUserRound />
                <div>마이 페이지</div>
              </div>
              <div className="mt-auto text-sm flex justify-end gap-2">
                <span>최근 접속일: </span>
                <span>{moment(user.lastlogin).format("YYYY-MM-DD HH:mm")}</span>
              </div>
            </Link> */}
          </div>
          {uidData?.data?.DATA?.length > 0 && <MyTrade uidData={uidData} exchanges={exchanges} />}
        </div>
      )}
    </>
  );
};

export default MyReward;
