"use client";
import styled from "styled-components";

interface IVipItemProps {
  data: {
    grade: string;
    condition: string;
    benefits: string;
  };
}

const VipItem = ({ data }: IVipItemProps) => {
  return (
    <Container>
      <Row>
        <div>등급</div>
        <div>{data.grade}</div>
      </Row>
      <Row>
        <div>VIP 조건</div>
        <div>{data.condition}</div>
      </Row>
      <Row>
        <div>혜택</div>
        <div>{data.benefits}</div>
      </Row>
    </Container>
  );
};

export default VipItem;

const Container = styled.div`
  padding: 20px;
  background-color: #fff;
`;

const Row = styled.div`
  display: flex;
  padding: 10px;
  gap: 15px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);

  > div:first-child {
    min-width: 70px;
  }

  > div:last-child {
    flex: 1 1 auto;
  }
`;
