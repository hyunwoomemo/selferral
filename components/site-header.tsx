"use client";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { buttonVariants } from "./ui/button";
import { Icons } from "./icons";
import { MainNav } from "./main-nav";
import { MobileNav } from "./mobile-nav";
import { ModeToggle } from "./mode-toggle";
import { usePathname } from "next/navigation";
import { useState } from "react";

export function SiteHeader() {
  const pathname = usePathname();
  const [isVisible, setIsVisible] = useState(false);

  return (
    <>
      <header className="z-20 sticky top-0 py-1 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="flex h-14 items-center px-2">
          <MainNav />
          <div className="flex flex-1 items-center justify-end space-x-2">
            <nav className="flex items-center gap-4">
              {/* <Link
              href={siteConfig.links.github}
              target="_blank"
              rel="noreferrer"
            >
              <div
                className={cn(
                  buttonVariants({ variant: "ghost" }),
                  "w-10 px-0 hidden sm:inline-flex"
                )}
              >
                <Icons.gitHub className="h-4 w-4" />
                <span className="sr-only">GitHub</span>
              </div>
            </Link>
            <Link
              href={siteConfig.links.twitter}
              target="_blank"
              rel="noreferrer"
            >
              <div
                className={cn(
                  buttonVariants({ variant: "ghost" }),
                  "w-10 px-0 hidden sm:inline-flex"
                )}
              >
                <Icons.twitter className="h-4 w-4" />
                <span className="sr-only">Twitter</span>
              </div>
            </Link> */}
              <Link href="/login" className={cn("text-sm font-medium transition-colors hover:text-primary hidden sm:inline-block", pathname === "/login" ? "text-foreground" : "text-foreground/60")}>
                로그인
              </Link>
              <ModeToggle isVisible={isVisible} setIsVisible={setIsVisible} />
              <MobileNav />
            </nav>
          </div>
        </div>
      </header>
      <div onClick={() => setIsVisible(false)} className={`absolute top-0 left-0 right-0 bottom-0 bg-slate-50 opacity-0 ${isVisible ? "pointer-events-auto" : "pointer-events-none"}`}></div>
    </>
  );
}
