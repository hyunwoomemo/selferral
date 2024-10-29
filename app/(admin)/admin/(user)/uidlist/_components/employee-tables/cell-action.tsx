"use client";

import { updateUidStatus } from "@/actions/trade/action";
import { setUserType } from "@/actions/user/action";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { AlertModal } from "@/components/ui/modal/alert-modal";
import { Employee } from "@/constants/data";
import { Edit, MoreHorizontal, Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

interface CellActionProps {
  data: Employee;
}

const UPDATE_TYPES = [
  { label: "대기", value: 0 },
  { label: "등록", value: 1 },
  { label: "거절", value: 2 },
  { label: "삭제", value: -1 },
];

export const CellAction: React.FC<CellActionProps> = ({ data }) => {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const onConfirm = async () => {};

  const handleUpdateUid = async (status) => {
    const res = await updateUidStatus({ order_id: data.id, status });

    console.log("res", res);

    if (res.data) {
      toast.success(`UID ${UPDATE_TYPES.find((v) => v.value === status).label} 상태 변경에 성공했습니다.`);
    } else {
      toast.warning(`UID ${UPDATE_TYPES.find((v) => v.value === status).label} 상태 변경에 실패했습니다.`);
    }
  };

  return (
    <>
      {/* {data.type} */}
      <AlertModal isOpen={open} onClose={() => setOpen(false)} onConfirm={onConfirm} loading={loading} />
      <DropdownMenu modal={false}>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="p-1 px-2 min-h-8 min-w-16">
            <span className="sr-only">Open menu</span>
            {/* <MoreHorizontal className="h-4 w-4" /> */}
            {/* {data.status === 0 ? "대기" : data.status === 1 ? "등록" : "거절"} */}
            {UPDATE_TYPES.find((v) => v.value === data.status)?.label}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>

          {/* <DropdownMenuItem onClick={() => handleUpdateUid(1)}>
            <Edit className="mr-2 h-4 w-4" /> {"등록"}
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => handleUpdateUid(2)}>
            <Edit className="mr-2 h-4 w-4" /> {"거절"}
          </DropdownMenuItem> */}
          {UPDATE_TYPES.filter((v) => v.value !== data.status).map((v) => {
            return (
              <DropdownMenuItem onClick={() => handleUpdateUid(v.value)}>
                <Edit className="mr-2 h-4 w-4" /> {v.label}
              </DropdownMenuItem>
            );
          })}
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};
