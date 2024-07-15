"use client";

import { useRouter } from "next/navigation";

export default function AddBtn() {
  const router = useRouter();

  return (
    <div onClick={() => router.push("/admin/exchange/add")} className="fixed bottom-10 right-10 w-20 h-20 flex justify-center items-center rounded-full bg-[rgb(26,26,36)]">
      추가
    </div>
  );
}
