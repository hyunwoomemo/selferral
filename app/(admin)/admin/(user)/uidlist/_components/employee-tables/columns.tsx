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
    header: "거래소명",
  },
  {
    accessorKey: "email",
    header: "유저",
  },
  {
    accessorKey: "user_uid",
    header: "UID",
  },
  {
    accessorKey: "point",
    header: "커미션",
  },
  {
    accessorKey: "createtime",
    header: "신청일",
    // cell: ({ row }) => {
    //   console.log("row", row);
    //   return <div className={cn(row.original.total > 0 ? "text-orange-400 font-bold cursor-pointer" : "")}>{row.original.total}</div>;
    // },
  },
  {
    id: "actions",
    // header: "",
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];
