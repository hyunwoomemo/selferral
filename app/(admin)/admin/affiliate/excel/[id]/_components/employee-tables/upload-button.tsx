"use client";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Plus } from "lucide-react";
import React from "react";

const UploadButton = () => {
  return (
    <div className={cn(buttonVariants({ variant: "default" }))}>
      <input type="file" className="hidden" id="file" />
      <label htmlFor="file">
        <Plus className="mr-2 h-4 w-4" /> Add New
      </label>
    </div>
  );
};

export default UploadButton;
