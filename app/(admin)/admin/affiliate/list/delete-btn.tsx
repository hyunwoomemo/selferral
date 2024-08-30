"use client";
// import executeQuery from "@/lib/db";
import { Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";

export default function DeleteButton({ id }) {
  const router = useRouter();

  const handleDelete = async () => {
    const res = await fetch("/api/exchange/delete", {
      method: "POST",
      body: id,
    });

    console.log("res", res);

    const data = await res.json();

    if (data.CODE === "ED000") {
      router.refresh();
    }
  };
  return (
    <div className="cursor-pointer" onClick={handleDelete}>
      <Trash2 />
    </div>
  );
}
