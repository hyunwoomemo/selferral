"use client";

import { Pencil, Plus } from "lucide-react";
import { useRouter } from "next/navigation";

export default function AddBtn({ text = "추가", id }) {
  const router = useRouter();

  const link = text === "수정" ? `edit` : "add";

  return (
    <div
      onClick={() => router.push(link === "edit" ? `/admin/exchange/${id}/${link}` : "/admin/exchange/add")}
      className="fixed bottom-10 right-10 w-16 h-16 flex justify-center items-center rounded-full cursor-pointer bg-gray-100 dark:bg-[rgb(26,26,36)] hover:text-orange-400"
    >
      {text === "추가" ? <Plus /> : <Pencil />}
    </div>
  );
}
