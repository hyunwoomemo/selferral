"use client";

import React from "react";
import styled from "styled-components";
import { styles } from "@/styles";
import Image from "next/image";
import Button from "@/components/common/Button";
import { useRouter } from "next/navigation";

const AveragePayback = () => {
  const router = useRouter();

  const OnClick = () => router.push("/payback");

  return (
    <>
      <Container>
        <Image src={require("../../assets/calculatorHome.webp")} width={72} height={72} alt="calc" />
        <TextWrapper>
          <Text>1인 월평균 페이백</Text>
          <ColorText>497,500원</ColorText>
        </TextWrapper>
        <Text>1분 만에 확인해 보세요!</Text>
      </Container>
      <ButtonWrapper>
        <Button label="내가 받을 돈 확인하기" bgc={styles.blue} onClick={OnClick} />
      </ButtonWrapper>
    </>
  );
};

export default AveragePayback;

const Container = styled.div`
  background-color: ${styles.sky};
  border-radius: 20px;
  min-height: 200px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin: 20px;
`;

const TextWrapper = styled.div`
  padding-top: 20px;
  display: flex;
  align-items: center;
  gap: 5px;
`;
const Text = styled.p`
  font-weight: 700;
  font-size: 19px;
  line-height: 140%;
`;
const ColorText = styled(Text)`
  color: ${styles.blue};
`;

const ButtonWrapper = styled.div`
  margin: 20px;
`;
