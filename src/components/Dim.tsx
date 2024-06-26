"use client";
import { sidebarAtom } from "@/store/sidebar/atom";
import { useAtom, useAtomValue } from "jotai";
import styled from "styled-components";

const Dim = () => {
  const [sidebar, setSidebar] = useAtom(sidebarAtom);

  return <Container onClick={() => setSidebar("-300px")} sidebar={sidebar}></Container>;
};

export default Dim;

const Container = styled.div<{ sidebar: string }>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: ${(props) => (props.sidebar === "0px" ? "rgba(0,0,0,0.5)" : "rgba(0,0,0,0)")};
  transition: all 0.3s;
  /* z-index: ${(props) => (props.sidebar === "0px" ? 9998 : -1)}; */
  z-index: 9998;
  pointer-events: ${(props) => (props.sidebar === "0px" ? "all" : "none")};
`;
