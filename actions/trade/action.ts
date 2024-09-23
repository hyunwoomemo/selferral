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

  console.log("dddd", data, id);

  return data.data.find((v) => v.exchange_id == id);
};

export const getAffiliateExchanges = async () => {
  const res = await fetchWithAuth(`${API_URL}/affiliate/Exchange/getAll`, {
    // cache: "force-cache",
  });

  return res;
};

export const getAffiliateExchange = async (id) => {
  const res = await fetchWithAuth(`${API_URL}/affiliate/Exchange/getAll`, {
    // cache: "force-cache",
  });

  console.log("13123123", res);

  return res.data.find((v) => v.id == id);
};

export const editExchangeForm = async ({ id, formData }) => {
  console.log("ffffsdfsdf", formData);

  try {
    const res = await fetchWithAuth(`${API_URL}/affiliate/Exchange/${id}`, {
      //"Content-Type": "multipart/form-data"
      body: formData,
      method: "POST",
    });

    revalidateTag("exchanges");
    return res;
  } catch (err) {
    console.error(err);
  }
};

export const editStatusExchange = async ({ id, data, status }) => {
  const formData = new FormData();

  for (const key in data) {
    if (key !== "status") {
      formData.append(key, data[key]);
    } else {
      formData.append(key, data[key] === 1 ? 0 : 1);
    }
  }

  try {
    const res = await fetchWithAuth(`${API_URL}/affiliate/Exchange/${id}`, {
      //"Content-Type": "multipart/form-data"
      body: formData,
      method: "POST",
    });

    revalidateTag("exchanges");
    return res;
  } catch (err) {
    console.error(err);
  }
};

export const editLinksForm = async ({ id, linkId, formData }) => {
  const res = await fetchWithAuth(`${API_URL}/affiliate/Exchange/links/${id}/${linkId}`, {
    body: formData,
    method: "POST",
  });

  revalidateTag("exchanges");

  return res;
};

export const getUidListById = async ({ id }) => {
  const res = await fetchWithAuth(`${API_URL}/affiliate/Exchange/uid/${id}/10/1`, {});

  return res;
};

// 거래소 UID 신청 및 조회
// /exchange/affiliate/:mode/:exchange_id
// mode = get 조회 / set 신청.   신청시 uid post 로 전달

export const registerUID = async ({ id, uid }) => {
  try {
    const formData = new FormData();
    formData.append("uid", uid);
    const res = await fetchWithAuth(`${API_URL}/exchange/affiliate/set/${id}`, {
      method: "POST",

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

export const getWithdrawals = async ({ exchangeId, num = 10, page = 1 }) => {
  const res = await fetchWithAuth(
    `${API_URL}/affiliate/Exchange/withdrawal/${exchangeId}/${num}/${page} 
`,
    {
      next: { tags: ["withdrawals"] },
    }
  );

  return res;
};

export const setWithdrawal = async ({ data }) => {
  const formData = new FormData();
  for (const key in data) {
    formData.append(key, data[key]);
  }

  const res = await fetchWithAuth(`${API_URL}/exchange/withdrawal`, {
    method: "POST",
    body: formData,
  });

  revalidateTag("clientWithdrawal");
  return res;
};

export const updateStep = async ({ withdrawlId, step }) => {
  const res = await fetchWithAuth(
    `${API_URL}/affiliate/Exchange/withdrawal/${withdrawlId}/${step}
`,
    {
      method: "POST",
    }
  );

  if (res.data === "OK") {
    revalidateTag("withdrawals");
    revalidateTag("clientWithdrawal");
  }

  return res;
};

export const getLinks = async ({ exchange_id }) => {
  const res = await fetchWithAuth(`${API_URL}/affiliate/Exchange/links/${exchange_id}`, {});

  return res;
};

export const getUidList = async ({}) => {
  const res = await fetchWithAuth(`${API_URL}/exchange/withdrawals`, {
    next: { tags: ["uidlist"] },
  });

  return res;
};

export const getUidRegisterStatus = async ({ status, exchange_id, rownum, page }) => {
  const res = await fetchWithAuth(`${API_URL}/affiliate/Exchange/order_uid/${status}/${exchange_id}/${rownum}/${page}`, {
    next: { tags: ["uidstandby"] },
  });

  return res;
};

export const updateUidStatus = async ({ status, order_id }) => {
  const res = await fetchWithAuth(`${API_URL}/affiliate/Exchange/order_uid/${status}/${order_id}`, {
    method: "POST",
  });

  revalidateTag("uidstandby");
  revalidateTag("uidlist");

  return res;
};

export const uploadExcel = async ({ formData }) => {
  const response = await fetchWithAuth(`${API_URL}/affiliate/Exchange/uid/excel`, {
    method: "POST",
    body: formData,
  });

  revalidateTag("uidlist");

  return response;
};

export const getUidStatus = async ({}) => {
  const response = await fetchWithAuth(`${API_URL}/exchange/UidStatus`, {
    next: { tags: ["uidStatus"] },
  });

  return { data: response, time: Date.now() };
};
