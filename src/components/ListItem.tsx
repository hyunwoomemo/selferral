"use client";
import Image from "next/image";
import styled from "styled-components";
import TextWrapper from "./common/TextWrapper";
import Button from "./common/Button";
import { styles } from "@/styles";
import { useInView } from "react-intersection-observer";

const ListItem = () => {
  return (
    <Container>
      <div>
        <Image src={require("@/assets/event.png")} alt="event" fill />
        <Contents>
          <p>테더나우 신규가입 이벤트</p>
          <TextWrapper texts={["!적립금 *20* USDT + 수수료 페이백"]} sizes={[16]} left />
          <EndDate>종료까지 186일 0시 11분 33초</EndDate>
          <button>공지 참여하기</button>
        </Contents>
      </div>
    </Container>
  );
};

export default ListItem;

const Container = styled.div`
  border-radius: 10px;
  /* background-color: red; */
  width: 97%;

  > div:first-child {
    width: 100%;
    position: relative;

    > img {
      position: relative !important;
      height: 70% !important;
      border-radius: 5px 5px 0 0;
    }
  }
`;

const Contents = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #fff;
  gap: 10px;
  padding: 10px;
  border-radius: 0 0 5px 5px;

  > button {
    outline: none;
    border: none;
    padding: 15px;
    border-radius: 5px;
    color: #fff;
    /* font-size: 18px; */
    font-weight: bold;
    background-color: ${styles.blue};
    margin: 15px 0;
  }
`;

const EndDate = styled.p`
  align-self: flex-start;
  /* padding: 5px 10px; */
  background-color: #eaeef4;
  padding: 3px 7px;
  border-radius: 5px;
  font-size: 12px;
`;
