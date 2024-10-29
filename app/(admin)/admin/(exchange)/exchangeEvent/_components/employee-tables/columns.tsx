"use client";
import { Checkbox } from "@/components/ui/checkbox";
import { Employee } from "@/constants/data";
import { ColumnDef } from "@tanstack/react-table";
import { CellAction } from "./cell-action";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Switch from "@/components/ui/switch";
import { ChevronDown, Edit } from "lucide-react";
import { editStatusExchange } from "@/actions/trade/action";
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
    accessorKey: "name",
    header: "거래소",
    cell: ({ row }) => (
      <div className="flex gap-2 items-center max-w-[40px]">
        {row.original.image_thumb && <Image width={30} height={30} alt="logo" src={`http://api.xn--3l2b13oekp.com${row.original.image_thumb}`} />}
        <div className="font-bold">{row.original.name}</div>
      </div>
    ),
  },
  {
    accessorKey: "nameExt",
    header: "태그",
    cell: ({ row }) => <div className="p-1 px-4 bg-orange-50 inline-block rounded-md">{row.original.nameExt}</div>,
  },
  // {
  //   accessorKey: "",
  //   header: " ",
  // },
  // {
  //   accessorKey: "",
  //   header: " ",
  // },
  // {
  //   accessorKey: "",
  //   header: " ",
  // },
  {
    accessorKey: " ",
    header: " ",
    cell: ({ row }) => {
      return (
        <div className="flex gap-8 justify-end px-4 py-4">
          <Switch active={row.original.status === 1} setActive={() => editStatusExchange({ id: row.original.id, data: row.original })} />
          <Link href={`/admin/exchange/${row.original.id}/edit`}>
            <Edit></Edit>
          </Link>
          {/* <div>
            <ChevronDown />
          </div> */}
        </div>
      );
    },
  },
  {
    id: "expand",
    header: " ",
    // enableHiding: true,
    cell: ({ row }) => (
      <div className="max-w-6">
        <ChevronDown />
      </div>
    ),
  },
];
