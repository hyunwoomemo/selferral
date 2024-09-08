"use client";

import { useState } from "react";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import { Button } from "./ui/button";
import { Infinity, Menu } from "lucide-react";
import Link, { LinkProps } from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Icons } from "./icons";
import { siteConfig } from "@/config/site";
import { SiLoop } from "react-icons/si";

export function MobileNav({ user }: { user?: any }) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="outline" className="w-10 px-0 sm:hidden">
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle Theme</span>
        </Button>
      </SheetTrigger>
      <SheetContent className="flex-auto flex flex-col" side="right">
        <MobileLink onOpenChange={setOpen} href="/" className="flex items-center gap-2">
          {/* <Icons.logo className="mr-2 h-4 w-4" /> */}
          <SiLoop />
          <span className="font-bold">{siteConfig.name}</span>
        </MobileLink>
        <div className="flex flex-col gap-3 mt-3">
          <MobileLink className={`${pathname === "/exchange" ? "text-foreground" : "text-foreground/60"}`} onOpenChange={setOpen} href="/exchange">
            제휴 거래소
          </MobileLink>
          <MobileLink className={`${pathname === "/service" ? "text-foreground" : "text-foreground/60"}`} onOpenChange={setOpen} href="/service">
            서비스 소개
          </MobileLink>
          <MobileLink className={`${pathname === "/payback" ? "text-foreground" : "text-foreground/60"}`} onOpenChange={setOpen} href="/payback">
            예상 페이백
          </MobileLink>
          {/* <MobileLink className={`${pathname === "/notice" ? "text-foreground" : "text-foreground/60"}`} onOpenChange={setOpen} href="/notice">
            공지사항
          </MobileLink> */}
          {/* <MobileLink className={`${pathname === "/guide" ? "text-foreground" : "text-foreground/60"}`} onOpenChange={setOpen} href="/guide">
            셀퍼럴 가이드
          </MobileLink> */}
        </div>
        {/* <div className="mt-auto">{user?.name}님, 안녕하세요</div> */}
      </SheetContent>
    </Sheet>
  );
}

interface MobileLinkProps extends LinkProps {
  children: React.ReactNode;
  onOpenChange?: (open: boolean) => void;
  className?: string;
}

function MobileLink({ href, onOpenChange, children, className, ...props }: MobileLinkProps) {
  const router = useRouter();
  return (
    <Link
      href={href}
      onClick={() => {
        router.push(href.toString());
        onOpenChange?.(false);
      }}
      className={className}
      {...props}
    >
      {children}
    </Link>
  );
}
