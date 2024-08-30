"use client";
import { addExchange } from "@/app/action";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useFormState, useFormStatus } from "react-dom";

const initialState = {
  message: "",
};

export default function Page() {
  const { pending } = useFormStatus();
  const [state, formAction] = useFormState(addExchange, initialState);
  const router = useRouter();
  const [logoSrc, setLogoSrc] = useState("");
  const [bannerSrc, setBannerSrc] = useState("");

  const [values, setValues] = useState({});

  const encodeFileToBase64 = (type, fileBlob) => {
    const reader = new FileReader();

    reader.readAsDataURL(fileBlob);

    return new Promise((resolve) => {
      reader.onload = () => {
        if (type === "logo") {
          setLogoSrc(reader.result);
        } else {
          setBannerSrc(reader.result);
        }

        resolve();
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = new FormData();

    for (const key in values) {
      form.append(key, values[key]);
    }

    // here /api/upload is the route of my handler
    const res = await fetch("/api/upload", {
      method: "POST",
      body: form,
      headers: {
        // add token
        // content-type will be auto-handled and set to multipart/form-data
      },
    });

    const data = await res.json();

    // we will return the uploaded image URL from the API to the client
    console.log(data);

    if (data.CODE === "EA000") {
      router.back();
      setTimeout(() => {
        router.refresh();
      }, 1000);
    }
  };

  return (
    <div className="rounded-md bg-white dark:bg-[rgb(26,26,38)] w-full h-full flex flex-col justify-center ">
      {/* <form method="post" action={formAction} className=""> */}
      <form onSubmit={handleSubmit} className="">
        <div className="p-4 flex gap-10">
          <label htmlFor="logo" className={`w-20 h-20 flex justify-center items-center font-bold  relative rounded-full  ${logoSrc ? "bg-transparent" : "bg-gray-400 dark:bg-gray-800"}`}>
            {logoSrc ? <Image src={logoSrc} fill objectFit="cover" /> : "로고"}
          </label>
          <label
            htmlFor="banner"
            className={`flex-1 max-w-[200px] h-20 flex justify-center items-center font-bold  relative rounded-md  ${bannerSrc ? "bg-transparent" : "bg-gray-400 dark:bg-gray-800"}`}
          >
            {bannerSrc ? <Image src={bannerSrc} fill objectFit="cover" /> : "배너"}
          </label>
          <input
            id="logo"
            onChange={(e) => {
              setValues((prev) => ({ ...prev, logo: e.target.files[0] }));
              encodeFileToBase64("logo", e.target.files[0]);
            }}
            name="roundImage"
            type="file"
            placeholder="로고"
            className="p-4 bg-transparent w-full border-b text-lg focus-within:border-orange-400 outline-orange-400 hidden"
          />
          <input
            id="banner"
            onChange={(e) => {
              setValues((prev) => ({ ...prev, banner: e.target.files[0] }));
              encodeFileToBase64("banner", e.target.files[0]);
            }}
            name="squareImage"
            type="file"
            placeholder="배너"
            className="p-4 bg-transparent w-full border-b text-lg focus-within:border-orange-400 outline-orange-400 hidden"
          />
        </div>
        <div className="p-4">
          <input
            name="name"
            onChange={(e) => setValues((prev) => ({ ...prev, ["name"]: e.target.value }))}
            placeholder="이름"
            className="p-4 bg-transparent w-full border-b text-lg focus-within:border-orange-400 outline-orange-400"
          />
        </div>
        <div className="p-4 flex ">
          <input
            name="payback"
            onChange={(e) => setValues((prev) => ({ ...prev, ["payback"]: e.target.value }))}
            placeholder="페이백(%)"
            className="p-4 bg-transparent w-full border-b text-lg focus-within:border-orange-400 outline-orange-400"
          />
          <input
            name="discount"
            onChange={(e) => setValues((prev) => ({ ...prev, ["discount"]: e.target.value }))}
            placeholder="할인(%)"
            className="p-4 bg-transparent w-full border-b text-lg focus-within:border-orange-400 outline-orange-400"
          />
        </div>
        <div className="p-4 flex">
          <input
            name="marketOrder"
            onChange={(e) => setValues((prev) => ({ ...prev, ["marketOrder"]: e.target.value }))}
            placeholder="시장가"
            className="p-4 bg-transparent w-full border-b text-lg focus-within:border-orange-400 outline-orange-400"
          />
          <input
            name="limitOrder"
            onChange={(e) => setValues((prev) => ({ ...prev, ["limitOrder"]: e.target.value }))}
            placeholder="지정가"
            className="p-4 bg-transparent w-full border-b text-lg focus-within:border-orange-400 outline-orange-400"
          />
        </div>
        <div className="p-4 flex">
          <input
            name="averageRefund"
            onChange={(e) => setValues((prev) => ({ ...prev, ["averageRefund"]: e.target.value }))}
            placeholder="평균 환급 금액"
            className="p-4 bg-transparent w-full border-b text-lg focus-within:border-orange-400 outline-orange-400"
          />
          <input
            name="tag"
            onChange={(e) => setValues((prev) => ({ ...prev, ["tag"]: e.target.value }))}
            placeholder="태그"
            className="p-4 bg-transparent w-full border-b text-lg focus-within:border-orange-400 outline-orange-400"
          />
        </div>

        {state?.message ? <h3>{state.message}</h3> : null}

        <div className="justify-center items-center flex">
          <Button
            type="submit"
            className={cn(
              buttonVariants({ size: "lg", variant: "outline" }),
              "w-full  md:min-w-40  my-5 py-5 border border-orange-400 text-orange-400 text-lg dark:border-orange-200 dark:text-orange-200"
            )}
          >
            {pending ? "추가 중..." : "추가"}
          </Button>
        </div>
      </form>
    </div>
  );
}
