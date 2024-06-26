import Divider from "@/components/common/Divider";
import RecomendTradeList from "./recomend-trade-list";
import UidSearch from "./uid-search";
import Notice from "@/components/common/Notice";
import { useRouter } from "next/navigation";

const Page = () => {
  return (
    <div>
      <UidSearch />
      <RecomendTradeList />
      <Divider />
      <Notice title="내가 받을 돈 확인하기" contents="아직 페이백 계정이 없으세요?" type={"uid"} />
    </div>
  );
};

export default Page;
