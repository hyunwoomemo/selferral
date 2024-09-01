// import { getUsers } from "@/app/action";
import moment from "moment";
import UserType from "./user-type";
import { getAllUser } from "@/actions/user/action";
import Container from "./container";
import { cookies } from "next/headers";

export default async function Page() {
  const users = await getAllUser();
  const token = cookies().get("token");

  return <Container users={users} token={token?.value} />;
}
