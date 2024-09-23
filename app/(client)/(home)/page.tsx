import SearchUid from "./search-uid";
import PaybackSection from "./payback-section";
import EventList from "./event-list";
import ExchangeWrapper from "./exchange-wrapper";
import { getExchanges, getUidList, getUidStatus } from "@/actions/trade/action";
import { cookies } from "next/headers";
import { getBanners } from "@/actions/common/action";
import "swiper/css";
import MyReward from "./my-reward";
import RollingBanner from "./rolling-banner";
import MyTrade from "./my-trade";
import { getAdminBanner } from "@/actions/site/action";

export default async function Home() {
  const exchanges = await getExchanges();
  const banners = await getBanners();
  console.log("banners", banners);
  // const uidData = await getUidList({ token: token?.value });
  // console.log("uidData", uidData);

  const uidData = await getUidStatus({});

  console.log("dddads", uidData);

  const Divider = () => {
    return <div className="h-3 w-full bg-gray-50 dark:bg-gray-900"></div>;
  };

  return (
    <div className="px-0">
      <MyReward uidData={uidData} exchanges={exchanges} />
      <Divider />
      <section className="space-y-6 pt-20  mx-auto">
        <div className="flex flex-col gap-4  md:px-0">
          {/* <div className="py-5"></div> */}
          <div className="flex flex-col items-center gap-2">
            <div className="flex justify-center whitespace-nowrap">
              <h1 className="text-xl md:text-3xl  font-black  text-transparent bg-clip-text bg-gradient-to-r from-orange-300 to-orange-700 animate-gradientMove bg-[length:200%_200%]">셀퍼럴</h1>
              <h1 className="text-xl md:text-3xl font-black ">닷컴에서 </h1>
            </div>
            <h1 className="text-xl md:text-3xl font-black ">안전하게 페이백 받으세요</h1>
          </div>

          <p className="max-w-[42rem] mx-auto text-muted-foreground  text-sm md:text-xl">1분 안에 잃어버린 거래수수료 환급받기!</p>
          {/* <p className="max-w-[42rem] mx-auto text-muted-foreground sm:text-xl">수수료 페이백 받으세요</p> */}

          <RollingBanner />

          {exchanges.data.length > 0 && <SearchUid exchangeData={exchanges.data} />}
          <Divider />

          <PaybackSection />
          {/* <div className="flex flex-col gap-4 justify-center sm:flex-row">
            <Link href="/blog" className={cn(buttonVariants({ size: "lg" }), "w-full sm:w-fit")}>
              버튼1
            </Link>
            <Link href={siteConfig.links.github} target="_blank" rel="noreferrer" className={cn(buttonVariants({ variant: "outline", size: "lg" }), "w-full sm:w-fit")}>
              버튼2
            </Link>
          </div> */}

          {/* <div>
            <h2 className="text-xl md:text-3xl font-black text-center">셀퍼럴 대회 및 이벤트</h2>
            <EventList />
          </div> */}
          <Divider />

          <div className="pt-20">
            {/* <div className="flex-1 flex justify-end pt-30 gap-2 px-2 max-w-screen-xl mx-auto">
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
        </div> */}
            <ExchangeWrapper data={exchanges.data} />
          </div>
          {/* <div className="md:pt-40">
            <h2 className="text-xl md:text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-center">배너</h2>
            {banners && Object.keys(banners).length && <Banner banners={banners} />}
          </div> */}

          {banners?.event?.length > 0 && (
            <>
              <Divider />

              <div className="px-4 pt-20">
                <h2 className="text-2xl font-bold">셀퍼럴닷컴과 함께하는 이벤트</h2>
                <p className="text-gray-400 font-bold pt-2">트레이더님들을 위해 준비했어요</p>
                <EventList data={banners.event} />
              </div>
            </>
          )}
        </div>
      </section>
    </div>
  );
}
