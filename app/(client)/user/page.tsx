// import { info } from "../../action";
import { getInfo, refresh } from "@/actions/user/action";
import LogoutButton from "./logout-button";
import moment from "moment";
import { cookies } from "next/headers";
import { useSetAtom } from "jotai";
import { userAtom } from "@/app/store/user";
import WithdrawalButton from "./withdrawal-button";

export default async function Page() {
  const token = cookies().get("token");
  const refresh = cookies().get("refresh");
  const data = await getInfo(token?.value, refresh.value);

  console.log("datadatadatadata", data);

  if (!data?.DATA) return;

  if (data.CODE === "AC001") {
    // const refreshData = await refresh()
  }

  if (data?.accessToken) {
    cookies().set("token", data.accessToken);
  }

  const RednerItem = () => {
    for (const key in data.DATA) {
      return (
        <>
          <div>{key}</div>
          <div>{data.DATA[key]}</div>
        </>
      );
    }
    return (
      <>
        {Object.entries(data.DATA).map(([key, value]) => {
          return (
            <div key={key} className="flex flex-col gap-2 ">
              <p className="text-lg">{key}</p>
              <p className="py-2 px-4 bg-gray-200 dark:bg-gray-800 rounded-sm">{key === "createdAt" ? moment(value).format("YYYY-MM-DD") : value}</p>
            </div>
          );
        })}
      </>
    );
  };

  return (
    <div className="p-10 flex-1 flex-col flex gap-5 items-start mx-auto max-w-screen-xl">
      {/* <RednerItem /> */}
      {data.DATA &&
        Object.entries(data.DATA).map(([key, value]) => {
          return (
            <div key={key} className="flex gap-2">
              <div>{key}</div>
              <div className="font-bold">{value}</div>
            </div>
          );
        })}
      <div className="flex gap-4">
        {/* <LogoutButton /> */}
        <WithdrawalButton />
        <LogoutButton />
      </div>
    </div>
  );
}
