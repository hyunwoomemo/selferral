"use client";

import { searchParams } from "@/lib/searchparams";
import { useCallback, useEffect, useMemo, useState } from "react";

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

export const STATUS_TYPE = [
  {
    value: "0",
    label: "신청",
  },
  {
    value: "1",
    label: "처리중",
  },
  {
    value: "2",
    label: "거절",
  },
  {
    value: "4",
    label: "완료",
  },
];

export function useEmployeeTableFilters() {
  const [exchangeQuery, setExchangeQuery] = useState("0");

  const [orderQuery, setOrderQuery] = useState("createtime");

  const [orderbyQuery, setOrderbyQuery] = useState("desc");

  const [searchType, setSearchType] = useState("");

  const [searchQuery, setSearchQuery] = useState("");

  const [typeFilter, setTypeFilter] = useState("");

  const [page, setPage] = useState(1);

  const [dtStart, setDtStart] = useState();

  const [dtEnd, setDtEnd] = useState();
  const [search, setSearch] = useState(false);

  const resetFilters = useCallback(() => {
    setSearchQuery(null);
    setTypeFilter(null);
    setDtStart(null);
    setDtEnd(null);
    setSearch(null);

    setPage(1);
  }, [setSearchQuery, setTypeFilter, setPage]);

  useEffect(() => {
    setSearchQuery(null);

    if (searchType === "step") {
      setSearch(true);
      setSearchQuery("0");
    } else {
      setSearch(null);
    }
  }, [searchType]);

  useEffect(() => {
    if (searchType === "step") {
    } else {
      setSearch(null);
    }
  }, [searchQuery]);

  const isAnyFilterActive = useMemo(() => {
    return !!searchQuery || !!typeFilter || !!dtStart || !!dtEnd;
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
    dtStart,
    dtEnd,
    setDtStart,
    setDtEnd,
    search,
    setSearch,
  };
}
