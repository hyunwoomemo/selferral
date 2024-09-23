"use client";
import { setBanner } from "@/actions/site/action";
import { useToast } from "@/hooks/useToast";
import moment from "moment";
import { useRouter } from "next/navigation";
import React, { useCallback, useState } from "react";

//title, memo, status [1 active, 2 close] , order, starttime [2024-09-15 00:00:00], endtime,  banner_image 배너 이미지, banner_id 0 신규, banner_type 은 자유임 사용자 화면에 구역별로 입력요망

const fields = ["title", "memo", "order", "starttime", "endtime", "status", "banner_image", "banner_type"];

const Container = ({}) => {
  const [values, setValues] = useState({});
  const router = useRouter();
  const { addToast } = useToast();

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

    if (Object.keys(values).length !== 8) {
      return addToast({ text: "필수값이 입력되지 않았습니다." });
    }

    const formData = new FormData();

    for (const key in values) {
      if (key.includes("image")) {
        for (let i = 0; i < values[key]?.length; i++) {
          formData.append(key, values[key]?.[i]);
        }
      } else {
        if (key === "status") {
          console.log("123123", values[key]);
          values[key] === "null" || !values[key] ? formData.append(key, 0) : formData.append(key, values[key]);
        } else {
          // if (key.includes("time")) {
          //   formData.append(key, values[key]);
          // } else {
          formData.append(key, values[key]);
          // }
        }
      }
    }

    const res = await setBanner({ data: formData, bannerType: values["banner_type"] });

    addToast({ text: "배너가 추가되었습니다." });

    console.log("res", res);
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
