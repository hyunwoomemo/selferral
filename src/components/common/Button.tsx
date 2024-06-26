import { styles } from "@/styles";
import React from "react";
import styled from "styled-components";

interface IButtonProps {
  label: string;
  bgc: string;
  color?: string;
  border?: boolean;
  borderColor?: string;
  borderRadius?: number;
  disabled?: boolean;
  small?: boolean;
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

const Button = ({ label, bgc, onClick, color = "#fff", border, borderColor, borderRadius = 15, disabled = false, small = false }: IButtonProps) => {
  return (
    <Container small={small} bgc={bgc} onClick={onClick} color={color} border={border} borderColor={borderColor} borderRadius={borderRadius} disabled={disabled}>
      {label}
    </Container>
  );
};

export default Button;

const Container = styled.button<{ bgc: string; border: boolean | undefined; borderColor: string | undefined; borderRadius: number; disabled: boolean; small: boolean }>`
  background-color: ${(props) => props.bgc};
  opacity: ${(props) => (props.disabled ? 0.5 : 1)};
  color: ${(props) => props.color};
  border: ${(props) => (props.border && props.borderColor ? `1px solid ${props.borderColor || "#000"}` : "none")};
  display: flex;
  flex: 1 1 auto;
  width: 100%;
  border-radius: ${(props) => props.borderRadius}px;
  margin: ${(props) => (props.small ? "8px 0" : "15px 0")};
  padding: ${(props) => (props.small ? "8px 0" : "20px 0")};
  justify-content: center;
  align-items: center;
  font-size: ${(props) => (props.small ? "16px" : "18px")};
  font-weight: ${(props) => (props.small ? "normal" : 700)};
  pointer-events: ${(props) => (props.disabled ? "none" : "auto")};
  cursor: pointer;
`;
