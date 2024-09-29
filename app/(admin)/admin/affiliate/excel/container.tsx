"use client";
import { API_URL } from "@/actions";
import { uploadExcel } from "@/actions/trade/action";
import { Button, buttonVariants } from "@/components/ui/button";
import { useToast } from "@/hooks/useToast";
import { cn } from "@/lib/utils";
import { getCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import React, { Suspense, useState } from "react";
import ExcelList from "./excel-list";

const Container = () => {
  const token = getCookie("token");
  const [file, setFile] = useState(null);
  const router = useRouter();

  const { addToast } = useToast();

  const handleFileChange = (e) => {
    setFile(e.target.files);
  };

  const handleUpload = async (e) => {
    e.preventDefault();

    if (!file) return;

    const formData = new FormData();

    for (let i = 0; i < file.length; i++) {
      formData.append("file", file[i]);
    }

    try {
      const data = await uploadExcel({ token: token, formData: formData });

      if (data.flag === "ok") {
        setFile(null);
        // window.alert("액셀이 업로드 되었습니다.");
        addToast({ text: "액셀이 업로드 되었습니다." });
        router.push("/admin/exchange/list");
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <div className="p-8 font-bold flex-auto pb-32">
        <h1 className="text-3xl pb-10">액셀 업로드</h1>

        <input type="file" onChange={handleFileChange} />
        <Button
          disabled={!file}
          onClick={handleUpload}
          className={cn(buttonVariants({ variant: "outline", size: "lg" }), "w-full max-w-64 text-orange-400 border-orange-400 dark:text-orange-200 dark:border-orange-200")}
        >
          <p className="font-bold">업로드</p>
        </Button>
        <ExcelList />
      </div>
    </>
  );
};

export default Container;
