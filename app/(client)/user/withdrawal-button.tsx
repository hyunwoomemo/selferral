"use client";

import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useEffect } from "react";
import { logout } from "../../action";
import { useSetAtom } from "jotai";
import { userAtom } from "../../store/user";
import { redirect, useRouter } from "next/navigation";
import { deleteCookie } from "cookies-next";

export default function WithdrawalButton() {
  const router = useRouter();

  const handleWithdrawal = async () => {
    router.push("/user/withdrawal");
  };

  return (
    <Button
      onClick={handleWithdrawal}
      className={cn(
        buttonVariants({ size: "lg", variant: "outline" }),
        "max-w-52   md:min-w-40  my-5 py-5 border border-orange-400 text-orange-400 text-lg dark:border-orange-200 dark:text-orange-200"
      )}
    >
      {"출금"}
    </Button>
  );
}
