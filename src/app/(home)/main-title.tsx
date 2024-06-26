"use client";

import React from "react";
import styled from "styled-components";
import { styles } from "@/styles";

const MainTitle = () => {
  return (
    <Container>
      <Wrapper>
        <Text>클릭 한 번으로 </Text>
        <ColorText>페이백</ColorText>
        <Text> 받으세요!</Text>
      </Wrapper>
      <Wrapper>
        <SmallText>선물거래 수수료 페이백 플랫폼, </SmallText>
        <SmallColorText>테더민</SmallColorText>
      </Wrapper>
    </Container>
  );
};

export default MainTitle;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 28px 24px 16px;
  margin-top: 40px;
`;

const Text = styled.h1`
  color: var(--gray_900, #222);
  font-size: 21px;
  font-style: normal;
  font-weight: 700;
  line-height: 150%;
  margin-bottom: 8px;
  text-align: center;
`;

const ColorText = styled.h1`
  color: ${styles.blue};
  font-size: 21px;
  font-style: normal;
  font-weight: 700;
  line-height: 150%;
  margin-bottom: 8px;
  text-align: center;
`;

const SmallText = styled.h2`
  color: var(--gray_400, #82879b);
  text-align: center;
  font-size: 15px;
  font-style: normal;
  font-weight: 500;
  line-height: 22px;
`;
const SmallColorText = styled(SmallText)`
  color: ${styles.blue};
`;

const Wrapper = styled.div`
  display: flex;
  gap: 5px;
`;
