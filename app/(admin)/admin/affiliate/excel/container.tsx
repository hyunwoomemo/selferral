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
import { revalidateTag } from "next/cache";
import { bottomSheetAtom } from "@/app/store/common";
import { useAtom } from "jotai";
import Image from "next/image";
import { DoorClosed } from "lucide-react";

const Container = ({ exchanges }) => {
  const token = getCookie("token");
  const [file, setFile] = useState(null);
  const router = useRouter();
  const [bottomSheet, setBottomSheet] = useAtom(bottomSheetAtom);
  const [exchange, setExnchange] = useState(null);

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

    console.log("eee", exchange);
    formData.append("exchange_id", exchange);

    try {
      const data = await uploadExcel({ token: token, formData: formData });

      if (data.flag === "ok") {
        setFile(null);
        // window.alert("액셀이 업로드 되었습니다.");
        addToast({ text: "액셀이 업로드 되었습니다." });
        router.push("/admin/user/uid?type=1");
        // router.refresh();
        // revalidateTag("excellist");
        // router.refresh();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleExchange = () => {
    setBottomSheet({
      isVisible: true,
      height: "h-[40%]",
      contents: () => (
        <div className="flex gap-4 p-5">
          {exchanges
            .filter((v) => v.status !== 0)
            .map((v) => {
              return (
                <div
                  onClick={() => {
                    setBottomSheet({ isVisible: false });
                    setExnchange(v.id);
                  }}
                  className="border border-gray-400 p-2 cursor-pointer rounded-lg flex items-center  gap-2"
                  key={v.id}
                >
                  {v.image_thumb && <Image width={40} height={40} src={`http://api.xn--3l2b13oekp.com${v.image_thumb}`} alt="exchangelogo" />}
                  <div className="text-lg font-bold">{v.name}</div>
                </div>
              );
            })}
        </div>
      ),
    });
  };

  return (
    <>
      <div className="p-8 font-bold flex-auto pb-32">
        <h1 className="text-3xl pb-10">액셀 업로드</h1>

        <div className="flex flex-col gap-4">
          {exchange ? (
            <div className="flex gap-2 items-center cursor-pointer" onClick={handleExchange}>
              {exchanges.find((v) => v.id === exchange).image_thumb && (
                <Image width={40} height={40} src={`http://api.xn--3l2b13oekp.com${exchanges.find((v) => v.id === exchange).image_thumb}`} alt="exchangelogo" />
              )}
              <div>{exchanges.find((v) => v.id === exchange).name}</div>
            </div>
          ) : (
            <Button onClick={handleExchange} className="items-start self-start">
              거래소 선택
            </Button>
          )}
          <div>
            <input type="file" onChange={handleFileChange} />
            <Button
              disabled={!file}
              onClick={handleUpload}
              className={cn(buttonVariants({ variant: "outline", size: "lg" }), "w-full max-w-64 text-orange-400 border-orange-400 dark:text-orange-200 dark:border-orange-200")}
            >
              <p className="font-bold">업로드</p>
            </Button>
          </div>
        </div>
        <ExcelList />
      </div>
    </>
  );
};

export default Container;
