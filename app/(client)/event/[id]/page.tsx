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

  console.log("data", data);

  return (
    <div>
      <div className="p-2">
        <div className="flex-1 flex w-full">
          <EventButton data={data} />
        </div>
        <ToastViewer content={data.detail} />
        {/* <Viewer content={data.detail} /> */}
      </div>
    </div>
  );
};

export default page;
