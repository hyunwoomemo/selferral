"use client";

import { usePathname } from "next/navigation";
import ProgressBar from "./process/progressbar";

const TOTAL = 4;

export default function PaybackLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();

  const process = isNaN(Number(pathname.slice(pathname.lastIndexOf("/") + 1))) ? 0 : Number(pathname.slice(pathname.lastIndexOf("/") + 1));

  return (
    <div className="flex flex-col flex-auto">
      <ProgressBar width={`${(100 / TOTAL) * process}%`} height="5px" />
      <div className="p-4">{children}</div>
    </div>
  );
}
