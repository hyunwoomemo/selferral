import { getExchanges, getUsers } from "@/app/action";
import moment from "moment";
import Link from "next/link";
import AddBtn from "./add-btn";
import Image from "next/image";

export default async function Page() {
  const exchanges = await getExchanges();

  return (
    <div className="font-bold flex-auto flex-col p-8 flex">
      <h1 className="text-3xl">거래소 목록</h1>
      <div className="flex flex-col flex-auto ">
        <div className="pt-10 md:grid md:grid-cols-7 p-2 place-items-center border-b-[1px]">
          <div>로고</div>
          <div>이름</div>
          <div>페이백</div>
          <div>할인</div>
          <div>시장가</div>
          <div>지정가</div>
        </div>
        <div className=" flex-[8] pb-20">
          {exchanges.map((exchange, index) => {
            const { round_image, name, payback, discount, market_order, limit_order } = exchange;

            console.log("round_image", round_image);

            return (
              <div key={index} className=" md:grid md:grid-cols-7 p-2 py-6 hover:bg-[rgb(26,26,36)] hover:rounded-md place-items-center border-b-[1px] hover:border-none border-gray-900">
                <Image src={round_image} alt="exchange-logo" width={50} height={50} />
                {/* <div>{round_image}</div> */}
                <div>{name}</div>
                <div>{payback}</div>
                <div>{discount}</div>
                <div>{market_order}</div>
                <div>{limit_order}</div>
                <div>수정</div>
                {/* <div>{hp}</div> */}
                {/* <div>{moment(createdAt).format("YYYY-MM-DD")}</div> */}
              </div>
            );
          })}
        </div>
        {/* <div className="">페이지네이션</div> */}
      </div>
      <AddBtn />
    </div>
  );
}
