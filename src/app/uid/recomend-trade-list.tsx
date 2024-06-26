"use client";

import Button from "@/components/common/Button";
import { dummyTrade } from "@/dummy";
import { uidSearchAtom } from "@/store/uid/atom";
import { styles } from "@/styles";
import { useAtom, useSetAtom } from "jotai";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import styled from "styled-components";

const RecomendTradeList = () => {
  const [isMore, setIsMore] = useState(false);
  const router = useRouter();

  const setUidSearch = useSetAtom(uidSearchAtom);

  return (
    <Container>
      <Header>
        <Title>페이백 검색 추천 거래소</Title>
        <SecondText>평균 환급액</SecondText>
      </Header>
      <List>
        {dummyTrade
          .filter((_, index) => (isMore ? _ : index < 5))
          .map((dummy, index) => {
            return (
              <ListItem key={index} onClick={() => setUidSearch(dummy.name)}>
                <ListIndex>{index + 1}</ListIndex>
                <ListItemName>{dummy.name}</ListItemName>
                <ListItemPayback>{dummy.averageRefund / 10000}만원</ListItemPayback>
              </ListItem>
            );
          })}
        {!isMore && <Button label="더보기" bgc="#fff" onClick={() => setIsMore(true)} color={styles.blue} border={true} borderColor={styles.gray2} borderRadius={0} />}
      </List>
      <ButtonWrapper>
        <ButtonItem>고객센터</ButtonItem>
        <NoButtonItem>|</NoButtonItem>
        <ButtonItem onClick={() => router.back()}>닫기</ButtonItem>
      </ButtonWrapper>
    </Container>
  );
};

export default RecomendTradeList;

const Container = styled.div`
  /* padding: 30px 20px; */
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 30px 20px 0;
`;

const Title = styled.p`
  font-size: 18px;
  font-weight: 700;
`;

const SecondText = styled.p`
  /* font-size: 18px; */
  font-weight: 600;
  color: ${styles.gray1};
`;

const List = styled.div`
  display: flex;
  flex-direction: column;
  /* gap: 40px; */
  font-size: 18px;
  font-weight: 800;
  padding: 20px 0;
  :hover {
    background-color: rgb(241, 243, 248);
  }
`;

const ListItem = styled.div`
  display: flex;
  gap: 30px;
  cursor: pointer;
  padding: 20px;
`;

const ListIndex = styled.p`
  color: ${styles.blue};
`;

const ListItemName = styled.p`
  color: ${styles.gray3};
  flex: 1 1 auto;
`;

const ListItemPayback = styled.p`
  color: ${styles.red};
`;

const ButtonWrapper = styled.div`
  display: flex;
  gap: 15px;
  justify-content: flex-end;
  padding: 0 20px;
`;

const ButtonItem = styled.p`
  color: ${styles.grayText};
  font-weight: 600;
  cursor: pointer;
`;

const NoButtonItem = styled(ButtonItem)`
  cursor: auto;
`;
