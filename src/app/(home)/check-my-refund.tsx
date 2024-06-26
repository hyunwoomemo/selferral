"use client";

import { styles } from "@/styles";
import Image from "next/image";
import React from "react";
import styled from "styled-components";

const CheckRefund = () => {
  return (
    <Container>
      <Image src={require("@/assets/Mascot.png")} width={50} height={50} alt="refundImage" />
      <TextWrapper>
        <SmallText>트레이더님 지금 확인해보세요</SmallText>
        <Text>내가 받을 돈 확인하기</Text>
      </TextWrapper>
    </Container>
  );
};

export default CheckRefund;

const Container = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
`;

const TextWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 7px;
`;

const SmallText = styled.p`
  font-size: 14px;
  font-weight: 600;
  color: ${styles.gray1};
`;
const Text = styled.p`
  font-size: 18px;
  font-weight: 800;
`;
