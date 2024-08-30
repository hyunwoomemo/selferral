import { getExchange } from "@/actions/trade/action";
import EditForm from "./ edit-form";

export default async function Page({ searchParams }) {
  console.log("se", searchParams);

  const data = await getExchange(searchParams.id);

  console.log("datadatadata", data);

  return <EditForm data={data} />;
}
