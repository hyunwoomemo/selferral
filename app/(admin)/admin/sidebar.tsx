"use client";
import { ModeToggle } from "@/components/mode-toggle";
import { siteConfig } from "@/config/site";
import { Home, User2, User2Icon, UserCheck, UserCircle } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { SiLoop } from "react-icons/si";

const data = [
  {
    label: "user",
    children: [
      {
        label: "유저 목록",
        value: "list",
        path: "/admin/user/list",
      },
    ],
  },
  {
    label: "site",
    children: [
      {
        label: "배너",
        value: "banner",
        path: "/admin/site/banner",
      },
    ],
  },
  {
    label: "exchange",
    children: [
      {
        label: "거래소 목록",
        value: "exchangeList",
        path: "/admin/exchange/list",
      },
    ],
  },
  {
    label: "affiliate",
    children: [
      {
        label: "출금 신청 리스트",
        value: "affiliate/Exchange/withdrawal",
        path: "/admin/affiliate/withdrawal",
      },
      {
        label: "액셀 업로드",
        value: "affiliate/Exchange/uid/excel",
        path: "/admin/affiliate/excel",
      },
    ],
  },
];

export default function Sidebar() {
  const [expand, setExpand] = useState(null);
  const pathname = usePathname();
  const [isVisible, setIsVisible] = useState(false);

  const handleExpand = (type) => {
    setExpand((prev) => {
      if (prev === type) {
        return null;
      } else {
        return type;
      }
    });
  };

  const Item = ({ children, path }: { children: React.ReactNode; path: string }) => (
    <div onClick={() => handleExpand("user")} className="flex gap-2 flex-col justify-center font-bold text-lg transition-all duration-300">
      {children}
    </div>
  );

  return (
    <div className="md:sticky top-0 translate-x-[-100%] duration-300 transition-all md:translate-x-0 md:w-[15%] md:min-w-40  bg-gray-100 dark:bg-[rgb(26,26,36)] p-4 flex-col flex gap-10 h-screen">
      <div className="flex gap-2 flex-col justify-center font-bold text-lg">
        <Link href={"/admin"} className="items-center flex gap-2">
          <SiLoop />
          <div>{siteConfig.name}</div>
        </Link>
      </div>

      <div className="flex flex-col gap-4 flex-1">
        {data.map((item, index) => {
          return (
            <div key={index} className={`${expand === item.label ? `h-auto` : "h-10"} overflow-hidden transition-all text-lg font-bold `}>
              <p onClick={() => handleExpand(item.label)} className="h-10 text-2xl cursor-pointer hover:text-orange-400">
                {item.label}
              </p>
              <div className="flex flex-col pt-5 gap-8">
                {item.children.map((v, i) => {
                  return (
                    <Link
                      href={v.path || "/admin"}
                      className={`pl-2 ${pathname === v.path ? "text-orange-400" : "text-gray-600 hover:text-orange-400 dark:text-gray-400 dark:hover:text-orange-400"}`}
                      key={i}
                    >
                      {v.label}
                    </Link>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
      <Link href={"/"}>
        <Home />
      </Link>
      {/* <ModeToggle isVisible={isVisible} setIsVisible={setIsVisible} /> */}
    </div>
  );
}
