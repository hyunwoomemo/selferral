"use client";
import { getLinks } from "@/actions/trade/action";
import UserExpandList from "@/app/(admin)/admin/(user)/userlist/_components/employee-tables/user-expand-list";
import ExpnadList from "@/app/(admin)/admin/(user)/userlist/_components/employee-tables/user-expand-list";
import ExchangeExpandList from "@/app/(admin)/admin/exchange/list/_components/employee-tables/exchange-expand-list";
import { Button } from "@/components/ui/button";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { exchangeAtom } from "@/store/exchange/atom";
import { DoubleArrowLeftIcon, DoubleArrowRightIcon } from "@radix-ui/react-icons";
import { ColumnDef, flexRender, getCoreRowModel, getPaginationRowModel, PaginationState, useReactTable } from "@tanstack/react-table";
import { useAtom } from "jotai";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { parseAsInteger, useQueryState } from "nuqs";
import { useEffect, useState } from "react";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  totalItems: number;
  pageSizeOptions?: number[];
}

export function DataTable<TData, TValue>({ columns, data, ddata, totalItems, pageSizeOptions = [10, 20, 30, 40, 50], rowExpand, setRowExpand, exchangeData }: DataTableProps<TData, TValue>) {
  const [currentPage, setCurrentPage] = useQueryState("page", parseAsInteger.withOptions({ shallow: false }).withDefault(1));
  const [pageSize, setPageSize] = useQueryState("limit", parseAsInteger.withOptions({ shallow: false, history: "push" }).withDefault(10));
  const [exchange, setExchange] = useAtom(exchangeAtom);
  const [links, setLinks] = useState();
  const [loading, setLoading] = useState(true);

  const paginationState = {
    pageIndex: currentPage - 1, // zero-based index for React Table
    pageSize: pageSize,
  };

  const pageCount = Math.ceil(totalItems / pageSize);

  const handlePaginationChange = (updaterOrValue: PaginationState | ((old: PaginationState) => PaginationState)) => {
    const pagination = typeof updaterOrValue === "function" ? updaterOrValue(paginationState) : updaterOrValue;

    setCurrentPage(pagination.pageIndex + 1); // converting zero-based index to one-based
    setPageSize(pagination.pageSize);
  };

  const table = useReactTable({
    data: ddata,
    columns,
    pageCount: pageCount,
    state: {
      pagination: paginationState,
    },
    onPaginationChange: handlePaginationChange,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    manualPagination: true,
    manualFiltering: true,
  });

  const handleExpandClick = (row, cell) => {
    console.log("cellcell", cell);

    if (cell.id.includes("total") || cell.id.includes("expand")) {
      if (!(row.original.total || cell.id.includes("expand"))) return;
      setRowExpand((prev) => (prev === row.id ? false : row.id));

      if (cell.id.includes("expand")) {
        setLoading(true);
        setExchange((prev) => ({ ...prev, expand: row.id }));

        getLinks({ exchange_id: row.original.id })
          .then((res) => setLinks(res.data))
          .finally(() => setLoading(false));
      }
    }
  };

  return (
    <div className="space-y-4">
      <ScrollArea className="h-[calc(80vh-220px)] rounded-md border md:h-[calc(90dvh-240px)]">
        <Table className="relative">
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>{header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}</TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => {
                console.log("zxczxc", row);
                return (
                  <>
                    <TableRow className={rowExpand ? (rowExpand === row.id ? "" : "") : "opacity-100"} key={row.id} data-state={row.getIsSelected() && "selected"}>
                      {row.getVisibleCells().map((cell) => {
                        console.log("cell", cell, cell.id.includes("expand"));
                        return (
                          <TableCell onClick={() => handleExpandClick(row, cell)} key={cell.id}>
                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                          </TableCell>
                        );
                      })}
                      {/* <TableRow>sdf</TableRow> */}
                    </TableRow>
                    {rowExpand === row.id && (
                      <>{row.original.total ? <UserExpandList row={row} exchangeData={exchangeData} /> : exchange.expand === row.id && <ExchangeExpandList data={links} loading={loading} />}</>
                    )}
                  </>
                );
              })
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>

      <div className="flex flex-col items-center justify-end gap-2 space-x-2 py-4 sm:flex-row">
        <div className="flex w-full items-center justify-between">
          <div className="flex-1 text-sm text-muted-foreground">
            {totalItems > 0 ? (
              <>
                Showing {paginationState.pageIndex * paginationState.pageSize + 1} to {Math.min((paginationState.pageIndex + 1) * paginationState.pageSize, totalItems)} of {totalItems} entries
              </>
            ) : (
              "No entries found"
            )}
          </div>
          <div className="flex flex-col items-center gap-4 sm:flex-row sm:gap-6 lg:gap-8">
            <div className="flex items-center space-x-2">
              <p className="whitespace-nowrap text-sm font-medium">Rows per page</p>
              <Select
                value={`${paginationState.pageSize}`}
                onValueChange={(value) => {
                  table.setPageSize(Number(value));
                }}
              >
                <SelectTrigger className="h-8 w-[70px]">
                  <SelectValue placeholder={paginationState.pageSize} />
                </SelectTrigger>
                <SelectContent side="top">
                  {pageSizeOptions.map((pageSize) => (
                    <SelectItem key={pageSize} value={`${pageSize}`}>
                      {pageSize}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
        <div className="flex w-full items-center justify-between gap-2 sm:justify-end">
          <div className="flex w-[150px] items-center justify-center text-sm font-medium">
            {totalItems > 0 ? (
              <>
                Page {paginationState.pageIndex + 1} of {table.getPageCount()}
              </>
            ) : (
              "No pages"
            )}
          </div>
          <div className="flex items-center space-x-2">
            <Button aria-label="Go to first page" variant="outline" className="hidden h-8 w-8 p-0 lg:flex" onClick={() => table.setPageIndex(0)} disabled={!table.getCanPreviousPage()}>
              <DoubleArrowLeftIcon className="h-4 w-4" aria-hidden="true" />
            </Button>
            <Button aria-label="Go to previous page" variant="outline" className="h-8 w-8 p-0" onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()}>
              <ChevronLeftIcon className="h-4 w-4" aria-hidden="true" />
            </Button>
            <Button aria-label="Go to next page" variant="outline" className="h-8 w-8 p-0" onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>
              <ChevronRightIcon className="h-4 w-4" aria-hidden="true" />
            </Button>
            <Button
              aria-label="Go to last page"
              variant="outline"
              className="hidden h-8 w-8 p-0 lg:flex"
              onClick={() => table.setPageIndex(table.getPageCount() - 1)}
              disabled={!table.getCanNextPage()}
            >
              <DoubleArrowRightIcon className="h-4 w-4" aria-hidden="true" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
