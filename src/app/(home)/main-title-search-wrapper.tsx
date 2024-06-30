"use client";
import { styles } from "@/styles";
import React from "react";
import styled from "styled-components";
import bg from "../../assets/img_main_slide.png";
import Image from "next/image";

const ManiTitleSearchWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <Container>
      {/* <Image src={bg.src} alt="img" width={500} height={100} /> */}
      {children}
    </Container>
  );
};

export default ManiTitleSearchWrapper;

const Container = styled.div`
  height: 400px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: relative;
  /* background: linear-gradient(to top, #fff5ed, #fff); */
  background-image: url(${bg.src});
  background-position: 50% 50%;
  background-size: cover;
  /* width: 100%;
  height: 100%; */
  /* gap: 20px; */
`;
