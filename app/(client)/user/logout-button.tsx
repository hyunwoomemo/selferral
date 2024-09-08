"use client";

import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useEffect } from "react";
import { logout } from "../../action";
import { useSetAtom } from "jotai";
import { userAtom } from "../../store/user";
import { redirect, useRouter } from "next/navigation";
import { deleteCookie } from "cookies-next";

export default function LogoutButton() {
  const setUser = useSetAtom(userAtom);
  const router = useRouter();

  const handleLogout = async () => {
    deleteCookie("token");
    setUser({});
    router.push("/");
  };

  return (
    <Button onClick={handleLogout} className={cn(buttonVariants({ size: "sm", variant: "outline" }), " border border-orange-400 text-orange-400  dark:border-orange-200 dark:text-orange-200")}>
      {"로그아웃"}
    </Button>
  );
}
