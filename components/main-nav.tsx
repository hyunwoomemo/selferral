"use client";

import { siteConfig } from "@/config/site";
import { Icons } from "./icons";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { SiLoop } from "react-icons/si";

export function MainNav() {
  const pathname = usePathname();

  // console.log("role", role);

  return (
    
    <nav className="flex items-center space-x-4 lg:space-x-6">
      <Link href="/" className="mr-6 flex items-center space-x-2">
        {/* <Icons.logo className="h-6 w-6" /> */}
        <SiLoop />
        <span className="font-bold">{siteConfig.name}</span>
      </Link>
      <Link href="/exchange" className={cn("text-sm font-medium transition-colors hover:text-primary hidden sm:inline-block", pathname === "/exchange" ? "text-foreground" : "text-foreground/60")}>
        제휴 거래소
      </Link>
      <Link href="/service" className={cn("text-sm font-medium transition-colors hover:text-primary hidden sm:inline-block", pathname === "/service" ? "text-foreground" : "text-foreground/60")}>
        서비스 소개
      </Link>
      <Link href="/payback" className={cn("text-sm font-medium transition-colors hover:text-primary hidden sm:inline-block", pathname === "/payback" ? "text-foreground" : "text-foreground/60")}>
        예상 페이백
      </Link>
      <Link href="/guide" className={cn("text-sm font-medium transition-colors hover:text-primary hidden sm:inline-block", pathname === "/guide" ? "text-foreground" : "text-foreground/60")}>
        셀퍼럴 가이드
      </Link>
      {/* {role === "admin" && (
        <Link href="/admin" className={cn("text-sm font-medium transition-colors hover:text-primary hidden sm:inline-block", pathname === "/admin" ? "text-foreground" : "text-foreground/60")}>
          관리자
        </Link>
      )} */}
    </nav>
  );
}
