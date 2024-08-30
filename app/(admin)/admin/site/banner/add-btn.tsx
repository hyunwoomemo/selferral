"use client";

import { useRouter } from "next/navigation";

export default function AddBtn({ text = "추가", id }) {
  const router = useRouter();

  const link = text === "수정" ? `edit` : "add";

  return (
    <div
      onClick={() => router.push(link === "edit" ? `/admin/exchange/${id}/${link}` : "/admin/site/banner/add")}
      className="fixed bottom-10 right-10 w-20 h-20 flex justify-center items-center rounded-full cursor-pointer bg-gray-200 dark:bg-[rgb(26,26,36)]"
    >
      {text}
    </div>
  );
}
