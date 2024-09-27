// import { getUsers } from "@/app/action";
import moment from "moment";

import { getAllUser, getAllUsersWithUidStatus } from "@/actions/user/action";
import Container from "./container";
import { cookies } from "next/headers";
import { getAffiliateExchanges, getExchanges } from "@/actions/trade/action";

export default async function Page() {
  const users = await getAllUsersWithUidStatus();
  const exchanges = await getAffiliateExchanges();

  console.log("users", exchanges);

  return <Container users={users.DATA} exchanges={exchanges.data} />;
}
