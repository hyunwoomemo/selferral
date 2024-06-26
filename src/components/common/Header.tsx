"use client";

import Image from "next/image";
import React from "react";
import styled from "styled-components";
import { GoSidebarExpand } from "react-icons/go";
import { SiLoop } from "react-icons/si";
import Link from "next/link";
import { useAtom } from "jotai";
import { sidebarAtom } from "@/store/sidebar/atom";

const Header = () => {
  const [sidebar, setSidebar] = useAtom(sidebarAtom);

  return (
    <Container>
      <Logo href={"/"}>
        <SiLoop />
        tetherMin
      </Logo>
      <Hambuger onClick={() => setSidebar("0px")}>
        <GoSidebarExpand size={24} />
      </Hambuger>
    </Container>
  );
};

export default Header;

const Container = styled.div`
  padding: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  background-color: #fff;
  z-index: 9997;
`;

const Logo = styled(Link)`
  font-size: 24px;
  font-weight: 900;
  color: #0067ff;
  display: flex;
  gap: 10px;
  align-items: center;
  text-decoration: none;
`;

const Hambuger = styled.div``;
