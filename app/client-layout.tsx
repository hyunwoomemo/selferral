"use client";
import { useAtomValue } from "jotai";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { wideAtom } from "./store/common";

const prefetches = ["/withdrawal", "/exchange", "/service", "/payback", "/user", "/user/withdrawal"];

const ClientLayout = ({ children }) => {
  const pathname = usePathname();
  const router = useRouter();

  const wide = useAtomValue(wideAtom);

  useEffect(() => {
    prefetches.forEach((v) => router.prefetch(v));
  }, [router]);

  if (pathname.includes("admin")) {
    return <main>{children}</main>;
  }

  return <main className={`flex-1  bg-white dark:bg-gray-950  w-full ${wide ? "max-w-screen-xl" : "max-w-[840px]"} mx-auto flex flex-col`}>{children}</main>;
};

export default ClientLayout;
