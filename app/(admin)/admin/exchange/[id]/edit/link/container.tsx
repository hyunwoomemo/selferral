import Link from "next/link";
import React, { useCallback } from "react";

const Container = ({ links, exchangeId }) => {
  const renderItem = useCallback(() => {
    return (
      <div className="flex flex-col">
        {links.data.map((link) => {
          return (
            <Link href={`/admin/exchange/${exchangeId}/edit/link/${link.id}`} className="flex py-5 items-center" key={link.id}>
              <div className="flex items-center  gap-10">
                <span className="flex justify-center items-center min-w-[180px]">{link.id}</span>
                <span className="flex justify-center items-center min-w-[180px]">{link.payback}</span>
                <span className="flex justify-center items-center min-w-[180px]">{link.discount}</span>
                <span className="flex justify-center items-center min-w-[180px]">{link.limit_order}</span>
                <span className="flex justify-center items-center min-w-[180px]">{link.market_order}</span>
                <span className="flex justify-center items-center min-w-[180px]">{link.average_refund}</span>
                <span className="flex justify-center items-center min-w-[180px]">{link.tag}</span>
                <span className="flex justify-center items-center min-w-[180px]">{link.status}</span>
              </div>
              {/* <div className="absolute right-10 flex gap-8">
            <Link href={`/admin/exchange/edit?id=${exchange.id}`}>
              <Pencil />
            </Link>
            <DeleteButton id={exchange.id} />
          </div> */}
            </Link>
          );
        })}
      </div>
    );
  }, [links]);

  return (
    <div>
      <div className="flex flex-col gap-0 md:max-w-[80dvw] overflow-x-auto">
        <div className="">
          <div className="flex gap-10 py-5 border-b-2">
            <span className="flex justify-center min-w-[180px]">link id</span>
            <span className="flex justify-center min-w-[180px]">페이백</span>
            <span className="flex justify-center min-w-[180px]">할인</span>
            <span className="flex justify-center min-w-[180px]">지정가</span>
            <span className="flex justify-center min-w-[180px]">시장가</span>
            <span className="flex justify-center min-w-[180px]">1인 평균 환급금</span>
            <span className="flex justify-center min-w-[180px]">태그</span>
            <span className="flex justify-center min-w-[180px]">상태</span>
          </div>
        </div>
        {renderItem()}
        {/* 옵션 */}
      </div>
    </div>
  );
};

export default Container;
