"use client";

import ProgressBar from "@/components/common/ProgressBar";
import PaybackHeader from "./payback-header";
import { usePathname } from "next/navigation";

const TOTAL = 4;

export default function PaybackLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();

  const process = isNaN(Number(pathname.slice(pathname.lastIndexOf("/") + 1))) ? 0 : Number(pathname.slice(pathname.lastIndexOf("/") + 1));

  return (
    <>
      <ProgressBar width={`${(100 / TOTAL) * process}%`} height="5px" />
      {children}
    </>
  );
}
