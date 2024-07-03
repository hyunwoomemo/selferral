"use client";
import Button from "@/components/common/Button";
import TextWrapper from "@/components/common/TextWrapper";
import { styles } from "@/styles";
import Image from "next/image";
import { useRouter } from "next/navigation";
import styled from "styled-components";

interface ITradeItemDataProps {
  name: string;
  averageRefund: number;
  image: any;
  tag: string;
  payback: string;
  discount: string;
}

interface ITradeItemProps {
  data: ITradeItemDataProps;
  onClick: () => void;
}

const TradeItem = ({ data, onClick }: ITradeItemProps) => {
  const router = useRouter();

  return (
    <Container onClick={onClick}>
      <Logo>{data.name}</Logo>
      <Contents>
        <TextWrapper
          left
          texts={["!BYBIT", `!수수료 *${data.payback}* 페이백 + *${data.discount}* 할인`, "페이백을 감안한 수수료율", "지정가 0.014% 시장가 0.0308%"]}
          sizes={[16, 16, 14, 14]}
          gaps={[20, 20, 10]}
        />
        <Button label="페이백 시작하기" bgc={styles.blue} onClick={() => router.push(`/exchangeDetail/${data.name.toLowerCase()}`)} small borderRadius={5} />
      </Contents>
      <Icon>
        <Image src={require("@/assets/pay-l.png")} alt="pay" width={88} height={29} />
        <p>페이백 {data.payback}</p>
      </Icon>
    </Container>
  );
};

export default TradeItem;

const Container = styled.div`
  position: relative;
  margin: 20px;
  border-radius: 10px;
  box-shadow: 0 0 45px rgba(0, 0, 0, 0.07);
`;

const Logo = styled.div`
  min-height: 150px;
  font-size: 48px;
  background-color: #000;
  color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 10px 10px 0 0;
`;

const Contents = styled.div`
  padding: 10px;
`;

const Icon = styled.div`
  position: absolute;
  top: 14px;
  left: -2px;

  > p {
    position: absolute;
    top: 1px;
    left: 6.5px;
    font-size: 14px;
    font-weight: 600;
    color: #fff;
  }
`;
