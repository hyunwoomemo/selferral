import { getAdminBanner } from "@/actions/site/action";
import { cookies } from "next/headers";
import React from "react";
import Container from "./container";

const Page = async ({ params }) => {
  const token = cookies().get("token");

  const banners = await getAdminBanner({ type: "all", token: token.value });

  const banner = await banners.data.list.find((v) => v.id == params.id);
  console.log("bbb", banner);

  return (
    <div className="font-bold flex-auto flex-col p-8 flex">
      <h1 className="text-3xl">{banner.title}</h1>
      <Container token={token.value} banner={banner} />
    </div>
  );
};

export default Page;
