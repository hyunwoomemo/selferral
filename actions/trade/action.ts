"use server";
import { revalidateTag } from "next/cache";
import { API_URL } from "..";

export const getExchanges = async () => {
  const res = await fetch(`${API_URL}/exchange/getExchanges`, {
    // cache: "force-cache",
    next: { tags: ["exchanges"] },
  });

  const data = await res.json();

  return data;
};

export const getExchange = async (id) => {
  const res = await fetch(`${API_URL}/exchange/getExchanges`, {
    // cache: "force-cache",
    next: { tags: ["exchanges"] },
  });

  const data = await res.json();

  console.log("data", data);

  return data.data.find((v) => v.exchange_id == id);
};

export const getAffiliateExchanges = async (token) => {
  const res = await fetch(`${API_URL}/affiliate/Exchange/getAll`, {
    headers: { authorization: `Bearer ${token}` },
    // cache: "force-cache",
  });

  const data = await res.json();

  return data;
};

export const editExchangeForm = async ({ id, token, body }) => {
  console.log("123123", id, token, body);
  try {
    const formData = new FormData();
    console.log("body", body);

    for (const key in body) {
      if (key.includes("image")) {
        if (typeof body[key] === "string") continue;
        for (let i = 0; i < body[key]?.length; i++) {
          formData.append(key, body[key]?.[i]);
        }
      } else {
        formData.append(key, body[key]);
      }
    }

    const res = await fetch(`${API_URL}/affiliate/Exchange/${id}`, {
      //"Content-Type": "multipart/form-data"
      headers: { authorization: `Bearer ${token}` },
      body: formData,
      method: "POST",
    });

    const data = await res.json();

    revalidateTag("exchanges");
    return data;
  } catch (err) {
    console.error(err);
  }
};

export const editLinksForm = async ({ id, linkId, token, body }) => {
  const formData = new FormData();

  for (const key in body) {
    if (body[key] !== null) {
      formData.append(key, body[key]);
    }
  }

  console.log("body", body);

  const res = await fetch(`${API_URL}/affiliate/Exchange/links/${id}/${linkId}`, {
    headers: { authorization: `Bearer ${token}` },
    body: formData,
    method: "POST",
  });

  const data = await res.json();
  revalidateTag("exchanges");

  return data;
};

export const getUidList = async ({ id, token }) => {
  console.log("idid", id);
  const res = await fetch(`${API_URL}/affiliate/Exchange/uid/${id}/10/1`, {
    headers: { authorization: `Bearer ${token}` },
    // cache: "force-cache",
  });

  const data = await res.json();

  return data;
};

// 거래소 UID 신청 및 조회
// /exchange/affiliate/:mode/:exchange_id
// mode = get 조회 / set 신청.   신청시 uid post 로 전달

export const registerUID = async ({ id, token, uid }) => {
  try {
    console.log(id, token, uid);

    const formData = new FormData();
    formData.append("uid", uid);
    const res = await fetch(`${API_URL}/exchange/affiliate/set/${id}`, {
      method: "POST",
      headers: { authorization: `Bearer ${token}` },

      body: formData,
    });
    const data = await res.json();

    return data;
  } catch (err) {
    console.log("err", err);
  }
};

export const getWithdrawals = async ({ exchangeId, token, num = 10, page = 1 }) => {
  const res = await fetch(
    `${API_URL}/affiliate/Exchange/withdrawal/${exchangeId}/${num}/${page} 
`,
    {
      headers: { authorization: `Bearer ${token}` },
    }
  );

  const data = await res.json();

  return data;
};

export const setWithdrawal = async ({ token, data }) => {
  const formData = new FormData();
  for (const key in data) {
    formData.append(key, data[key]);
  }

  const res = await fetch(`${API_URL}/exchange/withdrawal`, {
    method: "POST",
    headers: { authorization: `Bearer ${token}` },
    body: formData,
  });

  const result = await res.json();

  return result;
};
