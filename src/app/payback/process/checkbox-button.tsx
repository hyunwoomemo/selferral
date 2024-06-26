"use client";
import styled from "styled-components";
import { ImCheckboxUnchecked } from "react-icons/im";
import { ImCheckboxChecked } from "react-icons/im";
import { styles } from "@/styles";

const CheckboxButton = ({ isSelected, children, onClick }: { isSelected: boolean; children: any; onClick: () => void }) => {
  return (
    <Container onClick={onClick} isSelected={isSelected}>
      {isSelected ? <ImCheckboxChecked size={24} color={styles.blue} /> : <ImCheckboxUnchecked size={24} />}
      <ChildrenWrapper>{children}</ChildrenWrapper>
    </Container>
  );
};

export default CheckboxButton;

const Container = styled.div<{ isSelected: boolean }>`
  /* box-shadow: rgba(149, 157, 165, 0.2) 0px 0px 0px 2px; */
  border: ${(props) => (props.isSelected ? `1px solid ${styles.blue}` : `1px solid rgba(149, 157, 165, 0.2)`)};
  padding: 15px 10px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  flex: 1 1 auto;
  min-width: 46%;
  background-color: ${(props) => (props.isSelected ? styles.sky : undefined)};
  cursor: pointer;
`;

const ChildrenWrapper = styled.div`
  flex: 1 1 auto;
  display: flex;
  justify-content: center;
  align-items: center;
`;
