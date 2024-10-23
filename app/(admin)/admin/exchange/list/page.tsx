// import { getExchanges } from "@/app/action";
import Image from "next/image";
import AddBtn from "./add-btn";
import { ChevronDown, Pencil, Trash2 } from "lucide-react";
import Link from "next/link";
import DeleteButton from "./delete-btn";
import { getAffiliateExchanges, getExchanges } from "@/actions/trade/action";
import { cookies } from "next/headers";
import Table from "@/components/ui/table";
import { useMemo } from "react";
import ExchangeItem from "./exchange-item";

export default async function Page() {
  const exchanges = await getAffiliateExchanges();

  return (
    <div className="p-8 font-bold flex-auto pb-32">
      {/* 테이블 */}
      <h1 className="text-3xl pb-10">거래소</h1>
      <ExchangeItem exchanges={exchanges} />
      <AddBtn />
    </div>
  );
}
