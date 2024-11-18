"use client";
import { Viewer } from "@toast-ui/react-editor";

export const ToastViewer = ({ content }) => {
  // const Viewer = dynamic(() => import("@toast-ui/editor"), { ssr: false });

  console.log("ccc", content);

  // useEffect(() => {
  //   // Viewer 초기화
  //   const viewer = new Viewer({
  //     el: document.getElementById("viewer"),
  //     initialValue: content,
  //   });

  //   // return () => {
  //   //   // Viewer를 clean up (필요시)
  //   //   if (viewer) viewer?.destroy();
  //   // };
  // }, [content]);

  return <Viewer initialValue={content} />;
};
