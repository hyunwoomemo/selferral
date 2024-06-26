"use client";
import Header from "@/components/common/Header";
import TextWrapper from "@/components/common/TextWrapper";
import styled from "styled-components";

const Page = () => {
  return (
    <Container>
      <Header />
      <div style={{ marginTop: 100 }}></div>
      <TextWrapper texts={["!내 페이백 예상 금액은?", "AI가 23,143명을 꼼꼼하게 분석했어요"]} />
    </Container>
  );
};

export default Page;

const Container = styled.div`
  padding: 20px;
`;
