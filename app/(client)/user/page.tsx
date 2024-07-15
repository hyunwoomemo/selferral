import { info } from "../../action";
import LogoutButton from "./logout-button";
import moment from "moment";

export default async function Page() {
  const data = await info();

  console.log(data);

  if (!data.DATA) return;

  const RednerItem = () => {
    // for (const key in data.DATA) {
    //   return (
    //     <>
    //       <div>{key}</div>
    //       <div>{data.DATA[key]}</div>
    //     </>
    //   );
    // }
    return (
      <>
        {Object.entries(data.DATA).map(([key, value]) => {
          return (
            <div key={key} className="flex flex-col gap-2">
              <p className="text-lg">{key}</p>
              <p className="py-2 px-4 bg-gray-200 dark: bg-gray-800 rounded-sm">{key === "createdAt" ? moment(value).format("YYYY-MM-DD") : value}</p>
            </div>
          );
        })}
      </>
    );
  };

  return (
    <div className="p-10 flex-1 flex-col flex gap-5 items-start">
      <RednerItem />
      <LogoutButton />
    </div>
  );
}
