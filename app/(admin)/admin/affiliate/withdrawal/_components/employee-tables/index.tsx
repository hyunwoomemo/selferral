"use client";

import { DataTable } from "@/components/ui/table/data-table";
import { DataTableFilterBox } from "@/components/ui/table/data-table-filter-box";
import { DataTableResetFilter } from "@/components/ui/table/data-table-reset-filter";
import { DataTableSearch } from "@/components/ui/table/data-table-search";
import { Employee } from "@/constants/data";
import { columns } from "./columns";
import { STATUS_TYPE, TYPE_OPTIONS, useEmployeeTableFilters, USER_TYPE } from "./use-employee-table-filters";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { CalendarDateRangePicker } from "@/components/ui/date-range-picker";
import Calendar from "@/components/calendar";
import { bottomSheetAtom } from "@/app/store/common";
import { useAtom } from "jotai";
import moment from "moment";
import { getWithdrawals } from "@/actions/trade/action";
import { ClientDataTable } from "@/components/ui/table/client-data-table";
import { toast } from "sonner";

export default function EmployeeTable({ data, totalData, ddata, exchangeData, users }: { data: Employee[]; totalData: number; ddata: any }) {
  // const {
  //   searchType,
  //   setSearchType,
  //   typeFilter,
  //   setTypeFilter,
  //   isAnyFilterActive,
  //   resetFilters,
  //   searchQuery,
  //   setPage,
  //   setSearchQuery,
  //   setExchangeQuery,
  //   exchangeQuery,
  //   orderQuery,
  //   orderbyQuery,
  //   setOrderQuery,
  //   setOrderbyQuery,
  //   dtStart,
  //   dtEnd,
  //   setDtStart,
  //   setDtEnd,
  //   search,
  //   setSearch,
  // } = useEmployeeTableFilters();
  const inputRef = useRef();

  const [withdrawals, setWithdrawals] = useState([]);
  const [typeFilter, setTypeFilter] = useState();
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [searchQuery, setSearchQuery] = useState("");
  const [total, setTotal] = useState(0);
  const [search, setSearch] = useState(false);
  const [searchType, setSearchType] = useState();

  const [dates, setDates] = useState([new Date()]);
  const [isVisible, setIsVisible] = useState(false);
  const [dateSave, setDateSave] = useState(false);
  const [bottomSheet, setBottomSheet] = useAtom(bottomSheetAtom);
  const [dtStart, setDtStart] = useState();
  const [dtEnd, setDtEnd] = useState();
  const [exchange, setExchange] = useState();

  const isAnyFilterActive = useMemo(() => {
    return !!searchQuery || !!typeFilter || !!dtStart;
  }, [searchQuery, typeFilter, dtStart]);

  const EXCHANGE_OPTIONS = [{ label: "전체", value: "0" }, ...exchangeData.data.map((v) => ({ label: v.name, value: String(v.exchange_id) }))];

  const [rowExpand, setRowExpand] = useState(false);

  useEffect(() => {
    if (typeFilter && typeFilter === "date") {
      setDateSave(false);
      setBottomSheet((prev) => ({
        ...prev,
        isVisible: true,
        contents: () => <Calendar setDateSave={setDateSave} dates={dates} setDates={setDates} dtStart={dtStart} dtEnd={dtEnd} />,
      }));
    }
  }, [typeFilter, dates]);

  useEffect(() => {
    if (dateSave) {
      setBottomSheet({ isVisible: false });
      setTypeFilter(null);
    }
  }, [dateSave]);

  useEffect(() => {
    if (!dtStart && dates) {
      setDates([new Date()]);
    }
  }, [dtStart]);

  const isSameDate = (a, b) => {
    return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();
  };
  useEffect(() => {
    if (isSameDate(dates[0], new Date())) return;

    if (dates[0] && !dates[1]) {
      setDtStart(moment(dates[0]).format("YYYY-MM-DD"));
      setDtEnd(moment(dates[0]).format("YYYY-MM-DD"));
    } else {
      if (dates[0] && dates[1]) {
        setDtStart(moment(dates[0]).format("YYYY-MM-DD"));
        setDtEnd(moment(dates[1]).format("YYYY-MM-DD"));
      }
    }
  }, [dates]);

  const resetFilters = useCallback(() => {
    setSearch(false);
    setSearchQuery(null);
    setTypeFilter(null);
    setPage(1);
    setPageSize(10);
    setDtStart("");
    setDtEnd("");

    setPage(1);
  }, [setSearchQuery, setTypeFilter, setPage]);

  const handleSearch = async () => {
    const res = await getWithdrawals({
      exchangeId: exchange || 0,
      num: pageSize,
      page,
      order: "createtime",
      orderby: "desc",
      search_type: typeFilter,
      keyword: typeFilter === "step" ? undefined : searchQuery,
      // step: typeFilter === "step" ? Number(query) : undefined,
      dt_start: dtStart || "",
      dt_end: dtEnd || "",
    });
    setSearch(true);

    setTotal(res.data.total);
    setWithdrawals(res.data.list);
  };

  const newWithdrawals = useMemo(() => {
    return withdrawals.map((v) => ({
      ...v,
      exchange_name: exchangeData.data?.find((v1) => v1.exchange_id === v.exchange_id)?.name || v.exchange_id,
      email: users.DATA.find((v1) => v1.id === v.user_id)?.email,
      createtime: moment(v.createtime).format("YYYY-MM-DD HH:mm"),
    }));
  }, [withdrawals, exchangeData, users]);

  useEffect(() => {
    handleSearch();
  }, [exchange, page, pageSize]);

  const enterPress = (e) => {
    if (typeFilter) {
      if (e.keyCode === 13) {
        handleSearch();
      } else {
        return;
      }
    } else {
      toast.error("검색 유형을 먼저 선택해주세요!");
    }
  };

  return (
    <div className="space-y-4 ">
      <div className="flex flex-wrap items-center gap-4">
        <DataTableFilterBox inputRef={inputRef} filterKey="exchange" title="거래소" options={EXCHANGE_OPTIONS} setFilterValue={setExchange} filterValue={exchange} />
        <DataTableFilterBox inputRef={inputRef} filterKey="type" title="검색 유형" options={TYPE_OPTIONS} setFilterValue={setTypeFilter} filterValue={typeFilter} />
        {searchType === "step" ? (
          <DataTableFilterBox inputRef={inputRef} filterKey="step" title="상태" options={STATUS_TYPE} setFilterValue={setSearchQuery} filterValue={searchQuery} />
        ) : (
          <DataTableSearch enterPress={enterPress} typeFilter={typeFilter} inputRef={inputRef} searchKey="name" searchQuery={searchQuery} setSearchQuery={setSearchQuery} setPage={setPage} />
        )}
        {/* <Button variant="outline">Search</Button> */}
        {dtStart && (
          <div className="font-bold text-sm">
            {dtStart} ~ {dtEnd}
          </div>
        )}
        {searchType !== "step" && (
          <Button variant="outline" onClick={handleSearch}>
            Search
          </Button>
        )}
        <DataTableResetFilter isFilterActive={isAnyFilterActive} onReset={resetFilters} />
      </div>
      <ClientDataTable
        pageSize={pageSize}
        setPageSize={setPageSize}
        page={page}
        setPage={setPage}
        exchangeData={exchangeData}
        rowExpand={rowExpand}
        setRowExpand={setRowExpand}
        columns={columns}
        data={data}
        ddata={search ? newWithdrawals : ddata}
        totalItems={search ? total || 1 : totalData}
      />
      {/* <DataTable exchangeData={exchangeData} rowExpand={rowExpand} setRowExpand={setRowExpand} columns={columns} data={data} ddata={search ? newWithdrawals : ddata} totalItems={totalData} /> */}
    </div>
  );
}
