"use client";

import Image from "next/image";
import React from "react";
import styled from "styled-components";
import { RiArrowDropDownFill } from "react-icons/ri";
import { BiSearch } from "react-icons/bi";
import { styles } from "@/styles";
import { FaArrowLeft } from "react-icons/fa6";
import { useRouter } from "next/navigation";
import { useAtomValue } from "jotai";
import { uidSearchAtom } from "@/store/uid/atom";

const UidSearch = () => {
  const router = useRouter();

  const uidSearch = useAtomValue(uidSearchAtom);

  return (
    <Container>
      <IconWrapper>
        <FaArrowLeft size={20} style={{ paddingRight: 20, cursor: "pointer" }} color={styles.gray1} onClick={() => router.back()} />
        <Image src={require(`../../assets/${uidSearch.toLowerCase()}.webp`)} width={35} height={35} alt="searchIcon" style={{ borderRadius: "50%" }} />
        <RiArrowDropDownFill size={36} color="" />
      </IconWrapper>
      <Input placeholder="UID를 입력해주세요" />
      <SearchIcon>
        <BiSearch size={30} color={styles.blue} />
      </SearchIcon>
    </Container>
  );
};

export default UidSearch;

const Container = styled.div`
  padding: 10px;
  /* border-radius: 100px; */
  /* border: 2px solid #0067ff; */
  display: flex;
  border-bottom: 1px;
  border-color: #e4e4e4;
  border-style: solid;
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
