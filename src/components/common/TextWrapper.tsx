"use client";
import { styles } from "@/styles";
import styled from "styled-components";

const TextWrapper = ({
  texts,
  sizes = [20, 36],
  gaps,
  emphasisSize,
  smallEmphasisSize,
  left,
  smallTextColor,
}: {
  texts: string[];
  sizes: number[];
  gaps?: number[];
  emphasisSize?: number;
  smallEmphasisSize?: number;
  left?: boolean;
  smallTextColor?: string;
}) => {
  return (
    <Container left={left}>
      {texts.map((text, index) => {
        const parts = text.split(/(\*[^*]+\*)/g); // split text by emphasis
        const gap = (gaps && gaps.length > 0 && gaps[index] && gaps[index]) || 0;
        const size = sizes[index];

        if (text.startsWith("!")) {
          return (
            <div key={index} style={{ display: "flex", alignItems: "flex-end", paddingBottom: gap, flexWrap: "wrap" }}>
              {parts.map((part, partIndex) => {
                if (part.startsWith("*") && part.endsWith("*")) {
                  const content = part.slice(1, -1);
                  return (
                    <ColorText key={partIndex} size={emphasisSize || size}>
                      {content}
                    </ColorText>
                  );
                } else {
                  return (
                    <Text key={partIndex} size={size}>
                      {part.slice(1)}
                    </Text>
                  );
                }
              })}
            </div>
          );
        } else {
          return (
            <div key={index} style={{ display: "flex", paddingBottom: gap, flexWrap: "wrap" }}>
              {parts.map((part, partIndex) => {
                if (part.startsWith("*") && part.endsWith("*")) {
                  const content = part.slice(1, -1);
                  return (
                    <SmallColorText key={partIndex} size={smallEmphasisSize || size}>
                      {content}
                    </SmallColorText>
                  );
                } else {
                  return (
                    <SmallText key={partIndex} size={size} smallTextColor={smallTextColor}>
                      {part}
                    </SmallText>
                  );
                }
              })}
            </div>
          );
        }
      })}
    </Container>
  );
};

export default TextWrapper;

const Container = styled.div<{ left?: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: ${(props) => (props.left ? undefined : "center")};
  justify-content: center;
`;

const Text = styled.p<{ size: number }>`
  font-size: ${(props) => `${props.size}px`};
  font-weight: 700;
  white-space: pre-wrap;
`;

const SmallText = styled.p<{ size: number; smallTextColor?: string }>`
  font-size: ${(props) => `${props.size}px`};
  font-weight: 600;
  color: ${(props) => (props.smallTextColor ? props.smallTextColor : styles.grayText)};
  white-space: pre-wrap;
`;

const ColorText = styled(Text)<{ size: number }>`
  color: ${styles.blue};
`;

const SmallColorText = styled(SmallText)<{ size: number }>`
  color: ${styles.blue};
`;
