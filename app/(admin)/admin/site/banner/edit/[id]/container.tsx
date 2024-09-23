"use client";
import { setBanner } from "@/actions/site/action";
import { useToast } from "@/hooks/useToast";
import { useRouter } from "next/navigation";
import React, { useCallback, useState } from "react";

//title, memo, status [1 active, 2 close] , order, starttime [2024-09-15 00:00:00], endtime,  banner_image 배너 이미지, banner_id 0 신규, banner_type 은 자유임 사용자 화면에 구역별로 입력요망

const fields = ["title", "memo", "order", "starttime", "endtime", "status", "banner_image", "banner_type"];

const Container = ({ banner }) => {
  const [values, setValues] = useState({});
  const router = useRouter();
  const { addToast } = useToast();

  const FieldItem = useCallback(({ field, type, onChange, defaultValue }) => {
    return (
      <div className="flex gap-2 items-center">
        <span>{field}</span>
        <input
          type={type}
          onChange={onChange}
          defaultValue={defaultValue}
          // onChange={(e) => {

          //   setValues((prev) => ({ ...prev, files: prev.files ? [...prev.files, e.target.files[0]] : [e.target.files[0]] }));
          // }}
          placeholder={field}
          name={field}
          style={{ border: "1px solid gray", background: "none", padding: 10 }}
        />
      </div>
    );
  }, []);

  const handleBanner = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    for (const key in values) {
      if (key.includes("image")) {
        for (let i = 0; i < values[key]?.length; i++) {
          formData.append(key, values[key]?.[i]);
        }
      } else {
        formData.append(key, values[key]);
      }
    }

    for (const key in banner) {
      if (formData.has(key)) continue;

      if (key === "position") {
        formData.append("banner_type", banner[key]);
      } else {
        formData.append(key, banner[key]);
      }
    }

    const res = await setBanner({ data: formData, bannerType: values["banner_type"] || banner["position"], id: banner.id });

    addToast({ text: "배너가 변경되었습니다." });
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

          return <FieldItem key={field} field={field} type={type} onChange={onChange} defaultValue={field === "banner_type" ? banner["position"] : banner[field]} />;
        })}
      </div>
      <button className="pt-20">저장하기</button>
    </form>
  );
};

export default Container;
