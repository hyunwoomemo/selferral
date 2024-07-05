"use client";
import { ArrowUp } from "lucide-react";
import Image from "next/image";
import { useSearchParams } from "next/navigation";

export default function TradeReport({}) {
  const params = useSearchParams();

  const selectedTrade = params.get("name");

  return (
    <div className="flex font-bold gap-5 items-center">
      <Image src={require(`@/assets/${selectedTrade?.toLocaleLowerCase()}.webp`)} alt="trade-logo" width={50} height={50} />
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
