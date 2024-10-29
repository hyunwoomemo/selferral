// import { getExchanges } from "@/app/action";
import Image from "next/image";
import AddBtn from "./add-btn";
import { ChevronDown, Pencil, Plus, Trash2 } from "lucide-react";
import Link from "next/link";
import DeleteButton from "./delete-btn";
import { getAffiliateExchanges, getExchanges } from "@/actions/trade/action";
import { cookies } from "next/headers";
import { useMemo } from "react";
import ExchangeItem from "./exchange-item";
import PageContainer from "@/components/layout/page-container";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Container from "./container";
import { getAdminBanner } from "@/actions/site/action";

export default async function Page() {
  const banners = await getAdminBanner({ type: "all" });
  const exchanges = await getExchanges();
  return (
    // <div className="p-8 font-bold flex-auto pb-32">
    //   {/* 테이블 */}
    //   <h1 className="text-3xl pb-10">거래소</h1>
    //   <ExchangeItem exchanges={exchanges} />
    // </div>
    <PageContainer scrollable>
      {/* <AddBtn /> */}
      <div className="space-y-4">
        <div className="flex items-start justify-between">
          <Heading title={`Event (${exchanges.data.length})`} />
          <Link href={"/admin/exchange/event/add"} className={cn(buttonVariants({ variant: "default" }))}>
            <Plus className="mr-2 h-4 w-4" /> Add New
          </Link>
        </div>
        <Separator />
        <Container data={banners.data.list} exchanges={exchanges.data} />

        {/* <ExchangeItem exchanges={exchanges} /> */}
      </div>
    </PageContainer>
  );
}
