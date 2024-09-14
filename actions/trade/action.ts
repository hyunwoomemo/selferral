"use server";
import { revalidateTag } from "next/cache";
import { API_URL } from "..";
import { fetchWithAuth } from "@/lib/fetchWithAuth";
import { cookies } from "next/headers";

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
  const res = await fetchWithAuth(`${API_URL}/affiliate/Exchange/getAll`, {
    headers: { authorization: `Bearer ${token}` },
    // cache: "force-cache",
  });

  return res;
};

export const editExchangeForm = async ({ id, token, formData }) => {
  console.log("123123", id, token, formData);
  try {
    console.log("body", formData);

    const res = await fetchWithAuth(`${API_URL}/affiliate/Exchange/${id}`, {
      //"Content-Type": "multipart/form-data"
      headers: { authorization: `Bearer ${token}` },
      body: formData,
      method: "POST",
    });

    revalidateTag("exchanges");
    return res;
  } catch (err) {
    console.error(err);
  }
};

export const editLinksForm = async ({ id, linkId, token, formData }) => {
  console.log("idasdasd", id, linkId, token, formData);

  const res = await fetchWithAuth(`${API_URL}/affiliate/Exchange/links/${id}/${linkId}`, {
    headers: { authorization: `Bearer ${token}` },
    body: formData,
    method: "POST",
  });

  revalidateTag("exchanges");

  return res;
};

export const getUidListById = async ({ id, token }) => {
  console.log("idid", id);
  const res = await fetchWithAuth(`${API_URL}/affiliate/Exchange/uid/${id}/10/1`, {
    headers: { authorization: `Bearer ${token}` },
    // cache: "force-cache",
  });

  return res;
};

// 거래소 UID 신청 및 조회
// /exchange/affiliate/:mode/:exchange_id
// mode = get 조회 / set 신청.   신청시 uid post 로 전달

export const registerUID = async ({ id, token, uid }) => {
  try {
    console.log(id, token, uid);

    const formData = new FormData();
    formData.append("uid", uid);
    const res = await fetchWithAuth(`${API_URL}/exchange/affiliate/set/${id}`, {
      method: "POST",
      headers: { authorization: `Bearer ${token}` },

      body: formData,
    });

    if (res.CODE === "EAS000") {
      revalidateTag("uidStatus");
    }

    return res;
  } catch (err) {
    console.log("err", err);
  }
};

export const getWithdrawals = async ({ exchangeId, token, num = 10, page = 1 }) => {
  const res = await fetchWithAuth(
    `${API_URL}/affiliate/Exchange/withdrawal/${exchangeId}/${num}/${page} 
`,
    {
      headers: { authorization: `Bearer ${token}` },
      next: { tags: ["withdrawals"] },
    }
  );

  return res;
};

export const setWithdrawal = async ({ token, data }) => {
  const formData = new FormData();
  for (const key in data) {
    formData.append(key, data[key]);
  }

  const res = await fetchWithAuth(`${API_URL}/exchange/withdrawal`, {
    method: "POST",
    headers: { authorization: `Bearer ${token}` },
    body: formData,
  });

  revalidateTag("clientWithdrawal");
  return res;
};

export const updateStep = async ({ withdrawlId, step, token }) => {
  const res = await fetchWithAuth(
    `${API_URL}/affiliate/Exchange/withdrawal/${withdrawlId}/${step}
`,
    {
      method: "POST",
      headers: { authorization: `Bearer ${token}` },
    }
  );

  if (res.data === "OK") {
    revalidateTag("withdrawals");
    revalidateTag("clientWithdrawal");
  }

  return res;
};

export const getLinks = async ({ token, exchange_id }) => {
  const res = await fetchWithAuth(`${API_URL}/affiliate/Exchange/links/${exchange_id}`, {
    headers: { authorization: `Bearer ${token}` },
  });

  return res;
};

export const getUidList = async ({ token }) => {
  const res = await fetchWithAuth(`${API_URL}/exchange/withdrawals`, {
    headers: { authorization: `Bearer ${token}` },
    next: { tags: ["uidlist"] },
  });

  return res;
};

export const getUidRegisterStatus = async ({ token, status, exchange_id, rownum, page }) => {
  const res = await fetchWithAuth(`${API_URL}/affiliate/Exchange/order_uid/${status}/${exchange_id}/${rownum}/${page}`, {
    headers: {
      authorization: `Bearer ${token}`,
    },
    next: { tags: ["uidstandby"] },
  });

  return res;
};

export const updateUidStatus = async ({ status, order_id, token }) => {
  console.log(status, order_id, token);

  const res = await fetchWithAuth(`${API_URL}/affiliate/Exchange/order_uid/${status}/${order_id}`, {
    method: "POST",
    headers: { authorization: `Bearer ${token}` },
  });
  console.log("res1231231", res);

  revalidateTag("uidstandby");
  revalidateTag("uidlist");

  return res;
};

export const uploadExcel = async ({ formData, token }) => {
  const response = await fetchWithAuth(`${API_URL}/affiliate/Exchange/uid/excel`, {
    method: "POST",
    body: formData,
    headers: { authorization: `Bearer ${token}` },
  });

  revalidateTag("uidlist");

  return response;
};

export const getUidStatus = async ({ token }) => {
  const response = await fetchWithAuth(`${API_URL}/exchange/UidStatus`, {
    headers: { authorization: `Bearer ${token}` },
    next: { tags: ["uidStatus"] },
  });

  console.log("getUidStatus", response);

  return { data: response, time: Date.now() };
};
