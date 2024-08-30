"use client";
import { setBanner } from "@/actions/site/action";
import React, { useCallback, useState } from "react";

//title, memo, status [1 active, 2 close] , order, starttime [2024-09-15 00:00:00], endtime,  banner_image 배너 이미지, banner_id 0 신규, banner_type 은 자유임 사용자 화면에 구역별로 입력요망

const fields = ["title", "memo", "order", "starttime", "endtime", "banner_image", "banner_type"];

const Container = ({ token }) => {
  const [values, setValues] = useState({});

  const FieldItem = useCallback(({ field, type, onChange }) => {
    return (
      <div className="flex gap-2 items-center">
        <span>{field}</span>
        <input
          type={type}
          onChange={onChange}
          // onChange={(e) => {
          //   console.log(e.target.files[0]);
          //   setValues((prev) => ({ ...prev, files: prev.files ? [...prev.files, e.target.files[0]] : [e.target.files[0]] }));
          // }}
          placeholder={field}
          name={field}
          style={{ border: "1px solid gray", background: "none", padding: 10 }}
        />
      </div>
    );
  }, []);

  console.log("values", values);

  const handleBanner = async (e) => {
    e.preventDefault();
    const res = await setBanner({ token, data: values });

    console.log("res", res);

    router;
  };

  return (
    <form onSubmit={handleBanner}>
      <div className="flex gap-3 flex-wrap">
        {fields.map((field) => {
          // if (field.includes("image")) {
          //   return <FieldItem field={field} type={"file"} />;
          // }

          // if (field.includes("time")) {
          //   return <FieldItem field={field} type={"datetime-local"} />;
          // }

          // return <FieldItem field={field} type={undefined} onChange={}/>;

          const type = field.includes("image") ? "file" : field.includes("time") ? "datetime-local" : undefined;
          const onChange = (e) => {
            if (type === "file") {
              setValues((prev) => ({ ...prev, [field]: e.target.files }));
            } else {
              setValues((prev) => ({ ...prev, [field]: e.target.value }));
            }
          };

          return <FieldItem key={field} field={field} type={type} onChange={onChange} />;
        })}
      </div>
      <button className="pt-20">저장하기</button>
    </form>
  );
};

export default Container;
