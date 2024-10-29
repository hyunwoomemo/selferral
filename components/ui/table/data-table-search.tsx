"use client";

import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { debounce } from "@/utils/debounce";
// import { Options } from "nuqs";
import { Ref, useTransition } from "react";
import { toast } from "sonner";

interface DataTableSearchProps {
  searchKey: string;
  searchQuery: string;
  setSearchQuery: (value: string | ((old: string) => string | null) | null, options?: any) => Promise<URLSearchParams>;
  setPage: <Shallow>(value: number | ((old: number) => number | null) | null, options?: any) => Promise<URLSearchParams>;
  inputRef: Ref<any>;
  typeFilter: string;
}

export function DataTableSearch({ searchKey, searchQuery, setSearchQuery, setPage, inputRef, typeFilter }: DataTableSearchProps) {
  const [isLoading, startTransition] = useTransition();

  const handleSearch = (value: string) => {
    if (typeFilter) {
      setSearchQuery(value, { startTransition });
      setPage(1); // Reset page to 1 when search changes
    } else {
      toast.error("검색 유형을 먼저 선택해주세요!");
    }
  };

  return (
    <Input
      ref={inputRef}
      placeholder={`Search ${searchKey}...`}
      value={searchQuery ?? ""}
      onChange={(e) => handleSearch(e.target.value)}
      className={cn("w-full md:max-w-sm", isLoading && "animate-pulse")}
    />
  );
}
