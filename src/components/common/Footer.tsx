"use client";

import { styles } from "@/styles";
import React from "react";
import styled from "styled-components";

const Footer = () => {
  return (
    <Container>
      <Background>
        <ColorText>TETHERMAX PTE. LTD</ColorText>
        <TextWrapper>
          <Text>고유 법인 번호(UEN) : 202326628N</Text>
          <Text>소재지 : 531A UPPER CROSS STREET #04-98 HONG LIM COMPLEX SINGAPORE (051531)</Text>
          <Text>상담 : 채팅 상담 (00:00 - 24:00)</Text>
          <Text>이메일 : support@tethermax.io</Text>
        </TextWrapper>

        <Text>copyright © 2022 | tetherMax | All Right Reserved</Text>
      </Background>
    </Container>
  );
};

export default Footer;

const Container = styled.div`
  padding: 20px;
  position: relative;
  margin-top: 50px;
`;

const Background = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  height: 150px;
  background-color: ${styles.gray2};
  z-index: 9998;
  padding: 40px 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const TextWrapper = styled.div`
  line-height: 120%;
  padding: 20px 0;
`;

const Text = styled.p`
  color: ${styles.gray1};
`;

const ColorText = styled(Text)`
  color: ${styles.blue};
  font-weight: 800;
`;
const LinkText = styled(Text)``;
