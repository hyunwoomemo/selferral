import { getAllUsersWithUidStatus } from "@/actions/user/action";
import Container from "./container";
import { getAffiliateExchanges } from "@/actions/trade/action";

export default async function Page() {
  const users = await getAllUsersWithUidStatus();
  const exchanges = await getAffiliateExchanges();

  console.log("usersusersusers123", users);

  return <Container users={users?.DATA} exchanges={exchanges?.data} />;
}
