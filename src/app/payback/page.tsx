import React from "react";
import PaybackHeader from "./payback-header";
import PaybackContents from "./payback-contents";
import Header from "@/components/common/Header";

const page = () => {
  return (
    <div>
      <Header />
      <PaybackContents />
    </div>
  );
};

export default page;
