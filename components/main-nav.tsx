"use client";

import { Icons } from "./icons";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { SiLoop } from "react-icons/si";
import { userAtom } from "@/app/store/user";
import { useAtom } from "jotai";
import Image from "next/image";
import Switch from "./ui/switch";

export function MainNav() {
  const pathname = usePathname();
  const [user, setUser] = useAtom(userAtom);

  //

  return (
    <nav className="flex items-center space-x-4 lg:space-x-6">
      <Link href="/" className="mr-6 flex items-center space-x-2">
        {/* <Icons.logo className="h-6 w-6" /> */}
        <div className="w-24 h-auto">
          <Image alt="logo" src={require("../app/logo.png")} className="object-cover" />
        </div>
        {/* <span className="font-bold text-lg">{siteConfig.name}</span> */}
      </Link>
      <Link
        href="/exchange"
        className={cn("text-md font-bold transition-colors hover:text-orange-400  hidden sm:inline-block", pathname === "/exchange" ? "text-orange-400" : "text-gray-500 dark:text-gray-200")}
      >
        제휴 거래소
      </Link>
      <Link
        href="/service"
        className={cn("text-md font-bold transition-colors hover:text-orange-400 hidden sm:inline-block", pathname === "/service" ? "text-orange-400" : "text-gray-500 dark:text-gray-200")}
      >
        서비스 소개
      </Link>
      <Link
        href="/payback"
        className={cn("text-md font-bold transition-colors hover:text-orange-400 hidden sm:inline-block", pathname === "/payback" ? "text-orange-400" : "text-gray-500 dark:text-gray-200")}
      >
        예상 페이백
      </Link>
      {/* <Link href="/guide" className={cn("text-md font-medium transition-colors hover:text-orange-400 hidden sm:inline-block", pathname === "/guide" ? "text-foreground" : "text-foreground/60")}>
        셀퍼럴 가이드
      </Link> */}
      {user?.type === "UT02" && (
        <Link
          href="/admin"
          className={cn("text-md font-bold transition-colors hover:text-orange-400 hidden sm:inline-block", pathname === "/admin" ? "text-orange-400 " : "text-gray-500 dark:text-gray-200")}
        >
          관리자
        </Link>
      )}
      {/* <Switch active={!wide} setActive={setWide} /> */}
    </nav>
  );
}
