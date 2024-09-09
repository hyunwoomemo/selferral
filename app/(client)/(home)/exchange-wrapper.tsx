"use client";

import React, { useEffect, useState } from "react";
import TradeList from "./trade-list";
import NewTradeList from "./new-trade-list";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { AlignJustify, LayoutGrid } from "lucide-react";
import { useAtom } from "jotai";
import { exchangesAtom } from "@/app/store/trade";
import Title from "@/components/ui/title";
import { usePathname } from "next/navigation";
import { useWidthSize } from "@/hooks/useWithSize";

const ExchangeWrapper = ({ data }: { data: any }) => {
  console.log("data", data);
  const pathname = usePathname();
  const [asIs, setAsIs] = useState(false);

  const { isMobile } = useWidthSize();

  console.log("isMobile", isMobile);

  useEffect(() => {
    if (isMobile) {
      setAsIs(true);
    } else {
      setAsIs(false);
    }
  }, [isMobile]);

  const [exchanges, setExchanges] = useAtom(exchangesAtom);

  useEffect(() => {
    setExchanges(data);
  }, [data]);

  return (
    <>
      <div className="">
        {/* <h2 className="flex-1 justify-center  pb-10 text-3xl font-black text-center">셀퍼럴 제휴 거래소</h2> */}

        {pathname !== "/" && (
          <Title
            text="셀퍼럴 제휴 거래소"
            buttons={[
              <Button
                key={"grid"}
                onClick={() => setAsIs(true)}
                className={cn(buttonVariants({ size: "sm", variant: "outline" }), "hidden sm:flex", `${asIs ? "text-orange-400 hover:text-orange-400" : "text-gray-800 dark:text-white"}`)}
              >
                <LayoutGrid />
              </Button>,
              <Button
                key={"alignjustify"}
                onClick={() => setAsIs(false)}
                className={cn(buttonVariants({ size: "sm", variant: "outline" }), "hidden sm:flex", `${!asIs ? "text-orange-400 hover:text-orange-400" : "text-gray-800 dark:text-white"}`)}
              >
                <AlignJustify />
              </Button>,
            ]}
          />
        )}
        {pathname === "/" && (
          <div className="flex flex-col md:flex-row">
            <div className="flex-1"></div>
            <h2 className="flex-3 justify-center  pb-10 text-3xl font-black text-center">셀퍼럴 제휴 거래소</h2>
            <div
              className="flex-1 justify-end pt-30 gap-2 px-2 max-w-screen-xl mx-auto 
            hidden md:flex"
            >
              <Button
                onClick={() => setAsIs(true)}
                className={cn(buttonVariants({ size: "lg", variant: "outline" }), `${asIs ? "text-orange-400 hover:text-orange-400" : "text-gray-800 dark:text-white"}`)}
              >
                <LayoutGrid />
              </Button>
              <Button
                onClick={() => setAsIs(false)}
                className={cn(buttonVariants({ size: "lg", variant: "outline" }), `${!asIs ? "text-orange-400 hover:text-orange-400" : "text-gray-800 dark:text-white"}`)}
              >
                <AlignJustify />
              </Button>
            </div>
          </div>
        )}
      </div>
      {asIs ? <TradeList data={data} /> : <NewTradeList data={data} />}
    </>
  );
};

export default ExchangeWrapper;
