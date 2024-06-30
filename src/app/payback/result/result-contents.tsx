"use client";
import Button from "@/components/common/Button";
import TextWrapper from "@/components/common/TextWrapper";
import { styles } from "@/styles";
import styled from "styled-components";

const ResultContents = () => {
  return (
    <Container>
      <TextWrapper texts={["!내가 받을 수 있는", "!페이백 예상 금액은?", "AI가 23,143명을 꼼꼼하게 분석했어요"]} sizes={[20, 20, 16]} gaps={[5, 26]} />
      <Card>
        <div style={{ padding: "60px 0 30px" }}>
          <TextWrapper texts={["30일 기준 페이백 예상 금액", "*14.61 USDT*"]} sizes={[20, 20]} gaps={[20]} smallTextColor="#fff" smallEmphasisSize={32} />
        </div>
        <TableContainer>
          <Table>
            <TableRow>
              <TableHeader>거래소</TableHeader>
              <TableHeader>분석대상</TableHeader>
              <TableHeader>분석일치율</TableHeader>
            </TableRow>
            <TableRow>
              <TableData>BYBIT</TableData>
              <TableData>98,187명</TableData>
              <TableData>94%</TableData>
            </TableRow>
          </Table>
        </TableContainer>
        <div style={{ padding: "30px 0" }}>
          <Button label="다음" bgc={styles.blue} onClick={null} small borderRadius={5} />
        </div>
      </Card>
      <div style={{ padding: "30px 0" }}>
        <TextWrapper
          texts={["!거래수수료,", "이제는 *남김없이 환급*해드릴게요.", "최대수수료 할인도 기본이에요.", "테더나우와 6개월만 함께하면", "!*319.69USDT를 받아요*"]}
          sizes={[28, 16, 16, 16, 32]}
          gaps={[30, 5, 40, 24]}
        />
      </div>
      <TableWrapper>
        <Table>
          <TableRow>
            <TableHeader>날짜</TableHeader>
            <TableHeader>금액</TableHeader>
          </TableRow>
          <TableRow>
            <TableData>2024년 06월</TableData>
            <TableData>+53.28 USDT</TableData>
          </TableRow>
          <TableRow>
            <TableData>2024년 06월</TableData>
            <TableData>+53.28 USDT</TableData>
          </TableRow>
          <TableRow>
            <TableData>2024년 06월</TableData>
            <TableData>+53.28 USDT</TableData>
          </TableRow>
          <TableRow>
            <TableData>2024년 06월</TableData>
            <TableData>+53.28 USDT</TableData>
          </TableRow>
          <TableRow>
            <TableData>2024년 06월</TableData>
            <TableData>+53.28 USDT</TableData>
          </TableRow>
          <TableRow>
            <TableData>2024년 06월</TableData>
            <TableData>+53.28 USDT</TableData>
          </TableRow>
          <TableRow>
            <TableData>2024년 06월</TableData>
            <TableData>+53.28 USDT</TableData>
          </TableRow>
        </Table>
      </TableWrapper>
      <div style={{ padding: "40px 20px" }}>
        <TextWrapper texts={["!평균 3분만 투자하면,", "나도 페이백받을 수 있어요!", "최대 수수료 할인도 물론이에요"]} gaps={[30, 10]} sizes={[24, 16, 16]} />
        <Button label="페이백 시작하기" bgc={styles.blue} onClick={null} />
      </div>
    </Container>
  );
};

export default ResultContents;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  /* align-items: center; */
`;

const Card = styled.div`
  margin: 40px 20px;
  padding: 20px;
  border-radius: 20px;
  background-color: rgb(26, 31, 39);
`;

const TableContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  margin: 20px 0; /* 상하 여백 추가 */
`;

const Table = styled.table`
  border-collapse: collapse;
  width: 95%; /* 원하는 너비 설정 */
  max-width: 800px; /* 최대 너비 설정 */
  text-align: center;
  margin: 0 auto;

  > tr:last-child {
    > td:first-child {
      border-radius: 0 0 0 10px;
    }

    > td:last-child {
      border-radius: 0 0 10px 0;
    }
  }
`;

const TableRow = styled.tr`
  &:hover {
    background-color: #ddd;
  }

  &:nth-child(even) {
    background-color: #f2f2f2;
  }

  > th:first-child {
    border-radius: 10px 0 0 0;
  }

  > th:last-child {
    border-radius: 0 10px 0 0;
  }
`;

const TableHeader = styled.th`
  padding-top: 12px;
  padding-bottom: 12px;
  text-align: center;
  background-color: ${styles.blue};
  color: white;
  /* border: 1px solid #ddd; */
  padding: 16px;
`;

const TableData = styled.td`
  padding: 32px 0;

  /* border: 1px solid #ddd; */
`;

const TableWrapper = styled.div`
  margin: 40px 0px;
  padding: 0px;
  border-radius: 20px;
`;
