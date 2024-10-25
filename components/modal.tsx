"use client";
import { modalAtom } from "@/app/store/modal";
import { cn } from "@/lib/utils";
import { useAtom } from "jotai";
import React, { createContext } from "react";

const Modal = () => {
  const [modal, setModal] = useAtom(modalAtom);

  const ModalTitle = () => {
    return <div className="font-bold">{modal.title || "정말 삭제하시겠습니까?"}</div>;
  };

  const ModalContents = () => {
    return <div className="">{modal.contents && <modal.contents />}</div>;
  };

  const ModalDim = () => {
    return (
      <div
        onClick={() => setModal({ visible: false })}
        className={cn("absolute top-0 left-0 right-0 bottom-0 bg-gray-50 transition-all duration-300", modal.visible ? "opacity-70" : "opacity-0")}
      ></div>
    );
  };

  return (
    <div className={cn("absolute top-0 left-0 right-0 bottom-0 transition-all duration-300", modal.visible ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none ")}>
      <ModalDim />
      <div className="fixed top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] bg-white p-4 min-w-[400px] border rounded-lg">
        <ModalTitle />
        <ModalContents />
      </div>
      ;
    </div>
  );
};

export default Modal;
