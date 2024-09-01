"use client";

import moment from "moment";
import React, { useState } from "react";
import UserType from "./user-type";
import { setUserType } from "@/actions/user/action";

const Container = ({ users, token }) => {
  const [isVisible, setIsVisible] = useState(-1);

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
    const res = await setUserType({ token, id, type });
  };

  return (
    <div className="font-bold flex-auto flex-col p-8 flex">
      <h1 className="text-3xl">유저</h1>
      <div className="flex flex-col flex-auto ">
        <div className="pt-10 md:grid md:grid-cols-5 p-2 text-center border-b-[1px]">
          <div>이메일</div>
          <div>이름</div>
          <div>휴대폰번호</div>
          <div>가입일</div>
          <div>유저 타입</div>
        </div>
        <div className=" flex-[8]">
          {users.DATA.map((user, index) => {
            console.log(user);
            const { email, name, hp, createdAt, type } = user;
            return (
              <div
                key={index}
                className=" md:grid md:grid-cols-5 p-2 py-6 hover:bg-gray-100 hover:dark:bg-[rgb(26,26,36)] hover:rounded-md text-center border-b-[1px] hover:border-none border-gray-200 dark:border-gray-900"
              >
                <div>{email}</div>
                <div>{name}</div>
                <div>{hp}</div>
                <div>{moment(createdAt).format("YYYY-MM-DD")}</div>
                {/* <UserType id={user.id} typeData={typeData} token={token} isVisible={isVisible}>
                  
                </UserType> */}
                <div className="cursor-pointer relative">
                  <span onClick={() => setIsVisible((prev) => (prev === user.id ? null : user.id))}>{getUserTypeText(user.type)}</span>
                  <div className={`absolute flex flex-col gap-4 top-10 items-center  ${isVisible === user.id ? "block" : "hidden"} bg-gray-700 z-10 p-3 rounded-md left-[50%] translate-x-[-50%]`}>
                    {typeData
                      .filter((v) => v.value !== user.type)
                      .map((v) => (
                        <span onClick={() => handleUpdateType({ id: user.id, type: v.value })}>{v.label}</span>
                      ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        {/* <div className="">페이지네이션</div> */}
      </div>
    </div>
  );
};

export default Container;
