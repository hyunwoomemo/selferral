"use client";
import { addExchange } from "@/app/action";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
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

  const [values, setValues] = useState({});

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
    <div className="bg-[rgb(26,26,38)] w-full h-full flex flex-col justify-center items-center">
      {/* <form method="post" action={formAction} className=""> */}
      <form onSubmit={handleSubmit} className="">
        <div className="p-4">
          <input
            name="name"
            onChange={(e) => setValues((prev) => ({ ...prev, ["name"]: e.target.value }))}
            placeholder="이름"
            className="p-4 bg-transparent w-full border-b text-lg focus-within:border-orange-400 outline-orange-400"
          />
        </div>
        <div className="p-4">
          <input
            name="payback"
            onChange={(e) => setValues((prev) => ({ ...prev, ["payback"]: e.target.value }))}
            placeholder="페이백"
            className="p-4 bg-transparent w-full border-b text-lg focus-within:border-orange-400 outline-orange-400"
          />
        </div>
        <div className="p-4">
          <input
            name="discount"
            onChange={(e) => setValues((prev) => ({ ...prev, ["discount"]: e.target.value }))}
            placeholder="할인"
            className="p-4 bg-transparent w-full border-b text-lg focus-within:border-orange-400 outline-orange-400"
          />
        </div>
        <div className="p-4">
          <input
            name="marketOrder"
            onChange={(e) => setValues((prev) => ({ ...prev, ["marketOrder"]: e.target.value }))}
            placeholder="시장가"
            className="p-4 bg-transparent w-full border-b text-lg focus-within:border-orange-400 outline-orange-400"
          />
        </div>
        <div className="p-4">
          <input
            name="limitOrder"
            onChange={(e) => setValues((prev) => ({ ...prev, ["limitOrder"]: e.target.value }))}
            placeholder="지정가"
            className="p-4 bg-transparent w-full border-b text-lg focus-within:border-orange-400 outline-orange-400"
          />
        </div>
        <div className="p-4">
          <input
            // onChange={async (e) => {
            //   if (e.target.files) {
            //     const formData = new FormData();
            //     Object.values(e.target.files).forEach((file) => {
            //       formData.append("file", file);
            //     });

            //     const response = await fetch("/api/upload", {
            //       method: "POST",
            //       body: formData,
            //     });

            //     const result = await response.json();
            //     if (result.success) {
            //       alert("Upload ok : " + result.name);
            //     } else {
            //       alert("Upload failed");
            //     }
            //   }
            // }}
            onChange={(e) => setValues((prev) => ({ ...prev, file: e.target.files[0] }))}
            name="roundImage"
            type="file"
            placeholder="로고"
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
