"use client";
import { API_URL } from "@/actions";
import { findUser } from "@/actions/user/action";
import Input from "@/components/input";
import { Button, buttonVariants } from "@/components/ui/button";
import { useToast } from "@/hooks/useToast";
import { cn } from "@/lib/utils";
import { validateJoin } from "@/lib/validate";
import Link from "next/link";
import React, { useMemo, useState } from "react";

const Page = () => {
  const [values, setValues] = useState({});
  const [result, setResult] = useState();
  const [error, setError] = useState({});
  const [checkCode, setCheckCode] = useState();
  const [isCheckVisible, setIsCheckVisible] = useState(false);
  const [newPassword, setNewPassword] = useState();

  const { addToast } = useToast();
  const handleChange = (type, value) => {
    setValues((prev) => ({ ...prev, [type]: value }));
    validateJoin(type, value, values, error, setError);
  };

  const verfiyDisabled = useMemo(() => {
    return !(!error.email && values?.email?.length > 0);
  }, [values]);
  const submitDisabled = useMemo(() => {
    return !values.email || !values.code;
  }, [values]);

  const handleCheckCode = async () => {
    if (values.code === checkCode) {
      addToast({ text: "인증되었습니다." });
      setIsCheckVisible(false);

      const formData = new FormData();

      formData.append("email", values.email);

      const res = await fetch(`${API_URL}/auth/resetPassword`, {
        method: "POST",
        body: formData,
      });

      const result = await res.json();

      setResult(result.DATA);
    } else {
      addToast({ text: "인증코드가 일치하지 않습니다." });
      setValues((prev) => ({ ...prev, code: "" }));
    }
  };

  const handleCheckEmail = async () => {
    setIsCheckVisible(true);
    setValues((prev) => ({ ...prev, code: "" }));

    const formData = new FormData();

    formData.append("email", values.email);

    const res = await fetch(`${API_URL}/auth/checkEmail`, {
      method: "POST",
      body: formData,
    });

    const data = await res.json();

    setCheckCode(data.CODE);
  };

  return (
    <div className="p-4">
      <div className="flex flex-col items-center pt-10">
        <p className="text-xl font-bold">{result ? "비밀번호 찾기 결과 " : "비밀번호 찾기"}</p>
        <div className="pt-10 flex flex-col gap-4">
          {!result ? (
            <>
              <div className="flex gap-1">
                <Input onChange={(e) => handleChange("email", e.target.value)} value={values.email} label={"이메일"} />
                {/* {!checkCode && ( */}
                <Button onClick={handleCheckEmail} disabled={verfiyDisabled}>
                  {isCheckVisible ? "재전송" : "인증코드 전송"}
                </Button>
                {/* )} */}
              </div>
              {error.email && <p className="text-sm text-orange-400">{error.email}</p>}
              {/* <Input onChange={(e) => handleChange("code", e.target.value)} value={values.code} label={"인증번호"} /> */}

              {isCheckVisible && (
                <div className="py-2 flex gap-1 items-center">
                  <Input onChange={(e) => handleChange("code", e.target.value)} value={values.code} label={"인증코드"} type="" />

                  {values.code && (
                    <Button onClick={handleCheckCode} disabled={submitDisabled} className="">
                      확인
                    </Button>
                  )}
                </div>
              )}
            </>
          ) : (
            <>
              {/* <Input value={result.DATA} label={"이메일"} /> */}
              <div className="flex gap-1">
                <p>임시 비밀번호</p>
                <p className="font-bold px-4">{result}</p>
              </div>
              <div className="flex gap-2">
                <Link href={"/login"} disabled={submitDisabled} className={cn("mt-5", buttonVariants())}>
                  로그인
                </Link>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Page;
