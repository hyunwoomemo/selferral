"use client";

import Image from "next/image";
import React, { useState } from "react";
import styled from "styled-components";
import { RiArrowDropDownFill } from "react-icons/ri";
import { BiSearch } from "react-icons/bi";
import { useRouter } from "next/navigation";
import { useAtomValue } from "jotai";
import { uidSearchAtom } from "@/store/uid/atom";
import { styles } from "@/styles";

const MainSearch = () => {
  const [icon, setIcon] = useState(0);
  const uidSearch = useAtomValue(uidSearchAtom);

  const router = useRouter();

  return (
    <Container>
      <IconWrapper>
        <Image src={require(`../../assets/${uidSearch.toLowerCase()}.webp`)} width={35} height={35} alt="searchIcon" style={{ borderRadius: "50%" }} />
        <RiArrowDropDownFill size={32} />
      </IconWrapper>
      <Input placeholder="UID를 입력해주세요" onFocus={() => router.push("/uid")} />
      <SearchIcon>
        <BiSearch size={30} color={styles.blue} />
      </SearchIcon>
    </Container>
  );
};

export default MainSearch;

const Container = styled.div`
  padding: 10px;
  border-radius: 100px;
  border: 1px solid #0067ff;
  display: flex;
  margin: 0px 20px;
`;

const IconWrapper = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  color: #e1e2e3;
`;

const Input = styled.input.attrs({})`
  flex: 10;
  border: none;
  font-size: 18px;
  outline: none;
`;

const SearchIcon = styled.div`
  flex: 1;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding: 0 10px 0 0;
`;
