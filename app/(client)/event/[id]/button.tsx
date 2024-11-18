"use client";

import { Button } from "@/components/ui/button";
import React from "react";

const EventButton = ({ data }) => {
  return (
    <Button className="ml-auto" onClick={() => window.open(data.link)}>
      이벤트 바로가기
    </Button>
  );
};

export default EventButton;
