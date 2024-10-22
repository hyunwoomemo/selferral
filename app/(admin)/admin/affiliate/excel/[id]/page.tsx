import React from "react";
import Container from "./container";
import { getAffiliateExchanges, getExcel, getExcelLog } from "@/actions/trade/action";
import { API_URL } from "@/actions";
import ServerPagination from "@/components/ui/server-pagination";

const page = async ({ params, searchParams }) => {
  const id = params.id;
  const page = searchParams.page;
  console.log("idididid", id, page);

  const data = await getExcelLog({ num: 10, page: page, excel_id: id });
  const exchanges = await getAffiliateExchanges();

  console.log("logslogs", data, data.data.list, exchanges);

  const image_url = (await data.data.list) && exchanges.data.find((v) => v.id == data.data.list[0]?.exchange_id)?.image_thumb;
  console.log("image_url", image_url);

  if (data.data.list.length === 0) {
    return <div className="p-8">데이터가 존재하지 않습니다.</div>;
  }

  return (
    <div className="w-full">
      <Container id={id} data={data.data.list} image_url={image_url}></Container>
      <div className="p-8 justify-center w-full flex-1">
        <ServerPagination serverPage={page} offset={10} total={data.data.total} link={`/admin/affiliate/excel/${id}`} home={"/admin/affiliate/excel"} />
      </div>
    </div>
  );
};

export default page;
