import { Ban } from "lucide-react";
import Sidebar from "./1sidebar";
import Link from "next/link";
import { getUidRegisterStatus } from "@/actions/trade/action";
import { cookies } from "next/headers";
import Modal from "@/components/modal";
import ClientLayout from "./client-layout";
import AppSidebar from "./app-sidebar";
import NextTopLoader from "nextjs-toploader";
import { Toaster } from "sonner";

export default async function Layout({ children, modal }: { children: React.ReactNode; modal: React.ReactNode }) {
  return (
    <AppSidebar>
      <Toaster />
      {/* <div className="sm: hidden md:block">
        <div className="md:hidden">햄버거</div>
        <div className="flex-1 flex">
          <div className="flex-[4] p-0 flex">
            <ClientLayout>{children}</ClientLayout>
          </div>
          {modal}
        </div>
      </div>
      <div className="flex md:hidden justify-center items-center w-screen h-screen p-4">
        <Link href={"/"} className="absolute top-5 left-5 font-bold text-orange-600">
          홈화면으로 가기
        </Link>
        <div className="flex flex-col items-center gap-10 font-bold">
          <h2 className="text-3xl">관리자 페이지는 768px 이하의 모바일 화면은 지원하지 않습니다.</h2>
          <Ban color="orange" size={60} />
          <h2 className="text-2xl">PC에서 접속바랍니다.</h2>
        </div>
      </div> */}
      {children}
    </AppSidebar>
  );
}
