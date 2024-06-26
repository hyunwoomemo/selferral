"use client";

import { dummyEvent } from "@/dummy";
import { styles } from "@/styles";
import Image from "next/image";
import React from "react";
import styled from "styled-components";
import { Swiper, SwiperSlide } from "swiper/react";

const Event = () => {
  return (
    <Container>
      <TextWrapper>
        <Text>테더맥스와 함께하는</Text>
        <Text>거래소 이벤트에요</Text>
        <SmallText>트레이더님들을 위해 준비했어요</SmallText>
      </TextWrapper>
      <HorizontalList>
        <Swiper
          slidesPerView={3}
          spaceBetween={30}
          pagination={{
            clickable: true,
          }}
          className="mySwiper"
        >
          {dummyEvent.map((dummy, index) => (
            <SwiperSlide about="" key={index}>
              <ListItem key={index}>
                <Image style={{ borderRadius: 20 }} src={dummy.image} width={155} height={155} alt="eventImage" />
                <ListItemTitle>{dummy.title}</ListItemTitle>
                <ListItemContents>{dummy.contents}</ListItemContents>
                <DateWrapper>
                  <DateItem>{dummy.sdate}</DateItem>
                  <DateItem>{dummy.edate}</DateItem>
                </DateWrapper>
              </ListItem>
            </SwiperSlide>
          ))}
        </Swiper>
      </HorizontalList>
    </Container>
  );
};

export default Event;

const Container = styled.div`
  margin: 20px;
`;

const TextWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;
const Text = styled.p`
  font-size: 21px;
  font-weight: 800;
  line-height: 120%;
`;
const SmallText = styled.p`
  font-size: 0.8rem;
  color: ${styles.gray1};
`;

const HorizontalList = styled.div`
  padding: 25px 0;
  /* overflow: scroll; */
`;

const ListItem = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: 10px;
  gap: 10px;
`;

const ListItemTitle = styled.p`
  color: ${styles.gray1};
  font-weight: 600;
`;

const ListItemContents = styled.p`
  font-size: 20px;
  font-weight: 800;
`;

const DateWrapper = styled.div`
  display: flex;
  gap: 5px;
`;

const DateItem = styled.p`
  font-size: 14px;
  color: ${styles.gray1};
`;
