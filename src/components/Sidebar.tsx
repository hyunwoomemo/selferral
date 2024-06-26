"use client";
import { sidebarAtom } from "@/store/sidebar/atom";
import { useAtom } from "jotai";
import styled from "styled-components";
import Button from "./common/Button";
import { styles } from "@/styles";
import Image from "next/image";
import { IoIosArrowForward } from "react-icons/io";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

const Sidebar = () => {
  const [sidebar, setSidebar] = useAtom(sidebarAtom);

  const pathname = usePathname();

  useEffect(() => {
    setSidebar("-300px");
  }, [pathname, setSidebar]);

  return (
    <Container sidebar={sidebar}>
      <Wrapper>
        <Button label="로그인" bgc={"#fff"} onClick={() => null} small borderRadius={10} border borderColor={styles.blue} color={styles.blue} />
        <Button label="회원가입" bgc={styles.blue} onClick={() => null} small borderRadius={10} />
      </Wrapper>
      <SidebarItemWrapper>
        <SidebarItem href={"/"}>
          <SidebarItemIcon src={require("@/assets/home.webp")} alt="icon" />
          <SidebarItemName>홈</SidebarItemName>
          <IoIosArrowForward color={styles.grayText} />
        </SidebarItem>
        <SidebarItem href={"/affiliated"}>
          <SidebarItemIcon src={require("@/assets/exchange.webp")} alt="icon" />
          <SidebarItemName>제휴 거래소</SidebarItemName>
          <IoIosArrowForward color={styles.grayText} />
        </SidebarItem>
        <SidebarItem href="/">
          <SidebarItemIcon src={require("@/assets/introduce.webp")} alt="icon" />
          <SidebarItemName>서비스 소개</SidebarItemName>
          <IoIosArrowForward color={styles.grayText} />
        </SidebarItem>
        <SidebarItem href="/payback">
          <SidebarItemIcon src={require("@/assets/payback.webp")} alt="icon" />
          <SidebarItemName>페이백 테스트</SidebarItemName>
          <IoIosArrowForward color={styles.grayText} />
        </SidebarItem>
      </SidebarItemWrapper>
    </Container>
  );
};

export default Sidebar;

const Container = styled.div<{ sidebar: string }>`
  position: absolute;
  right: ${(props) => props.sidebar};
  top: 0;
  bottom: 0;
  /* background-color: red; */
  background-color: #fff;
  width: 300px;
  z-index: 9999;
  transition: all 0.3s;
  border-radius: 25px 0 0 25px;
`;

const Wrapper = styled.div`
  padding: 20px;
`;

const SidebarItemWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 20px;
  padding-top: 50px;
`;

const SidebarItem = styled(Link)`
  display: flex;
  gap: 10px;
  align-items: center;
  text-decoration: none;
  color: #000;
`;

const SidebarItemIcon = styled(Image)<{ src: string }>`
  width: 30px;
  height: 30px;
`;
const SidebarItemName = styled.div`
  flex: 1 1 auto;
`;

const SidebarItemArrow = styled.div``;
