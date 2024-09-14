import { getUidList } from "@/actions/trade/action";
import Timer from "@/components/timer";
import { cookies } from "next/headers";
import Image from "next/image";
import Link from "next/link";
import React, { useCallback, useEffect, useMemo, useState } from "react";

const MyTrade = ({ uidData, exchanges }) => {
  console.log("uu", uidData);
  console.log("exchangesexchanges", exchanges);

  const renderItem = useCallback(() => {
    if (!uidData.data.DATA) return;

    return uidData.data.DATA.sort((a, b) => {
      const arr = [1, 0, 2];

      return arr.indexOf(a.status) - arr.indexOf(b.status);
    }).map((v, i) => {
      if (v.status === 1) {
        return (
          <Link
            href={{
              pathname: `/uid/${v.user_uid}`,
              // query: { data: JSON.stringify(v) },
            }}
            key={i}
            className="flex gap-5 py-3"
          >
            {/* <div>{}</div> */}
            <div className="relative w-[50px]  h-[50px] flex items-center justify-center">
              {exchanges.data.find((v1) => v1.exchange_id === v.exchange_id)?.image_thumb && (
                <Image src={exchanges.data.find((v1) => v1.exchange_id === v.exchange_id)?.image_thumb} width={50} height={50} alt="exchange-logo" />
              )}
            </div>
            <div>
              <div className="text-gray-600 font-semibold">UID {v.user_uid}</div>
              <div className="font-bold text-lg">{v.point || 0} USDT</div>
            </div>
          </Link>
        );
      } else {
        if (v.status === 0) {
          return (
            <div key={i} className="flex gap-5 py-3 items-center opacity-50">
              {/* <div>{}</div> */}
              <div className="relative w-[50px]  h-[50px] flex items-center justify-center">
                {exchanges.data.find((v1) => v1.exchange_id === v.exchange_id)?.image_thumb && (
                  <Image src={exchanges.data.find((v1) => v1.exchange_id === v.exchange_id)?.image_thumb} width={50} height={50} alt="exchange-logo" />
                )}
              </div>
              <div>
                <div className="text-gray-600 font-semibold">UID {v.user_uid}</div>
                <div className="font-bold text-lg">등록 진행중입니다.</div>
              </div>
              <div className="ml-auto">
                <Timer time={v.left_second} apiTime={uidData.time} />
              </div>
            </div>
          );
        } else {
          if (v.status === 2) {
            return (
              <div key={i} className="flex gap-5 py-3 opacity-50">
                {/* <div>{}</div> */}
                <div className="relative w-[50px]  h-[50px] flex items-center justify-center">
                  {exchanges.data.find((v1) => v1.exchange_id === v.exchange_id)?.image_thumb && (
                    <Image src={exchanges.data.find((v1) => v1.exchange_id === v.exchange_id)?.image_thumb} width={50} height={50} alt="exchange-logo" />
                  )}
                </div>
                <div>
                  <div className="text-gray-600 font-semibold">UID {v.user_uid}</div>
                  <div className="font-bold text-lg">연동 실패했어요</div>
                </div>
              </div>
            );
          }
        }
      }
    });
  }, [uidData]);

  return (
    <div className="pt-20">
      <h1 className="text-lg md:text-2xl font-bold">내 거래소</h1>
      <div className="py-5">{renderItem()}</div>
    </div>
  );
};

export default MyTrade;
