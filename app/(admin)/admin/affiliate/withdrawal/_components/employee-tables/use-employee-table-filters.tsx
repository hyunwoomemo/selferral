"use client";

import { searchParams } from "@/lib/searchparams";
import { useQueryState } from "nuqs";
import { useCallback, useMemo } from "react";

export const TYPE_OPTIONS = [
  { value: "pointeq", label: "포인트 같음" },
  { value: "pointdn", label: "포인트 같거나 작음" },
  { value: "pointup", label: "포인트 크거나 같음" },
  { value: "user", label: "이메일" },
  { value: "step", label: "상태" },
  { value: "date", label: "신청 시간" },
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
  const [exchangeQuery, setExchangeQuery] = useQueryState("exchange", searchParams.exchange.withOptions({ shallow: false, throttleMs: 1000 }).withDefault("0"));

  const [orderQuery, setOrderQuery] = useQueryState("order", searchParams.order.withOptions({ shallow: false, throttleMs: 1000 }).withDefault("createtime"));

  const [orderbyQuery, setOrderbyQuery] = useQueryState("orderby", searchParams.orderBy.withOptions({ shallow: false, throttleMs: 1000 }).withDefault("desc"));

  const [searchType, setSearchType] = useQueryState("type", searchParams.type.withOptions({ shallow: false, throttleMs: 1000 }).withDefault(""));

  const [searchQuery, setSearchQuery] = useQueryState("q", searchParams.q.withOptions({ shallow: false, throttleMs: 1000 }).withDefault(""));

  const [typeFilter, setTypeFilter] = useQueryState("type", searchParams.type.withOptions({ shallow: false }).withDefault(""));

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
    exchangeQuery,
    setExchangeQuery,
    orderQuery,
    orderbyQuery,
    setOrderQuery,
    setOrderbyQuery,
  };
}
