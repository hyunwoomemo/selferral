import Header from "@/components/common/Header";
import AffiliatedIntroduce from "./affiliated-introduce";
import TradeList from "../(home)/trade-list";
import Footer from "@/components/common/Footer";

const Page = () => {
  return (
    <main>
      <Header />
      <AffiliatedIntroduce />
      <TradeList header={false} />
      <Footer />
    </main>
  );
};

export default Page;
