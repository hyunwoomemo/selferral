"use client";
import { findUser } from "@/actions/user/action";
import Input from "@/components/input";
import { Button, buttonVariants } from "@/components/ui/button";
import { useToast } from "@/hooks/useToast";
import { cn } from "@/lib/utils";
import { validateJoin } from "@/lib/validate";
import Link from "next/link";
import React, { useMemo, useState } from "react";

const page = () => {
  const [values, setValues] = useState({});
  const [result, setResult] = useState();
  const { addToast } = useToast();
  const handleChange = (type, value) => {
    if (type === "hp") {
      if (value.length > 11) {
        return;
      } else {
        setValues((prev) => ({ ...prev, [type]: value }));
      }
    } else {
      setValues((prev) => ({ ...prev, [type]: value }));
    }
  };

  const submitDisabled = useMemo(() => {
    return !values.name || !values.hp;
  }, [values]);

  const handleSubmit = async () => {
    const res = await findUser({ type: "id", data: values });
    console.log("rrr", res);

    if (res.CODE === "AFI000") {
      setResult(res);
    } else {
      addToast({ text: "존재하지 않는 유저 정보입니다." });
    }
  };

  return (
    <div className="p-4">
      <div className="flex flex-col items-center pt-10">
        <p className="text-xl font-bold">{result ? "아이디 찾기 결과 " : "아이디 찾기"}</p>
        <div className="pt-10 flex flex-col gap-4">
          {!result ? (
            <>
              <Input onChange={(e) => handleChange("name", e.target.value)} value={values.name} label={"이름"} />
              <Input onChange={(e) => handleChange("hp", e.target.value)} value={values.hp} label={"핸드폰 번호"} type="number" />
              <Button onClick={handleSubmit} disabled={submitDisabled} className="mt-5">
                확인
              </Button>
            </>
          ) : (
            <>
              {/* <Input value={result.DATA} label={"이메일"} /> */}
              <div className="flex gap-1">
                <p>이메일</p>
                <p className="font-bold px-4">{result.DATA}</p>
              </div>
              <div className="flex gap-2">
                <Link href={"/findpw"} disabled={submitDisabled} className={cn("mt-5", buttonVariants())}>
                  비밀번호 찾기
                </Link>
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

export default page;
