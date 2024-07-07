import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";

export default function Page() {
  return (
    <div className="pt-20 font-bold px-4 max-w-[800px] mx-auto">
      <h2 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-center">REGISTER</h2>
      <div className="pt-20">
        <div className="p-4">
          <input placeholder="이메일" className="p-4 bg-transparent w-full border-b text-lg focus-within:border-orange-400 outline-orange-400" />
        </div>
        <div className="p-4">
          <input type="password" placeholder="비밀번호" className="p-4 bg-transparent w-full border-b text-lg focus-within:border-orange-400 outline-orange-400" />
        </div>
      </div>
      <div className="flex gap-1 justify-center items-center pt-2">
        <p className="text-gray-400">이미 계정이 있으신가요?</p>
        <Link className="text-orange-400" href={"/register"}>
          로그인
        </Link>
      </div>
      <div className="justify-center items-center flex">
        <Button
          className={cn(
            buttonVariants({ size: "lg", variant: "outline" }),
            "w-full  md:min-w-40  my-5 py-5 border border-orange-400 text-orange-400 text-lg dark:border-orange-200 dark:text-orange-200"
          )}
        >
          회원가입
        </Button>
      </div>
    </div>
  );
}
