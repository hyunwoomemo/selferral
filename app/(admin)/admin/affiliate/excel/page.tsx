import React from "react";
import Container from "./container";
import { getExcel } from "@/actions/trade/action";

const page = async ({ params }) => {
  const excel = await getExcel({ num: 10, page: params?.page || 1 });

  console.log("excel", excel);

  return <Container />;
};

export default page;
