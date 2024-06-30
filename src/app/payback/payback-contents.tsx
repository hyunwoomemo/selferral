"use client";
import { styles } from "@/styles";
import styled from "styled-components";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";

import { Autoplay } from "swiper/modules";
import Button from "@/components/common/Button";
import { useState } from "react";
import ProgressBar from "@/components/common/ProgressBar";
import { useRouter } from "next/navigation";
import TextWrapper from "@/components/common/TextWrapper";
import { Pagination } from "swiper/modules";

const TOTAL = 4;
const PaybackContents = () => {
  const router = useRouter();

  return (
    <Container>
      <div>
        <TextWrapper texts={["!셀퍼럴 이용한다면", "!*내가 돌려받는 예상 페이백*은", "!얼마나 될까요?", "간편 테스트를 통해 *쉽게* 조회해보세요!"]} sizes={[24, 24, 24, 16]} gaps={[10, 10, 40]} />
      </div>
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
        modules={[Autoplay, Pagination]}
      >
        <SwiperSlide>
          <ListItem>
            <ListItemContents bgc="rgb(252,236,208)"></ListItemContents>
          </ListItem>
        </SwiperSlide>
        <SwiperSlide>
          <ListItem>
            <ListItemContents bgc="rgb(213,239,253)"></ListItemContents>
          </ListItem>
        </SwiperSlide>
        <SwiperSlide>
          <ListItem>
            <ListItemContents bgc="rgb(250,228,229)"></ListItemContents>
          </ListItem>
        </SwiperSlide>
      </Swiper>
      <ButtonWrapper>
        <Button label="나도 거래 수수료 환급 받기" bgc={styles.blue} onClick={() => router.push("/payback/process/1")} borderRadius={10} />
      </ButtonWrapper>
    </Container>
  );
};

export default PaybackContents;

const Container = styled.div`
  > div:first-child {
    padding: 100px 0 30px;
  }
`;

const ListItem = styled.div`
  /* padding: 20px; */
  margin: 0 10px;
  min-height: 150px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ListItemContents = styled.div<{ bgc: string }>`
  height: 80%;
  min-height: 200px;
  margin: 0px 0px 60px;
  width: 100%;
  background-color: ${(props) => props.bgc};
  border-radius: 20px;
`;

const ButtonWrapper = styled.div`
  padding: 30px 20px 0;
  flex: 1 1 auto;
  margin: 0 auto;
`;
