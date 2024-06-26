"use client";
import { styles } from "@/styles";
import styled from "styled-components";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Autoplay } from "swiper/modules";
import Button from "@/components/common/Button";
import { useState } from "react";
import ProgressBar from "@/components/common/ProgressBar";
import { useRouter } from "next/navigation";
const TOTAL = 4;
const PaybackContents = () => {
  const router = useRouter();

  return (
    <Container>
      <TextWrapper>
        <Text>지금 다른 사람들이</Text>
        <Text>돌려받는 수수료는 얼마?</Text>
        <SmallText>간단하게 조회하세요. 40초면 끝나요!</SmallText>
      </TextWrapper>
      <Swiper
        slidesPerView={1}
        spaceBetween={0}
        pagination={{
          clickable: true,
        }}
        className="mySwiper"
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        loop={true}
        modules={[Autoplay]}
      >
        <SwiperSlide>
          <ListItem bgc="rgb(252,236,208)">내용1</ListItem>
        </SwiperSlide>
        <SwiperSlide>
          <ListItem bgc="rgb(213,239,253)">내용2</ListItem>
        </SwiperSlide>
        <SwiperSlide>
          <ListItem bgc="rgb(250,228,229)">내용3</ListItem>
        </SwiperSlide>
      </Swiper>
      <ButtonWrapper>
        <Button label="나도 거래 수수료 환급 받기" bgc={styles.blue} onClick={() => router.push("/payback/process/1")} borderRadius={10} />
      </ButtonWrapper>
    </Container>
  );
};

export default PaybackContents;

const Container = styled.div``;

const TextWrapper = styled.div`
  padding: 20px;
`;
const Text = styled.p`
  font-weight: 700;
  font-size: 24px;
  line-height: 150%;
`;

const SmallText = styled.p`
  padding: 15px 0;
  color: ${styles.grayText};
  font-weight: 700;
`;

const ListItem = styled.div<{ bgc: string }>`
  padding: 20px;
  margin: 0 20px;
  min-height: 300px;
  border-radius: 20px;
  background-color: ${(props) => props.bgc};
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ButtonWrapper = styled.div`
  padding: 0 20px;
  position: fixed;
  bottom: 0;
  flex: 1 1 auto;
  left: 0;
  right: 0;
  margin: 0 auto;
`;
