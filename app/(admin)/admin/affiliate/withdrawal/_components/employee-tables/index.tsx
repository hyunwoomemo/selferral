"use client";

import { DataTable } from "@/components/ui/table/data-table";
import { DataTableFilterBox } from "@/components/ui/table/data-table-filter-box";
import { DataTableResetFilter } from "@/components/ui/table/data-table-reset-filter";
import { DataTableSearch } from "@/components/ui/table/data-table-search";
import { Employee } from "@/constants/data";
import { columns } from "./columns";
import { STATUS_TYPE, TYPE_OPTIONS, useEmployeeTableFilters, USER_TYPE } from "./use-employee-table-filters";
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { CalendarDateRangePicker } from "@/components/ui/date-range-picker";
import Calendar from "@/components/calendar";
import { bottomSheetAtom } from "@/app/store/common";
import { useAtom } from "jotai";
import moment from "moment";

export default function EmployeeTable({ data, totalData, ddata, exchangeData }: { data: Employee[]; totalData: number; ddata: any }) {
  const {
    searchType,
    setSearchType,
    typeFilter,
    setTypeFilter,
    isAnyFilterActive,
    resetFilters,
    searchQuery,
    setPage,
    setSearchQuery,
    setExchangeQuery,
    exchangeQuery,
    orderQuery,
    orderbyQuery,
    setOrderQuery,
    setOrderbyQuery,
    dtStart,
    dtEnd,
    setDtStart,
    setDtEnd,
  } = useEmployeeTableFilters();
  const inputRef = useRef();

  const [dates, setDates] = useState([new Date()]);
  const [isVisible, setIsVisible] = useState(false);
  const [dateSave, setDateSave] = useState(false);
  const [bottomSheet, setBottomSheet] = useAtom(bottomSheetAtom);

  const EXCHANGE_OPTIONS = [{ label: "전체", value: "0" }, ...exchangeData.data.map((v) => ({ label: v.name, value: String(v.exchange_id) }))];

  const [rowExpand, setRowExpand] = useState(false);

  console.log("typeFilter", typeFilter);

  useEffect(() => {
    if (searchType && searchType === "date") {
      setDateSave(false);
      setBottomSheet((prev) => ({
        ...prev,
        isVisible: true,
        contents: () => <Calendar setDateSave={setDateSave} dates={dates} setDates={setDates} dtStart={dtStart} dtEnd={dtEnd} />,
      }));
    }
  }, [searchType, dates]);

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

  return (
    <div className="space-y-4 ">
      <div className="flex flex-wrap items-center gap-4">
        <DataTableFilterBox inputRef={inputRef} filterKey="exchange" title="거래소" options={EXCHANGE_OPTIONS} setFilterValue={setExchangeQuery} filterValue={exchangeQuery} />
        <DataTableFilterBox inputRef={inputRef} filterKey="type" title="검색 유형" options={TYPE_OPTIONS} setFilterValue={setTypeFilter} filterValue={typeFilter} />
        {searchType === "step" ? (
          <DataTableFilterBox inputRef={inputRef} filterKey="step" title="상태" options={STATUS_TYPE} setFilterValue={setSearchQuery} filterValue={searchQuery} />
        ) : (
          <DataTableSearch typeFilter={typeFilter} inputRef={inputRef} searchKey="name" searchQuery={searchQuery} setSearchQuery={setSearchQuery} setPage={setPage} />
        )}
        {/* <Button variant="outline">Search</Button> */}
        {dtStart && (
          <div className="font-bold text-sm">
            {dtStart} ~ {dtEnd}
          </div>
        )}
        <DataTableResetFilter isFilterActive={isAnyFilterActive} onReset={resetFilters} />
      </div>
      <DataTable exchangeData={exchangeData} rowExpand={rowExpand} setRowExpand={setRowExpand} columns={columns} data={data} ddata={ddata} totalItems={totalData} />
    </div>
  );
}
