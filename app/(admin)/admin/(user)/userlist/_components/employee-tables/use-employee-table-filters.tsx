"use client";

import { searchParams } from "@/lib/searchparams";
import { useQueryState } from "nuqs";
import { useCallback, useEffect, useMemo } from "react";

export const TYPE_OPTIONS = [
  { value: "name", label: "이름" },
  { value: "email", label: "이메일" },
  { value: "hp", label: "전화번호" },
  { value: "type", label: "유저타입" },
  { value: "uid", label: "UID" },
];

export const USER_TYPE = [
  {
    value: "UT02",
    label: "관리자",
  },
  {
    value: "UT01",
    label: "일반 회원",
  },
];

export function useEmployeeTableFilters() {
  const [searchType, setSearchType] = useQueryState("type", searchParams.type.withOptions({ shallow: false, throttleMs: 500 }).withDefault(""));

  const [searchQuery, setSearchQuery] = useQueryState("q", searchParams.q.withOptions({ shallow: false, throttleMs: 500 }).withDefault(""));

  const [typeFilter, setTypeFilter] = useQueryState("type", searchParams.type.withOptions({ shallow: false }).withDefault(""));

  const [page, setPage] = useQueryState("page", searchParams.page.withDefault(1));
  const [search, setSearch] = useQueryState("search", searchParams.search.withOptions({ shallow: false }));

  const resetFilters = useCallback(() => {
    setSearchQuery(null);
    setTypeFilter(null);
    setSearch(null);

    setPage(1);
  }, [setSearchQuery, setTypeFilter, setPage]);

  useEffect(() => {
    setSearchQuery(null);

    if (searchType === "type") {
      setSearch("true");
    } else {
      setSearch(null);
    }
  }, [searchType]);

  useEffect(() => {
    // if (!searchQuery && search) {
    if (searchType === "type") {
    } else {
      setSearch(null);
    }
    // }
  }, [searchQuery]);

  const isAnyFilterActive = useMemo(() => {
    return !!searchQuery || !!typeFilter;
  }, [searchQuery, typeFilter]);

  return {
    searchQuery,
    setSearchQuery,
    typeFilter,
    setTypeFilter,
    page,
    setPage,
    resetFilters,
    isAnyFilterActive,
    searchType,
    setSearchType,
    search,
    setSearch,
  };
}
