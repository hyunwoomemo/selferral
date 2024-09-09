"use client";
import { userAtom } from "@/app/store/user";
import { useAtomValue } from "jotai";
import { ChevronsRight, CircleDollarSign, CircleUserRound, User } from "lucide-react";
import moment from "moment";
import Link from "next/link";
import React from "react";

const MyReward = ({ usdt }) => {
  const user = useAtomValue(userAtom);

  console.log("useruser", user);

  return (
    <>
      {user && Object.keys(user).length > 0 && (
        <div className="px-4 py-10 flex gap-6 font-bold flex-col sm:flex-row">
          <div className="rounded-3xl bg-gradient-to-l to-orange-400 dark:to-[#db6a00] from-orange-500 dark:from-[#c45f00]  border-0 border-orange-500 flex-1  text-white p-5">
            <div>
              <div>나의 리워드</div>
              <div>
                <span className="text-3xl">{usdt?.toLocaleString() || 0} </span>
                <span>USDT</span>
              </div>
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
          <Link href={"/user"} className="rounded-3xl border-2 border-orange-400 dark:border-[#db6a00] flex-1 flex flex-col text-gray-600 dark:text-gray-300 p-5">
            <div className="flex gap-2 items-center">
              <CircleUserRound />
              <div>마이 페이지</div>
            </div>
            <div className="mt-auto text-sm flex justify-end gap-2">
              <span>최근 접속일: </span>
              <span>{moment(user.lastlogin).format("YYYY-MM-DD HH:mm")}</span>
            </div>
          </Link>
        </div>
      )}
    </>
  );
};

export default MyReward;
