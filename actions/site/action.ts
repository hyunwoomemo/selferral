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
  revalidateTag("banner");
  redirect("/admin/exchange/event");
  // return result;
};

export const getAdminServiceInfo = async () => {
  const res = await fetchWithAuth(`${API_URL}/affiliate/siteinfo`, {
    cache: "force-cache",
    next: { tags: ["adminSiteinfo"] },
  });

  return res;
};

export const setSiteInfo = async (data) => {
  const res = await fetchWithAuth(`${API_URL}/affiliate/site/service_info`, {
    method: "POST",
    body: data,
  });

  revalidateTag("adminSiteinfo");
  revalidateTag("siteinfo");

  return res;
};

export const getClientServiceInfo = async () => {
  const res = await fetch(`${API_URL}/auth/site`, {
    cache: "force-cache",
    next: { tags: ["siteinfo"] },
  });

  return await res.json();
};
