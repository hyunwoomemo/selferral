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
import { getExcel, getExchanges, getWithdrawals } from "@/actions/trade/action";
import { toast } from "sonner";

type TEmployeeListingPage = {};

export default async function EmployeeListingPage({}: TEmployeeListingPage) {
  const exchangeData = await getExchanges();
  const users = await getAllUser();
  const token = getCookie("token");

  // Showcasing the use of search params cache in nested RSCs
  const page = searchParamsCache.get("page");
  const search = searchParamsCache.get("q");
  const pageLimit = searchParamsCache.get("limit");
  const exchange = searchParamsCache.get("exchange");
  const order = searchParamsCache.get("order");
  const orderBy = searchParamsCache.get("orderBy");
  const type = searchParamsCache.get("type");

  const withdrawals = await getWithdrawals({ exchangeId: exchange, num: pageLimit, page, order: order, orderby: orderBy, search_type: type, keyword: search });

  const excels = await getExcel({ num: pageLimit, page });

  const totalUsers = excels.data.total;

  const data = excels.data.list.map((v) => ({
    ...v,
    exchange_name: exchangeData.data?.find((v1) => v1.exchange_id === v.exchange_id)?.name || v.exchange_id,
    // email: users.DATA.find((v1) => v1.id === v.user_id)?.email,
    create_at: moment(v.create_at).add(9, "h").format("YYYY-MM-DD HH:mm"),
  }));

  const handleUpload = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!file) return;

    const formData = new FormData();

    for (let i = 0; i < file.length; i++) {
      formData.append("file", file[i]);
    }

    formData.append("exchange_id", exchange);

    try {
      const data = await uploadExcel({ token: token, formData: formData });

      if (data.flag === "ok") {
        setFile(null);
        // window.alert("액셀이 업로드 되었습니다.");
        toast.success("액셀이 업로드 되었습니다.");
        // router.push("/admin/user/uid?type=1");
        // router.refresh();
        // revalidateTag("excellist");
        // router.refresh();
      }
    } catch (err) {
    } finally {
      setLoading(false);
    }
  };

  return (
    <PageContainer scrollable>
      <div className="space-y-4">
        <div className="flex items-start justify-between">
          <Heading title={`Excel (${totalUsers})`} />
          <Link href={"/admin/affiliate/excel/upload"} className={cn(buttonVariants({ variant: "default" }))}>
            <Plus className="mr-2 h-4 w-4" /> Add New
          </Link>
        </div>
        <Separator />
        <EmployeeTable exchangeData={exchangeData} data={[]} ddata={data} totalData={totalUsers} />
      </div>
    </PageContainer>
  );
}
