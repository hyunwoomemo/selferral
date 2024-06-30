import Header from "@/components/common/Header";
import { dummyTrade } from "@/dummy";
import { styles } from "@/styles";
import Image from "next/image";
import Contents from "./contents";

const page = ({ params }: { params: any }) => {
  console.log(params);

  const data = dummyTrade.find((v) => v.name.toLowerCase() === params.trade.toLowerCase());

  return (
    <div>
      <Header />
      {/* <div style={{ marginTop: 70 }}></div> */}
      <div style={{ display: "flex", justifyContent: "center", backgroundColor: "rgb(21, 25, 42)" }}>
        <Image src={require(`@/assets/banner/${params.trade}.webp`)} width={200} height={200} alt="trade-image" />
      </div>
      <Contents data={data} />
    </div>
  );
};

export default page;
