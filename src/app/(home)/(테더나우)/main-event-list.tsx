"use client";
import ListItem from "@/components/ListItem";
import TextWrapper from "@/components/common/TextWrapper";
import styled from "styled-components";

const MainEventList = () => {
  return (
    <Container>
      <TextWrapper texts={["!테더나우 *대회 및 이벤트*", "대회와 이벤트 모두 참여하고 페이백도 받아요!"]} sizes={[24, 14]} gaps={[10, 46]} />
      <List>
        {Array(20)
          .fill(0)
          .map((_, i) => {
            return <ListItem key={i} />;
          })}
      </List>
    </Container>
  );
};

export default MainEventList;

const Container = styled.div`
  padding-top: 50px;
  background-color: rgb(251, 251, 251);
`;

const List = styled.div`
  gap: 30px;
  padding: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
