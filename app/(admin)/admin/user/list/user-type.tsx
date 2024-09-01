"use client";

import { API_URL } from "@/actions";
import { setUserType } from "@/actions/user/action";
import { useRouter } from "next/navigation";

export default function UserType({ children, id, typeData, token, isVisible }) {
  const router = useRouter();

  const handleUpdateType = async ({ id, type, token }) => {
    const res = await setUserType({ token, id, type });

    // const res = await updateStep({ withdrawlId: id, step, token });
    // if (res.data === "OK") {
    //   getWithdrawals({ exchangeId: tab === "all" ? 0 : tab, token })
    //     .then((res) => setData(res.data))
    //     .finally(() => setIsVisible(-1));
    // }
  };

  return (
    <div className="cursor-pointer" onClick={() => router.push(`/admin/user/permission?id=${id}`)}>
      {children}
      <div className={`absolute flex flex-col gap-4 top-10 items-center  ${isVisible === item.id ? "block" : "hidden"} bg-gray-700 z-10 p-3 rounded-md`}>
        {typeData
          .filter((v) => v.value !== id)
          .map((v) => (
            <span onClick={() => handleUpdateType({ id, type: v.value })}>{v.label}</span>
          ))}
      </div>
    </div>
  );
}
