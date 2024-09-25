"use server";
import { revalidateTag } from "next/cache";
import { API_URL } from "..";

export const revalidate = async (tag) => {
  revalidateTag(tag);
};

export const getBanners = async () => {
  const res = await fetch(`${API_URL}/auth/banners`, {
    next: { tags: ["banner"], revalidate: 60 * 60 * 1000 },
  });

  const data = await res.json();

  return data;
};
