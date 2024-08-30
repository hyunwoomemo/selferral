import SearchUid from "./search-uid";
import PaybackSection from "./payback-section";
import EventList from "./event-list";
import ExchangeWrapper from "./exchange-wrapper";
// import { getExchanges } from "@/app/action";
import { dummyTrade } from "@/dummy";
import { API_URL } from "@/actions";
import { getExchanges } from "@/actions/trade/action";
import { cookies } from "next/headers";

export default async function Home() {
  const token = cookies().get("token");
  const exchanges = await getExchanges();
  console.log("exchangesexchanges", exchanges);

  return (
    <>
      <section className="space-y-6 pt-32  mx-auto">
        <div className="flex flex-col gap-4  md:px-0">
          <div className="flex flex-col items-center gap-2">
            <div className="flex justify-center whitespace-nowrap">
              <h1 className="text-3xl sm:text-3xl md:text-4xl lg:text-5xl font-black  text-orange-400">셀퍼럴</h1>
              <h1 className="text-3xl sm:text-3xl md:text-4xl lg:text-5xl font-black ">닷컴에서 </h1>
            </div>
            <h1 className="text-3xl sm:text-3xl md:text-4xl lg:text-5xl font-black ">안전하게 페이백 받으세요</h1>
          </div>

          <p className="max-w-[42rem] mx-auto text-muted-foreground sm:text-xl">1분 안에 잃어버린 거래수수료 환급받기!</p>
          {/* <p className="max-w-[42rem] mx-auto text-muted-foreground sm:text-xl">수수료 페이백 받으세요</p> */}
          <SearchUid exchangeData={exchanges.data} token={token?.value} />
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

            <ExchangeWrapper data={exchanges.data} />
          </div>
        </div>
      </section>
    </>
  );
}
