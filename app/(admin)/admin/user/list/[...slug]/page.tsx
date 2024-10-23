import { getAffiliateExchanges, getExcelLog } from "@/actions/trade/action";
import Table from "@/components/ui/table";
import React from "react";
import Container from "./container";
import Image from "next/image";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import ServerPagination from "@/components/ui/server-pagination";

const page = async ({ params, searchParams }) => {
  //
  const page = searchParams.page || 1;
  const exchange_id = params.slug[0];
  const uid = params.slug[1];
  const exchanges = await getAffiliateExchanges();

  const data = await getExcelLog({ num: 10, page: page, exchange_id, uid });

  const image_url = (await data.data.list) && exchanges.data.find((v) => v.id == data.data.list[0]?.exchange_id)?.image_thumb;

  if (data.data.list.length === 0) {
    return <div className="p-8">데이터가 존재하지 않습니다.</div>;
  }

  return (
    <div className="p-8 w-full">
      <div className="flex gap-4 items-center">
        <Link href={"/admin/user/list"}>
          <ChevronLeft />
        </Link>
        <Image src={`http://api.xn--3l2b13oekp.com/${image_url}`} width={30} height={30} alt="image" />
        {uid}
      </div>
      <Container data={data.data.list} />
      <ServerPagination serverPage={page} offset={10} total={data.data.total} link={`/admin/user/list/${exchange_id}/${uid}`} home={"/admin/user/list"} />
    </div>
  );
};

export default page;
