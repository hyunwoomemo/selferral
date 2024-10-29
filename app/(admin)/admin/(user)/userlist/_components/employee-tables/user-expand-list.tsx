import { TableCell, TableRow } from "@/components/ui/table";
import React, { useState } from "react";

const UserExpandList = ({ row, exchangeData }) => {
  return (
    <>
      <TableRow className="bg-orange-100 flex-1 w-full" key={row.id} data-state={row.getIsSelected() && "selected"}>
        <TableCell>거래소</TableCell>
        <TableCell>UID</TableCell>
        <TableCell>커미션</TableCell>
        <TableCell></TableCell>
        <TableCell></TableCell>
        <TableCell></TableCell>
        {/* <TableRow>sdf</TableRow> */}
      </TableRow>
      {row.original.exchanges.map((v) => {
        return (
          // <div className="grid grid-cols-3 p-2" key={row.id}>
          //   <div>{v.exchange_id}</div>
          //   <div>{v.user_uid}</div>
          //   <div>{v.point}</div>
          // </div>
          <TableRow className="bg-orange-50" key={row.id} data-state={row.getIsSelected() && "selected"}>
            <TableCell>{exchangeData?.data?.find((v1) => v1.exchange_id == v.exchange_id)?.name}</TableCell>
            <TableCell>{v.user_uid}</TableCell>
            <TableCell>{v.point}</TableCell>
            <TableCell></TableCell>
            <TableCell></TableCell>
            <TableCell></TableCell>
          </TableRow>
        );
      })}
    </>
  );
};

export default UserExpandList;
