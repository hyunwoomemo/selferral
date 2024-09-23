"use client";
import { CalendarDaysIcon, Plus } from "lucide-react";
import moment from "moment";
import Image from "next/image";
import Link from "next/link";
import React, { useCallback } from "react";

const Container = ({ data, exchanges }) => {
  const renderItem = useCallback(() => {
    return (
      <div className="flex gap-5">
        {data.map((v, i) => {
          const exchange = exchanges.find((v1) => v1.exchange_id === v.exchange_id);

          console.log("zxczxc", exchange);
          return (
            <Link key={i} href={`/admin/exchange/event/edit/${v.id}`} className="flex flex-col gap-2 w-[200px]  relative">
              {v.path ? <Image className="rounded-2xl" src={`http://api.xn--3l2b13oekp.com${v.path}`} width={200} height={200} alt="logo" /> : undefined}
              <p className="text-gray-400 font-bold">{v.title}</p>
              <p className="font-bold text-xl break-keep">{v.memo}</p>
              <div className="flex gap-1 text-xs items-center">
                <CalendarDaysIcon size={16} />
                <p>{moment(v.starttime).format("YYYY-MM-DD")}</p>
                <p>~</p>
                <p>{moment(v.endtime).format("YYYY-MM-DD")}</p>
              </div>
              {exchange && exchange.image_thumb && <Image src={exchange.image_thumb} width={45} height={45} className="absolute top-[-8px] right-[-8px]" alt="logo" />}
            </Link>
          );
        })}
      </div>
    );
  }, [data]);

  return (
    <div>
      <Link href={"/admin/exchange/event/add"} className="p-5 my-10 bg-gray-100 flex gap-2 rounded-md hover:bg-orange-50 cursor-pointer hover:text-orange-500">
        <Plus />
        <p>이벤트 추가</p>
      </Link>
      {renderItem()}
    </div>
  );
};

export default Container;
