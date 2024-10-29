"use client";

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

export const CellAction: React.FC<CellActionProps> = ({ data }) => {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const onConfirm = async () => {};

  const handleUserType = async () => {
    const res = await setUserType({ id: data.id, type: data.type === "UT01" ? "UT02" : "UT01" });

    if (res.data === "ok") {
      toast.success("유저 타입이 변경되었습니다.");
    } else {
      toast.warning("유저 타입 변경에 실패했습니다.");
    }
  };
  return (
    <>
      {/* {data.type} */}
      <AlertModal isOpen={open} onClose={() => setOpen(false)} onConfirm={onConfirm} loading={loading} />
      <DropdownMenu modal={false}>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-16 p-0">
            <span className="sr-only">Open menu</span>
            {/* <MoreHorizontal className="h-4 w-4" /> */}
            {data.type === "UT01" ? "일반 회원" : "관리자"}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          {/* <DropdownMenuLabel>Actions</DropdownMenuLabel> */}

          <DropdownMenuItem onClick={() => handleUserType()}>
            <Edit className="mr-2 h-4 w-4" /> {data.type === "UT01" ? "관리자" : "일반 회원"}
          </DropdownMenuItem>
          {/* <DropdownMenuItem onClick={() => setOpen(true)}>
            <Trash className="mr-2 h-4 w-4" /> 취소
          </DropdownMenuItem> */}
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};
