"use client";
import Head from "next/head";
import { useEffect, useRef, useState } from "react";
import Section from "./section";
import Buttons from "./button";
import { useDisableScroll } from "@/app/hooks/useDisableScroll";
import Page1 from "./page1";
import ReactFullpage from "@fullpage/react-fullpage";
import Page2 from "./page2";
import Page3 from "./page3";
import Page4 from "./page4";
import { useRouter, useSearchParams } from "next/navigation";

export interface IPageObj {
  pageNum: number;
  bgColor: string;
}

const Process = () => {
  const [selectTrade, setSelectTrade] = useState("");
  const router = useRouter();
  const params = useSearchParams();

  useEffect(() => {
    const section = params.get("section");
  }, [params]);

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
            fullpageApi?.moveTo(params.get("section") || 1);

            // if (selectTrade) {
            //   fullpageApi?.setAllowScrolling(true);
            // }

            return (
              <ReactFullpage.Wrapper>
                <div className="section">
                  <Page1 setSelectTrade={setSelectTrade} onClick={() => router.push("/payback/process?section=2")} prev={() => router.back()} />
                  {/* <button>Click me to move down</button> */}
                </div>
                <div className="section">
                  <Page2 onClick={() => router.push("/payback/process?section=3")} />
                </div>
                <div className="section">
                  <Page3 selectTrade={selectTrade} onClick={() => router.push("/payback/process?section=4")} />
                </div>
                <div className="section">
                  <Page4 onClick={() => router.push(`/payback/result?name=${selectTrade}`)} />
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
