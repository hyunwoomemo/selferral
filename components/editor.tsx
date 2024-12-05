import { editExchangeForm } from "@/actions/trade/action";
import "@toast-ui/editor/dist/toastui-editor.css";

import { Editor } from "@toast-ui/react-editor";
import { useRef } from "react";
import { toast } from "sonner";
import { Button } from "./ui/button";

export const ToastEditor = ({ values, setValues, handleEdit, initialValue }) => {
  const editorRef = useRef();

  const handleChange = async () => {
    const editorInstance = editorRef.current.getInstance();
    const htmlContent = await editorInstance.getHTML(); // HTML 내용 가져오기

    setValues((prev) => ({ ...prev, detail: htmlContent }));
  };

  // const handleSubmit = async () => {
  //   // ref.current를 통해 Editor 인스턴스 접근
  //   const formData = new FormData();

  //   for (const key in values) {
  //     if (values[key]) {
  //       formData.append(key, values[key]);
  //     }
  //   }

  //   const res = await submit(formData);
  //

  //   // if (res.exchange_id) {
  //   //   router.push("/admin/exchange/list");
  //   //   addToast({ text: "거래소가 수정되었습니다." });
  //   // }
  // };

  return (
    <>
      <Editor initialValue={initialValue} previewStyle="vertical" height="600px" initialEditType="markdown" useCommandShortcut={true} onChange={handleChange} ref={editorRef} />
      {/* <button onClick={handleSubmit}>수정</button> */}
    </>
  );
};
