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

const initialState = {
  message: "",
};

export default function Page() {
  const { pending } = useFormStatus();
  // const [state, formAction] = useFormState(login, initialState);
  const [user, setUser] = useAtom(userAtom);
  const router = useRouter();

  // useEffect(() => {
  //   if (state.CODE && state.CODE === "AL000") {
  //     console.log(state);
  //     // setUser(state.DATA);
  //     setUser(state.DATA);

  //     info();

  //     router.push("/");
  //   }
  // }, [state]);

  // useEffect(() => {
  //   setUser({});
  // }, []);

  return null;
  // <div className="pt-20 font-bold px-4 max-w-[800px] mx-auto">
  //   <h2 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-center">LOGIN</h2>
  //   <form method="post" action={formAction} className="pt-20">
  //     <div className="p-4">
  //       <input name="email" placeholder="이메일" className="p-4 bg-transparent w-full border-b text-lg focus-within:border-orange-400 outline-orange-400" />
  //     </div>
  //     <div className="p-4">
  //       <input name="password" type="password" placeholder="비밀번호" className="p-4 bg-transparent w-full border-b text-lg focus-within:border-orange-400 outline-orange-400" />
  //     </div>
  //     {state?.message ? <h3>{state.message}</h3> : null}

  //     <div className="justify-center items-center flex">
  //       <Button
  //         type="submit"
  //         className={cn(
  //           buttonVariants({ size: "lg", variant: "outline" }),
  //           "w-full  md:min-w-40  my-5 py-5 border border-orange-400 text-orange-400 text-lg dark:border-orange-200 dark:text-orange-200"
  //         )}
  //       >
  //         {pending ? "로그인 중..." : "로그인"}
  //       </Button>
  //     </div>
  //   </form>
  //   <div className="flex gap-1 justify-center items-center pt-2">
  //     <p className="text-gray-400">아직 계정이 없으신가요?</p>
  //     <Link className="text-orange-400" href={"/register"}>
  //       가입하기
  //     </Link>
  //   </div>
  // </div>
}
