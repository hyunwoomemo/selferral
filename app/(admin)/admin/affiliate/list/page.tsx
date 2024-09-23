// import { getExchanges } from "@/app/action";
import Image from "next/image";
import AddBtn from "./add-btn";
import { Pencil, Trash2 } from "lucide-react";
import Link from "next/link";
import DeleteButton from "./delete-btn";
import { getAffiliateExchanges, getExchanges } from "@/actions/trade/action";
import { cookies } from "next/headers";

export default async function Page() {
  const exchanges = await getAffiliateExchanges();
  console.log("exchanges", exchanges);

  return (
    <div className="p-8 font-bold flex-auto pb-32">
      {/* 테이블 */}
      <h1 className="text-3xl pb-10">거래소</h1>
      <div className="flex flex-col gap-0 md:max-w-[70dvw] overflow-scroll">
        <div className="">
          <div className="flex gap-10 py-5 border-b-2">
            <span className="flex justify-center min-w-[180px]">로고</span>
            <span className="flex justify-center min-w-[180px]">이름</span>
            <span className="flex justify-center min-w-[180px]">페이백</span>
            <span className="flex justify-center min-w-[180px]">할인</span>
            <span className="flex justify-center min-w-[180px]">지정가</span>
            <span className="flex justify-center min-w-[180px]">시장가</span>
            <span className="flex justify-center min-w-[180px]">1인 평균 환급금</span>
            <span className="flex justify-center min-w-[180px]">태그</span>
            <span className="flex justify-center min-w-[180px]">배너</span>
          </div>
        </div>
        <div className="flex flex-col">
          {exchanges.data.map((exchange, index) => (
            <div className="flex py-5 items-center" key={exchange.name}>
              <div className="flex items-center  gap-10">
                <span className="min-w-[180px] flex justify-center">{exchange.image_thumb && <Image src={exchange.image_thumb} width={50} height={50} />}</span>
                <span className="flex justify-center items-center min-w-[180px]">{exchange.name}</span>
                <span className="flex justify-center items-center min-w-[180px]">{exchange.payback}</span>
                <span className="flex justify-center items-center min-w-[180px]">{exchange.discount}</span>
                <span className="flex justify-center items-center min-w-[180px]">{exchange.limit_order}</span>
                <span className="flex justify-center items-center min-w-[180px]">{exchange.market_order}</span>
                <span className="flex justify-center items-center min-w-[180px]">{exchange.average_refund}</span>
                <span className="flex justify-center items-center min-w-[180px]">{exchange.tag}</span>
                <span className="min-w-[180px] flex justify-center">{exchange.square_image && <Image src={exchange.square_image} width={100} height={50} alt="exchange-image" />}</span>
              </div>
              <div className="absolute right-10 flex gap-8">
                <Link href={`/admin/exchange/edit?id=${exchange.id}`}>
                  <Pencil />
                </Link>
                <DeleteButton id={exchange.id} />
              </div>
            </div>
          ))}
        </div>
        {/* 옵션 */}
      </div>
      <AddBtn />
    </div>
  );
}
