import SearchUid from "./search-uid";
import PaybackSection from "./payback-section";
import TradeList from "./trade-list";
import EventList from "./event-list";

export default function Home() {
  return (
    <>
      <section className="space-y-6 py-32  mx-auto">
        <div className="container flex flex-col gap-4">
          <h1 className="text-3xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-center">소멸되는 거래 수수료</h1>
          <div className="flex justify-center whitespace-nowrap">
            <h1 className="text-3xl sm:text-3xl md:text-4xl lg:text-5xl font-black  text-orange-400">셀퍼럴</h1>
            <h1 className="text-3xl sm:text-3xl md:text-4xl lg:text-5xl font-black ">과 함께 페이백하세요!</h1>
          </div>

          <p className="max-w-[42rem] mx-auto text-muted-foreground sm:text-xl">거래수수료를 되돌려주는 셀퍼럴 셀퍼럴로</p>
          <p className="max-w-[42rem] mx-auto text-muted-foreground sm:text-xl">수수료 페이백 받으세요</p>
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
            <TradeList />
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
