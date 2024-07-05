"use client";
import { dummyTrade } from "@/dummy";
import styled from "styled-components";
import TradeItem from "./trade-item";
import { useRouter } from 'next/navigation';

const TradeList = () => {

  const router = useRouter();

  return (
    <Container>
      {dummyTrade.map((dummy, index) => {
        return <TradeItem onClick={() => router.push(`/exchandeDetail/${dummy.name.toLowerCase()}`)} key={index} data={dummy} />;
      })}
    </Container>
  );
};

export default TradeList;

const Container = styled.div``;
