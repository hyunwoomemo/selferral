"use client";

import moment from "moment";
import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { getAllUsersWithUidStatus, setUserType } from "@/actions/user/action";
import { ArrowBigDown, ArrowDown, ArrowDown01, ArrowDownCircle, ArrowDownSquare, ArrowDownWideNarrow, ArrowUp01, ArrowUpWideNarrow, Filter, RefreshCw, Search } from "lucide-react";
import { useRouter } from "next/navigation";
import { revalidateTag } from "next/cache";
import { revalidate } from "@/actions/common/action";
import { useToast } from "@/hooks/useToast";
import Table from "@/components/ui/table";
import Image from "next/image";
import { API_URL } from "@/actions";
import { cn } from "@/lib/utils";
import Dropdown from "@/components/ui/dropdown";
import TypeDropdown from "./type-dropdown";
import { useAtom } from "jotai";
import { bottomSheetAtom } from "@/app/store/common";
import { Button, buttonVariants } from "@/components/ui/button";
import { register } from "module";
import Input from "@/components/input";
//name, email, hp , type , uid

const searchTypes = [
  {
    value: "name",
    label: "이름",
  },

  {
    value: "email",
    label: "이메일",
  },
  {
    value: "hp",
    label: "전화번호",
  },
  {
    value: "type",
    label: "유저 타입",
  },
  {
    value: "uid",
    label: "UID",
  },
];

const Container = ({ users, exchanges }) => {
  const [isVisible, setIsVisible] = useState(-1);
  const [isAccordion, setIsAccordion] = useState(-1);
  const [refresh, setRefresh] = useState(false);
  const [bottomSheet, setBottomSheet] = useAtom(bottomSheetAtom);
  const [dropdown, setDropdown] = useState(false);
  const [searchType, setSearchType] = useState(searchTypes[0]);
  const [result, setResult] = useState(null);

  const searchValue = useRef("");

  const [sort, setSort] = useState({
    register: 0,
    point: null,
  });

  const handleSort = (type, value) => {
    setSort((prev) => ({ [type]: value }));
  };

  const router = useRouter();
  const { addToast } = useToast();

  console.log("ss", sort);

  useEffect(() => {
    setBottomSheet((prev) => ({ ...prev, isVisible: false }));
  }, [sort]);

  const handleSearch = () => {
    console.log("tttt", searchType.value, searchValue.current);
    getAllUsersWithUidStatus({ type: searchType.value, text: searchValue.current }).then((res) => {
      console.log("sdmfksmdf", res);
    });
  };

  const handleChangeSearchValue = (e) => {
    searchValue.current = e.target.value;
  };
  const handleFilter = () => {
    setBottomSheet((prev) => ({
      ...prev,
      isVisible: true,
      contents: () => (
        <div className="p-4 flex flex-col gap-10">
          <div className="">
            <div>가입일</div>
            <div className="flex gap-4 py-2">
              <Button onClick={() => handleSort("register", 0)} className={cn("hover:bg-orange-400", sort.register !== 0 && buttonVariants({ variant: "secondary" }))}>
                가입일 빠른 순
              </Button>
              <Button onClick={() => handleSort("register", 1)} className={cn("hover:bg-orange-400", sort.register !== 1 && buttonVariants({ variant: "secondary" }))}>
                가입일 느린 순
              </Button>
            </div>
          </div>
          <div className="">
            <div>커미션</div>
            <div className="flex gap-4 py-2">
              <Button onClick={() => handleSort("point", 0)} className={cn("hover:bg-orange-400", sort.point !== 0 && buttonVariants({ variant: "secondary" }))}>
                커미션 많은 순
              </Button>
              <Button onClick={() => handleSort("point", 1)} className={cn("hover:bg-orange-400", sort.point !== 1 && buttonVariants({ variant: "secondary" }))}>
                커미션 적은 순
              </Button>
            </div>
          </div>
          {/* <div className="mt-auto">
            <Button>적용</Button>
          </div> */}
        </div>
      ),
    }));
  };

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
    const res = await setUserType({ id, type });

    if (res.data === "ok") {
      addToast({ text: "유저 타입이 변경되었습니다." });
    } else {
      addToast({ text: "유저 타입 변경에 실패했습니다." });
    }
  };

  const tableData = useMemo(() => {
    return users
      ?.sort((a, b) => {
        const totalDiff = sort.point === 0 ? Number(b.total) - Number(a.total) : sort.point === 1 ? Number(a.total) - Number(b.total) : undefined;
        const dateDiff = sort.register === 0 ? new Date(b.createdAt) - new Date(a.createdAt) : sort.register === 1 ? new Date(a.createdAt) - new Date(b.createdAt) : undefined;

        return dateDiff || totalDiff;
      })
      ?.map((user) => {
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
              <span className="border p-1 px-4 rounded-md" onClick={() => setIsVisible((prev) => (prev === user.id ? null : user.id))}>
                {getUserTypeText(type)}
              </span>
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
            // <TypeDropdown id={user.id} />
          ),
          accordion: (
            <div className={cn("origin-top-right flex overflow-hidden flex-col gap-2 bg-gray-50", isAccordion === user.id ? "scale-y-100 h-full" : "scale-y-0 h-0", "transition-all border")}>
              {/* {user.exchanges && <Table data={user.exchanges} />} */}
              <div className="flex bg-gray-100 p-4 ">
                <div className="w-[80px]"></div>
                <div className="w-[150px]">거래소</div>
                <div className="w-[150px]">UID</div>
                <div className="w-[150px]">커미션</div>
              </div>
              {user.exchanges.map((v, i) => {
                console.log("vvvvv", v);
                return (
                  <div
                    onClick={() => router.push(`/admin/user/list/${v.exchange_id}/${v.user_uid}`)}
                    key={`${v.exchange_id} ${i}`}
                    className="flex gap-0 items-center px-4 py-1 border-b hover:bg-orange-50 cursor-pointer"
                  >
                    {exchanges.find((v1) => v1.exchange_id === v.exchange_id)?.image_thumb ? (
                      <div className="w-[80px]">
                        <Image src={`${exchanges.find((v1) => v1.exchange_id === v.exchange_id)?.image_thumb}`} width={40} height={40} />
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
  }, [users, isVisible, exchanges, isAccordion, setIsAccordion, sort]);

  useEffect(() => {
    if (refresh) {
      setTimeout(() => {
        setRefresh(false);
      }, 1000);
    }
  }, [refresh]);

  console.log("tableDatatableData", tableData);

  const headerData = [
    {
      label: "이메일",
    },
    {
      label: "이름",
    },
    {
      label: "번호",
    },
    {
      label: "가입일",
      sort: () => handleSort("register", sort.register == 0 ? 1 : 0),
      sortKey: "register",
    },
    {
      label: "커미션",
      sort: () => handleSort("point", sort.point == 0 ? 1 : 0),
      sortKey: "point",
    },
    {
      label: "유저타입",
    },
  ];

  return (
    <>
      {dropdown && <div onClick={() => setDropdown(false)} className="absolute w-full h-full bg-black opacity-5"></div>}
      <div className="font-bold flex-auto flex-col flex p-4  ">
        <div className="flex justify-between p-4  items-center relative">
          <div className="flex gap-10 items-center">
            <h1 className="text-3xl">유저</h1>
            <div className="flex gap-2 items-center bg-white rounded-lg p-2 px-4">
              <div onClick={() => setDropdown((prev) => !prev)} className="p-2 px-4 border rounded-lg cursor-pointer">
                {searchType.label}
              </div>
              <input className="outline-none p-2 min-w-[400px]" onChange={handleChangeSearchValue} />
              <Search className="cursor-pointer" onClick={handleSearch} />
            </div>
          </div>
          <div
            className={cn("absolute flex flex-col p-2 bg-gray-50 border gap-2 rounded-lg top-[100%] min-w-[30%] transition-all", dropdown ? "opacity-100 translate-y-2" : "opacity-0 translate-y-0")}
          >
            {searchTypes.map((v) => (
              <div
                key={v.value}
                onClick={() => {
                  setDropdown(false);
                  setSearchType(v);
                }}
                className="p-2 bg-white hover:bg-orange-50 cursor-pointer"
              >
                {v.label}
              </div>
            ))}
          </div>
          <div className="flex gap-5">
            {/* <Filter onClick={handleFilter} /> */}
            <RefreshCw
              className={cn("cursor-pointer", refresh ? "refresh" : "")}
              onClick={() => {
                setRefresh(true);
                revalidate("users");
              }}
            />
          </div>
        </div>
        <div className="rounded-lg pb-10">
          {/* <Table data={tableData} sorts={['']}></Table> */}
          <div className={cn("bg-gray-50 my-4")}>
            <div className={`flex border-b p-3 px-5 bg-orange-100`}>
              {headerData
                // .filter((v) => v !== "accordion")
                .map((v) => (
                  <div className="flex-1 flex justify-center items-center gap-1" key={v}>
                    {v.label}
                    {v.sort ? (
                      sort[v.sortKey] == 0 ? (
                        <ArrowUp01 onClick={v.sort} size={20} />
                      ) : (
                        <ArrowDown01 className={sort[v.sortKey] == 1 ? "" : "opacity-30"} onClick={v.sort} size={20} />
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
        </div>
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
    </>
  );
};

export default Container;
