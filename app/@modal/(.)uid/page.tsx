import React, { useCallback, useEffect, useMemo, useState } from "react";
import Container from "./container";
import { getInfo, getUser } from "@/actions/user/action";

const Page = async () => {
  const user = await getInfo();

  console.log("user", user);

  return <Container user={user?.DATA} />;
};

export default Page;
