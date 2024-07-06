"use client";
import Head from "next/head";
import { Suspense, useEffect, useRef, useState } from "react";
import Section from "../section";
import Buttons from "../button";
import { useDisableScroll } from "@/app/hooks/useDisableScroll";
import Page1 from "../page1";
import ReactFullpage from "@fullpage/react-fullpage";
import Page2 from "../page2";
import Page3 from "../page3";
import Page4 from "../page4";
import { useRouter, useSearchParams } from "next/navigation";
import { useAtom } from "jotai";
import { selectedTradeAtom } from "@/app/store/trade";

export interface IPageObj {
  pageNum: number;
  bgColor: string;
}

const Process = () => {
  const [selectTrade, setSelectTrade] = useAtom(selectedTradeAtom);
  const router = useRouter();
  const params = useSearchParams();

  return <Page1 setSelectTrade={setSelectTrade} onClick={() => router.push("/payback/process/2")} prev={() => router.back()} />;
};

export default Process;
