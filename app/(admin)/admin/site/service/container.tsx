"use client";
import { setSiteInfo } from "@/actions/site/action";
import { ToastEditor } from "@/components/editor";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { toast } from "sonner";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css"; // 스타일 불러오기
import { QuillEditor } from "@/components/quill-editor";

const Container = ({ data }) => {
  const [values, setValues] = useState({});
  const router = useRouter();
  const [content, setContent] = useState(data);

  const handleModify = async () => {
    const formData = new FormData();
    formData.append("data", content);
    const res = await setSiteInfo(formData);

    if (res.data === "OK") {
      toast.success("수정되었습니다.");
      router.refresh();
    }
  };

  return (
    <>
      {/* <ToastEditor initialValue={data || ""} values={values} setValues={setValues} /> */}
      <QuillEditor content={content} setContent={setContent} />
      <div style={{ marginTop: 40 }}>
        <Button className="min-w-[80px]" onClick={handleModify}>
          수정
        </Button>
      </div>
    </>
  );
};

export default Container;
