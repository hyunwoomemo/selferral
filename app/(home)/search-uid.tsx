import { Button, buttonVariants } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { Search } from "lucide-react";

const SearchUid = () => {
  return (
    <div className="flex justify-center py-10 w-full max-w-2xl mx-auto items-center gap-3">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button className={cn(buttonVariants({ variant: "outline", size: "custom" }), "w-full sm:w-fit")}>
            <h2 className="text-gray-800 dark:text-white">BINGX</h2>
            {/* <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" /> */}
            {/* <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" /> */}
            {/* <span className="sr-only">Toggle Theme</span> */}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem>Light</DropdownMenuItem>
          <DropdownMenuItem>Dark</DropdownMenuItem>
          <DropdownMenuItem>System</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <div className="flex items-center border border-gray-200 dark:border-white rounded-sm flex-auto max-w-80 justify-between hover:border-orange-400 focus-within:border-orange-400">
        <input placeholder="UID를 입력하세요" className="py-2 px-2  bg-transparent outline-none flex-auto" />
        <div className="p-1 bg-orange-400 m-1.5 rounded-md">
          <Search className="text-white size-6" />
        </div>
      </div>
    </div>
  );
};

export default SearchUid;
