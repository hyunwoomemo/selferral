"use client";

import moment from "moment";
import React, { useCallback, useMemo, useState } from "react";
import { setUserType } from "@/actions/user/action";
import { ArrowBigDown, ArrowDown, ArrowDown01, ArrowDownCircle, ArrowDownSquare, RefreshCw } from "lucide-react";
import { useRouter } from "next/navigation";
import { revalidateTag } from "next/cache";
import { revalidate } from "@/actions/common/action";
import { useToast } from "@/hooks/useToast";
import Table from "@/components/ui/table";
import Image from "next/image";
import { API_URL } from "@/actions";
import { cn } from "@/lib/utils";

const Container = ({ users, exchanges }) => {
  const [isVisible, setIsVisible] = useState(-1);
  const [isAccordion, setIsAccordion] = useState(-1);

  const router = useRouter();
  const { addToast } = useToast();

  const getUserTypeText = (type) => {
    switch (type) {
      case "UT02":
        return "관리자";
      case "UT01":
        return "일반 회원";
      default:
        return type;
    }
  };

  console.log("ser.exchanges", users[0].exchanges);

  const typeData = [
    {
      label: "관리자",
      value: "UT02",
    },
    {
      label: "일반 회원",
      value: "UT01",
    },
  ];

  const handleUpdateType = async ({ id, type }) => {
    setIsVisible(-1);
    const res = await setUserType({ id, type });

    if (res.data === "ok") {
      addToast({ text: "유저 타입이 변경되었습니다." });
    } else {
      addToast({ text: "유저 타입 변경에 실패했습니다." });
    }
  };

  const tableData = useMemo(() => {
    return users.map((user) => {
      const { email, name, hp, createdAt, type, total } = user;

      console.log("isA", user.id);

      return {
        이메일: email,
        이름: name,
        번호: hp,
        가입일: moment(createdAt).format("YYYY-MM-DD"),
        커미션: (
          <div className="flex gap-2 justify-center relative" onClick={() => setIsAccordion((prev) => (prev === user.id ? -1 : user.id))}>
            <div>{Number(total).toLocaleString()}</div>
            {total > 0 && <ArrowDownCircle className={cn("transition-all", `${user.id === isAccordion ? "rotate-180" : undefined}`, "absolute left-[110%]")} />}
          </div>
        ),
        "유저 타입": (
          <div className="cursor-pointer relative w-full flex justify-center">
            <span onClick={() => setIsVisible((prev) => (prev === user.id ? null : user.id))}>{getUserTypeText(type)}</span>
            <div
              className={`absolute flex flex-col gap-4 top-10 items-center  ${
                isVisible === user.id ? "block" : "hidden"
              } bg-white border dark:bg-gray-400 z-10 p-3 w-full rounded-lg left-[50%] translate-x-[-50%]`}
            >
              {typeData
                .filter((v) => v.value !== user.type)
                .map((v) => (
                  <span key={v.value} onClick={() => handleUpdateType({ id: user.id, type: v.value })}>
                    {v.label}
                  </span>
                ))}
            </div>
          </div>
        ),
        accordion: isAccordion === user.id && (
          <div className=" flex flex-col gap-2 bg-white">
            {/* {user.exchanges && <Table data={user.exchanges} />} */}
            <div className="flex bg-gray-100 p-4">
              <div className="w-[80px]"></div>
              <div className="w-[150px]">거래소</div>
              <div className="w-[150px]">UID</div>
              <div className="w-[150px]">커미션</div>
            </div>
            {user.exchanges.map((v, i) => {
              console.log("vvvvv", exchanges);
              return (
                <div key={`${v.exchange_id} ${i}`} className="flex gap-0 items-center px-4 py-1">
                  {exchanges.find((v1) => v1.id === v.exchange_id)?.image_thumb ? (
                    <div className="w-[80px]">
                      <Image src={`${exchanges.find((v1) => v1.id === v.exchange_id)?.image_thumb}`} width={40} height={40} />
                    </div>
                  ) : (
                    <div className="w-[80px] min-h-[40px]"></div>
                  )}
                  <div className="w-[150px]">{exchanges.find((v1) => v1.id === v.exchange_id)?.name}</div>
                  <div className="w-[150px]">{v.user_uid}</div>
                  <div className="w-[150px]">{v.point || 0}</div>
                  {/* <div>{v.user_uid}</div> */}
                </div>
              );
            })}
            <div></div>
          </div>
        ),
      };
    });
  }, [users, isVisible, exchanges, isAccordion, setIsAccordion]);

  console.log("tableDatatableData", tableData);

  return (
    <div className="font-bold flex-auto flex-col p-8 flex">
      <div className="flex justify-between">
        <h1 className="text-3xl">유저</h1>
        <RefreshCw onClick={() => revalidate("users")} />
      </div>
      <Table data={tableData}></Table>
      {/* <div className="flex flex-col flex-auto ">
        <div className="pt-10 md:grid md:grid-cols-5 p-2 text-center border-b-[1px]">
          <div>이메일</div>
          <div>이름</div>
          <div>휴대폰번호</div>
          <div>가입일</div>
          <div></div>
          <div>유저 타입</div>
        </div>
        <div className=" flex-[8]">
          {users.map((user, index) => {
            console.log(user);
            const { email, name, hp, createdAt, type } =users user;
            return (
              <div
                key={index}
                className=" md:grid md:grid-cols-5 p-2 py-6 hover:bg-gray-100 hover:dark:bg-[rgb(26,26,36)] hover:rounded-lg text-center border-b-[1px] hover:border-none border-gray-200 dark:border-gray-900"
              >
                <div>{email}</div>
                <div>{name}</div>
                <div>{hp}</div>
                <div>{moment(createdAt).format("YYYY-MM-DD")}</div>
  
              </div>
            );
          })}
        </div>
      </div> */}
    </div>
  );
};

export default Container;
