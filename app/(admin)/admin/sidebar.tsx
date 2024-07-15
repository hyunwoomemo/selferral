"use client";
import { siteConfig } from "@/config/site";
import { User2, User2Icon, UserCheck, UserCircle } from "lucide-react";
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
      {
        label: "메뉴2",
        value: "list",
      },
      {
        label: "메뉴3",
        value: "list",
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
      {
        label: "메뉴2",
        value: "list",
      },
      {
        label: "메뉴3",
        value: "list",
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
];

export default function Sidebar() {
  const [expand, setExpand] = useState(null);
  const pathname = usePathname();

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
    <div className="flex-1  bg-[rgb(26,26,36)] p-4 flex-col flex gap-20 h-screen">
      <div className="flex gap-2 flex-col justify-center font-bold text-lg">
        <div className="items-center flex gap-2">
          <SiLoop />
          <div>{siteConfig.name}</div>
        </div>
      </div>

      <div className="flex flex-col gap-4">
        {data.map((item, index) => {
          return (
            <div key={index} className={`${expand === item.label ? `h-60` : "h-10"} overflow-hidden transition-all text-lg font-bold`}>
              <p onClick={() => handleExpand(item.label)} className="h-10 text-2xl">
                {item.label}
              </p>
              <div className="flex flex-col pt-5 gap-8">
                {item.children.map((v, i) => {
                  return (
                    <Link href={v.path || "/admin"} className={`pl-2 ${pathname === v.path ? "text-orange-400" : "text-gray-400"}`} key={i}>
                      {v.label}
                    </Link>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
