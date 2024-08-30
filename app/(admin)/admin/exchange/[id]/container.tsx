import React from "react";

const Container = ({ uid }) => {
  console.log("uid", uid);

  if (!uid) return;

  return (
    <div className="pt-10">
      <h1 className="text-2xl">UID 리스트</h1>
      <div className="pt-6">{uid?.data?.total > 0 ? uid?.data?.list.map((v, i) => <div>{i}</div>) : "데이터가 존재하지 않습니다."}</div>
    </div>
  );
};

export default Container;
