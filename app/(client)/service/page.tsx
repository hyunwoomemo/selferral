import { getClientServiceInfo } from "@/actions/site/action";
import { ToastViewer } from "@/components/toast-viewer";
import { Button } from "@/components/ui/button";
import Title from "@/components/ui/title";
import Image from "next/image";
import Link from "next/link";
import "react-quill/dist/quill.snow.css"; // 스타일 불러오기

export default async function Page() {
  const data = await getClientServiceInfo();

  if (!data) return;

  return (
    <div className="p-4 flex flex-col  flex-auto ql-editor">
      {/* <ToastViewer content={(data && data?.info?.service_info) || ""} /> */}
      <div dangerouslySetInnerHTML={{ __html: data?.info?.service_info }}></div>
    </div>
  );
}
