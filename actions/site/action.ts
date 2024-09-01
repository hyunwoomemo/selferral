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

export const setBanner = async ({ data, token, bannerType, id = 0 }) => {
  console.log("setBanner", data, token);

  const res = await fetch(`${API_URL}/affiliate/banner/${bannerType}/${id}`, {
    method: "POST",
    body: data,
    headers: { authorization: `Bearer ${token}` },
  });

  revalidateTag("adminBanner");
  const result = await res.json();

  console.log("result", result);

  redirect("/admin/site/banner");
  // return result;
};
