import React from "react";

const Container = ({ uid }) => {
  console.log("uid", uid);

  if (!uid) return;

  return (
    <div className="pt-10">
      <h1 className="text-2xl">UID 리스트</h1>
      {uid.data.list.length > 0 ? (
        <div className="flex flex-col gap-0 md:max-w-[80dvw] overflow-x-auto">
          <div className="">
            <div className="flex gap-10 py-5 border-b-2">
              <span className="flex justify-center min-w-[180px]">UID</span>
              <span className="flex justify-center min-w-[180px]">point</span>
              <span className="flex justify-center min-w-[180px]">create time</span>
              <span className="flex justify-center min-w-[180px]">process time</span>
            </div>
          </div>
          <div className="flex flex-col">
            {uid.data.list.map((v, index) => (
              <div className="flex items-center  py-10 gap-10" key={v.id}>
                <span className="min-w-[180px] flex justify-center">{v.uid}</span>
                <span className="flex justify-center items-center min-w-[180px]">{v.point}</span>
                <span className="flex justify-center items-center min-w-[180px]">{v.createtime}</span>
                <span className="flex justify-center items-center min-w-[180px]">{v.processtime}</span>
              </div>
            ))}
          </div>
          {/* 옵션 */}
        </div>
      ) : (
        <div className="pt-10">UID 리스트가 존재하지 않습니다.</div>
      )}
    </div>
  );
};

export default Container;
