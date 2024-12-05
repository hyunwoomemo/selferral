import { getWithdrawal } from "@/actions/user/action";

import { Button, buttonVariants } from "@/components/ui/button";
import Title from "@/components/ui/title";
import { cn } from "@/lib/utils";
import { cookies } from "next/headers";
import Link from "next/link";
import React from "react";
import Container from "./container";

const Page = async ({ searchParams }) => {
  const withdrawal = await getWithdrawal({});
  const exchange_id = searchParams?.exchange_id;

  return <Container withdrawal={withdrawal} exchange_id={exchange_id} />;
};

export default Page;
