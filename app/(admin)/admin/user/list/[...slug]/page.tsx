import { getExcelLog } from "@/actions/trade/action";
import React from "react";

const page = async ({ params }) => {
  // console.log("params", params.slug);

  const exchange_id = params.slug[0];
  const uid = params.slug[1];

  const data = await getExcelLog({ num: 10, page: 1, exchange_id, uid });

  console.log("datadatadatadata", data);

  return (
    <div>
      {exchange_id}
      {uid}
    </div>
  );
};

export default page;
