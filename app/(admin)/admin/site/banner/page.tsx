import { getAdminBanner } from "@/actions/site/action";
import { cookies } from "next/headers";
import Tab from "@/components/tab";
import Container from "./container";
import AddBtn from "./add-btn";

export default async function Page() {
  // 관리자 배너 리스트 : /affiliate/banner/:banner_type/:rownum/:page
  // banner_type = all 은 모두

  // 관리자 배너 추가 :  /affiliate/banner/:banner_type/:banner_id
  // title, memo, status [1 active, 2 close] , order, starttime [2024-09-15 00:00:00], endtime,  banner_image 배너 이미지, banner_id 0 신규, banner_type 은 자유임 사용자 화면에 구역별로 입력요망

  // 사용자 배너 : /auth/banners

  const banners = await getAdminBanner({ type: "all" });
  console.log("banners", banners.data);

  return (
    <div className="font-bold flex-auto flex-col p-8 flex">
      <h1 className="text-3xl">배너</h1>
      <Container banners={banners} />
      <AddBtn />
    </div>
  );
}
