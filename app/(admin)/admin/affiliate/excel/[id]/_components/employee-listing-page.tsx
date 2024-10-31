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
import { getAllUser, getAllUsersWithUidStatus, getCookie } from "@/actions/user/action";
import moment from "moment";
import { getExcel, getExcelLog, getExchanges, getWithdrawals } from "@/actions/trade/action";
import { toast } from "sonner";

type TEmployeeListingPage = { id: string };

export default async function EmployeeListingPage({ id }: TEmployeeListingPage) {
  const exchangeData = await getExchanges();
  const users = await getAllUser();
  const token = getCookie("token");

  // Showcasing the use of search params cache in nested RSCs
  const page = searchParamsCache.get("page");
  const search = searchParamsCache.get("q");
  const pageLimit = searchParamsCache.get("limit");
  const exchange = searchParamsCache.get("exchange");

  const data = await getExcelLog({ num: 10, page: page, excel_id: id });

  console.log("dsfmksdmfk", data.data.list[0]);

  const excels = await getExcel({ num: pageLimit, page });

  console.log("excels", excels.data.list[0]);

  const totalUsers = data.data.total;

  const title = data.data.list.find((v) => v.excel_id == id)?.file_name;

  // const data = excels.data.list.map((v) => ({
  //   ...v,
  //   exchange_name: exchangeData.data?.find((v1) => v1.exchange_id === v.exchange_id)?.name || v.exchange_id,
  //   // email: users.DATA.find((v1) => v1.id === v.user_id)?.email,
  //   create_at: moment(v.create_at).add(9, "h").format("YYYY-MM-DD HH:mm"),
  // }));

  return (
    <PageContainer scrollable>
      <div className="space-y-4">
        <div className="flex items-start justify-between">
          <Heading title={`${title || "Excel Log"} (${data.data.total})`} />
          {/* <Link href={"/admin/affiliate/excel/upload"} className={cn(buttonVariants({ variant: "default" }))}>
            <Plus className="mr-2 h-4 w-4" /> Add New
          </Link> */}
        </div>
        <Separator />
        <EmployeeTable exchangeData={exchangeData} data={[]} ddata={data.data.list} totalData={totalUsers} />
      </div>
    </PageContainer>
  );
}
