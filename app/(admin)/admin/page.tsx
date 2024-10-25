// import { getExchanges, getUsers } from "@/app/action";
// import { getExchanges } from "@/app/action";
import { dummyTrade } from "@/dummy";
import DashboardItem from "./dashboard-item";
import Sidebar from "./1sidebar";
import { getAllUser, getInfo, getUser } from "@/actions/user/action";
import { getExchanges } from "@/actions/trade/action";
import { redirect } from "next/navigation";

export default async function Page() {
  // const users = await getAllUser();

  // const exchanges = await getExchanges();

  const user = await getInfo();

  const isLoggedIn = user.DATA && Object.keys(user.DATA).length > 0;

  if (!isLoggedIn) {
    return redirect("/");
  } else {
    return redirect("/admin/overview");
  }
}
