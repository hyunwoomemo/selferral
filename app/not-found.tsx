import Link from "next/link";

export default function NotFound() {
  return (
    <div className="p-10">
      <h2 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-center">서비스 준비 중입니다</h2>
      <Link href="/" className="flex justify-center pt-20 text-lg text-blue-400 font-bold">
        홈으로 가기
      </Link>
    </div>
  );
}
