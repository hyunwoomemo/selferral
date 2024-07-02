"use client";
import Button from "@/components/common/Button";
import TextWrapper from "@/components/common/TextWrapper";
import { styles } from "@/styles";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useInView } from "react-intersection-observer";
import styled from "styled-components";

const MainPayback = () => {
  const router = useRouter();

  const { ref, inView } = useInView({
    threshold: 0.2, // 요소가 20% 보일 때 트리거
    triggerOnce: true,
  });

  return (
    <Container ref={ref} inView={inView}>
      <TextWrapper texts={["*손쉽게 확인해 보세요!*", "!예상 페이백 평균", "!*685,842*원 입니다."]} emphasisSize={36} sizes={[16, 28, 28]} gaps={[30, 30]} />
      <div>
        <Button label="내 예상 페이백 확인하기" bgc="#fff" onClick={() => router.push("/payback")} color={styles.blue} border borderColor={styles.blue} />
      </div>
      {/* <Image src={require("@/assets/img_sec2_mainimg.png")} width={270} alt="payback" /> */}
    </Container>
  );
};

export default MainPayback;

const Container = styled.div<{ inView: any }>`
  min-height: 400px;
  padding: 0 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  /* justify-content: space-between; */
  justify-content: center;
  /* background-color: rgb(249, 249, 249); */
  transition: opacity 0.6s ease-out, transform 0.6s ease-out;

  opacity: ${(props) => (props.inView ? 1 : 0)};
  transform: ${(props) => (props.inView ? "translateY(0);" : "translateY(100px)")};

  > div:first-child {
  }
`;
