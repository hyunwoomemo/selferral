"use client";
import SearchUid from "./search-uid";
import PaybackSection from "./payback-section";
import TradeList from "./trade-list";
import EventList from "./event-list";
import NewTradeList from "./new-trade-list";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import { AlignJustify, LayoutGrid } from "lucide-react";
import executeQuery from "@/lib/db";

export default function Home() {
  const [asIs, setAsIs] = useState(false);

  // const [load, setLoad] = useState(true);

  // useEffect(() => {
  //   async function getLoader() {
  //     await import("ldrs/cardio");
  //     // cardio.default;
  //   }

  //   getLoader();
  //   setTimeout(() => {
  //     setLoad(false);
  //   }, 1000);
  // }, []);

  return (
    <>
      {/* {load && <l-cardio size={72} color={"white"}></l-cardio>} */}
      <section className="space-y-6 pt-32  mx-auto">
        <div className="flex flex-col gap-4 sm:px-4 md:px-0">
          <div className="flex flex-col items-center gap-2">
            <div className="flex justify-center whitespace-nowrap">
              <h1 className="text-3xl sm:text-3xl md:text-4xl lg:text-5xl font-black  text-orange-400">셀퍼럴</h1>
              <h1 className="text-3xl sm:text-3xl md:text-4xl lg:text-5xl font-black ">닷컴에서 </h1>
            </div>
            <h1 className="text-3xl sm:text-3xl md:text-4xl lg:text-5xl font-black ">안전하게 페이백 받으세요</h1>
          </div>

          <p className="max-w-[42rem] mx-auto text-muted-foreground sm:text-xl">1분 안에 잃어버린 거래수수료 환급받기!</p>
          {/* <p className="max-w-[42rem] mx-auto text-muted-foreground sm:text-xl">수수료 페이백 받으세요</p> */}
          <SearchUid />
          <PaybackSection />
          {/* <div className="flex flex-col gap-4 justify-center sm:flex-row">
            <Link href="/blog" className={cn(buttonVariants({ size: "lg" }), "w-full sm:w-fit")}>
              버튼1
            </Link>
            <Link href={siteConfig.links.github} target="_blank" rel="noreferrer" className={cn(buttonVariants({ variant: "outline", size: "lg" }), "w-full sm:w-fit")}>
              버튼2
            </Link>
          </div> */}

          <div>
            <h2 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-center">셀퍼럴 대회 및 이벤트</h2>
            <EventList />
          </div>
          <div className="md:pt-40">
            <h2 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-center">셀퍼럴 제휴 거래소</h2>
            <div className="flex justify-end pt-20 gap-2 max-w-screen-xl mx-auto">
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
            {asIs ? <TradeList /> : <NewTradeList />}
          </div>
        </div>
      </section>
      {/* <section className="container max-w-4xl py-6 lg:py-10 flex flex-col space-y-6 mt-60">
        <h2 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-center">Latest Posts</h2>
        <ul className="flex flex-col">
          {latestPosts.map(
            (post) =>
              post.published && (
                <li key={post.slug} className="first:border-t first:border-border">
                  <PostItem slug={post.slug} title={post.title} description={post.description} date={post.date} tags={post.tags} />
                </li>
              )
          )}
        </ul>
      </section> */}
    </>
  );
}