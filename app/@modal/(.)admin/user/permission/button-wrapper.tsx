"use client";
import { useState } from "react";
import TypeButton from "./button";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function ButtonWrapper({ data }) {
  const [select, setSelect] = useState(data?.type);
  const router = useRouter();

  const handleSave = async () => {
    const res = await fetch("/api/user/edit", {
      body: JSON.stringify({ type: select, id: data.id }),
      method: "POST",
    });

    const json = await res.json();

    if (json.CODE === "UE000") {
      router.back();
      setTimeout(() => {
        router.refresh();
      }, 100);
    }
  };

  return (
    <div className="p-4 flex flex-col justify-between flex-1">
      <div>
        <div>유저 타입</div>
        <div className="flex gap-4 pt-4">
          <TypeButton onClick={() => setSelect("UT01")} type={data?.type} value={"UT01"} select={select}>
            유저
          </TypeButton>
          <TypeButton onClick={() => setSelect("UT02")} type={data?.type} value={"UT02"} select={select}>
            관리자
          </TypeButton>
        </div>
      </div>
      <div className="mt-auto">
        <Button onClick={handleSave} className={`font-bold ${data?.type !== select ? "bg-gray-400 dark:bg-gray-800 dark:text-white" : "hidden"}`}>
          저장
        </Button>
      </div>
    </div>
  );
}
