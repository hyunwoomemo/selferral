"use client";
import Button from "@/components/common/Button";
import Header from "@/components/common/Header";
import TextWrapper from "@/components/common/TextWrapper";
import { styles } from "@/styles";
import { useEffect, useState } from "react";
import styled from "styled-components";
import VipItem from "./vip-item";

const vipData = [
  {
    grade: "VIP 1",
    condition: "누적출금액 10,000 USDT",
    benefits: "페이백 요율 1% 상향",
  },
  {
    grade: "VIP 2",
    condition: "누적출금액 25,000 USDT",
    benefits: "페이백 요율 1.5% 상향",
  },
  {
    grade: "VIP 3",
    condition: "누적출금액 50,000 USDT",
    benefits: "페이백 요율 2% 상향",
  },
  {
    grade: "VIP 4",
    condition: "누적출금액 100,000 USDT",
    benefits: "페이백 요율 2.5% 상향",
  },
  {
    grade: "VIP 5",
    condition: "누적출금액 200,000 USDT",
    benefits: "페이백 요율 3% 상향",
  },
];

const Page = () => {
  const [toggle, setToggle] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setToggle((prev) => !prev);
    }, 2000);

    return () => {
      clearInterval(interval);
    };
  });

  return (
    <>
      <Container>
        <Header />
        <div style={{ paddingTop: 40 }}></div>
        <TextWrapper texts={["페이백 적립만 해도 혜택을 추가로!", `${toggle ? "!혜택을 추가로" : "!알아서 해주는"}`, "!테더나우 VIP"]} sizes={[16, 28, 28]} gaps={[20, 20]} />
        <div style={{ height: 100, width: "50%", margin: "0 auto" }}>
          <Button label="VIP 혜택보기" bgc={styles.blue} small onClick={null} borderRadius={5} />
        </div>
      </Container>
      {/* <div style={{ paddingTop: 40 }}></div> */}
      <VipWrapper>
        <TextWrapper texts={["!테더나우 VIP 혜택 알아보기", "VIP 추가 페이백 요율"]} smallTextColor="#000" sizes={[24, 16]} gaps={[20, 40]} />
        {vipData.map((data, index) => (
          <VipItem key={index} data={data} />
        ))}
        <div style={{ paddingTop: 40 }}></div>
        <TextWrapper
          texts={[
            "!셀퍼럴 VIP는 기존 페이백 요율에 추가적인 페이백 혜택을",
            "!받아 볼 수 있으며 VIP 등급은 조건 충족시 자동으로 적용됩니다.",
            "(단, Bitget 거래소는 테더나우 VIP 혜택을 제공하지 않습니다.)",
          ]}
          sizes={[12, 12, 12]}
          gaps={[10, 10, 30]}
        />
      </VipWrapper>
      <div style={{ padding: 20 }}>
        <TextWrapper
          texts={["!*그래서 페이백을 받으려면 어떻게 해야 하나요?*", "셀퍼럴 홈페이지 메인에 있는 추천 거래소를 통해", "가입한 이후에 페이백 가이드를 참고하셔서 페이백", "을 받으실 수 있습니다."]}
          sizes={[18, 16, 16]}
          gaps={[20, 10, 10, 40]}
        />
        <Button small label="추천 거래소 둘러보기 >" bgc={styles.blue} onClick={null} borderRadius={5} />
      </div>
    </>
  );
};

export default Page;

const Container = styled.div`
  background-color: #fcf7f2;
`;

const VipWrapper = styled.div`
  background-color: #f9fafb;
  padding-top: 80px;
  padding: 20px;
`;
