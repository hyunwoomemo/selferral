"use client";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";
import Link, { LinkProps } from "next/link";
import { buttonVariants } from "./ui/button";
import { Icons } from "./icons";
import { MainNav } from "./main-nav";
import { MobileNav } from "./mobile-nav";
import { ModeToggle } from "./mode-toggle";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { SiLoop } from "react-icons/si";
import { useAtom } from "jotai";
import { userAtom } from "@/app/store/user";
import { ArrowRight } from "lucide-react";
import { getInfo } from "@/actions/user/action";
// import { info } from "@/app/action";
import { deleteCookie, getCookie, setCookie } from "cookies-next";
import Switch from "./ui/switch";
import { wideAtom } from "@/app/store/common";
import { useToast } from "@/hooks/useToast";

export function SiteHeader() {
  const [isVisible, setIsVisible] = useState(false);
  const pathname = usePathname();
  const [user, setUser] = useAtom(userAtom);
  const token = getCookie("token");
  const refresh = getCookie("refresh");
  const router = useRouter();
  const [wide, setWide] = useAtom(wideAtom);

  const [setting, setSetting] = useState(false);

  const { addToast } = useToast();

  const handleLogout = async () => {
    deleteCookie("token");
    deleteCookie("refresh");
    setUser({});
    router.push("/");
  };

  useEffect(() => {
    getInfo().then((res) => {
      console.log("rrrrr", res);
      if (res?.CODE === "AI000") {
        setUser(res.DATA);
      }
      if (res?.CODE === "AC001") {
        // addToast({ text: "로그인이 만료되었습니다." });
        // setCookie("token", "");
        // setUser({});
      }
      if (res?.accessToken) {
        setCookie("token", res.accessToken);
        getInfo(res.accessToken, refresh).then((res) => {
          if (res.CODE === "AI000") {
            setUser(res.DATA);
          }
        });
      }
    });
  }, []);

  // console.log("pathname", pathname);

  if (pathname.startsWith("/admin")) return;

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

  return (
    <>
      <header className="z-20 sticky top-0 py-1 w-full border-b border-border bg-background/95 backdrop-blur light:supports-[backdrop-filter]:bg-background/60">
        <div className={`flex h-14 items-center px-2  ${wide ? "max-w-screen-xl" : "max-w-[840px]"} mx-auto`}>
          <MainNav />
          <div className="flex flex-1 items-center justify-end space-x-2">
            <nav className="flex items-center md:gap-4 ">
              {user && Object.keys(user).length > 0 ? (
                <div
                  // href={"/user"}
                  className={cn("text-md font-bold transition-colors hover:text-primary hidden md:inline-block", pathname === "/user" ? "text-orange-400" : "", "relative")}
                >
                  <div className="cursor-pointer" onClick={() => setSetting((prev) => !prev)}>
                    {user.name}
                  </div>
                  <div
                    onMouseLeave={() => setSetting(false)}
                    className={cn(
                      "absolute  bg-white border top-[130%] w-32 right-[100%] translate-x-[50%] flex flex-col",
                      setting ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none",
                      "transition-opacity items-center"
                    )}
                  >
                    <Link href={"/user/edit"} className="py-2 text-center border-b w-full">
                      비밀번호 변경
                    </Link>
                    <div onClick={handleLogout} className="py-2 text-center w-full cursor-pointer">
                      로그 아웃
                    </div>
                  </div>
                </div>
              ) : (
                <Link
                  href="/login"
                  className={cn("text-md font-bold transition-colors hover:text-primary hidden sm:inline-block", pathname === "/login" ? "text-orange-400" : "text-gray-500 dark:text-gray-200")}
                >
                  로그인
                </Link>
              )}

              {/* <ModeToggle isVisible={isVisible} setIsVisible={setIsVisible} /> */}
              {/* <MobileNav user={user} /> */}
              <MobileNav user={user} />
            </nav>
          </div>
        </div>
        <div className="absolute hidden lg:block top-5 right-5 "></div>
      </header>
      <div onClick={() => setIsVisible(false)} className={`absolute top-0 left-0 right-0 bottom-0 bg-slate-50 opacity-0 ${isVisible ? "pointer-events-auto" : "pointer-events-none"}`}></div>
      {/* <div className="sm:hidden p-4 border-b overflow-x-scroll overflow-y-hidden">
        <div className="flex gap-3 ">
          <MobileLink className={`whitespace-nowrap flex-1 min-w-30 text-center px-2 py-1  rounded-sm ${pathname === "/exchange" ? "text-foreground" : "text-foreground/60"}`} href="/exchange">
            제휴 거래소
          </MobileLink>
          <MobileLink className={`whitespace-nowrap flex-1 min-w-30 text-center px-2 py-1  rounded-sm ${pathname === "/service" ? "text-foreground" : "text-foreground/60"}`} href="/service">
            서비스 소개
          </MobileLink>
          <MobileLink className={`whitespace-nowrap flex-1 min-w-30 text-center px-2 py-1  rounded-sm ${pathname === "/payback" ? "text-foreground" : "text-foreground/60"}`} href="/payback">
            예상 페이백
          </MobileLink>
          <MobileLink className={`whitespace-nowrap flex-1 min-w-30 text-center px-2 py-1  rounded-sm ${pathname === "/notice" ? "text-foreground" : "text-foreground/60"}`} href="/notice">
            공지사항
          </MobileLink>
          <MobileLink className={`whitespace-nowrap flex-1 min-w-30 text-center px-2 py-1  rounded-sm ${pathname === "/guide" ? "text-foreground" : "text-foreground/60"}`} href="/guide">
            셀퍼럴 가이드
          </MobileLink>
        </div>
      </div> */}
      {/* {!pathname.includes("/payback") && !pathname.includes("/admin") && (
        <div className="w-full bg-orange-400 dark:bg-orange-700  p-4 font-bold text-white text-sm md:text-[16px]">
          <div className="flex justify-between max-w-[840px] mx-auto">
            <p className="">내가 쓴 수수료, 전부 내가 돌려받자!</p>
            <Link className="flex gap-2 items-center justify-end" href={"/payback"}>
              <p>내 페이백 예상 금액 확인하기</p>
              <ArrowRight />
            </Link>
          </div>
        </div>
      )} */}
    </>
  );
}
