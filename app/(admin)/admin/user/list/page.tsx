import { getAllUsersWithUidStatus } from "@/actions/user/action";
import Container from "./container";
import { getAffiliateExchanges } from "@/actions/trade/action";

export default async function Page() {
  const users = await getAllUsersWithUidStatus();
  const exchanges = await getAffiliateExchanges();

  return <Container users={users?.lists} exchanges={exchanges?.data} />;
}
