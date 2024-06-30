"use client";
import { dummyTrade } from "@/dummy";
import styled from "styled-components";
import TradeItem from "./trade-item";

const TradeList = () => {
  return (
    <Container>
      {dummyTrade.map((dummy, index) => {
        return <TradeItem key={index} data={dummy} />;
      })}
    </Container>
  );
};

export default TradeList;

const Container = styled.div``;
