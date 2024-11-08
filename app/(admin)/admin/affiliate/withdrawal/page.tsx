import { searchParamsCache } from "@/lib/searchparams";
import { SearchParams } from "nuqs/parsers";
import React from "react";
import EmployeeListingPage from "./_components/employee-listing-page";
import { getExchanges } from "@/actions/trade/action";
import { getAllUser } from "@/actions/user/action";

type pageProps = {
  searchParams: SearchParams;
};

export const metadata = {
  title: "Dashboard : Employees",
};

export default async function Page({ searchParams }: pageProps) {
  // Allow nested RSCs to access the search params (in a type-safe way)
  searchParamsCache.parse(searchParams);

  console.log("searchParams", searchParams);

  const exchangeData = await getExchanges();
  const users = await getAllUser();

  return <EmployeeListingPage searchParams={searchParams} exchangeData={exchangeData} users={users} />;
}
