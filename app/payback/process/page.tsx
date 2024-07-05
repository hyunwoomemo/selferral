"use client";
import Head from "next/head";
import { useEffect, useRef, useState } from "react";
import Section from "./section";
import Buttons from "./button";
import { useDisableScroll } from "@/app/hooks/useDisableScroll";
import Page1 from "./page1";
import ReactFullpage from "@fullpage/react-fullpage";

export interface IPageObj {
  pageNum: number;
  bgColor: string;
}

const Process = () => {
  const [selectTrade, setSelectTrade] = useState(true);

  return (
    <>
      <main className="relative ">
        <ReactFullpage
          //fullpage options
          licenseKey={"YOUR_KEY_HERE"}
          scrollingSpeed={1000} /* Options here */
          // scrollBar={true}
          render={({ state, fullpageApi }) => {
            console.log(state, fullpageApi);
            fullpageApi?.setAllowScrolling(false);

            // if (selectTrade) {
            //   fullpageApi?.setAllowScrolling(true);
            // }

            return (
              <ReactFullpage.Wrapper>
                <div className="section">
                  <Page1 onClick={() => fullpageApi.moveSectionDown()} />
                  {/* <button>Click me to move down</button> */}
                </div>
                <div className="section">
                  <p>Section 2</p>
                </div>
              </ReactFullpage.Wrapper>
            );
          }}
        />
        {/* <span className="fixed top-20 right-0 mx-auto text-4xl">현재 페이지는 {currentPageNum} 입니다.</span> */}
        {/* <div className="flex flex-col space-y-4 fixed top-96 right-10 z-10">
          <Buttons pageObjArray={pageObjArray} currentPageNum={currentPageNum} handlePointClick={handlePointClick} />
        </div> */}
      </main>
    </>
  );
};

export default Process;
