"use client";
import Button from "@/components/common/Button";
import { Input } from "@/components/common/Input";
import TextWrapper from "@/components/common/TextWrapper";
import { styles } from "@/styles";
import { useRouter } from "next/navigation";
import { useState } from "react";
import styled from "styled-components";

const Page = () => {
  const router = useRouter();
  const [inputValue, setInputValue] = useState(false);

  return (
    <Container>
      <TextWrapper texts={["!레버리지 얼마나", "!사용하시나요?", "평균적인 레버리지 배율을 알려주세요"]} sizes={[20, 20, 16]} gaps={[5, 26]} />
      <InputWrapper>
        <Input placeholder="1 ~ 125 (숫자를 입력해주세요)" onChange={(e: any) => setInputValue(e.target.value)} />
      </InputWrapper>
      <ButtonWrapper>
        <Button disabled={!inputValue} label="다음" bgc={styles.blue} onClick={() => router.push("/payback/process/3")} />
      </ButtonWrapper>
    </Container>
  );
};

export default Page;

const Container = styled.div`
  padding: 20px;
  padding-bottom: 100px;
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
