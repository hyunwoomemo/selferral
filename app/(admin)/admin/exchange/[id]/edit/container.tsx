"use client";
import { editExchangeForm } from "@/actions/trade/action";
import Input from "@/components/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/useToast";
import { Delete, LucideDelete, Trash2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const keys = ["name", "nameExt", "blog_url", "customer_url", "tag", "image_thumb", "image_big", "status", "order"];

const Container = ({ data, exchangeId }) => {
  const [values, setValues] = useState({});
  const { addToast } = useToast();
  const router = useRouter();
  const [previewUrls, setPreviewUrls] = useState({});

  useEffect(() => {
    const temp = {};

    for (const key in data) {
      if (keys.includes(key)) {
        temp[key] = data[key];
      }
    }

    setValues(temp);
  }, [data]);

  const handleChange = (type, value) => {
    if (!value) return;

    setValues((prev) => ({ ...prev, [type]: value }));

    if (type.includes("image")) {
      const selectedFile = value;
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrls((prev) => ({ ...prev, [type]: reader.result }));
      };

      reader.readAsDataURL(selectedFile);
    }
  };

  const handleEdit = async () => {
    const formData = new FormData();

    for (const key in values) {
      if (values[key]) {
        formData.append(key, values[key]);
      }
    }

    const res = await editExchangeForm({ id: exchangeId, formData });

    if (res.exchange_id) {
      router.push("/admin/exchange/list");
      addToast({ text: "거래소가 수정되었습니다." });
    }
  };

  return (
    <div className="flex gap-2">
      <div className="flex flex-1 flex-col gap-5">
        <Input onChange={(e) => handleChange("name", e.target.value)} value={values.name} label={"거래소명"} />
        <Input onChange={(e) => handleChange("nameExt", e.target.value)} value={values.nameExt} label={"태그"} />
        <Input onChange={(e) => handleChange("order", e.target.value)} value={values.order} label={"순서"} type="number" />
        <Input onChange={(e) => handleChange("blog_url", e.target.value)} value={values.blog_url} label={"블로그 URL"} />
        <Input onChange={(e) => handleChange("customer_url", e.target.value)} value={values.customer_url} label={"고객센터 URL"} />
        <div className="flex gap-2 items-center">
          <Input onChange={(e) => handleChange("image_thumb", e.target.files[0])} label={"로고"} type="file" inputClassname={"max-w-[250px]"} />
          <Trash2
            onClick={() => {
              setPreviewUrls((prev) => {
                const temp = {};
                for (const key in prev) {
                  if (key === "image_thumb") {
                    temp[key] = null;
                  } else {
                    temp[key] = prev[key];
                  }
                }

                return temp;
              });
              setValues((prev) => {
                const temp = {};
                for (const key in prev) {
                  if (key === "image_thumb") {
                    temp[key] = null;
                  } else {
                    temp[key] = prev[key];
                  }
                }

                return temp;
              });
            }}
          />
        </div>
        <div className="flex gap-2 items-center">
          <Input onChange={(e) => handleChange("image_big", e.target.files[0])} label={"사각형 로고"} type="file" inputClassname={"max-w-[250px]"} />
          <Trash2
            onClick={() => {
              setPreviewUrls((prev) => {
                const temp = {};
                for (const key in prev) {
                  if (key === "image_big") {
                    temp[key] = null;
                  } else {
                    temp[key] = prev[key];
                  }
                }

                return temp;
              });
              setValues((prev) => {
                const temp = {};
                for (const key in prev) {
                  if (key === "image_big") {
                    temp[key] = null;
                  } else {
                    temp[key] = prev[key];
                  }
                }

                return temp;
              });
            }}
          />
        </div>

        <div className="mt-auto">
          <Button onClick={handleEdit}>수정</Button>
        </div>
      </div>
      <div className="flex-1 w-full">
        <p>미리 보기</p>
        {values && Object.keys(values).length > 0 && (
          <>
            <div className="flex py-10" onClick={() => router.push(`/exchange/${data.id}`)}>
              <div className="flex items-center flex-1 min-w-full justify-between">
                <div className="flex items-center pl-2">
                  <div className="min-w-[70px]">
                    <div className="relative w-[50px]  h-[50px] flex items-center justify-center">
                      {previewUrls.image_thumb ? (
                        <Image src={previewUrls.image_thumb} width={50} height={50} alt="preview-thumb" />
                      ) : values.image_thumb ? (
                        <Image src={values.image_thumb} width={50} height={50} alt="logo" />
                      ) : undefined}
                    </div>
                  </div>
                  <div>
                    <p className="text-sm md:text-lg">{values.name}</p>
                    <p className="text-gray-400">{values.nameExt}</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="max-w-72 mx-2 flex flex-col rounded-lg   font-bold border border-gray-200 dark:border-gray-600 shadow-2xl" style={{ boxShadow: "rgba(0, 0, 0, 0.35) 0px 3px 20px" }}>
              <div className="min-w-60 h-32  bg-background  rounded-t-md flex justify-center items-center text-black relative overflow-hidden border-b border-gray-200 dark:border-gray-600 bg-black">
                {previewUrls.image_big ? (
                  <Image src={previewUrls.image_big} fill className="object-contain md:object-contain" alt="exchange-image" />
                ) : values.image_big ? (
                  <Image src={values.image_big} fill className="object-contain md:object-contain" alt="exchange-image" />
                ) : undefined}
              </div>
              <div className="py-3 px-2">
                <p className="text-gray-500 dark:text-white">{data.name}</p>
                <div className="flex whitespace-pre">
                  <p className="text-gray-600 dark:text-white font-bold pt-3">수수료 </p>
                  <p className="text-orange-400 font-bold pt-3">{data?.payback?.replace("%", "") && data?.payback?.replace("%", "") != "null" && `${data?.payback?.replace("%", "")}%`}</p>
                  <p className="text-gray-600 dark:text-white font-bold pt-3"> 페이백</p>
                  {data?.discount?.replace("%", "") && data?.discount?.replace("%", "") != "null" && data?.discount?.replace("%", "") != 0 && (
                    <>
                      <p className="font-bold pt-3"> + </p>
                      <p className="text-orange-400 font-bold pt-3">{data?.discount?.replace("%", "") && data?.discount?.replace("%", "") != "null" && `${data?.discount?.replace("%", "")}%`}</p>
                      <p className="text-gray-600 dark:text-white font-bold pt-3"> 할인</p>
                    </>
                  )}
                </div>
                <div className="flex whitespace-pre">
                  {data?.limit_order && data?.limit_order != "null" && (
                    <>
                      <p className="text-gray-400 text-sm  dark:text-gray-400 font-bold pt-3">지정가 </p>
                      <p className="text-gray-400 text-sm dark:text-gray-400 font-bold pt-3">{`${data?.limit_order?.replace("%", "")}%`}</p>
                    </>
                  )}
                  <p className="text-gray-400 text-sm dark:text-gray-400 font-bold pt-3"> 시장가 </p>
                  <p className="text-gray-400 text-sm dark:text-gray-400 font-bold pt-3">{data?.market_order?.replace("%", "")}%</p>
                  {/* <p className="text-gray-900 dark:text-gray-400 font-bold pt-3"> / 1인 평균 환급금 </p>
          <p className="text-orange-400 font-bold pt-3">{Number(data.average_refund).toLocaleString()}</p> */}
                </div>
                <p className="p-1 bg-gray-100 dark:bg-gray-900 my-2 w-fit rounded-sm text-xs">{data.nameExt}</p>
              </div>
            </div>
            <div className="py-5 flex gap-5">
              <Link className="p-1 px-2 rounded-md text-sm bg-orange-50" href={`${values.blog_url}`} target="_blank">
                블로그
              </Link>
              <Link className="p-1 px-2 rounded-md text-sm bg-orange-50" href={`${values.customer_url}`} target="_blank">
                고객센터
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Container;
