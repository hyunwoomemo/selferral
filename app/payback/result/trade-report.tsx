"use client";
import { selectedTradeAtom } from "@/app/store/trade";
import { useAtomValue } from "jotai";
import { ArrowUp } from "lucide-react";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";

export default function TradeReport({}) {
  const selectedTrade = useAtomValue(selectedTradeAtom);

  return (
    <div className="flex font-bold gap-5 items-center">
      {selectedTrade && <Image src={require(`@/assets/${selectedTrade.toLowerCase()}.webp`)} alt="trade-logo" width={50} height={50} />}
      <div className="flex-1">
        <p className="text-gray-400">24,237명 분석</p>
        <p className="text-xl">{selectedTrade}</p>
      </div>
      <div className="flex gap-3 items-center">
        <p>일치율 93%</p>
        <ArrowUp />
      </div>
    </div>
  );
}
