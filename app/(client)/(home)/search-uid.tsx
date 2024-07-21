"use client";
import { Button, buttonVariants } from "@/components/ui/button";
import Dropdown from "@/components/ui/dropdown";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { dummyTrade } from "@/dummy";
import { cn } from "@/lib/utils";
import { Search } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

const SearchUid = () => {
  const [exchange, setExchange] = useState(dummyTrade[0]);
  const [isVisible, setIsVisible] = useState(false);
  const router = useRouter();
  const [uid, setUid] = useState<number | null>(null);

  console.log(exchange);

  return (
    <div className="flex gap-4 px-2 flex-wrap max-w-screen-md w-full mx-auto py-10">
      <Dropdown item={exchange} setItem={setExchange} data={dummyTrade} isVisible={isVisible} setIsVisible={setIsVisible} />
      <div className="flex flex-auto items-center border border-gray-400 dark:border-white p-2 rounded-sm hover:border-orange-400 hover:dark:border-orange-200 focus-within:border-orange-400 focus-within:dark:border-orange-200">
        <form
          className="flex justify-between flex-1 px-4 items-center"
          onSubmit={async (e) => {
            e.preventDefault();
            console.log(e);
            router.push(`/uid?exchange=${exchange.name}&uid=${uid}`);
            // const res = await fetch("/api/search");

            // console.log("res", res);
          }}
        >
          <input placeholder="UID를 입력하세요" type="number" onChange={(e) => setUid(e.target.value)} className="bg-transparent outline-none flex-auto" />
          <button className="">
            <Search className="text-black dark:text-white size-6 cursor-pointer" />
          </button>
        </form>
      </div>
    </div>
  );
};

export default SearchUid;
