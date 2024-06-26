"use client";

import { usePathname } from "next/navigation";
import PaybackHeader from "../payback-header";

export default function PaybackLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <PaybackHeader />
      {children}
    </>
  );
}
