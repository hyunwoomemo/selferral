"use client";
import Head from "next/head";
import { useEffect, useRef, useState } from "react";
import Section from "./section";
import Buttons from "./button";
import { useDisableScroll } from "@/app/hooks/useDisableScroll";
import Page1 from "./page1";

export interface IPageObj {
  pageNum: number;
  bgColor: string;
}

const pageObjArray = [
  { pageNum: 1, bgColor: "bg-[#ffeaa7]" },
  { pageNum: 2, bgColor: "bg-[#fab1a0]" },
  { pageNum: 3, bgColor: "bg-[#fdcb6e]" },
  { pageNum: 4, bgColor: "bg-[#e17055]" },
];

const Process = () => {
  const [windowObj, setWindowObj] = useState<Window>();
  const [currentPageNum, setCurrentPageNum] = useState<number>(1);
  const totalNum = pageObjArray.length;
  // 👇 console 찍어보면 length가 5이고 0번 인덱스는 undefined가 출력됨. (이 배열 핸들링할때 1번 인덱스부터 시작해야함)
  const pageRefs = useRef<HTMLDivElement[]>([]);
  const previousScroll = useRef<number>(0);

  useEffect(() => {
    if (window !== undefined) {
      setWindowObj(window);
    }
  }, []);

  // 페이지 변경 함수
  const handlePageChange = (event: Event) => {
    let scroll = windowObj?.scrollY!;
    for (let i = 1; i <= totalNum; i++) {
      // 스크롤이 해당 섹션에 진입했는지 판단 && 해당 스크롤이 해당 섹션에 머물러 있는지
      if (scroll > pageRefs.current[i].offsetTop - windowObj!.outerHeight / 3 && scroll < pageRefs.current[i].offsetTop - windowObj!.outerHeight / 3 + pageRefs.current[i].offsetHeight) {
        // window.scrollTo({ top: pageRefs.current[i].offsetHeight, behavior: "smooth" });
        setCurrentPageNum(i);
        break;
      }
    }
  };
  // const handlePageChange = () => {
  //   if (!windowObj) return;

  //   const currentScroll = windowObj.scrollY;

  //   // 스크롤 방향 판단
  //   const direction = currentScroll > previousScroll.current ? "down" : "up";
  //   previousScroll.current = currentScroll; // 이전 스크롤 위치 업데이트

  //   for (let i = 0; i < totalNum; i++) {
  //     const section = pageRefs.current[i];
  //     if (!section) continue;

  //     // 해당 섹션의 시작과 끝 위치 계산
  //     const sectionStart = section.offsetTop - windowObj.outerHeight / 3;
  //     const sectionEnd = sectionStart + section.offsetHeight;

  //     // 스크롤 위치가 섹션에 들어왔는지 판단
  //     if (currentScroll >= sectionStart && currentScroll < sectionEnd) {
  //       // 스크롤 방향에 따라 페이지 변경
  //       if (direction === "down" && i < totalNum - 1) {
  //         setCurrentPageNum(i + 1); // 다음 페이지로 이동
  //       } else if (direction === "up" && i > 0) {
  //         setCurrentPageNum(i); // 이전 페이지로 이동
  //       }
  //       break;
  //     }
  //   }
  // };

  // useEffect(() => {
  //   windowObj &&
  //     windowObj?.scrollTo({
  //       top: pageRefs.current[currentPageNum].offsetTop,
  //       behavior: "smooth",
  //     });
  // }, [currentPageNum, windowObj, pageRefs]);

  // 버튼 클릭
  const handlePointClick = (pageNum: number) => {
    windowObj?.scrollTo({
      top: pageRefs.current[pageNum].offsetTop,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    windowObj?.addEventListener("scroll", handlePageChange);
    return () => {
      windowObj?.removeEventListener("scroll", handlePageChange);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [windowObj]);

  const { disableScroll, enableScroll } = useDisableScroll();

  useEffect(() => {
    // modal이 떠 있을 땐 스크롤 막음
    if (windowObj) {
      disableScroll();
    }

    // modal 닫히면 다시 스크롤 가능하도록 함
    return () => enableScroll();
  }, [windowObj]);

  return (
    <>
      <main className="relative ">
        {pageObjArray.map((item, index) => {
          return (
            <Section key={index} pageNum={item.pageNum} window={windowObj!} pageRefs={pageRefs}>
              {index === 0 && <Page1 />}
            </Section>
          );
        })}
        {/* <span className="fixed top-20 right-0 mx-auto text-4xl">현재 페이지는 {currentPageNum} 입니다.</span> */}
        {/* <div className="flex flex-col space-y-4 fixed top-96 right-10 z-10">
          <Buttons pageObjArray={pageObjArray} currentPageNum={currentPageNum} handlePointClick={handlePointClick} />
        </div> */}
      </main>
    </>
  );
};

export default Process;
