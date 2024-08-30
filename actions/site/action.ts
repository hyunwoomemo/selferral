"use server";
import { revalidateTag } from "next/cache";
import { API_URL } from "..";
import { redirect } from "next/navigation";

export const getAdminBanner = async ({ type, token, num = 10, page = 1 }) => {
  const res = await fetch(`${API_URL}/affiliate/banner/${type}/${num}/${page}`, {
    cache: "force-cache",
    next: { tags: ["adminBanner"] },
    headers: { authorization: `Bearer ${token}` },
  });

  const data = await res.json();

  return data;
};

export const setBanner = async ({ data, token }) => {
  console.log("data", data, token);

  const formData = new FormData();

  for (const key in data) {
    formData.append(key, data[key]);
  }

  const res = await fetch(`${API_URL}/affiliate/banner/${data["banner_type"]}/0`, {
    method: "POST",
    body: formData,
    headers: { authorization: `Bearer ${token}` },
  });

  revalidateTag("adminBanner");
  const result = await res.json();

  console.log("result", result);

  redirect("/admin/site/banner/list");
  // return result;
};
