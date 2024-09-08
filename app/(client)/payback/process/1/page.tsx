import { getExchanges } from "@/actions/trade/action";
import Page1 from "../page1";

export interface IPageObj {
  pageNum: number;
  bgColor: string;
}

const Process = async () => {
  const exchanges = await getExchanges();

  return <Page1 exchanges={exchanges.data} />;
};

export default Process;
