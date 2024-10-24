"use client";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useFormState, useFormStatus } from "react-dom";
import { register } from "@/actions/user/action";
import { API_URL } from "@/actions";
import { useEffect, useMemo, useState } from "react";
import { validateJoin } from "@/lib/validate";
import Input from "@/components/input";
import { useToast } from "@/hooks/useToast";
import { redirect, useRouter } from "next/navigation";

export default function Page() {
  const router = useRouter();

  const [values, setValues] = useState({});
  const [error, setError] = useState({});
  const [checkCode, setCheckCode] = useState();
  const [isCheckVisible, setIsCheckVisible] = useState(false);
  const [checkSuccess, setCheckSuccess] = useState(false);

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

  const handleCheckEmail = async (e) => {
    e.preventDefault();
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

  const verfiyDisabled = useMemo(() => {
    return !(!error.email && values?.email?.length > 0);
  }, [values]);

  const handleCheckCode = async (e) => {
    e.preventDefault();
    const formData = new FormData();

    formData.append("code", checkCode);
    formData.append("value", values.code);
    const res = await fetch(`${API_URL}/auth/checkEmailOk`, {
      method: "POST",
      body: formData,
    });

    const data = await res.json();

    if (data.check) {
      addToast({ text: "인증되었습니다." });
      setCheckSuccess(true);
      setIsCheckVisible(false);
    } else {
      addToast({ text: "인증코드가 일치하지 않습니다." });
      setValues((prev) => ({ ...prev, code: "" }));
      setCheckSuccess(false);
    }

    // if (values.code === checkCode) {
    //   addToast({ text: "인증되었습니다." });
    //   setCheckSuccess(true);
    //   setIsCheckVisible(false);
    // } else {
    //   addToast({ text: "인증코드가 일치하지 않습니다." });
    //   setValues((prev) => ({ ...prev, code: "" }));
    //   setCheckSuccess(false);
    // }
  };

  // useEffect(() => {
  //   if (state?.message) {
  //     addToast({ text: state.message });
  //   }
  // }, [state]);

  const handleJoin = async () => {
    const id = values.email;
    const password = values.pw;
    const name = values.name;
    const hp = values.hp;

    if (id === "" || password === "" || name === "" || hp === "") {
      return {
        message: "필수 입력값이 입력되지 않았습니다.",
      };
    }

    const d = new FormData();

    d.append("id", id);
    d.append("password", password);
    d.append("name", name);
    d.append("hp", hp);
    d.append("email_code", checkCode);
    d.append("email_value", values.code);

    const res = await fetch(`${API_URL}/auth/register`, {
      method: "POST",
      body: d,
    });

    const data = await res.json();

    if (data.CODE === "AR000") {
      addToast({ text: "회원가입 완료되었습니다." });
      router.push("/login");
    } else {
      switch (data.CODE) {
        case "AR001":
          addToast({ text: "필수 입력값이 입력되지 않았습니다." });
          break;
        case "AR002":
          addToast({ text: "이미 등록되어있는 아이디입니다." });
          break;
      }
    }
  };

  return (
    <div className="pt-20 font-bold px-4 max-w-[800px] mx-auto">
      <h2 className="text-3xl font-black text-center">회원가입</h2>
      <div className="pt-20">
        {/* <form className="pt-20" onSubmit={handleRegister}> */}
        <div className="p-4">
          <div className="flex items-center gap-2">
            <input
              onChange={(e) => handleChange("email", e.target.value)}
              name="id"
              id="id"
              placeholder="이메일"
              className="p-4 bg-transparent w-full border-b text-lg focus-within:border-orange-400 outline-orange-400"
            />

            {!checkCode ? (
              <Button onClick={(e) => handleCheckEmail(e)} disabled={verfiyDisabled}>
                {"인증코드 전송"}
              </Button>
            ) : (
              <Button onClick={(e) => handleCheckEmail(e)} disabled={verfiyDisabled}>
                {"재전송"}
              </Button>
            )}
          </div>
          {error.email && <p className="text-sm text-orange-400">{error.email}</p>}
          {/* <Input onChange={(e) => handleChange("code", e.target.value)} value={values.code} label={"인증번호"} /> */}

          {isCheckVisible && (
            <div className="py-2 flex gap-1 items-center">
              <input
                onChange={(e) => handleChange("code", e.target.value)}
                value={values.code}
                placeholder="인증코드"
                className="p-4 bg-transparent w-full border-b text-lg focus-within:border-orange-400 outline-orange-400"
              />

              {values.code && (
                <Button onClick={(e) => handleCheckCode(e)} disabled={!values.code} className="">
                  확인
                </Button>
              )}
            </div>
          )}
        </div>
        <div className={cn(checkSuccess ? "" : "opacity-50 pointer-events-none")}>
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
            onClick={() => handleJoin()}
            disabled={Object.keys(error).length > 0 || !values.email || !values.name || !values.pw || !values.pw2 || !values.hp || !checkCode || !checkSuccess}
            className={cn(
              buttonVariants({ size: "lg", variant: "outline" }),
              "w-full  md:min-w-40  my-5 py-5 border border-orange-400 text-orange-400 text-lg dark:border-orange-200 dark:text-orange-200"
            )}
            type="submit"
            name="insert"
            id="insert"
          >
            회원가입
          </Button>
        </div>
      </div>
      <div className="mt-auto flex gap-1 justify-center items-center pt-2">
        <p className="text-gray-400">이미 계정이 있으신가요?</p>
        <Link className="text-orange-400" href={"/login"}>
          로그인
        </Link>
      </div>
    </div>
  );
}
