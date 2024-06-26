"use client";
import TextWrapper from "@/components/common/TextWrapper";
import Link from "next/link";
import styled from "styled-components";
import CheckboxButton from "../checkbox-button";
import { dummyTrade } from "@/dummy";
import { useState } from "react";
import Button from "@/components/common/Button";
import { styles } from "@/styles";
import { useRouter } from "next/navigation";

const Page = () => {
  const [selectedIndex, setSelectedIndex] = useState<number>(-1);
  const router = useRouter();

  return (
    <Container>
      <TextWrapper texts={["!가장 자주 쓰는", "!거래소 하나만 선택해주세요", "어떤 거래소를 이용하고 계신가요?"]} />
      <CheckboxWrapper>
        {dummyTrade.map((dummy, index) => {
          return (
            <CheckboxButton
              onClick={() =>
                setSelectedIndex((prev) => {
                  if (prev === index) {
                    return -1;
                  } else {
                    return index;
                  }
                })
              }
              key={index}
              isSelected={selectedIndex === index}
            >
              {dummy.name}
            </CheckboxButton>
          );
        })}
      </CheckboxWrapper>
      <ButtonWrapper>
        <Button disabled={selectedIndex < 0} label="다음" bgc={styles.blue} onClick={() => router.push(`/payback/process/2?tradeId=${selectedIndex}`)} />
      </ButtonWrapper>
    </Container>
  );
};

export default Page;

const Container = styled.div`
  padding: 20px;
  padding-bottom: 100px;
`;

const CheckboxWrapper = styled.div`
  margin-top: 30px;
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
`;

const ButtonWrapper = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 20px 20px 0;
`;
