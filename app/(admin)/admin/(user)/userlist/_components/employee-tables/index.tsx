"use client";

import { DataTable } from "@/components/ui/table/data-table";
import { DataTableFilterBox } from "@/components/ui/table/data-table-filter-box";
import { DataTableResetFilter } from "@/components/ui/table/data-table-reset-filter";
import { DataTableSearch } from "@/components/ui/table/data-table-search";
import { Employee } from "@/constants/data";
import { columns } from "./columns";
import { TYPE_OPTIONS, useEmployeeTableFilters, USER_TYPE } from "./use-employee-table-filters";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { getAllUsersWithUidStatus } from "@/actions/user/action";
import { toast } from "sonner";
import { debounce } from "@/utils/debounce";
import { throttle } from "@/utils/throttle";
import { ClientDataTable } from "@/components/ui/table/client-data-table";

export default function EmployeeTable({ data, totalData, ddata, exchangeData }: { data: Employee[]; totalData: number; ddata: any }) {
  // const { searchType, setSearchType, typeFilter, setTypeFilter, isAnyFilterActive, resetFilters, searchQuery, setPage, setSearchQuery, search, setSearch } = useEmployeeTableFilters();

  const [users, setUsers] = useState([]);
  const [searchType, setSearchType] = useState();
  const [type, setType] = useState();
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [keyword, setKeyword] = useState("");
  const [search, setSearch] = useState(false);
  const [total, setTotal] = useState(0);

  const isAnyFilterActive = useMemo(() => {
    return !!keyword || !!type;
  }, [keyword, type]);

  const resetFilters = useCallback(() => {
    setSearch(false);
    setKeyword(null);
    setType(null);
    setPage(1);
    setPageSize(10);

    setPage(1);
  }, [setKeyword, setType, setPage]);

  const loadData = useCallback(async () => {}, []);

  const inputRef = useRef();

  const [rowExpand, setRowExpand] = useState(false);

  const handleSearch = async () => {
    const res = await getAllUsersWithUidStatus({ type: type, text: keyword, page: page, rownum: pageSize });
    setSearch(true);

    setTotal(res.total);
    setUsers(res.lists);
  };

  useEffect(() => {
    handleSearch();
  }, [page, pageSize]);

  const enterPress = (e) => {
    if (type) {
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
        <DataTableFilterBox inputRef={inputRef} filterKey="type" title="검색 유형" options={TYPE_OPTIONS} setFilterValue={setType} filterValue={type} />
        {type === "type" ? (
          <DataTableFilterBox inputRef={inputRef} filterKey="userType" title="유저" options={USER_TYPE} setFilterValue={setKeyword} filterValue={keyword} />
        ) : (
          <DataTableSearch typeFilter={type} inputRef={inputRef} searchKey="name" searchQuery={keyword} setSearchQuery={setKeyword} setPage={setPage} enterPress={enterPress} />
        )}
        {searchType !== "type" && (
          <Button
            variant="outline"
            onClick={() => {
              // setSearch("true");
              handleSearch();
            }}
          >
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
        ddata={search ? users : ddata}
        totalItems={search ? total || 1 : totalData}
      />
    </div>
  );
}
