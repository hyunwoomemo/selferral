"use client";
import TextWrapper from "@/components/common/TextWrapper";
import styled from "styled-components";
import CheckboxButton from "../checkbox-button";
import { useState } from "react";
import Button from "@/components/common/Button";
import { styles } from "@/styles";
import { useRouter } from "next/navigation";
const datas = [
  {
    label: "하루에 1번 할까 말까해요",
  },
  {
    label: "하루에 1회 - 2회 거래해요",
  },
  {
    label: "하루에 2회 - 5회 거래해요",
  },
  {
    label: "하루에 5회 - 10회 거래해요",
  },
  {
    label: "하루에 1회 이상 거래해요",
  },
];
const Page = () => {
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const router = useRouter();

  return (
    <Container>
      <TextWrapper texts={["!하루에 몇 번 정도", "!거래하시나요?", "거래 성향을 알려주세요"]} />
      <CheckboxButtonWrapper>
        {datas.map((data, index) => {
          return (
            <CheckboxButton key={index} isSelected={selectedIndex === index} onClick={() => setSelectedIndex((prev) => (prev === index ? -1 : index))}>
              {data.label}
            </CheckboxButton>
          );
        })}
      </CheckboxButtonWrapper>
      <ButtonWrapper>
        <Button disabled={selectedIndex < 0} label="결과보기" bgc={styles.blue} onClick={() => router.push("/payback/result")} />
      </ButtonWrapper>
    </Container>
  );
};

export default Page;

const Container = styled.div`
  padding: 20px;
`;

const CheckboxButtonWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: 30px;
`;

const ButtonWrapper = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 20px 20px 0;
`;
