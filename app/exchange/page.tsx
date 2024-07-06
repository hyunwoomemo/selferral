import TradeList from "../(home)/trade-list";

export default function Page() {
  return (
    <div className="pt-20 md:pt-40 px-4">
      <h2 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-center">셀퍼럴 제휴 거래소</h2>
      <TradeList />
    </div>
  );
}
