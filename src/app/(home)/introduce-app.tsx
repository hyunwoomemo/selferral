"use client";

import React from "react";
import styled from "styled-components";
import { SiLoop } from "react-icons/si";
import { styles } from "@/styles";
const IntroduceApp = () => {
  return (
    <Container>
      <Logo>
        <SiLoop />
      </Logo>
      <TextWrapper>
        <Text>더 간단하고 더 빨라졌어요</Text>
        <ColorText>테더맥스 어플 자세히 보기</ColorText>
      </TextWrapper>
    </Container>
  );
};

export default IntroduceApp;

const Container = styled.div`
  margin-top: 20px;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  padding: 20px;
  border-radius: 20px;
  display: flex;
  align-items: center;
  gap: 20px;
  margin: 20px;
`;

const Logo = styled.div`
  font-size: 24px;
  font-weight: 900;
  color: #0067ff;
  display: flex;
  gap: 10px;
  align-items: center;
`;

const TextWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

const Text = styled.p`
  font-size: 14px;
  color: ${styles.gray1};
  font-weight: 500;
`;

const ColorText = styled.p`
  font-size: 18px;
  color: ${styles.blue};
  font-weight: 800;
`;
