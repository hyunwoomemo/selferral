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

export const editExchangeForm = async ({ id, token, formData }) => {
  console.log("123123", id, token, formData);
  try {
    console.log("body", formData);

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

export const editLinksForm = async ({ id, linkId, token, formData }) => {
  console.log("idasdasd", id, linkId, token, formData);

  const res = await fetch(`${API_URL}/affiliate/Exchange/links/${id}/${linkId}`, {
    headers: { authorization: `Bearer ${token}` },
    body: formData,
    method: "POST",
  });

  const data = await res.json();
  console.log("data", data);
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
      next: { tags: ["withdrawals"] },
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

  revalidateTag("clientWithdrawal");
  return result;
};

export const updateStep = async ({ withdrawlId, step, token }) => {
  const res = await fetch(
    `${API_URL}/affiliate/Exchange/withdrawal/${withdrawlId}/${step}
`,
    {
      method: "POST",
      headers: { authorization: `Bearer ${token}` },
    }
  );

  const result = await res.json();

  console.log("result", result);

  if (result.data === "OK") {
    revalidateTag("withdrawals");
    revalidateTag("clientWithdrawal");
  }

  return result;
};

export const getLinks = async ({ token, exchange_id }) => {
  const res = await fetch(`${API_URL}/affiliate/Exchange/links/${exchange_id}`, {
    headers: { authorization: `Bearer ${token}` },
  });

  const data = await res.json();

  return data;
};
