// import { getUsers } from "@/app/action";
import moment from "moment";

import { getAllUser } from "@/actions/user/action";
import Container from "./container";
import { cookies } from "next/headers";

export default async function Page() {
  const users = await getAllUser();
  const token = cookies().get("token");

  console.log("users", users);

  return <Container users={users.DATA} token={token?.value} />;
}
