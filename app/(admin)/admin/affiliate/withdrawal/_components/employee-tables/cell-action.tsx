"use client";

import { getWithdrawals, updateStep } from "@/actions/trade/action";
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

const stepData = [
  {
    value: 0,
    label: "신청",
  },
  {
    value: 1,
    label: "처리중",
  },
  {
    value: 2,
    label: "거절",
  },
  {
    value: 4,
    label: "완료",
  },
];

export const CellAction: React.FC<CellActionProps> = ({ data }) => {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const handleUpdateStep = async ({ id, step }) => {
    const res = await updateStep({ withdrawlId: id, step });

    if (res.data === "OK") {
      toast.success(`출금 상태가 ${stepData.find((v) => v.value === step)?.label}(으)로 변경되었습니다.`);
    } else {
      toast.warning("출금 상태 변경에 실패했습니다.");
    }
  };

  const onConfirm = async () => {};

  return (
    <>
      {/* {data.type} */}
      <AlertModal isOpen={open} onClose={() => setOpen(false)} onConfirm={onConfirm} loading={loading} />
      <DropdownMenu modal={false}>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="p-1 px-2 min-h-8 min-w-16">
            <span className="sr-only">Open menu</span>
            {/* <MoreHorizontal className="h-4 w-4" /> */}
            {/* {data.step === "UT01" ? "일반 회원" : "관리자"} */}
            {stepData.find((v) => v.value === data.step)?.label}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          {/* <DropdownMenuLabel>Actions</DropdownMenuLabel> */}
          {stepData
            .filter((v) => v.value !== data.step)
            .map((v, i) => (
              <DropdownMenuItem key={`${v.value} ${i}`} onClick={() => handleUpdateStep({ id: data.id, step: v.value })} className="hover:bg-gray-100 w-full">
                {v.label}
              </DropdownMenuItem>
            ))}
          {/* <DropdownMenuItem onClick={() => handleUserType()}>
            <Edit className="mr-2 h-4 w-4" /> {data.type === "UT01" ? "관리자" : "일반 회원"}
          </DropdownMenuItem> */}
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};
