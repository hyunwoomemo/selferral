import { getBanners } from "@/actions/common/action";
// import { ToastViewer } from "@/components/toast-viewer";
import { Button } from "@/components/ui/button";
import React from "react";
import { ToastViewer } from "@/components/toast-viewer";
import "@toast-ui/editor/dist/toastui-editor-viewer.css";
import EventButton from "./button";

const page = async ({ params }) => {
  const banners = await getBanners();
  const id = params.id;

  const data = banners.event.find((v) => v.id == id);

  return (
    <div>
      <div className="p-2 ql-editor">
        <div className="flex-1 flex w-full">
          <EventButton data={data} />
        </div>
        {/* <ToastViewer content={data.detail} /> */}
        <div dangerouslySetInnerHTML={{ __html: data?.detail }}></div>

        {/* <Viewer content={data.detail} /> */}
      </div>
    </div>
  );
};

export default page;
