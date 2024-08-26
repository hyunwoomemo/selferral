// import { getExchanges } from "@/app/action";
import TradeList from "../(home)/trade-list";
import ExchangeWrapper from "../(home)/exchange-wrapper";
import { dummyTrade } from "@/dummy";

export default async function Page() {
  const data = await fetch('https://api.xn--3l2b13oekp.com/exchange/getExchanges');
  const exchangeData = await data.json();

  return (
    <div className="">
      {/* <h2 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-center">셀퍼럴 제휴 거래소</h2> */}
      {/* <TradeList data={exchangeData} /> */}
      <ExchangeWrapper data={exchangeData.data} />
    </div>
  );
}
