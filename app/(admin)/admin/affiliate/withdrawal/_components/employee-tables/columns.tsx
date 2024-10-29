"use client";
import { Checkbox } from "@/components/ui/checkbox";
import { Employee } from "@/constants/data";
import { ColumnDef } from "@tanstack/react-table";
import { CellAction } from "./cell-action";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export const columns: ColumnDef<Employee>[] = [
  // {
  //   id: "select",
  //   header: ({ table }) => <Checkbox checked={table.getIsAllPageRowsSelected()} onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)} aria-label="Select all" />,
  //   cell: ({ row }) => <Checkbox checked={row.getIsSelected()} onCheckedChange={(value) => row.toggleSelected(!!value)} aria-label="Select row" />,
  //   enableSorting: false,
  //   enableHiding: false,
  // },
  {
    accessorKey: "exchange_name",
    header: "거래소",
  },
  {
    accessorKey: "point",
    header: "금액",
  },
  {
    accessorKey: "usdt_address",
    header: <div onClick={() => window.alert("sdf")}>USDT 주소</div>,
    // cell: ({ row }) => <div>sdf</div>,
  },
  {
    accessorKey: "email",
    header: "유저",
  },
  {
    accessorKey: "createtime",
    header: "신청 시간",
  },
  {
    accessorKey: "step",
    header: "상태",
    cell: ({ row }) => <CellAction data={row.original} />,
  },
  // {
  //   accessorKey: "total",
  //   header: "커미션",
  //   cell: ({ row }) => {
  //     console.log("row", row);
  //     return <div className={cn(row.original.total > 0 ? "text-orange-400 font-bold cursor-pointer" : "")}>{row.original.total}</div>;
  //   },
  // },
  // {
  //   id: "actions",
  //   header: "유저 타입",
  //   cell: ({ row }) => <CellAction data={row.original} />,
  // },
];
