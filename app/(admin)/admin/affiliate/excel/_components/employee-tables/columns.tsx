"use client";
import { Checkbox } from "@/components/ui/checkbox";
import { Employee } from "@/constants/data";
import { ColumnDef } from "@tanstack/react-table";
import { CellAction } from "./cell-action";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";

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
  },
  {
    accessorKey: "exchange_name",
    header: "거래소",
  },
  {
    accessorKey: "file_name",
    header: "파일명",
  },
  {
    header: " ",
    cell: ({ row }) => (
      <Link
        href={`/admin/affiliate/excel/${row.original.id}`}
        className="inline-flex items-center justify-center whitespace-nowrap rounded-lg text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 font-bold  border border-input bg-background h-9 rounded-lg px-3 "
      >
        상세
      </Link>
    ),
  },
  // {
  //   accessorKey: "total",
  //   header: "커미션",
  //   cell: ({ row }) => {
  //
  //     return <div className={cn(row.original.total > 0 ? "text-orange-400 font-bold cursor-pointer" : "")}>{row.original.total}</div>;
  //   },
  // },
  // {
  //   id: "actions",
  //   header: "유저 타입",
  //   cell: ({ row }) => <CellAction data={row.original} />,
  // },
];
