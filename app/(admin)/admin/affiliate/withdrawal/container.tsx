"use client";
import React, { useEffect, useMemo, useState } from "react";
import ExchangeTab from "./exchange-tab";
import { getWithdrawals, updateStep } from "@/actions/trade/action";
import Tab from "@/components/tab";
import { useToast } from "@/hooks/useToast";
import { useAtom, useAtomValue } from "jotai";
import { exchangesAtom } from "@/app/store/trade";
import Dropdown from "@/components/ui/dropdown";
import Pagination from "@/components/pagination";
import Table from "@/components/ui/table";
import moment from "moment";
import { cn } from "@/lib/utils";
import { ArrowDown01, ArrowUp01, ListFilter } from "lucide-react";
import { bottomSheetAtom } from "@/app/store/common";
import Input from "@/components/input";
import { Button } from "@/components/ui/button";
import Calendar from "@/components/calendar";

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

const searchTypeData = [
  {
    label: "포인트 같음",
    value: "pointeq",
  },
  {
    label: "포인트 같거나 작음",
    value: "pointdn",
  },
  {
    label: "포인트 크거나 같음",
    value: "pointup",
  },
  {
    label: "이메일",
    value: "user",
  },
  {
    label: "상태",
    value: "step",
  },
  {
    label: "신청 시간",
    value: "date",
  },
];

const Container = ({ exchanges, users }) => {
  const [tab, setTab] = useState("all");
  const [data, setData] = useState({ total: 0, list: [] });
  const [exchange, setExchange] = useState({});
  const [isVisible, setIsVisible] = useState(-1);
  const { addToast } = useToast();
  const [page, setPage] = useState(1);
  const [group, setGroup] = useState(1);
  const [totalGroup, setTotalGroup] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const [total, setTotal] = useState(1);

  const [bottomSheet, setBottomSheet] = useAtom(bottomSheetAtom);
  const [searchType, setSearchType] = useState(null);
  const [keyword, setKeyword] = useState(null);
  const [dates, setDates] = useState([]);
  const [dateSave, setDateSave] = useState(false);
  const [dropdown, setDropdown] = useState(false);

  const [sort, setSort] = useState({
    createtime: "desc",
  });

  const handleSort = (type, value) => {
    setSort((prev) => ({ [type]: value }));
  };

  useEffect(() => {
    return () => {
      setDateSave(false);
    };
  }, []);

  useEffect(() => {
    setDates([]);
    setDateSave(false);

    if (searchType && searchType.value === "date") {
      setBottomSheet((prev) => ({
        ...prev,
        isVisible: true,
        contents: () => <Calendar dates={dates} setDates={setDates} setDateSave={setDateSave} />,
      }));
    }
  }, [searchType]);

  useEffect(() => {
    if (!bottomSheet.isVisible && searchType && searchType.value === "date" && dates.length === 0) {
      getData();
    }
  }, [bottomSheet]);

  useEffect(() => {
    if (searchType && searchType.value === "date") {
      setBottomSheet((prev) => ({
        ...prev,
        isVisible: true,
        contents: () => <Calendar dates={dates} setDates={setDates} setDateSave={setDateSave} />,
      }));
    }
  }, [dates]);

  useEffect(() => {
    if (dateSave) {
      setBottomSheet({ isVisible: false });

      const ddates = dates.sort((a, b) => new Date(a) - new Date(b));

      getWithdrawals({
        exchangeId: tab === "all" ? 0 : tab,
        num: 10,
        page: page || 1,
        order: Object.keys(sort)[0],
        orderby: Object.entries(sort)[0][1],
        dt_start: moment(ddates[0]).format("YYYY-MM-DD"),
        dt_end: ddates[1] ? moment(ddates[1]).format("YYYY-MM-DD") : ddates[0] ? moment(ddates[0]).format("YYYY-MM-DD") : null,
      })
        .then((res) => {
          setData(res.data);
          setTotal(res.data.total);
          setTotalPage(Math.ceil(res.data.total / 10));
        })
        .catch((err) => {
          console.error(err);
        });
    }
  }, [dates, dateSave]);

  useEffect(() => {
    setTotalGroup(Math.ceil(totalPage / 10));
  }, [totalPage]);

  // useEffect(() => {
  //   setBottomSheet({ isVisible: false });

  //

  //   getWithdrawals({
  //     exchangeId: tab === "all" ? 0 : tab,
  //     num: 10,
  //     page: page || 1,
  //     order: Object.keys(sort)[0],
  //     orderby: Object.entries(sort)[0][1],
  //     dt_start: moment(dates[0]).format("YYYY-MM-DD"),
  //   })
  //     .then((res) => {
  //
  //       setData(res.data);
  //       setTotal(res.data.total);
  //     })
  //     .catch((err) =>
  // }, [dates]);

  const headerData = [
    {
      label: "거래소",
      sort: () => handleSort("exchange_id", sort.exchange_id == "desc" ? "asc" : "desc"),
      sortKey: "exchange_id",
      // sort: () => {
      //   setBottomSheet((prev) => ({
      //     ...prev,
      //     isVisible: true,
      //     contents: () => (
      //       <div className="p-4">
      //         <h1 className="text-gray-600 font-bold">거래소 선택</h1>
      //         <div className="flex gap-4 pt-4">
      //           {Object.values(
      //             data.list.reduce((result, cur) => {
      //               if (!result[cur.exchange_id]) {
      //                 result[cur.exchange_id] = exchanges.data?.find((v) => v.exchange_id === cur.exchange_id)?.name || cur.exchange_id;
      //               }

      //               return result;
      //             }, {})
      //           ).map((v) => (
      //             <div className="py-2 px-4 bg-orange-50 flex gap-2 items-center">
      //               <input
      //                 id={v}
      //                 type="checkbox"
      //                 className="rounded-md accent-orange-400 size-6 border-0 appearance-none bg-white relative cursor-pointer border-none outline-none checked:appearance-auto"
      //               />
      //               <label className="cursor-pointer" for={v}>
      //                 {v}
      //               </label>
      //             </div>
      //           ))}
      //         </div>
      //       </div>
      //     ),
      //   }));
      // },
      // sortKey: "exchange_id",
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
          <span className={cn(isVisible == -1 ? "opacity-100" : isVisible === item.id ? `opacity-100` : `opacity-10`)} onClick={() => setIsVisible((prev) => (prev === item.id ? -1 : item.id))}>
            {stepData.find((v) => v.value === item.step)?.label}
          </span>

          {isVisible === item.id && (
            <div key={item.id} className={`absolute border bg-white p-1 w-full items-center flex flex-col gap-2 top-[110%] z-30`}>
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
    getWithdrawals({ exchangeId: tab === "all" ? 0 : tab, num: 10, page: page || 1, order: Object.keys(sort)[0], orderby: Object.entries(sort)[0][1], keyword, search_type: searchType?.value }).then(
      (res) => {
        setData(res.data);
        setTotal(res.data.total);
        setTotalPage(Math.ceil(res.data.total / 10));
      }
    );
  }, [tab, page, sort]);

  const handleSearch = (value) => {
    getWithdrawals({
      exchangeId: tab === "all" ? 0 : tab,
      num: 10,
      page: page || 1,
      order: Object.keys(sort)[0],
      orderby: Object.entries(sort)[0][1],
      keyword: keyword,
      search_type: searchType?.value,
      step: searchType?.value === "step" ? value : undefined,
    })
      .then((res) => {
        setData(res.data);
        setTotal(res.data.total);
        setTotalPage(Math.ceil(res.data.total / 10));
      })
      .catch((err) => console.error(err));
  };

  const tabData = exchanges.data.map((v) => ({ label: v.name, value: v.exchange_id }));

  const handleUpdateStep = async ({ id, step }) => {
    const res = await updateStep({ withdrawlId: id, step });

    if (res.data === "OK") {
      getWithdrawals({ exchangeId: tab === "all" ? 0 : tab, num: 10, page: page || 1, order: Object.keys(sort)[0], orderby: Object.entries(sort)[0][1], keyword, search_type: searchType?.value })
        .then((res) => setData(res.data))
        .finally(() => {
          setIsVisible(-1);
          addToast({ text: "출금 신청 상태가 수정되었습니다." });
        });
    }
  };

  useEffect(() => {
    setKeyword("");
  }, [searchType]);

  const getData = () => {
    setSearchType(null);
    setKeyword("");
    getWithdrawals({ exchangeId: tab === "all" ? 0 : tab, num: 10, page: page || 1, order: Object.keys(sort)[0], orderby: Object.entries(sort)[0][1] })
      .then((res) => {
        setData(res.data);
        setTotal(res.data.total);
        setTotalPage(Math.ceil(res.data.total / 10));
      })
      .finally(() => {
        setIsVisible(-1);
      });
  };

  return (
    <>
      {dropdown && <div onClick={() => setDropdown(false)} className="absolute w-full h-full bg-black opacity-5"></div>}
      {isVisible > -1 && <div onClick={() => setIsVisible(-1)} className="absolute top-0 right-0 left-0 bottom-0 bg-gray-50 opacity-80"></div>}

      <div className="font-bold flex-auto flex-col p-8 flex">
        <h1 className="text-3xl">출금 신청 리스트</h1>
        {/* <ExchangeTab tab={tab} setTab={setTab} data={exchanges.data} /> */}

        <div className="pt-5 pb-5">
          <Tab tab={tab} setTab={setTab} data={tabData} all />
        </div>
        <div className="py-3 flex gap-2 items-center relative">
          <div
            // onClick={() => {
            //   setBottomSheet((prev) => ({
            //     ...prev,
            //     isVisible: true,
            //     height: "h-[30%]",
            //     contents: () => {
            //       return (
            //         <div className="flex gap-2 p-4">
            //           {searchTypeData.map((v) => (
            //             <div
            //               onClick={() => {
            //                 setSearchType(v);
            //                 setBottomSheet((prev) => ({ isVisible: false }));
            //               }}
            //               className="cursor-pointer p-2 bg-gray-50 border border-gray-100 rounded-md"
            //               key={v.value}
            //             >
            //               {v.label}
            //             </div>
            //           ))}
            //         </div>
            //       );
            //     },
            //   }));
            // }}

            onClick={() => setDropdown((prev) => !prev)}
            className="border bg-gray-50  p-2 rounded-md cursor-pointer"
          >
            {searchType ? searchType.label : "선택"}
          </div>
          {/* {dropdown && ( */}
          {/* <> */}
          {/* <div className="absolute w-full h-full bg-black opacity-5"></div> */}
          <div
            className={cn("absolute flex flex-col p-2 bg-gray-50 border gap-2 rounded-lg top-[100%] min-w-[30%] transition-all", dropdown ? "opacity-100 translate-y-2" : "opacity-0 translate-y-0")}
          >
            {searchTypeData.map((v) => (
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
          {/* </> */}
          {/* )} */}
          {searchType?.value === "step" ? (
            <>
              {stepData.map((v) => (
                <div key={v.value} onClick={() => handleSearch(v.value)}>
                  {v.label}
                </div>
              ))}
            </>
          ) : searchType?.value === "date" ? (
            <div className="flex gap-2" onClick={() => setDates([])}>
              {dates
                .sort((a, b) => new Date(a) - new Date(b))
                .map((v, i) => {
                  return (
                    <React.Fragment key={v}>
                      {i === 1 && "~"}
                      <div key={v}>{moment(v).format("YYYY-MM-DD")}</div>
                    </React.Fragment>
                  );
                })}
            </div>
          ) : (
            <>
              <Input
                onChange={(e) => setKeyword(e.target.value)}
                type={searchType?.value.includes("point") ? "number" : undefined}
                placeholder={!searchType ? "검색 종류를 선택해주세요." : searchType?.value.includes("point") ? "숫자를 입력해주세요." : undefined}
                value={keyword}
                disabled={!searchType}
              />
              <Button disabled={!searchType || !keyword} onClick={handleSearch}>
                검색
              </Button>
            </>
          )}
          <Button className="ml-auto" onClick={() => getData()}>
            초기화
          </Button>
        </div>
        <div className="h-full">
          {/* <Table data={tableData} /> */}
          <div className={cn("bg-gray-50 my-4")}>
            <div className={`flex border-b p-3 px-5 bg-orange-100`}>
              {headerData
                // .filter((v) => v !== "accordion")
                .map((v) => (
                  <div className="flex-1 flex justify-center items-center gap-1" key={v.sortKey}>
                    {v.label}
                    {/* {v.sort ? (
                        sort[v.sortKey] == "desc" ? (
                          <ArrowUp01 onClick={v.sort} size={20} />
                        ) : (
                          <ArrowDown01 className={sort[v.sortKey] == "asc" ? "" : "opacity-30"} onClick={v.sort} size={20} />
                        )
                      ) : undefined} */}
                    {v.sort && <ListFilter onClick={v.sort} size={20} color="gray" />}
                  </div>
                ))}
            </div>
            {!data.total ? (
              <>
                <div className="p-2 min-h-[400px] flex flex-col gap-4 justify-center items-center">
                  <div>내역이 존재하지 않습니다.</div>
                  <Button onClick={getData}>전체 데이터 보기</Button>
                </div>
              </>
            ) : (
              tableData.map((v, rowIndex) => {
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
              })
            )}
          </div>

          <div className="pt-5">
            <Pagination total={total} totalPage={totalPage} page={page} group={group} totalGroup={totalGroup} setGroup={setGroup} setTotalGroup={setTotalGroup} setPage={setPage} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Container;
