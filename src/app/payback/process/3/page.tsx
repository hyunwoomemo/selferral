"use client";
import Button from "@/components/common/Button";
import { Input } from "@/components/common/Input";
import TextWrapper from "@/components/common/TextWrapper";
import { styles } from "@/styles";
import { useRouter } from "next/navigation";
import { useState } from "react";
import styled from "styled-components";

const Page = () => {
  const [seed, setSeed] = useState(-1);
  const router = useRouter();

  return (
    <Container>
      <TextWrapper texts={["!시드가", "!얼마나 되시나요?", "selectedIndex 값에 보유한 총 시드를 알려주세요"]} />
      <InputWrapper>
        <Input placeholder="시드를 입력해주세요" onChange={(e: any) => setSeed(e.target.value)} />
      </InputWrapper>
      <ButtonWrapper>
        <Button disabled={!seed} label="다음" bgc={styles.blue} onClick={() => router.push("/payback/process/4")} />
      </ButtonWrapper>
    </Container>
  );
};

export default Page;

const Container = styled.div`
  padding: 20px;
`;

const InputWrapper = styled.div`
  margin-top: 50px;
`;

const ButtonWrapper = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 20px 20px 0;
`;
