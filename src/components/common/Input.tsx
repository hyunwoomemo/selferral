"use client";
import { styles } from "@/styles";
import { useState } from "react";
import styled from "styled-components";
import { PiWarningCircle } from "react-icons/pi";
import { IoIosCheckmarkCircleOutline } from "react-icons/io";
import Link from "next/link";

export const Input = ({ placeholder, onChange }: { placeholder: string; onChange: any }) => {
  const [isFocus, setIsFocus] = useState(false);

  return (
    <Container isFocus={isFocus}>
      <StyledInput onChange={onChange} placeholder={placeholder} onFocus={() => setIsFocus(true)} onBlur={() => setIsFocus(false)} />
    </Container>
  );
};

export const LabelInput = ({ placeholder, onChange, label }: { placeholder: string; onChange: any; label: string }) => {
  const [isFocus, setIsFocus] = useState(false);

  return (
    <>
      <Label isFocus={isFocus}>{label}</Label>
      <Container isFocus={isFocus}>
        <StyledInput onChange={onChange} placeholder={placeholder} onFocus={() => setIsFocus(true)} onBlur={() => setIsFocus(false)} />
      </Container>
    </>
  );
};

export const ButtonInput = ({ placeholder, onChange, disabled, error }: { placeholder: string; onChange: any; disabled: boolean; error: string | undefined }) => {
  const [isFocus, setIsFocus] = useState(false);

  return (
    <>
      <Container isFocus={isFocus}>
        <StyledInput onChange={onChange} placeholder={placeholder} onFocus={() => setIsFocus(true)} onBlur={() => setIsFocus(false)} />
        <Button disabled={disabled}>확인</Button>
      </Container>
      {error ? (
        <Error>
          <PiWarningCircle color={styles.red} />
          {error}
        </Error>
      ) : (
        <Success>
          <IoIosCheckmarkCircleOutline color={styles.blue} />
          축하해요! 최대 15 USDT를 받을 예정입니다
        </Success>
      )}
    </>
  );
};

const Container = styled.div<{ isFocus: boolean }>`
  border-bottom: 1px solid ${(props) => (props.isFocus ? styles.blue : "rgba(0, 0, 0, 0.1)")};
  display: flex;
`;

const StyledInput = styled.input`
  border: none;
  flex: 1 1 auto;
  padding: 10px;
  font-size: 20px;
  color: ${styles.grayText};
  font-weight: 600;
  outline: none;

  ::placeholder {
    color: ${styles.grayText};
  }
`;

const Label = styled.p<{ isFocus: boolean }>`
  padding: 10px 10px 0 10px;
  font-size: 12px;
  color: ${(props) => (props.isFocus ? styles.blue : undefined)};
`;

const Button = styled.div<{ disabled: boolean }>`
  padding: 15px 40px;
  margin: 10px 0;
  color: #fff;
  border-radius: 10px;
  background-color: ${styles.blue};
  display: flex;
  justify-content: center;
  align-items: center;

  opacity: ${(props) => (props.disabled ? 0.5 : 1)};
`;

const Error = styled.div`
  padding-top: 10px;
  display: flex;
  gap: 10px;
  color: ${styles.red};
  font-size: 14px;
`;

const Success = styled.div`
  padding-top: 10px;
  display: flex;
  gap: 10px;
  color: ${styles.blue};
  font-size: 14px;
`;
