import { Button } from "@/components/ui/button";
import Modal from "@/components/ui/modal";
import TypeButton from "./button";
import ButtonWrapper from "./button-wrapper";
import { getAllUser, getUser } from "@/actions/user/action";

export default async function Page({ searchParams }) {
  // console.log("props", searchParams);

  const data = await getUser(searchParams.id);

  console.log("ddddd", data);

  return (
    <Modal>
      <ButtonWrapper data={data} />
    </Modal>
  );
}
