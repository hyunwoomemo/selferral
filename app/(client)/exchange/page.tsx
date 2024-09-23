// import { getExchanges } from "@/app/action";
import TradeList from "../(home)/trade-list";
import ExchangeWrapper from "../(home)/exchange-wrapper";
import { dummyTrade } from "@/dummy";
import { getExchanges } from "@/actions/trade/action";

export default async function Page() {
  const data = await getExchanges();

  return (
    <div className="flex flex-auto flex-col p-4">
      {/* <h2 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-center">셀퍼럴 제휴 거래소</h2> */}
      {/* <TradeList data={exchangeData} /> */}
      <ExchangeWrapper data={data.data} />
    </div>
  );
}
