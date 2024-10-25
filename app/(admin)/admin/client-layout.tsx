"use client";
import { modalAtom } from "@/app/store/modal";
import Modal from "@/components/modal";
import { useAtom } from "jotai";
import React from "react";

const ClientLayout = ({ children }) => {
  const [modal, setModal] = useAtom(modalAtom);

  return (
    <>
      {children}
      <Modal />
    </>
  );
};

export default ClientLayout;
