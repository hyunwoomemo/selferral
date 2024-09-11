"use client";

import { useAtomValue } from "jotai";
import Page3 from "../page3";
import { paybackTestAtom, selectedTradeAtom } from "@/app/store/trade";

const Process = () => {
  const paybackTest = useAtomValue(paybackTestAtom);

  return <Page3 selectTrade={paybackTest.name} />;
};

export default Process;
