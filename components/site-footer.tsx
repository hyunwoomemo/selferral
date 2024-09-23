"use client";
import { siteConfig } from "@/config/site";
import { Mail } from "lucide-react";
import { Icons } from "./icons";
import { usePathname } from "next/navigation";
import Link from "next/link";

export function SiteFooter() {
  const pathname = usePathname();

  if (pathname.startsWith("/admin")) return;

  return (
    <footer>
      <div className="mb-6 mt-14 flex flex-col items-center">
        <div className="mb-3 flex space-x-4">
          {/* <a target="_blank" rel="noreferrer" href="mailto:hello@example.com">
            <span className="sr-only">Mail</span>
            <Mail className="h-6 w-6" />
          </a> */}
          {/* <a target="_blank" rel="noreferrer" href={siteConfig.links.twitter}>
            <span className="sr-only">Twitter</span>
            <Icons.twitter className="h-6 w-6" />
          </a>
          <a target="_blank" rel="noreferrer" href={siteConfig.links.github}>
            <span className="sr-only">GitHub</span>
            <Icons.gitHub className="h-6 w-6" />
          </a> */}
        </div>
        <div className="mb-2 flex space-x-2 text-sm text-muted-foreground">{siteConfig.copyright}</div>
        <div className="mb-2 flex space-x-2 text-sm text-muted-foreground">
          {/* <a href={siteConfig.links.personalSite} target="_blank">
            {siteConfig.author}
          </a> */}
          <div>상호명 : 주식회사 씨씨씨그룹 (CCC Group)</div>
          <div>|</div>
          <div>사업자번호 : 296-81-03378</div>
          <div>|</div>
          <div>주소 : 서울특별시 강남구 언주로 331,6층 601호 (역삼동, 안산빌딩)</div>
          <div>|</div>
          <Link href={"mailto:ccc_33@naver.com"}>이메일 : ccc_33@naver.com</Link>
        </div>
        <div className="mb-2 flex space-x-2 text-sm text-muted-foreground">
          {/* <a href={siteConfig.links.personalSite} target="_blank">
            {siteConfig.author}
          </a> */}
          <Link className="underline" href={"/doc/terms"}>
            셀퍼럴 약관
          </Link>
          <Link className="underline" href={"/doc/privacy"}>
            개인정보처리방침
          </Link>
        </div>
      </div>
    </footer>
  );
}
