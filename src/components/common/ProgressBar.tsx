"use client";
import { styles } from "@/styles";
import styled from "styled-components";

const ProgressBar = ({ width, height = "10px", background, tooltip, fixed = true }: { width: string; height: string; background?: boolean; tooltip?: string; fixed?: boolean }) => {
  return (
    <Container height={height} background={background} fixed={fixed}>
      <Progress width={width} tooltip={tooltip}></Progress>
    </Container>
  );
};

export default ProgressBar;

const Container = styled.div<{ height: string; background?: boolean; fixed?: boolean }>`
  background-color: ${(props) => (props.background ? "#ededed" : "transparent")};
  height: ${(props) => props.height};
  border-radius: 10px;
  position: ${(props) => (props.fixed ? "fixed" : undefined)};
  top: 0;
  left: 0;
  right: 0;
`;

const Progress = styled.div<{ width: string; tooltip?: string }>`
  display: block;
  background-color: ${styles.blue};
  width: ${(props) => props.width};
  transition: all 0.5s;
  /* margin: 20px; */
  border-radius: 10px;
  height: 100%;
  position: relative;

  &::after {
    transition: all 3s;
    content: ${(props) => (props.tooltip ? `"마감률 ${props.tooltip}"` : "")};
    opacity: ${(props) => (props.tooltip !== "0%" ? 1 : 0)};
    position: absolute;
    bottom: calc(100% + 10px);
    left: 80%;
    transform: translateX(-50%);
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100px;
    height: 30px;
    background-color: #efefef;
    border-radius: 10px;
    font-size: 14px;
    font-weight: bold;
  }
`;
