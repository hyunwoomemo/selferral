import PageContainer from "@/components/layout/page-container";
import { buttonVariants } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { Employee } from "@/constants/data";
import { fakeUsers } from "@/constants/mock-api";
import { searchParams, searchParamsCache } from "@/lib/searchparams";
import { cn } from "@/lib/utils";
import { Plus } from "lucide-react";
import Link from "next/link";
import EmployeeTable from "./employee-tables";
import { getAllUser, getAllUsersWithUidStatus } from "@/actions/user/action";
import moment from "moment";
import { getExchanges, getWithdrawals } from "@/actions/trade/action";

type TEmployeeListingPage = {};

export default async function EmployeeListingPage({ exchangeData, users }: TEmployeeListingPage) {
  // Showcasing the use of search params cache in nested RSCs
  const page = searchParamsCache.get("page");
  const query = searchParamsCache.get("q");
  const pageLimit = searchParamsCache.get("limit");
  const exchange = searchParamsCache.get("exchange");
  const order = searchParamsCache.get("order");
  const orderBy = searchParamsCache.get("orderBy");
  const type = searchParamsCache.get("type");
  const dt_start = searchParamsCache.get("dt_start");
  const dt_end = searchParamsCache.get("dt_end");
  const search = searchParamsCache.get("search");

  const withdrawals = await getWithdrawals({
    exchangeId: exchange || 0,
    num: pageLimit,
    page,
    order: order,
    orderby: orderBy,
    search_type: search && type,
    keyword: search && type === "step" ? undefined : query,
    step: search && type === "step" ? Number(query) : undefined,
    dt_start: search && dt_start,
    dt_end: search && dt_end,
  });

  const totalUsers = withdrawals.data.total;

  const data = withdrawals.data.list.map((v) => ({
    ...v,
    exchange_name: exchangeData.data?.find((v1) => v1.exchange_id === v.exchange_id)?.name || v.exchange_id,
    email: users.DATA.find((v1) => v1.id === v.user_id)?.email,
    createtime: moment(v.createtime).format("YYYY-MM-DD HH:mm"),
  }));
  return (
    <PageContainer scrollable>
      <div className="space-y-4">
        <div className="flex items-start justify-between">
          <Heading title={`Withdrawal (${totalUsers})`} description={search && query && `'${query}' 검색 결과`} />
          {/* <Link href={"/dashboard/employee/new"} className={cn(buttonVariants({ variant: "default" }))}>
            <Plus className="mr-2 h-4 w-4" /> Add New
          </Link> */}
        </div>
        <Separator />
        <EmployeeTable exchangeData={exchangeData} data={[]} ddata={data} totalData={totalUsers} />
      </div>
    </PageContainer>
  );
}
