"use client";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useFormState, useFormStatus } from "react-dom";
import { register } from "@/actions/user/action";
import { API_URL } from "@/actions";
import { useState } from "react";
import { validateJoin } from "@/lib/validate";

const initialState = {
  message: "",
};

export default function Page() {
  const { pending } = useFormStatus();
  const [state, formAction] = useFormState(register, initialState);

  const [values, setValues] = useState({});
  const [error, setError] = useState({});

  console.log("error", error);

  const handleChange = (type, value) => {
    setValues({ ...values, [type]: value });
    validateJoin(type, value, values, error, setError);
  };

  return (
    <div className="pt-20 font-bold px-4 max-w-[800px] mx-auto">
      <h2 className="text-3xl font-black text-center">회원가입</h2>
      <form method="post" action={formAction} className="pt-20">
        {/* <form className="pt-20" onSubmit={handleRegister}> */}
        <div className="p-4">
          <input
            onChange={(e) => handleChange("email", e.target.value)}
            name="id"
            id="id"
            placeholder="이메일"
            className="p-4 bg-transparent w-full border-b text-lg focus-within:border-orange-400 outline-orange-400"
          />
          {/* <p className="text-orange-400 text-sm">올바른 이메일 형식이 아닙니다.</p> */}
          {error.email && <p className="text-sm text-orange-400">{error.email}</p>}
        </div>
        <div className="p-4">
          <input
            name="password"
            id="password"
            type="password"
            placeholder="비밀번호"
            className="p-4 bg-transparent w-full border-b text-lg focus-within:border-orange-400 outline-orange-400"
            onChange={(e) => handleChange("pw", e.target.value)}
          />
        </div>
        <div className="p-4">
          <input
            name="password"
            id="password"
            type="password"
            placeholder="비밀번호 확인"
            className="p-4 bg-transparent w-full border-b text-lg focus-within:border-orange-400 outline-orange-400"
            onChange={(e) => handleChange("pw2", e.target.value)}
          />
          {error.pw2 && <p className="text-sm text-orange-400">{error.pw2}</p>}
        </div>
        <div className="p-4">
          <input
            name="name"
            id="name"
            placeholder="이름"
            className="p-4 bg-transparent w-full border-b text-lg focus-within:border-orange-400 outline-orange-400"
            onChange={(e) => handleChange("name", e.target.value)}
          />
        </div>
        <div className="p-4">
          <input
            name="hp"
            id="hp"
            placeholder="휴대폰 번호"
            className="p-4 bg-transparent w-full border-b text-lg focus-within:border-orange-400 outline-orange-400"
            onChange={(e) => handleChange("hp", e.target.value)}
          />
        </div>
        <div>{state?.message ? <h3 className="badge bg-danger">{state?.message}</h3> : null}</div>
        <Button
          disabled={Object.keys(error).length > 0 || !values.email || !values.name || !values.pw || !values.pw2 || !values.hp}
          className={cn(
            buttonVariants({ size: "lg", variant: "outline" }),
            "w-full  md:min-w-40  my-5 py-5 border border-orange-400 text-orange-400 text-lg dark:border-orange-200 dark:text-orange-200"
          )}
          type="submit"
          name="insert"
          id="insert"
        >
          {pending ? "회원가입 처리 중.." : "회원가입"}
        </Button>
      </form>
      <div className="flex gap-1 justify-center items-center pt-2">
        <p className="text-gray-400">이미 계정이 있으신가요?</p>
        <Link className="text-orange-400" href={"/login"}>
          로그인
        </Link>
      </div>
    </div>
  );
}
