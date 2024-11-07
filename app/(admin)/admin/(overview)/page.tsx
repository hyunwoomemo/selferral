import { getAllUser } from "@/actions/user/action";
import OverViewPage from "./_components/overview";

export const metadata = {
  title: "Dashboard : Overview",
};

export default async function page() {
  const user = await getAllUser();

  return <OverViewPage user={user} />;
}
