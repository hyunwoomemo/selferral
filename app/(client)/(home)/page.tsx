import SearchUid from "./search-uid";
import PaybackSection from "./payback-section";
import EventList from "./event-list";
import ExchangeWrapper from "./exchange-wrapper";
import { getExchanges, getUidList } from "@/actions/trade/action";
import { cookies } from "next/headers";
import { getBanners } from "@/actions/common/action";
import "swiper/css";
import MyReward from "./my-reward";

export default async function Home() {
  const token = cookies().get("token");
  const exchanges = await getExchanges();
  console.log("exchangesexchanges", exchanges);

  // const banners = await getBanners();
  const uidData = await getUidList({ token: token?.value });
  const USDT = await uidData?.data?.reduce((result, cur) => {
    if (cur.point) {
      result = result + Number(cur.point);
    }

    return result;
  }, 0);

  console.log("uidData", uidData.data);

  const Divider = () => {
    return <div className="h-3 w-full bg-gray-50 dark:bg-gray-900"></div>;
  };

  return (
    <div className="px-0">
      <MyReward usdt={USDT} />
      <Divider />
      <section className="space-y-6 pt-20  mx-auto">
        <div className="flex flex-col gap-4  md:px-0">
          {/* <div className="py-5"></div> */}
          <div className="flex flex-col items-center gap-2">
            <div className="flex justify-center whitespace-nowrap">
              <h1 className="text-3xl  font-black  text-transparent bg-clip-text bg-gradient-to-r from-orange-300 to-orange-700 animate-gradientMove bg-[length:200%_200%]">셀퍼럴</h1>
              <h1 className="text-3xl font-black ">닷컴에서 </h1>
            </div>
            <h1 className="text-3xl font-black ">안전하게 페이백 받으세요</h1>
          </div>

          <p className="max-w-[42rem] mx-auto text-muted-foreground text-xl">1분 안에 잃어버린 거래수수료 환급받기!</p>
          {/* <p className="max-w-[42rem] mx-auto text-muted-foreground sm:text-xl">수수료 페이백 받으세요</p> */}
          {exchanges.data.length > 0 && <SearchUid exchangeData={exchanges.data} token={token?.value} />}
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
            <h2 className="text-3xl font-black text-center">셀퍼럴 대회 및 이벤트</h2>
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
            <h2 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-center">배너</h2>
            {banners && Object.keys(banners).length && <Banner banners={banners} />}
          </div> */}
        </div>
      </section>
    </div>
  );
}
