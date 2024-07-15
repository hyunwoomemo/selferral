"use client";
import { addExchange } from "@/app/action";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useFormState, useFormStatus } from "react-dom";

const initialState = {
  message: "",
};

export default function Page() {
  const { pending } = useFormStatus();
  const [state, formAction] = useFormState(addExchange, initialState);

  return (
    <div className="bg-[rgb(26,26,38)] w-full h-full flex flex-col justify-center items-center">
      <form method="post" action={formAction} className="">
        <div className="p-4">
          <input name="name" placeholder="이름" className="p-4 bg-transparent w-full border-b text-lg focus-within:border-orange-400 outline-orange-400" />
        </div>
        <div className="p-4">
          <input name="payback" placeholder="페이백" className="p-4 bg-transparent w-full border-b text-lg focus-within:border-orange-400 outline-orange-400" />
        </div>
        <div className="p-4">
          <input name="discount" placeholder="할인" className="p-4 bg-transparent w-full border-b text-lg focus-within:border-orange-400 outline-orange-400" />
        </div>
        <div className="p-4">
          <input name="marketOrder" placeholder="시장가" className="p-4 bg-transparent w-full border-b text-lg focus-within:border-orange-400 outline-orange-400" />
        </div>
        <div className="p-4">
          <input name="limitOrder" placeholder="지정가" className="p-4 bg-transparent w-full border-b text-lg focus-within:border-orange-400 outline-orange-400" />
        </div>
        <div className="p-4">
          <input name="roundImage" type="file" placeholder="로고" className="p-4 bg-transparent w-full border-b text-lg focus-within:border-orange-400 outline-orange-400" />
        </div>
        {state?.message ? <h3>{state.message}</h3> : null}

        <div className="justify-center items-center flex">
          <Button
            type="submit"
            className={cn(
              buttonVariants({ size: "lg", variant: "outline" }),
              "w-full  md:min-w-40  my-5 py-5 border border-orange-400 text-orange-400 text-lg dark:border-orange-200 dark:text-orange-200"
            )}
          >
            {pending ? "추가 중..." : "추가"}
          </Button>
        </div>
      </form>
    </div>
  );
}
