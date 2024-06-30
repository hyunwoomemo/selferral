"use client";
import Image from "next/image";
import { useState } from "react";
import styled from "styled-components";

interface IOptions {
  icon: string;
  value: string;
  label: string;
}

interface ISelectBoxProps {
  options: Array<IOptions>;
}

const SelectBox = ({ options }: ISelectBoxProps) => {
  const [expand, setExpand] = useState(false);
  const [value, setValue] = useState(options[0]);

  return (
    <Container expand={expand} options={options} onClick={() => setExpand((prev) => !prev)}>
      <Item>
        {/* <Icon>{JSON.stringify(value.icon)}</Icon> */}
        <Image src={value.icon} width={15} height={15} alt="logo" />
        <Label>{value.label}</Label>
      </Item>
      <ItemWrapper expand={expand}>
        {options
          .filter((v) => v.value !== value.value)
          .map((v) => {
            return (
              <SelectItem key={v.value}>
                <Image src={v.icon} width={15} height={15} alt="logo" />
                <Label>{v.label}</Label>
              </SelectItem>
            );
          })}
      </ItemWrapper>
    </Container>
  );
};

export default SelectBox;

const Container = styled.div<{ expand: boolean; options: Array<IOptions> }>`
  position: relative;
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 10px;
`;

const Item = styled.div`
  background-color: #fff;
  border-radius: 10px;
  padding: 15px 20px;
  width: 70px;
  display: flex;
  gap: 5px;
  align-items: center;
`;

const Icon = styled.span``;
const Label = styled.p``;

const ItemWrapper = styled.div<{ expand: boolean }>`
  position: absolute;
  margin-top: 5px;
  z-index: 9999;
  background-color: #fff;
  border-radius: 10px;
  opacity: ${(props) => (props.expand ? 1 : 0)};
  pointer-events: ${(props) => (props.expand ? "auto" : "none")};
  transition: opacity 0.3s;
  border: 1px solid rgba(0, 0, 0, 0.1);
`;

const SelectItem = styled.div`
  padding: 15px 20px;
  width: 70px;
  display: flex;
  gap: 5px;
  align-items: center;
`;
