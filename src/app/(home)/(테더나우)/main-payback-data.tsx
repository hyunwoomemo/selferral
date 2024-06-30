"use client";
import styled from "styled-components";
import phone from "@/assets/img_sec6_banner_img.png";
import TextWrapper from "@/components/common/TextWrapper";

const MainPaybackData = () => {
  return (
    <Container>
      <TextWrapper texts={["지금까지 셀퍼럴에서", "이용자님들에게", "지급한 *환급액*은 얼마일까요?"]} sizes={[24, 24, 24]} smallTextColor={"#fff"} gaps={[10, 10]} />
    </Container>
  );
};

export default MainPaybackData;

const Container = styled.div`
  background-color: rgb(26, 31, 39);
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 150px 0;
  /* padding: 4rem 4rem 0 4rem; */
`;

// const Phone = styled.div`
//   background: url(${phone.src}) no-repeat center;
//   /* background-position: 50% 50%; */
//   background-size: cover;
//   height: 27rem;
// `;
