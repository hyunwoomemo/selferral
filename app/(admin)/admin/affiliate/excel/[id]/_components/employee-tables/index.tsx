"use client";

import { DataTable } from "@/components/ui/table/data-table";
import { DataTableFilterBox } from "@/components/ui/table/data-table-filter-box";
import { DataTableResetFilter } from "@/components/ui/table/data-table-reset-filter";
import { DataTableSearch } from "@/components/ui/table/data-table-search";
import { Employee } from "@/constants/data";
import { columns } from "./columns";
import { TYPE_OPTIONS, useEmployeeTableFilters, USER_TYPE } from "./use-employee-table-filters";
import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";

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
  } = useEmployeeTableFilters();
  const inputRef = useRef();

  const EXCHANGE_OPTIONS = [{ label: "전체", value: "0" }, ...exchangeData.data.map((v) => ({ label: v.name, value: String(v.exchange_id) }))];

  const [rowExpand, setRowExpand] = useState(false);

  console.log("typeFilter", typeFilter);

  return (
    <div className="space-y-4 ">
      <div className="flex flex-wrap items-center gap-4">
        {/* <DataTableFilterBox inputRef={inputRef} filterKey="exchange" title="거래소" options={EXCHANGE_OPTIONS} setFilterValue={setExchangeQuery} filterValue={exchangeQuery} />
        <DataTableFilterBox inputRef={inputRef} filterKey="type" title="검색 유형" options={TYPE_OPTIONS} setFilterValue={setTypeFilter} filterValue={typeFilter} />
        {searchType === "type" ? (
          <DataTableFilterBox inputRef={inputRef} filterKey="userType" title="유저" options={USER_TYPE} setFilterValue={setSearchQuery} filterValue={searchQuery} />
        ) : (
          <DataTableSearch typeFilter={typeFilter} inputRef={inputRef} searchKey="name" searchQuery={searchQuery} setSearchQuery={setSearchQuery} setPage={setPage} />
        )} */}
        {/* <Button variant="outline">Search</Button> */}
        <DataTableResetFilter isFilterActive={isAnyFilterActive} onReset={resetFilters} />
      </div>
      <DataTable exchangeData={exchangeData} rowExpand={rowExpand} setRowExpand={setRowExpand} columns={columns} data={data} ddata={ddata} totalItems={totalData} />
    </div>
  );
}
