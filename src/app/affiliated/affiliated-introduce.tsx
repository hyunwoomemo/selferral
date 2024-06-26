"use client";
import { dummyTrade } from "@/dummy";
import { styles } from "@/styles";
import Image from "next/image";
import styled from "styled-components";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Autoplay, FreeMode } from "swiper/modules";
import "swiper/css/free-mode";
const AffiliatedIntroduce = () => {
  return (
    <>
      <Container>
        <TextWrapper>
          <Text>테더맥스의</Text>
          <div style={{ display: "flex", gap: 10 }}>
            <ColorText>제휴 거래소를</ColorText>
            <Text>소개합니다!</Text>
          </div>
          <div style={{ display: "flex", gap: 10 }}>
            <SmallText>세계 최고의 가상자산 거래소들과 함께하는</SmallText>
            <SmallColorText>테더맥스</SmallColorText>
          </div>
        </TextWrapper>
      </Container>
      <Swiper
        style={{ padding: "0px 20px" }}
        slidesPerView={7}
        // centeredSlides={true}
        speed={1000}
        spaceBetween={16}
        init={true}
        freeMode={true}
        // observer={true}
        // observeParents={true}
        // allowTouchMove={false}
        className="mySwiper"
        autoplay={{
          delay: 0,
          disableOnInteraction: false,
        }}
        loop={true}
        // loopAdditionalSlides={10}
        modules={[FreeMode, Autoplay]}
      >
        {dummyTrade.map((dummy, index) => {
          return (
            <SwiperSlide key={index}>
              <div>
                <Image src={dummy.image} alt="tradeimage" style={{ borderRadius: "50%" }} priority />
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", marginTop: 30 }}>
        <BottomText>※ 주요 파트너사들과</BottomText>
        <BottomColorText>공식 계약을 체결</BottomColorText>
        <BottomText>은 테더맥스 뿐입니다.</BottomText>
      </div>
    </>
  );
};

export default AffiliatedIntroduce;

const Container = styled.div`
  background: linear-gradient(to bottom, ${styles.sky}, #fff);
  min-height: 300px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const TextWrapper = styled.div`
  z-index: 999;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  gap: 15px;
  margin-top: 50px;
`;

const Text = styled.p`
  font-size: 28px;
  font-weight: bold;
`;
const ColorText = styled(Text)`
  color: ${styles.blue};
`;

const SmallText = styled.p`
  color: ${styles.grayText};
  font-weight: 600;
`;

const SmallColorText = styled(SmallText)`
  color: ${styles.blue};
`;

const BottomText = styled.p`
  font-size: 12px;
  color: ${styles.grayText};
  font-weight: 500;
`;
const BottomColorText = styled(BottomText)`
  color: ${styles.blue};
`;

// const SubText
