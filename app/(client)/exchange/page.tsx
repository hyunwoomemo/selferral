// import { getExchanges } from "@/app/action";
import TradeList from "../(home)/trade-list";
import ExchangeWrapper from "../(home)/exchange-wrapper";
import { dummyTrade } from "@/dummy";

export default async function Page() {
  // const exchangeData = await getExchanges();

  return (
    <div className="">
      {/* <h2 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-center">셀퍼럴 제휴 거래소</h2> */}
      {/* <TradeList data={exchangeData} /> */}
      <ExchangeWrapper data={dummyTrade} />
    </div>
  );
}
