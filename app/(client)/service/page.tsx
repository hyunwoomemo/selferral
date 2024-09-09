import { Button } from "@/components/ui/button";
import Title from "@/components/ui/title";
import Image from "next/image";
import Link from "next/link";

export default async function Page() {
  const Head = ({ children }) => {
    return <h1 className="text-lg md:text-xl font-bold py-10 text-gray-800 dark:text-gray-200">{children}</h1>;
  };

  const Contents = ({ children, className }: { children: React.ReactNode; className?: string }) => {
    return <p className={`md:text-lg font-bold text-gray-600 dark:text-gray-400 leading-8 ${className}`}>{children}</p>;
  };

  return (
    <div className="p-4 flex flex-col  flex-auto">
      <Title text={"서비스 소개"} buttons={undefined} />
      {/* <div className="text-3xl font-bold">서비스 소개</div> */}

      <div className="flex-auto  rounded-md p-5 bg-white dark:bg-gray-950 my-5">
        <Head>거래 수수료를 이제는 페이백으로 돌려받으세요! </Head>
        <div className="flex flex-col-reverse md:flex-row gap-10 justify-between">
          <Contents className="flex-1 whitespace-pre-line">
            {`셀퍼럴닷컴은 거래소에서 발생하는 수수료를 회원들에게 되돌려주는 혁신적인 플랫폼입니다. 
            이제 거래하면서 수수료 부담을 줄이고, 페이백 혜택을 누리세요!`}
          </Contents>
          <div className="flex-1 max-w-[300px]">
            <Image alt="logo" src={require("../../logo.png")} className="object-cover" />
          </div>
        </div>
        <Head>셀퍼럴 이 뭔가요??</Head>
        <Contents>셀퍼럴이란 레퍼럴 과 셀프 의 약자로, 기존의 방식인 인플루언서를 통해 가입을 하게 되면, 내가 거래해서 발생된 수수료의 일부분이 인플루언서에게 커미션으로 제공되지만,</Contents>
        <Contents>셀퍼럴닷컴은 저희를 통해 가입하게되면 거래해서 발생된 수수료의 일부분을 전부 다 고객님들에게 페이백 해드리고 있습니다.</Contents>

        <div>
          <Image src={require("../../service1.jpg")} className="object-cover" alt="service1" />
        </div>

        <Head>하는방법도 어렵지 않아요! 3분이면 완료!</Head>
        <div className="flex flex-wrap justify-between">
          <div className="">
            <Contents>1. 셀퍼럴닷컴 전용 거래소 회원가입 및 트레이딩</Contents>
            <div>
              <Image src={require("../../service2.jpg")} className="object-cover" alt="service2" />
            </div>
          </div>

          <div>
            <Contents>2. 셀퍼럴닷컴에서 리워드 출금신청</Contents>
            <div>
              <Image src={require("../../service3.jpg")} className="object-cover" alt="service3" />
            </div>
          </div>

          <div>
            <Contents>3. 페이백 완료! </Contents>
            <div>
              <Image src={require("../../service4.jpg")} className="object-cover" alt="service4" />
            </div>
          </div>
        </div>

        <Head>자, 그러면 서비스를 이용하려면 어떻게 해야하나요??</Head>
        <Contents>셀퍼럴닷컴 홈페이지 메인에 있는 추천거래소들을 통해 입맛에 맞는 거래소를 선택후 가입, 홈페이지 메인에 있는 UID입력창에 UID 입력 후 거래소완 연동하시면 완료됩니다!</Contents>
        {/* <Head>셀퍼럴닷컴 추천 거래소 둘러보기 시작!</Head> */}
        {/* <Contents className="text-orange-400 font-bold pt-10">그래서 페이백을 받으려면 어떻게 해야 하나요?</Contents> */}
        <Link href={"/exchange"} className="flex py-10 justify-center">
          <Button>추천 거래소 둘러보기</Button>
        </Link>
      </div>
    </div>
  );
}
