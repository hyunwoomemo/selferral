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

const Header = () => {
  const [sidebar, setSidebar] = useAtom(sidebarAtom);
  const router = useRouter();

  useEffect(() => {
    router.prefetch("/payback");
    router.prefetch("/uid");
  }, [router]);

  useEffect(() => {
    if (sidebar === "0px") {
      document.body.style.overflow = "hidden";
      document.body.style.touchAction = "none";
    } else {
      document.body.style.overflow = "auto";
      document.body.style.touchAction = "auto";
    }
  }, [sidebar]);

  return (
    <Container>
      <div style={{ maxWidth: "800px", display: "flex", justifyContent: "space-between", flex: "1 1 auto", margin: "0 auto", alignItems: "center" }}>
        <Logo href={"/"}>
          <SiLoop />
          tetherMin
        </Logo>
        <Hambuger
          onClick={() => {
            setSidebar("0px");
          }}
        >
          <GoSidebarExpand size={24} />
        </Hambuger>
      </div>
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
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
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
