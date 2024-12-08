import React from "react";
import Container from "./container";
import { fetchWithAuth } from "@/lib/fetchWithAuth";
import { getAdminServiceInfo, getServiceInfo } from "@/actions/site/action";

const page = async () => {
  const data = await getAdminServiceInfo();

  // return <Container data={data.data.data.service_info} />;

  return (
    <div className="p-8  flex-auto pb-32">
      {/* 테이블 */}
      <h1 className="text-3xl pb-4">서비스 소개 수정</h1>

      <Container data={data.data.data.service_info} />
    </div>
  );
};

export default page;
