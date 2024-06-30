import Header from "@/components/common/Header";
import TextWrapper from "@/components/common/TextWrapper";
import ResultContents from "./result-contents";

const Page = () => {
  return (
    <div>
      <Header />
      <div style={{ marginTop: 100 }}></div>
      <ResultContents />
    </div>
  );
};

export default Page;
