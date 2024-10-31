import { searchParamsCache } from "@/lib/searchparams";
import { SearchParams } from "nuqs/parsers";
import React from "react";
import EmployeeListingPage from "./_components/employee-listing-page";

type pageProps = {
  searchParams: SearchParams;
};

export const metadata = {
  title: "Dashboard : Employees",
};

export default async function Page({ params, searchParams }: pageProps) {
  console.log("searchParams", params);

  // Allow nested RSCs to access the search params (in a type-safe way)
  searchParamsCache.parse(searchParams);

  return <EmployeeListingPage id={params.id} />;
}
