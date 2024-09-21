import { cookies } from "next/headers";
import React from "react";
import Container from "./container";

const page = async () => {
  const token = cookies().get("token");

  return (
    <>
      <Container token={token?.value} />
    </>
  );
};

export default page;
