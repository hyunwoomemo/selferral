"use client";

import React from "react";
import styled from "styled-components";
import { FaArrowLeft } from "react-icons/fa6";
import { styles } from "@/styles";
import { useRouter } from "next/navigation";

const PaybackHeader = () => {
  const router = useRouter();

  return (
    <Container>
      <FaArrowLeft size={20} style={{ paddingRight: 20, cursor: "pointer" }} color={styles.gray1} onClick={() => router.back()} />
    </Container>
  );
};

export default PaybackHeader;

const Container = styled.div`
  padding: 20px;
`;
