"use client";
import Header from "@/components/common/Header";
import { ButtonInput, LabelInput } from "@/components/common/Input";
import TextWrapper from "@/components/common/TextWrapper";
import { validate } from "@/hooks/validate";
import { styles } from "@/styles";
import Image from "next/image";
import Link from "next/link";
import { ChangeEvent, useState } from "react";
import styled from "styled-components";
import { FaSquareCheck } from "react-icons/fa6";
import Button from "@/components/common/Button";
import Footer from "@/components/common/Footer";

const Page = () => {
  const [values, setValues] = useState<{ email: string; password: string; inviteCode: string }>({ email: "", password: "", inviteCode: "" });
  const [errors, setErrors] = useState<{ inviteCode: string | undefined }>({ inviteCode: "" || undefined });

  console.log("errors", errors);

  return (
    <>
      <Container>
        <Header />
        <Image src={require("../../assets/Bmeal.webp")} width={80} height={80} alt="bmeal" style={{ margin: "80px 0 20px" }} />
        <TextWrapper texts={["!선물 거래 *수수료 페이백 테더맥스*에", "!오신 것을 환영합니다", "테더맥스는 거래소에서 발생한 수수료를", "트레이더님들께 *직접 환급*해주는 페이백 서비스에요"]} />
        <div style={{ paddingBottom: 50 }}></div>
        <LabelInput placeholder={"이메일을 입력해주세요"} label="이메일" onChange={(e: ChangeEvent<HTMLInputElement>) => setValues((prev) => ({ ...prev, email: e.target.value }))} />
        <div style={{ padding: "15px" }}></div>
        <LabelInput placeholder={"비밀번호를 입력해주세요"} label="비밀번호" onChange={(e: ChangeEvent<HTMLInputElement>) => setValues((prev) => ({ ...prev, password: e.target.value }))} />
        <InviteAccordian>
          <InviteText>친구초대 코드 (선택)</InviteText>
          <ButtonInput
            disabled={!values.inviteCode}
            placeholder="친구초대 코드를 입력해주세요"
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              setValues((prev) => ({ ...prev, inviteCode: e.target.value }));
              setErrors((prev) => ({ ...prev, inviteCode: validate({ type: "inviteCode", text: e.target.value }) }));
            }}
            error={errors.inviteCode}
          />
        </InviteAccordian>
        <CheckboxWrapper>
          <FaSquareCheck color={styles.blue} size={24} />
          <CheckboxTextWrapper>
            <CheckboxText>저는 테더맥스의 </CheckboxText>
            <CheckboxLinkText href={""}>이용약관 </CheckboxLinkText>
            <CheckboxText>및 </CheckboxText>
            <CheckboxLinkText href={""}>개인정보 보호 정책</CheckboxLinkText>
            <CheckboxText>을 읽고 동의합니다.</CheckboxText>
          </CheckboxTextWrapper>
        </CheckboxWrapper>
        <AlreadyWrapper>
          이미 계정이 있으신가요?
          <AlreadyLinkText href={"/login"}> 로그인</AlreadyLinkText>
        </AlreadyWrapper>
        <Button label="가입하기" bgc={styles.blue} onClick={() => null} disabled={values.email.length === 0 || values.password.length === 0} />
      </Container>
      <Footer />
    </>
  );
};

export default Page;

const Container = styled.div`
  padding: 20px;
`;

const InviteAccordian = styled.div`
  padding-top: 70px;
`;

const InviteText = styled.p`
  font-weight: bold;
  font-size: 20px;
`;

const CheckboxWrapper = styled.div`
  margin: 50px 0;
  padding: 15px;
  border-radius: 10px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  display: flex;
  gap: 15px;
  align-items: center;
`;

const CheckboxTextWrapper = styled.div`
  display: flex;
  white-space: pre-wrap; /* Ensures whitespace is preserved */
  align-items: center;
`;

const CheckboxText = styled.p``;
const CheckboxLinkText = styled(Link)`
  color: ${styles.blue};
`;

const AlreadyWrapper = styled.div`
  display: flex;
  justify-content: center;
  gap: 10px;
  color: ${styles.grayText};
  font-weight: bold;
  margin-bottom: 30px;
`;

const AlreadyLinkText = styled(Link)`
  color: ${styles.blue};
`;
