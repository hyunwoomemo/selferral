import React, { useCallback, useEffect, useMemo, useState } from "react";
import Container from "./container";
import { getInfo, getUser } from "@/actions/user/action";
import { getExchange } from "@/actions/trade/action";

const Page = async ({ params, searchParams }) => {
  const user = await getInfo();
  const exchangeName = await getExchange(searchParams.exchange);

  return <Container user={user?.DATA} exchangeName={exchangeName.name} />;
};

export default Page;
