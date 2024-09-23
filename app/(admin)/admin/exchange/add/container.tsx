"use client";
import { editExchangeForm, editLinksForm } from "@/actions/trade/action";
import Input from "@/components/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/useToast";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const Container = ({}) => {
  const [values, setValues] = useState({ status: 1 });
  const { addToast } = useToast();
  const router = useRouter();
  const [previewUrls, setPreviewUrls] = useState({});

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

  console.log("values", values);

  const handleEdit = async () => {
    const formData = new FormData();

    for (const key in values) {
      if (values[key]) {
        formData.append(key, values[key]);
      }
    }

    console.log("vvvv", values);

    const linkData = new FormData();

    linkData.append("status", 1);

    const res = await editExchangeForm({ id: 0, formData });
    const res1 = await editLinksForm({ id: res.exchange_id, linkId: 0, formData: linkData });
    console.log("vvvvvv", res, res1);

    if (res.exchange_id && res1.link_id) {
      router.push("/admin/exchange/list");
      addToast({ text: "거래소가 추가되었습니다." });
    }
  };

  return (
    <div className="flex gap-2">
      <div className="flex flex-col gap-5">
        <Input onChange={(e) => handleChange("name", e.target.value)} value={values.name} label={"거래소명"} />
        <Input onChange={(e) => handleChange("nameExt", e.target.value)} value={values.nameExt} label={"태그"} />
        <Input onChange={(e) => handleChange("order", e.target.value)} value={values.order} label={"순서"} type="number" />
        <Input onChange={(e) => handleChange("blog_url", e.target.value)} value={values.blog_url} label={"블로그 URL"} />
        <Input onChange={(e) => handleChange("customer_url", e.target.value)} value={values.customer_url} label={"고객센터 URL"} />
        <Input onChange={(e) => handleChange("image_thumb", e.target.files[0])} label={"로고"} type="file" />
        <Input onChange={(e) => handleChange("image_big", e.target.files[0])} label={"사각형 로고"} type="file" />

        <div className="mt-auto">
          <Button onClick={handleEdit}>추가</Button>
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
                        <Image src={previewUrls.image_thumb} width={50} height={50} alt="exchange-logo" />
                      ) : values.image_thumb ? (
                        <Image src={values.image_thumb} width={50} height={50} alt="exchange-logo" />
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
                <p className="text-gray-500 dark:text-white">{values.name}</p>

                <p className="p-1 bg-gray-100 dark:bg-gray-900 my-2 w-fit rounded-sm text-xs">{values.nameExt}</p>
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
