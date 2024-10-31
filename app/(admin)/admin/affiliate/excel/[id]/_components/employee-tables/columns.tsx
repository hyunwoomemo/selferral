"use client";
import { Checkbox } from "@/components/ui/checkbox";
import { Employee } from "@/constants/data";
import { ColumnDef } from "@tanstack/react-table";
import { CellAction } from "./cell-action";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";
import moment from "moment";

export const columns: ColumnDef<Employee>[] = [
  // {
  //   id: "select",
  //   header: ({ table }) => <Checkbox checked={table.getIsAllPageRowsSelected()} onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)} aria-label="Select all" />,
  //   cell: ({ row }) => <Checkbox checked={row.getIsSelected()} onCheckedChange={(value) => row.toggleSelected(!!value)} aria-label="Select row" />,
  //   enableSorting: false,
  //   enableHiding: false,
  // },
  {
    accessorKey: "create_at",
    header: "날짜",
    cell: ({ row }) => <div className="max-w-[200px]">{moment(row.original.create_at).format("YYYY-MM-DD HH:mm")}</div>,
  },
  {
    accessorKey: "uid",
    header: "UID",
  },
  {
    accessorKey: "commision",
    header: "커미션",
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
