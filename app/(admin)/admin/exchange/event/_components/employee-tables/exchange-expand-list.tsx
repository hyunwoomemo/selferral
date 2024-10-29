import Loader from "@/components/ui/Loader";
import Switch from "@/components/ui/switch";
import { TableCell, TableRow } from "@/components/ui/table";
import React, { useEffect, useState } from "react";

const ExchangeExpandList = ({ data, loading }) => {
  console.log("datadatadatadatadata", data);

  return (
    <>
      {loading ? (
        <div className="flex justify-center min-h-20 items-center">
          <Loader className={`${loading ? "animate-spin" : undefined}`} />
        </div>
      ) : (
        <>
          <TableRow className="bg-orange-100 flex-1 w-full" key={data.id}>
            <TableCell>id</TableCell>
            <TableCell>태그</TableCell>
            <TableCell>페이백</TableCell>
            <TableCell>할인</TableCell>
            <TableCell>지정가</TableCell>
            <TableCell>시장가</TableCell>
            <TableCell>환급률</TableCell>
            <TableCell>상태</TableCell>
            {/* <TableRow>sdf</TableRow> */}
          </TableRow>
          {data.map((v) => {
            return (
              // <div className="grid grid-cols-3 p-2" key={row.id}>
              //   <div>{v.exchange_id}</div>
              //   <div>{v.user_uid}</div>
              //   <div>{v.point}</div>
              // </div>
              <TableRow className="bg-orange-50" key={data.id}>
                <TableCell>{v.id}</TableCell>
                <TableCell>{v.tag}</TableCell>
                <TableCell>{v.payback}</TableCell>
                <TableCell>{v.discount}</TableCell>
                <TableCell>{v.limit_order}</TableCell>
                <TableCell>{v.market_order}</TableCell>
                <TableCell>{v.refund}</TableCell>
                <TableCell>
                  <Switch active={v.status === 1} />
                </TableCell>
              </TableRow>
            );
          })}
        </>
      )}
    </>
  );
};

export default ExchangeExpandList;
