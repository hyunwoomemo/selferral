"use server";
import { revalidateTag } from "next/cache";
import { API_URL } from "..";
import { redirect } from "next/navigation";
import { fetchWithAuth } from "@/lib/fetchWithAuth";

export const getAdminBanner = async ({ type, num = 10, page = 1 }) => {
  const res = await fetchWithAuth(`${API_URL}/affiliate/banner/${type}/${num}/${page}`, {
    cache: "force-cache",
    next: { tags: ["adminBanner"] },
  });

  return res;
};

export const setBanner = async ({ data, bannerType, id = 0 }) => {
  const res = await fetchWithAuth(`${API_URL}/affiliate/banner/${bannerType}/${id}`, {
    method: "POST",
    body: data,
  });

  revalidateTag("adminBanner");
  redirect("/admin/exchange/event");
  // return result;
};
