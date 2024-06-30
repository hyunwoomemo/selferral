import Header from "@/components/common/Header";
import AffiliatedIntroduce from "./affiliated-introduce";
import Footer from "@/components/common/Footer";
import TradeList from "./trade-list";

const Page = () => {
  return (
    <main>
      <Header />
      <AffiliatedIntroduce />
      <TradeList />
      <Footer />
    </main>
  );
};

export default Page;
