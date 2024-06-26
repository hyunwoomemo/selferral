"use client";
import Header from "@/components/common/Header";
import { LabelInput } from "@/components/common/Input";
import TextWrapper from "@/components/common/TextWrapper";
import { ChangeEvent, useState } from "react";
import styled from "styled-components";
import { IoIosArrowForward } from "react-icons/io";
import Link from "next/link";
import { styles } from "@/styles";
import Button from "@/components/common/Button";
import Footer from "@/components/common/Footer";

const Page = () => {
  const [values, setValues] = useState<{ email: string; password: string }>({ email: "", password: "" });

  return (
    <>
      <Container>
        <Header />
        <div style={{ paddingTop: "80px" }}></div>
        <TextWrapper texts={["!로그인", "주요 거래소와 *공식 계약을 체결*한 곳은 오직 테더맥스 뿐이에요.", "회원이라면 누구나 다양한 미션을 수행하고 USDT를 받아보세요."]} />
        <div style={{ paddingTop: 50 }}></div>
        <LabelInput placeholder="이메일을 입력해주세요" label="이메일" onChange={(e: ChangeEvent<HTMLInputElement>) => setValues((prev) => ({ ...prev, email: e.target.value }))} />
        <div style={{ paddingTop: 30 }}></div>
        <LabelInput placeholder="비밀번호를 입력해주세요" label="비밀번호" onChange={(e: ChangeEvent<HTMLInputElement>) => setValues((prev) => ({ ...prev, password: e.target.value }))} />
        <ResetPassword href={""}>
          비밀번호를 몰라요
          <IoIosArrowForward />
        </ResetPassword>
        <JoinWrapper>
          아직 계정이 없으신가요?
          <JoinLinkText href={""}>가입하기</JoinLinkText>
        </JoinWrapper>
        <Button label="로그인" bgc={styles.blue} onClick={() => null} disabled={values.email.length === 0 || values.password.length === 0} />
      </Container>
      <Footer />
    </>
  );
};

export default Page;

const Container = styled.div`
  padding: 20px;
`;

const ResetPassword = styled(Link)`
  display: flex;
  align-items: center;
  padding: 15px 0;
  justify-content: flex-end;
  text-decoration: none;
  color: ${styles.blue};
  font-weight: bold;
`;

const JoinWrapper = styled.div`
  display: flex;
  justify-content: center;
  gap: 10px;
  color: ${styles.grayText};
  font-weight: bold;
  margin-bottom: 30px;
  padding: 30px 0;
`;

const JoinLinkText = styled(Link)`
  color: ${styles.blue};
`;
