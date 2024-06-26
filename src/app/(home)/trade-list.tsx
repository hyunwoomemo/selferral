"use client";

import React from "react";
import styled from "styled-components";
import { MdArrowForwardIos } from "react-icons/md";
import Image from "next/image";
import { dummyTrade } from "@/dummy";
import { styles } from "@/styles";
import Link from "next/link";

const TradeList = ({ header = true }) => {
  return (
    <Container>
      {header && (
        <Header>
          <Text>페이백 가능한 거래소에요</Text>
          <More>
            <MoreText href={"/affiliated"}>전체보기</MoreText>
            <MdArrowForwardIos />
          </More>
        </Header>
      )}
      <List>
        {dummyTrade.map((dummy, index) => {
          return (
            <ListItem href={`/exchangeDetail/${dummy.name.toLowerCase()}`} key={index}>
              <ListImage width={30} height={30} src={dummy.image} alt="tradeImage" />
              <ListContents>
                <ListTitle>{dummy.name}</ListTitle>
                <ListTag>{dummy.tag}</ListTag>
              </ListContents>
              <ListInfo>
                {dummy.payback && (
                  <>
                    <ListInfoPercent>{dummy.payback}</ListInfoPercent>
                    <ListInfoText>페이백</ListInfoText>
                  </>
                )}
                {dummy.payback && dummy.discount && "+"}
                {dummy.discount && (
                  <>
                    <ListInfoPercent>{dummy.discount}</ListInfoPercent>
                    <ListInfoText>할인</ListInfoText>
                  </>
                )}
              </ListInfo>
            </ListItem>
          );
        })}
      </List>
    </Container>
  );
};

export default TradeList;

const Container = styled.div`
  padding-top: 50px;
  margin: 20px;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Text = styled.p`
  font-size: 21px;
  font-weight: 800;
`;

const More = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
`;
const MoreText = styled(Link)`
  color: ${styles.grayText};
  text-decoration: none;
  font-weight: 700;
`;

const List = styled.div`
  padding: 30px 0;
  display: flex;
  flex-direction: column;
  gap: 30px;
`;

const ListItem = styled(Link)`
  display: flex;
  gap: 20px;
  align-items: center;
  text-decoration: none;
  color: #000;
`;

const ListImage = styled(Image)`
  width: 45px;
  height: 45px;
  border-radius: 50%;
`;

const ListContents = styled.div`
  flex: 1 1 auto;
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

const ListTitle = styled.p`
  font-size: 18px;
  font-weight: 800;
`;
const ListTag = styled.p`
  font-size: 14px;
  color: ${styles.gray1};
`;

const ListInfo = styled.div`
  display: flex;
  gap: 5px;
  align-items: center;
  background-color: ${styles.sky};
  padding: 5px;
  border-radius: 5px;
`;

const ListInfoText = styled.p`
  font-size: 12px;
`;
const ListInfoPercent = styled.p`
  color: ${styles.blue};
  font-weight: 800;
  font-size: 12px;
`;
