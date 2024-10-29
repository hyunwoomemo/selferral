"use client";

import { DataTable } from "@/components/ui/table/data-table";
import { DataTableFilterBox } from "@/components/ui/table/data-table-filter-box";
import { DataTableResetFilter } from "@/components/ui/table/data-table-reset-filter";
import { DataTableSearch } from "@/components/ui/table/data-table-search";
import { Employee } from "@/constants/data";
import { columns } from "./columns";
import { REGISTER_TYPE, TYPE_OPTIONS, useEmployeeTableFilters, USER_TYPE } from "./use-employee-table-filters";
import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";

export default function EmployeeTable({ data, totalData, ddata }: { data: Employee[]; totalData: number; ddata: any }) {
  const { searchType, setSearchType, typeFilter, setTypeFilter, isAnyFilterActive, resetFilters, searchQuery, setPage, setSearchQuery } = useEmployeeTableFilters();
  const inputRef = useRef();

  const [rowExpand, setRowExpand] = useState(false);

  console.log("typeFilter", typeFilter);

  return (
    <div className="space-y-4 ">
      <div className="flex flex-wrap items-center gap-4">
        <DataTableFilterBox inputRef={inputRef} filterKey="type" title="상태" options={REGISTER_TYPE} setFilterValue={setTypeFilter} filterValue={typeFilter} />
        {/* {searchType === "type" ? (
          <DataTableFilterBox inputRef={inputRef} filterKey="userType" title="유저" options={USER_TYPE} setFilterValue={setSearchQuery} filterValue={searchQuery} />
        ) : (
          <DataTableSearch typeFilter={typeFilter} inputRef={inputRef} searchKey="name" searchQuery={searchQuery} setSearchQuery={setSearchQuery} setPage={setPage} />
        )} */}
        {/* <Button variant="outline">Search</Button> */}
        <DataTableResetFilter isFilterActive={isAnyFilterActive} onReset={resetFilters} />
      </div>
      <DataTable rowExpand={rowExpand} setRowExpand={setRowExpand} columns={columns} data={data} ddata={ddata} totalItems={totalData} />
    </div>
  );
}
