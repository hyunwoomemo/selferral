import { getExchange, getUidList, getUidStatus } from "@/actions/trade/action";
import { CircleDollarSign } from "lucide-react";
import { cookies } from "next/headers";
import Image from "next/image";
import React from "react";

const page = async ({ params, searchParams }) => {
  const uid = params.uid;

  const uidDatas = await getUidStatus({});
  const uidData = await uidDatas.data.DATA.find((v) => v.user_uid === uid);

  const exchangeData = await getExchange(uidData.exchange_id);

  console.log("123123", uidData, exchangeData);

  if (!exchangeData) {
    return <div className="p-4">존재하지 않는 거래소입니다.</div>;
  }

  return (
    <div className="p-4">
      <div className="flex gap-5">
        <div className="relative w-[50px]  h-[50px] flex items-center justify-center">
          {exchangeData?.image_thumb && <Image src={exchangeData?.image_thumb} width={50} height={50} alt="exchange-logo" />}
        </div>
        <div>
          <div className="font-semibold text-gray-500 ">{exchangeData.name}</div>
          <div className="font-bold flex gap-3 items-center">
            <div>UID {uidData.user_uid}</div>
            <div className="text-[12px] py-[2px] px-[5px] rounded-md bg-blue-100 text-blue-600">연동완료</div>
          </div>
        </div>
      </div>
      <div className="pt-10 flex flex-col gap-2">
        <div className="flex gap-5 items-center">
          <CircleDollarSign className="text-orange-500" />
          <div>
            <div className="font-semibold text-gray-500">거래소 페이백</div>
            <div className="font-bold text-lg md:text-2xl">{uidData.point || 0} USDT</div>
          </div>
        </div>
      </div>

      <div className="pt-10 font-semibold text-gray-500">{uidData.exchange_name} 페이백 금액은 매일 오후 2시 전에 업데이트 됩니다.</div>
    </div>
  );
};

export default page;