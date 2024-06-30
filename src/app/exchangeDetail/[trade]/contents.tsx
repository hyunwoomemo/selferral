"use client";
import ProgressBar from "@/components/common/ProgressBar";
import TextWrapper from "@/components/common/TextWrapper";
import { styles } from "@/styles";
import { useEffect, useState } from "react";
import styled from "styled-components";

interface IContents {
  data: any;
}

const Contents = ({ data }: IContents) => {
  const [progress, setProgress] = useState("0%");

  useEffect(() => {
    setTimeout(() => {
      setProgress(data.closing);
    }, 500);
  }, [data]);

  return (
    <Container>
      <Name>{data.name}</Name>
      <Payback>
        <PaybackText>수수료 페이백</PaybackText>
        <PayBackColorText>{data.payback}</PayBackColorText>
      </Payback>
      <ProgressbarWrapper>
        <ProgressBar height="7px" width={progress} background={true} tooltip={progress} fixed={false} />
      </ProgressbarWrapper>
    </Container>
  );
};

export default Contents;

const Container = styled.div`
  padding: 20px;
`;

const Name = styled.h1`
  font-size: 28px;
  font-weight: 800;
`;

const Payback = styled.div`
  padding: 15px 0;
  display: flex;
  gap: 5px;
`;

const PaybackText = styled.p`
  font-size: 16px;
  font-weight: bold;
  color: ${styles.grayText};
`;
const PayBackColorText = styled(PaybackText)`
  color: ${styles.blue};
`;

const ProgressbarWrapper = styled.div`
  padding: 40px 0;
`;
