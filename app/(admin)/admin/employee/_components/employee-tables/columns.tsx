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
    accessorKey: "name",
    header: "이름",
  },
  {
    accessorKey: "hp",
    header: "번호",
  },
  {
    accessorKey: "email",
    header: "EMAIL",
  },
  {
    accessorKey: "createdAt",
    header: "가입일",
  },
  {
    accessorKey: "total",
    header: "커미션",
    cell: ({ row }) => {
      console.log("row", row);
      return <div className={cn(row.original.total > 0 ? "text-orange-400 font-bold cursor-pointer" : "")}>{row.original.total}</div>;
    },
  },
  {
    id: "actions",
    header: "유저 타입",
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];
