"use client";

import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useEffect } from "react";
import { logout } from "../../action";
import { useSetAtom } from "jotai";
import { userAtom } from "../../store/user";
import { redirect, useRouter } from "next/navigation";
import { deleteCookie } from "cookies-next";
import { useToast } from "@/hooks/useToast";

export default function WithdrawalButton() {
  const router = useRouter();
  const { addToast } = useToast();

  const handleWithdrawal = async () => {
    // router.push("/user/withdrawal");
    addToast({ text: "준비 중입니다.." });
  };

  return (
    <Button onClick={handleWithdrawal} className={cn(buttonVariants({ size: "sm", variant: "outline" }), "border border-orange-400 text-orange-400  dark:border-orange-200 dark:text-orange-200")}>
      {"비밀번호 변경"}
    </Button>
  );
}
