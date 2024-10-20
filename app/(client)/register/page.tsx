"use client";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useFormState, useFormStatus } from "react-dom";
import { register } from "@/actions/user/action";
import { API_URL } from "@/actions";
import { useMemo, useState } from "react";
import { validateJoin } from "@/lib/validate";
import Input from "@/components/input";
import { useToast } from "@/hooks/useToast";

const initialState = {
  message: "",
};

export default function Page() {
  const { pending } = useFormStatus();
  const [state, formAction] = useFormState(register, initialState);

  const [values, setValues] = useState({});
  const [error, setError] = useState({});
  const [checkCode, setCheckCode] = useState();
  const [isCheckVisible, setIsCheckVisible] = useState(false);
  console.log("error", error);
  const { addToast } = useToast();

  const handleChange = (type, value) => {
    if (type === "hp") {
      if (value.length > 11) {
        return;
      } else {
        setValues({ ...values, [type]: value });
      }
    } else {
      setValues({ ...values, [type]: value });
    }
    validateJoin(type, value, values, error, setError);
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

  console.log("eeee", checkCode, values.code);

  const verfiyDisabled = useMemo(() => {
    return !(!error.email && values?.email?.length > 0);
  }, [values]);

  const handleCheckCode = () => {
    if (values.code === checkCode) {
      addToast({ text: "인증되었습니다." });
      setIsCheckVisible(false);
    } else {
      addToast({ text: "인증코드가 일치하지 않습니다." });
      setValues((prev) => ({ ...prev, code: "" }));
    }
  };

  return (
    <div className="pt-20 font-bold px-4 max-w-[800px] mx-auto">
      <h2 className="text-3xl font-black text-center">회원가입</h2>
      <form method="post" action={formAction} className="pt-20">
        {/* <form className="pt-20" onSubmit={handleRegister}> */}
        <div className="p-4">
          <div className="flex items-center gap-1">
            <input
              onChange={(e) => handleChange("email", e.target.value)}
              name="id"
              id="id"
              placeholder="이메일"
              className="p-4 bg-transparent w-full border-b text-lg focus-within:border-orange-400 outline-orange-400"
            />
            {!checkCode && (
              <Button onClick={handleCheckEmail} disabled={verfiyDisabled}>
                {isCheckVisible ? "재전송" : "인증코드 전송"}
              </Button>
            )}
          </div>
          {error.email && <p className="text-sm text-orange-400">{error.email}</p>}
          {/* <Input onChange={(e) => handleChange("code", e.target.value)} value={values.code} label={"인증번호"} /> */}

          {isCheckVisible && (
            <div className="py-2 flex gap-1 items-center">
              <input
                onChange={(e) => handleChange("code", e.target.value)}
                name="id"
                id="id"
                value={values.code}
                placeholder="인증코드"
                className="p-4 bg-transparent w-full border-b text-lg focus-within:border-orange-400 outline-orange-400"
              />

              {values.code && (
                <Button onClick={handleCheckCode} disabled={!values.code} className="">
                  확인
                </Button>
              )}
            </div>
          )}
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
            value={values.hp}
            placeholder="휴대폰 번호"
            type="number"
            className="p-4 bg-transparent w-full border-b text-lg focus-within:border-orange-400 outline-orange-400"
            onChange={(e) => handleChange("hp", e.target.value)}
          />
          <p className="text-gray-400 text-sm">하이픈 (-)없이 숫자만 입력바랍니다.</p>
        </div>
        {/* <div>{state?.message ? <h3 className="badge bg-danger">{state?.message}</h3> : null}</div> */}
        <Button
          disabled={Object.keys(error).length > 0 || !values.email || !values.name || !values.pw || !values.pw2 || !values.hp || !checkCode}
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
