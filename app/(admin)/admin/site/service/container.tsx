"use client";
import { setSiteInfo } from "@/actions/site/action";
import { ToastEditor } from "@/components/editor";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { toast } from "sonner";

const Container = ({ data }) => {
  const [values, setValues] = useState({});
  const router = useRouter();

  console.log("vvv", values);

  const handleModify = async () => {
    console.log("vvv123", values.detail);
    const formData = new FormData();
    formData.append("data", values.detail);
    const res = await setSiteInfo(formData);
    console.log("handleModify", res, res.data);

    if (res.data === "OK") {
      toast.success("수정되었습니다.");
      router.refresh();
    }
  };

  return (
    <>
      <ToastEditor initialValue={data || ""} values={values} setValues={setValues} />
      <div style={{ marginTop: 40 }}>
        <Button className="min-w-[80px]" onClick={handleModify}>
          수정
        </Button>
      </div>
    </>
  );
};

export default Container;
