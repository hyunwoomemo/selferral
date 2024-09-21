"use client";

import { editPassword } from "@/actions/user/action";
import Input from "@/components/input";
import { Button } from "@/components/ui/button";
import Title from "@/components/ui/title";
import { useToast } from "@/hooks/useToast";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const Container = ({ token }) => {
  const [values, setValues] = useState({});
  const { addToast } = useToast();
  const router = useRouter();

  const handleChange = (type, value) => {
    setValues((prev) => ({ ...prev, [type]: value }));
  };

  const disabled = !values.pw || !values.newPw || !values.newPw2 || values.newPw !== values.newPw2;

  const handleEditPassword = async () => {
    const data = { password: values.pw, newPassword: values.newPw };
    const res = await editPassword({ token, data });

    console.log("resres", res);
    if (res.CODE === "AL002") {
      addToast({ text: "비밀번호가 유효하지 않습니다." });
    } else {
      if (res.CODE === "AE000") {
        router.back();
        addToast({ text: "비밀번호가 변경되었습니다." });
      }
    }
  };

  return (
    <div className="flex flex-col flex-auto p-2">
      <Title text="비밀번호 변경" />
      <div className="flex flex-col gap-3 py-10">
        <Input type="password" onChange={(e) => handleChange("pw", e.target.value)} value={values.pw} label={"기존 비밀번호"} />
        <Input type="password" onChange={(e) => handleChange("newPw", e.target.value)} value={values.newPw} label={"새로운 비밀번호"} />
        <Input type="password" onChange={(e) => handleChange("newPw2", e.target.value)} value={values.newPw2} label={"비밀번호 확인"} />
      </div>
      <div>
        <Button onClick={handleEditPassword} disabled={disabled} className="w-36">
          변경
        </Button>
      </div>
    </div>
  );
};

export default Container;
