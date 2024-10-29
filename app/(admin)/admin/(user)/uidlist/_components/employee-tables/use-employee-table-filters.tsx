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

export const REGISTER_TYPE = [
  { value: "0", label: "등록 대기" },
  { value: "1", label: "등록 완료" },
  { value: "2", label: "등록 거절" },
];

export function useEmployeeTableFilters() {
  const [searchType, setSearchType] = useQueryState("type", searchParams.type.withOptions({ shallow: false, throttleMs: 1000 }).withDefault(""));

  const [searchQuery, setSearchQuery] = useQueryState("q", searchParams.q.withOptions({ shallow: false, throttleMs: 1000 }).withDefault(""));

  const [typeFilter, setTypeFilter] = useQueryState("type", searchParams.type.withOptions({ shallow: false }).withDefault("0"));

  const [page, setPage] = useQueryState("page", searchParams.page.withDefault(1));

  const resetFilters = useCallback(() => {
    setSearchQuery(null);
    setTypeFilter(null);

    setPage(1);
  }, [setSearchQuery, setTypeFilter, setPage]);

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
  };
}
