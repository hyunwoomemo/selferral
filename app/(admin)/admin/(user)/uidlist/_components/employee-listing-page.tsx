import PageContainer from "@/components/layout/page-container";
import { buttonVariants } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { Employee } from "@/constants/data";
import { fakeUsers } from "@/constants/mock-api";
import { searchParamsCache } from "@/lib/searchparams";
import { cn } from "@/lib/utils";
import { Plus } from "lucide-react";
import Link from "next/link";
import EmployeeTable from "./employee-tables";
import { getAllUser, getAllUsersWithUidStatus } from "@/actions/user/action";
import moment from "moment";
import { getExchanges, getUidRegisterStatus } from "@/actions/trade/action";

type TEmployeeListingPage = {};

export default async function EmployeeListingPage({}: TEmployeeListingPage) {
  const exchangeData = await getExchanges();
  const users = await getAllUser();

  // Showcasing the use of search params cache in nested RSCs
  const page = searchParamsCache.get("page");
  const search = searchParamsCache.get("q");
  const type = searchParamsCache.get("type");
  const pageLimit = searchParamsCache.get("limit");

  const filters = {
    page,
    limit: pageLimit,
    ...(search && { search }),
    ...(type && { type: type }),
  };

  // mock api call
  // const data = await fakeUsers.getUsers(filters);

  const uids = await getUidRegisterStatus({ status: type || 0, exchange_id: 0, rownum: pageLimit, page: page });

  //
  // const totalUsers = data.total_users;
  const totalUsers = uids.data.total;
  // const employee: Employee[] = data.users;
  const data = uids.data.list.map((v) => ({
    ...v,
    exchange_name: exchangeData?.data?.find((v1) => v1.exchange_id == v.exchange_id)?.name,
    email: users.DATA.find((user) => user.id == v.user_id)?.email,
    createtime: moment(v.createtime).format("YYYY-MM-DD HH:mm"),
    point: v.point || 0,
  }));
  return (
    <PageContainer scrollable>
      <div className="space-y-4">
        <div className="flex items-start justify-between">
          <Heading title={`UID (${totalUsers})`} description="Manage employees (Server side table functionalities.)" />
          {/* <Link href={"/dashboard/employee/new"} className={cn(buttonVariants({ variant: "default" }))}>
            <Plus className="mr-2 h-4 w-4" /> Add New
          </Link> */}
        </div>
        <Separator />
        <EmployeeTable data={uids} ddata={data} totalData={totalUsers} />
      </div>
    </PageContainer>
  );
}
