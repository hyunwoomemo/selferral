import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";
import MainTitleSearchWrapper from "./main-title-search-wrapper";
import MainTitle from "./(테더나우)/main-title";
import MainSearch from "./(테더나우)/main-search";
import MainPayback from "./(테더나우)/main-payback";
import MainEventList from "./(테더나우)/main-event-list";
import MainPaybackData from "./(테더나우)/main-payback-data";
import Image from "next/image";

export default function Home() {
  return (
    <main style={{ minHeight: "200vh" }}>
      <Header />
      <MainTitleSearchWrapper>
        <MainTitle />
        <MainSearch />
      </MainTitleSearchWrapper>
      <MainPayback />
      <MainEventList />
      <MainPaybackData />
      {/* <AverageRefund />
      <AveragePayback />
      <IntroduceApp />
      <Divider />
      <Event />
      <TradeList />
      <Divider />
      <Notice title={"트레이더님 지금 확인해보세요"} contents="내가 받을 돈 확인하기" type="uid" /> */}
      <Footer />
    </main>
  );
}
