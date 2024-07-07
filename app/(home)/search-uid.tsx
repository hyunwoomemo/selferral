"use client";
import { Button, buttonVariants } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { dummyTrade } from "@/dummy";
import { cn } from "@/lib/utils";
import { Search } from "lucide-react";
import { useState } from "react";

const SearchUid = () => {
  const [exchange, setExchange] = useState(dummyTrade[0]);

  return (
    <div className="flex justify-center py-10 w-full max-w-2xl mx-auto items-center gap-3">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button className={cn(buttonVariants({ variant: "outline", size: "custom" }), "min-w-32 sm:w-fit border-gray-600 dark:border-white md:text-lg")}>
            <h2 className="text-gray-800 dark:text-white">{exchange.name}</h2>
            {/* <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" /> */}
            {/* <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" /> */}
            {/* <span className="sr-only">Toggle Theme</span> */}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          {/* <DropdownMenuItem>Light</DropdownMenuItem>
          <DropdownMenuItem>Dark</DropdownMenuItem>
          <DropdownMenuItem>System</DropdownMenuItem> */}
          {dummyTrade.map((item, index) => {
            return (
              <DropdownMenuItem onClick={() => setExchange(item)} key={index}>
                {item.name}
              </DropdownMenuItem>
            );
          })}
        </DropdownMenuContent>
      </DropdownMenu>
      <div className="flex items-center border border-gray-600 dark:border-white rounded-md flex-auto max-w-100 md:p-2 justify-between hover:border-orange-400 focus-within:border-orange-400">
        <input placeholder="UID를 입력하세요" className="py-2 px-2  bg-transparent outline-none flex-auto" />
        <div className="p-1 bg-orange-400 m-1.5 rounded-md">
          <Search className="text-white size-6 cursor-pointer" />
        </div>
      </div>
    </div>
  );
};

export default SearchUid;
