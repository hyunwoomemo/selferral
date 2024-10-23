import Table from "@/components/ui/table";
import moment from "moment";
import React, { useMemo } from "react";

const Container = ({ data }) => {
  const tableData = useMemo(() => {
    return data.map((v) => {
      return {
        커미션: v.commision,
        "거래 시간": moment(v.create_at).format("YYYY-MM-DD HH:mm"),
      };
    });
  }, [data]);

  return <Table data={tableData} />;
};

export default Container;
