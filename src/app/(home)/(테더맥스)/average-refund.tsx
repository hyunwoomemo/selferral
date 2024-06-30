"use client";

import "swiper/css";
import React from "react";
import styled from "styled-components";
import { styles } from "../../../styles";
import { dummyTrade } from "../../../dummy";
import { Swiper, SwiperSlide } from "swiper/react";
import { useSetAtom } from "jotai";
import { uidSearchAtom } from "@/store/uid/atom";
const AverageRefund = () => {
  const setUidSearch = useSetAtom(uidSearchAtom);

  return (
    <Container>
      <Title>1인 평균 환급액</Title>
      <HorizontalList>
        <Swiper
          slidesPerView={"auto"}
          spaceBetween={5}
          pagination={{
            clickable: true,
          }}
          className="mySwiper"
        >
          {dummyTrade.map((dummy, index) => (
            <SwiperSlide id="refund-slide" about="" key={index}>
              <ListItem onClick={() => setUidSearch(dummy.name)}>
                <ListItemName>{dummy.name}</ListItemName>
                <ListItemAmount>{dummy.averageRefund / 10000}만원</ListItemAmount>
              </ListItem>
            </SwiperSlide>
          ))}
        </Swiper>
        {/* {dummyTrade.map((dummy, index) => (
          <ListItem key={index}>
            <ListItemName>{dummy.name}</ListItemName>
            <ListItemAmount>{dummy.averageRefund / 10000}만원</ListItemAmount>
          </ListItem>
        ))} */}
      </HorizontalList>
    </Container>
  );
};

export default AverageRefund;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 30px 0 10px;
  /* margin: 20px; */
`;

const Title = styled.h2`
  color: ${styles.gray1};
  margin: 0 20px;
`;

const HorizontalList = styled.div`
  padding: 25px 10px;
  /* overflow: scroll; */
`;

const ListItem = styled.div`
  padding: 10px;
  border-radius: 10px;
  background-color: ${styles.gray2};
  display: flex;
  gap: 5px;
  justify-content: center;
  margin-left: 5px;
  flex-wrap: nowrap;
`;

const ListItemName = styled.p`
  color: ${styles.gray3};
`;

const ListItemAmount = styled.p`
  color: ${styles.red};
  font-weight: 600;
`;
