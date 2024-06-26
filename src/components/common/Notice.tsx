"use client";

import { styles } from "@/styles";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";
import styled from "styled-components";

interface INoticeProps {
  title: string;
  contents: string;
  type: string;
}

const Notice = ({ title, contents, type }: INoticeProps) => {
  const router = useRouter();

  const handleMoveRoute = () => {
    if (type === "uid") {
      router.push("/payback");
    } else {
    }
  };

  return (
    <Container onClick={handleMoveRoute}>
      <Image src={require("@/assets/Mascot.png")} width={50} height={50} alt="refundImage" />
      <TextWrapper>
        <SmallText>{title}</SmallText>
        <Text>{contents}</Text>
      </TextWrapper>
    </Container>
  );
};

export default Notice;

const Container = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
  margin: 20px;
  cursor: pointer;
`;

const TextWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 7px;
  color: ${styles.gray3};
`;

const SmallText = styled.p`
  font-size: 14px;
  font-weight: 600;
  color: ${styles.gray1};
`;
const Text = styled.p`
  font-size: 18px;
  font-weight: 700;
`;
