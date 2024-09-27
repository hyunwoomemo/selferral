"use client";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useFormState, useFormStatus } from "react-dom";
// import { info, login } from "../../action";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAtom } from "jotai";
import { userAtom } from "../../store/user";
import { getInfo, login } from "@/actions/user/action";
import { deleteCookie, setCookie } from "cookies-next";
import { useToast } from "@/hooks/useToast";
const initialState = {
  message: "",
};

export default function Page({ searchParams }) {
  const { pending } = useFormStatus();
  const [state, formAction] = useFormState(login, initialState);
  const [user, setUser] = useAtom(userAtom);
  const router = useRouter();
  const { addToast, loadingToast } = useToast();

  useEffect(() => {
    if (searchParams && searchParams.type === "expire") {
      addToast({ text: "로그인이 만료되었습니다." });
    }
  }, [searchParams]);

  useEffect(() => {
    if (state.CODE && state.CODE === "AL000") {
      setCookie("token", state.TOKEN.accessToken);
      setCookie("refresh", state.TOKEN.refreshToken);
      getInfo(state.TOKEN.accessToken, state.TOKEN.refreshToken).then((res) => {
        console.log("res", res);
        if (res.CODE === "AI000") {
          // addToast({ text: "로그인에 성공했습니다." });
          setUser(res.DATA);
          if (searchParams && searchParams.callback) {
            router.push(`${searchParams.callback}`);
          }
        } else {
          if (res.CODE === "AC001") {
            // addToast({ text: "로그인이 만료되었습니다." });
            setCookie("token", "");
            setUser({});
          }
        }
      });
      router.push("/");
    } else {
      if (state.CODE && state.CODE === "AL002") {
        addToast({ text: "일치하는 회원정보가 없습니다." });
      }
    }
  }, [state]);

  useEffect(() => {
    setUser({});
  }, []);

  return (
    <div className="pt-20 font-bold px-4 max-w-[800px] mx-auto">
      <h2 className="text-3xl text-center">로그인</h2>
      {/* <form method="post"  className="pt-20"> */}
      <form method="post" action={formAction} className="pt-20">
        <div className="p-4">
          <input name="email" placeholder="이메일" className="p-4 bg-transparent w-full border-b text-lg focus-within:border-orange-400 outline-orange-400" />
        </div>
        <div className="p-4">
          <input name="password" type="password" placeholder="비밀번호" className="p-4 bg-transparent w-full border-b text-lg focus-within:border-orange-400 outline-orange-400" />
        </div>
        {/* {state?.message ? <h3>{state.message}</h3> : null} */}

        <div className="justify-center items-center flex">
          <Button
            type="submit"
            className={cn(
              buttonVariants({ size: "lg", variant: "outline" }),
              "w-full  md:min-w-40  my-5 py-5 border border-orange-400 text-orange-400 text-lg dark:border-orange-200 dark:text-orange-200"
            )}
          >
            {pending ? "로그인 중..." : "로그인"}
          </Button>
        </div>
      </form>
      <div className="flex gap-1 justify-center items-center pt-2">
        <p className="text-gray-400">아직 계정이 없으신가요?</p>
        <Link className="text-orange-400" href={"/register"}>
          가입하기
        </Link>
      </div>
    </div>
  );
}
