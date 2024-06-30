"use client";

import Image from "next/image";
import React, { useEffect } from "react";
import styled from "styled-components";
import { GoSidebarExpand } from "react-icons/go";
import { SiLoop } from "react-icons/si";
import Link from "next/link";
import { useAtom } from "jotai";
import { sidebarAtom } from "@/store/sidebar/atom";
import { useRouter } from "next/navigation";
import { styles } from "@/styles";
import { TiThMenu } from "react-icons/ti";
import { IoMdArrowRoundForward } from "react-icons/io";

const Header = () => {
  const [sidebar, setSidebar] = useAtom(sidebarAtom);
  const router = useRouter();

  useEffect(() => {
    router.prefetch("/payback");
    router.prefetch("/uid");
  }, [router]);

  useEffect(() => {
    if (sidebar === "0px") {
      document.documentElement.style.overflow = "hidden";
      document.documentElement.style.touchAction = "none";
    } else {
      document.documentElement.style.overflowX = "hidden";
      document.documentElement.style.overflowY = "auto";
      document.documentElement.style.touchAction = "auto";
    }
  }, [sidebar]);

  return (
    <>
      <TopBanner onClick={() => router.push("/payback")}>
        내 페이백 예상 금액을 즉시 확인하세요
        <IoMdArrowRoundForward size={20} />
      </TopBanner>
      <Container>
        <div style={{ maxWidth: "800px", display: "flex", justifyContent: "space-between", flex: "1 1 auto", margin: "0 auto", alignItems: "center" }}>
          <Logo href={"/"}>
            <SiLoop />
            Selferral
          </Logo>
          <Hambuger
            onClick={() => {
              setSidebar("0px");
            }}
          >
            <TiThMenu size={22} />
          </Hambuger>
        </div>
      </Container>
    </>
  );
};

export default Header;

const TopBanner = styled.div`
  background-color: ${styles.blue};
  padding: 15px 10px;
  color: #fff;
  font-weight: bold;
  display: flex;
  justify-content: flex-end;
  font-size: 14px;
  align-items: center;
  gap: 10px;
`;

const Container = styled.div`
  padding: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: sticky;
  top: 0;
  left: 0;
  right: 0;
  background-color: #fff;
  z-index: 9997;
  /* border-bottom: 1px solid rgba(0, 0, 0, 0.1); */
  box-shadow: rgba(100, 100, 111, 0.1) 0px 1px 10px 0px;
`;

const Logo = styled(Link)`
  font-size: 24px;
  font-weight: 900;
  color: ${styles.blue};
  display: flex;
  gap: 10px;
  align-items: center;
  text-decoration: none;
`;

const Hambuger = styled.div``;
