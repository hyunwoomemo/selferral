"use client";

import React, { useEffect, useState } from "react";
import TradeList from "./trade-list";
import NewTradeList from "./new-trade-list";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { AlignJustify, LayoutGrid } from "lucide-react";
import { useAtom } from "jotai";
import { exchangesAtom } from "@/store/trade/atom";

const ExchangeWrapper = ({ data }: { data: any }) => {
  console.log("data", data);
  const [asIs, setAsIs] = useState(false);

  const [exchanges, setExchanges] = useAtom(exchangesAtom);

  useEffect(() => {
    setExchanges(data);
  }, [data]);

  return (
    <>
      <div className="flex justify-end pt-20 gap-2 px-2 max-w-screen-xl mx-auto">
        <Button onClick={() => setAsIs(true)} className={cn(buttonVariants({ size: "lg", variant: "outline" }), `${asIs ? "text-orange-400 hover:text-orange-400" : "text-gray-800 dark:text-white"}`)}>
          <LayoutGrid />
        </Button>
        <Button
          onClick={() => setAsIs(false)}
          className={cn(buttonVariants({ size: "lg", variant: "outline" }), `${!asIs ? "text-orange-400 hover:text-orange-400" : "text-gray-800 dark:text-white"}`)}
        >
          <AlignJustify />
        </Button>
      </div>
      {asIs ? <TradeList data={data} /> : <NewTradeList data={data} />}
    </>
  );
};

export default ExchangeWrapper;
