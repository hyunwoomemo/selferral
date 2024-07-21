import { getExchanges, getUsers } from "@/app/action";
import DashboardItem from "./dashboard-item";
import Sidebar from "./sidebar";

export default async function Page() {
  const users = await getUsers();
  const exchanges = await getExchanges();

  return (
    <div className="font-bold flex-auto p-8">
      <h2 className="text-3xl">Dashboard</h2>
      <div className="flex pt-10 gap-4">
        <DashboardItem>
          <div className="flex flex-col gap-4 min-w-[160px] py-4  justify-center items-center">
            <p className="text-gray-500 ">유저</p>
            <p className="text-3xl">{users.length}</p>
          </div>
        </DashboardItem>
        <DashboardItem>
          <div className="flex flex-col gap-4 min-w-[160px] py-4  justify-center items-center">
            <p className="text-gray-500 ">거래소</p>
            <p className="text-3xl">{exchanges.length}</p>
          </div>
        </DashboardItem>
      </div>
    </div>
  );
}
