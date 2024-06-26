"use client";
import { styles } from "@/styles";
import styled from "styled-components";

const TextWrapper = ({ texts }: { texts: string[] }) => {
  return (
    <Container>
      {texts.map((text, index) => {
        if (text[0] === "!") {
          const t = text.slice(1);

          const firstStar = t.indexOf("*");
          const lastStar = t.indexOf("*", firstStar + 1);
          if (firstStar > -1 && lastStar > -1) {
            return (
              <div key={index} style={{ display: "flex" }}>
                <Text>{t.slice(0, firstStar)}</Text>
                <ColorText>{t.slice(firstStar + 1, lastStar)}</ColorText>
                <Text>{t.slice(lastStar + 1)}</Text>
              </div>
            );
          }

          return <Text key={index}>{t}</Text>;
        } else {
          const firstStar = text.indexOf("*");
          const lastStar = text.indexOf("*", firstStar + 1);
          if (firstStar > -1 && lastStar > -1) {
            return (
              <div key={index} style={{ display: "flex" }}>
                <SmallText>{text.slice(0, firstStar)}</SmallText>

                <SmallColorText>{text.slice(firstStar + 1, lastStar)}</SmallColorText>
                <SmallText>{text.slice(lastStar + 1)}</SmallText>
              </div>
            );
          }

          return <SmallText key={index}>{text}</SmallText>;
        }
      })}
    </Container>
  );
};

export default TextWrapper;

const Container = styled.div``;

const Text = styled.p`
  font-size: 22px;
  font-weight: 700;
  line-height: 150%;
  white-space: pre-wrap; /* Ensures whitespace is preserved */
`;

const SmallText = styled.p`
  font-size: 14px;
  font-weight: 600;
  color: ${styles.grayText};
  line-height: 120%;
  margin-top: 10px;
  white-space: pre-wrap; /* Ensures whitespace is preserved */
`;

const ColorText = styled(Text)`
  color: ${styles.blue};
`;

const SmallColorText = styled(SmallText)`
  color: ${styles.blue};
`;
