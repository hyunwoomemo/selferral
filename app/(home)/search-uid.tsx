"use client";
import { Button, buttonVariants } from "@/components/ui/button";
import Dropdown from "@/components/ui/dropdown";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { dummyTrade } from "@/dummy";
import { cn } from "@/lib/utils";
import { Search } from "lucide-react";
import { useState } from "react";

const SearchUid = () => {
  const [exchange, setExchange] = useState(dummyTrade[0]);
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div className="flex gap-4 px-2 flex-wrap max-w-screen-md w-full mx-auto py-10">
      {/* <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button className={cn(buttonVariants({ variant: "outline", size: "custom" }), "w-full sm:w-fit")}>
            <h2 className="text-gray-800 dark:text-white">{exchange.name}</h2>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          {dummyTrade.map((item, index) => {
            return (
              <DropdownMenuItem onClick={() => setExchange(item)} key={index}>
                {item.name}
              </DropdownMenuItem>
            );
          })}
        </DropdownMenuContent>
      </DropdownMenu> */}
      <Dropdown item={exchange} setItem={setExchange} data={dummyTrade} isVisible={isVisible} setIsVisible={setIsVisible} />
      <div className="flex flex-auto items-center border border-gray-400 dark:border-white p-2 rounded-sm hover:border-orange-400 hover:dark:border-orange-200 focus-within:border-orange-400 focus-within:dark:border-orange-200">
        <input placeholder="UID를 입력하세요" className="bg-transparent outline-none flex-auto" />
        <div className="">
          <Search className="text-black dark:text-white size-6 cursor-pointer" />
        </div>
      </div>
    </div>
  );
};

export default SearchUid;
