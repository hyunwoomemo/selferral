"use client";
import { useAtom, useAtomValue } from "jotai";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { paybackTestAtom } from "./store/trade";
import { cn } from "@/lib/utils";
import BottomSheet from "@/components/ui/bottom-sheet";
import { wideAtom } from "./store/common";

const prefetches = ["/withdrawal", "/exchange", "/service", "/payback", "/user", "/user/withdrawal"];

const ClientLayout = ({ children }) => {
  const pathname = usePathname();
  const router = useRouter();

  const wide = useAtomValue(wideAtom);

  const paybackTest = useAtomValue(paybackTestAtom);
  console.log("paybackTest", paybackTest);

  useEffect(() => {
    prefetches.forEach((v) => router.prefetch(v));
  }, [router]);

  if (pathname.includes("admin")) {
    return (
      <main>
        {children}
        <div className="pointer-events-none  fixed top-0 bottom-0 left-0 right-0 h-screen">
          <BottomSheet />
        </div>
      </main>
    );
  }

  return (
    <main className={`flex-1  bg-white dark:bg-gray-950  w-full ${wide ? "max-w-screen-xl" : "max-w-[840px]"} mx-auto flex flex-col`}>
      {children}
      <BottomSheet />
    </main>
  );
};

export default ClientLayout;
