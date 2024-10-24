// import { info } from "../../action";
import { getInfo, getWithdrawal, refresh } from "@/actions/user/action";
import LogoutButton from "./logout-button";
import moment from "moment";
import { cookies } from "next/headers";
import WithdrawalButton from "./withdrawal-button";
import Tab from "@/components/ui/tab";
import { getUidList } from "@/actions/trade/action";
import Title from "@/components/ui/title";
import Link from "next/link";
import React from "react";
import EditButton from "./editPassword-button";

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

export default async function Page() {
  const data = await getInfo();

  // const uidData = await getUidListById({ id });

  const uidData = await getUidList({});

  const withdrawal = await getWithdrawal({});

  const renderItem = () => {
    if (uidData?.data.length === 0)
      return (
        <>
          <div className="grid grid-cols-4 place-items-center p-2 border-b border-gray-100 dark:border-gray-800">
            <span className="flex justify-center text-gray-600">거래소</span>
            <span className="flex justify-center text-gray-600">UID</span>
            <span className="flex justify-centers text-gray-600">금액</span>
            <span className="flex justify-center text-gray-600"></span>
          </div>
          <div className="flex justify-center items-center h-full py-10">
            <div>데이터가 존재하지 않습니다.</div>
          </div>
        </>
      );

    // return data.list.map((v, i) => <div key={i}>{i}<ㅔ/div>);

    return (
      // <div className="flex flex-col gap-0 md:max-w-[80dvw] overflow-x-auto">
      //   <div className="">
      //     <div className="flex gap-10 py-5 border-b-2">
      //       <span className="flex justify-center min-w-[120px]">거래소</span>
      //       <span className="flex justify-center min-w-[120px]">금액</span>
      //       <span className="flex justify-center min-w-[120px]">USDT 주소</span>
      //       <span className="flex justify-center min-w-[120px]">상태</span>
      //     </div>
      //   </div>
      //   <div className="flex flex-col flex-auto">
      //     {withdrawal?.data.list.map((item, index) => (
      //       <div className="flex py-5 items-center" key={item.id}>
      //         <div className="flex items-center  gap-10">
      //           <span className="min-w-[120px] flex justify-center">{item.exchange_name}</span>
      //           <span className="flex justify-center items-center min-w-[120px]">{item.point}</span>
      //           <span className="flex justify-center items-center min-w-[120px]">{item.usdt_address}</span>
      //           <span className="flex justify-center items-center min-w-[120px]">{stepData.find((v) => v.value === item.step).label}</span>
      //         </div>
      //         {/* <div className="absolute right-10 flex gap-8">
      //         <Link href={`/admin/exchange/edit?id=${exchange.id}`}>
      //           <Pencil />
      //         </Link>
      //         <DeleteButton id={exchange.id} />
      //       </div> */}
      //       </div>
      //     ))}
      //   </div>
      //   {/* 옵션 */}
      // </div>
      <>
        <div className="grid grid-cols-4 place-items-center p-2 border-b border-gray-100 dark:border-gray-800">
          <span className="flex justify-center text-gray-600">거래소</span>
          <span className="flex justify-center text-gray-600">UID</span>
          <span className="flex justify-center text-gray-600">금액</span>
          <span className="flex justify-center text-gray-600"></span>
        </div>
        {/* <div className="h-[2px] bg-gray-100 dark:bg-gray-800 mt-5"></div> */}
        <div className="grid grid-cols-4 pt-2 items-center gap-4 p-2 border-b border-gray-100 dark:border-gray-800">
          {uidData.data
            .filter((v) => v.uid)
            .map((v, i) => {
              return (
                <React.Fragment key={`${v.uid} ${i}`}>
                  <span className="flex justify-center">{v.exchange_name}</span>
                  <span className="flex justify-center">{v.uid}</span>
                  <span className="flex justify-center">{Number(v.point).toLocaleString()}</span>
                  {/* <span className="flex justify-center py-1 px-4 bg-orange-400 justify-self-center rounded-full text-white font-bold">{stepData.find((v1) => v1.value === v.step).label}</span> */}
                  {withdrawal.data.list.some((v) => uidData.data.find((v1) => v1.exchange_id == v.exchange_id)) ? (
                    <Link
                      href={`/user/withdrawal?exchange_id=${v.exchange_id}`}
                      className="flex justify-center py-1 px-2 text-sm md:text-[16px] bg-orange-400 justify-self-center rounded-full text-white font-bold whitespace-nowrap"
                    >
                      출금 이력
                    </Link>
                  ) : (
                    <Link href={`/user/withdrawal/set`} className="flex justify-center py-1 px-4 bg-orange-400 justify-self-center rounded-full text-white font-bold whitespace-nowrap">
                      출금 신청
                    </Link>
                  )}
                </React.Fragment>
              );
            })}
        </div>
      </>
    );
  };

  if (!data?.DATA) return;

  if (data.CODE === "AC001") {
    // const refreshData = await refresh()
  }

  if (data?.accessToken) {
    // setCookie("token", data.accessToken);
    cookies().set("token", data.accessToken);
  }

  // const RednerItem = () => {
  //   for (const key in data.DATA) {
  //     return (
  //       <>
  //         <div>{key}</div>
  //         <div>{data.DATA[key]}</div>
  //       </>
  //     );
  //   }
  //   return (
  //     <>
  //       {Object.entries(data.DATA).map(([key, value]) => {
  //         return (
  //           <div key={key} className="flex flex-col gap-2 ">
  //             <p className="text-lg">{key}</p>
  //             <p className="py-2 px-4 bg-gray-200 dark:bg-gray-800 rounded-sm">{key === "createdAt" ? moment(value).format("YYYY-MM-DD") : value}</p>
  //           </div>
  //         );
  //       })}
  //     </>
  //   );
  // };

  return (
    <div className="flex flex-col flex-auto p-2">
      {/* <RednerItem /> */}
      {/* <Title text={"마이 페이지"} buttons={[<WithdrawalButton />, <LogoutButton />]} /> */}
      <Title text={"마이 페이지"} buttons={[<EditButton key={"edit"} />, <LogoutButton key={"logout"} />]} />
      <div className="flex-auto  rounded-md  bg-white dark:bg-gray-950 my-5">{renderItem()}</div>
    </div>
  );
}
