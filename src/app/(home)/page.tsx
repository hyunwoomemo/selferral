import Image from "next/image";
import styles from "./page.module.css";
import Header from "@/components/common/Header";
import styled from "styled-components";
import MainTitle from "./main-title";
import MainSearch from "./main-search";
import AverageRefund from "./average-refund";
import AveragePayback from "./average-payback";
import IntroduceApp from "./introduce-app";
import Divider from "@/components/common/Divider";
import Event from "./event";
import TradeList from "./trade-list";
import CheckRefund from "./check-my-refund";
import Footer from "@/components/common/Footer";
import Notice from "@/components/common/Notice";

export default function Home() {
  return (
    <main style={{ minHeight: "200vh" }}>
      <Header />
      <MainTitle />
      <MainSearch />
      <AverageRefund />
      <AveragePayback />
      <IntroduceApp />
      <Divider />
      <Event />
      <TradeList />
      <Divider />
      <Notice title={"트레이더님 지금 확인해보세요"} contents="내가 받을 돈 확인하기" type="uid" />
      <Footer />
    </main>
  );
}
