"use client";

import React, { useEffect, useRef } from "react";
import "@toast-ui/editor/dist/toastui-editor-viewer.css";
import { Viewer } from "@toast-ui/editor";

const ToastViewer = ({ content }) => {
  const viewerRef = useRef(null);

  useEffect(() => {
    if (viewerRef.current) {
      // Viewer 초기화
      new Viewer({
        el: viewerRef.current,
        initialValue: content,
      });
    }
  }, [content]);

  return <div ref={viewerRef}></div>;
};

export default ToastViewer;
