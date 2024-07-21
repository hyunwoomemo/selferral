import { getExchange } from "@/app/action";
import EditForm from "./ edit-form";

export default async function Page({ searchParams }) {
  console.log("se", searchParams);

  const data = await getExchange(searchParams.id);

  console.log("data", data);

  return <EditForm data={data} />;
}
