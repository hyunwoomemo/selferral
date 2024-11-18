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
import { getExchanges } from "@/actions/trade/action";

type TEmployeeListingPage = {};

export default async function EmployeeListingPage({}: TEmployeeListingPage) {
  const exchangeData = await getExchanges();

  // Showcasing the use of search params cache in nested RSCs
  const page = searchParamsCache.get("page");
  const query = searchParamsCache.get("q");
  const type = searchParamsCache.get("type");
  const pageLimit = searchParamsCache.get("limit");
  const search = searchParamsCache.get("search");

  const filters = {
    page,
    limit: pageLimit,
    ...(query && { query }),
    ...(type && { genders: type }),
  };

  // mock api call
  const data = await fakeUsers.getUsers(filters);

  // const user = await getAllUsersWithUidStatus({ type: search && type, text: search && query, page: page, rownum: pageLimit });
  const user = await getAllUsersWithUidStatus({ type: "", text: "", page: 1, rownum: 10 });

  // console.log("user", user.lists[0].exchanges);
  // const totalUsers = data.total_users;
  const totalUsers = user.total;
  const employee: Employee[] = data.users;
  const users = user.lists.map((v) => ({ ...v, createdAt: moment(v.createdAt).format("YYYY-MM-DD HH:mm") }));
  return (
    <PageContainer scrollable>
      <div className="space-y-4">
        <div className="flex items-start justify-between">
          <Heading title={`User (${totalUsers})`} description={search && query && `'${query}' 검색 결과`} />
          {/* <Link href={"/dashboard/employee/new"} className={cn(buttonVariants({ variant: "default" }))}>
            <Plus className="mr-2 h-4 w-4" /> Add New
          </Link> */}
        </div>
        <Separator />
        <EmployeeTable exchangeData={exchangeData} data={employee} ddata={users} totalData={totalUsers} />
      </div>
    </PageContainer>
  );
}
