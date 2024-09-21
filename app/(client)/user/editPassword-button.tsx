"use client";

import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useEffect } from "react";
import { logout } from "../../action";
import { useSetAtom } from "jotai";
import { userAtom } from "../../store/user";
import { redirect, useRouter } from "next/navigation";
import { deleteCookie } from "cookies-next";
import { editPassword } from "@/actions/user/action";

export default function EditButton() {
  const router = useRouter();

  return (
    <Button
      onClick={() => router.push("/user/edit")}
      className={cn(buttonVariants({ size: "sm", variant: "outline" }), " border border-orange-400 text-orange-400  dark:border-orange-200 dark:text-orange-200")}
    >
      {"비밀번호 변경"}
    </Button>
  );
}
