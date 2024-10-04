"use server";
import { redirect } from "next/navigation";

import { API_URL } from "..";
import { revalidateTag } from "next/cache";
import { fetchWithAuth } from "@/lib/fetchWithAuth";
import { cookies } from "next/headers";
export const getAllUser = async () => {
  const res = await fetch(`${API_URL}/auth/getuser`, {
    next: { tags: ["users"] },
  });
  const data = await res.json();

  return data;
};

export const getUser = async (id) => {
  const res = await fetch(`${API_URL}/auth/user/${id}`, {
    next: { tags: ["user"] },
  });

  const data = await res.json();

  return data;
};

export const getAllUsersWithUidStatus = async () => {
  const res = await fetchWithAuth(`${API_URL}/auth/getAllUsersWithUidStatus`, {
    next: { tags: ["userWithUid"] },
  });

  return res;
};

export async function register(prevState: any, formData: FormData) {
  const id = formData.get("id");
  const password = formData.get("password");
  const name = formData.get("name");
  const hp = formData.get("hp");

  if (id === "" || password === "" || name === "" || hp === "") {
    return {
      message: "필수 입력값이 입력되지 않았습니다.",
    };
  }

  const d = new FormData();

  d.append("id", id);
  d.append("password", password);
  d.append("name", name);
  d.append("hp", hp);

  const res = await fetch(`${API_URL}/auth/register`, {
    method: "POST",
    body: d,
  });

  const data = await res.json();

  if (data.CODE === "AR000") {
    redirect("/login");
  } else {
    switch (data.CODE) {
      case "AR001":
        return {
          message: "필수 입력값이 입력되지 않았습니다.",
        };
      case "AR002":
        return {
          message: "이미 등록되어있는 아이디입니다.",
        };
    }
  }

  // const sql = "select * from selferral.users where email = ?";
  // const data = await executeQuery(sql, [email]);
  // const getData = JSON.parse(JSON.stringify(data));

  // if (getData.length > 0) {
  //   return {
  //     CODE: "AR001",
  //     message: "이미 등록되어있는 이메일입니다.",
  //   };
  // } else {
  //   const hashPassword = await bcrypt.hash(password, SALT_ROUNDS);

  //   const sql = `insert into selferral.users (email,password, name, hp, createdAt,type) value (?,?,?,?,?, ?)`;
  //   const data = await executeQuery(sql, [email, hashPassword, name, hp, new Date(), "UT01"]);
  //   const getData = JSON.parse(JSON.stringify(data));

  //   if (getData.affectedRows > 0) {
  //     // 회원가입 완료
  //     redirect("/login");
  //   }
  // }
}
export async function login(prevState: any, formData: FormData) {
  const id = formData.get("email");
  const password = formData.get("password");

  if (id === "" || password === "") {
    return {
      message: "필수 입력값이 입력되지 않았습니다.",
    };
  }

  const res = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    body: JSON.stringify({
      id,
      password,
    }),
  });

  const data = await res.json();

  return data;
}

export const getInfo = async () => {
  const res = await fetchWithAuth(`${API_URL}/auth/info`, {});

  return res;
};

export const refresh = async (refreshToken) => {
  if (refreshToken) {
    const res = await fetch(`${API_URL}/auth/refresh`, {
      headers: { refresh: refreshToken },
    });

    const data = await res.json();

    return data;
  }
};

export const getWithdrawal = async ({}) => {
  const res = await fetchWithAuth(`${API_URL}/exchange/withdrawal/10/1`, {
    next: { tags: ["clientWithdrawal"] },
  });

  return res;
};

export const setUserType = async ({ id, type }) => {
  const formData = new FormData();

  formData.append("type", type);

  const res = await fetchWithAuth(`${API_URL}/auth/type/${id}`, {
    method: "POST",
    body: formData,
  });

  if (res.data === "ok") {
    revalidateTag("user");
    revalidateTag("users");
  }
  return res;
};

export const getCookie = (key) => {
  return cookies().get(key)?.value;
};

export const setCookie = (key, value) => {
  cookies().set(key, value);
};

export const editPassword = async ({ data }) => {
  const formData = new FormData();

  for (const key in data) {
    formData.append(key, data[key]);
  }

  const res = await fetchWithAuth(`${API_URL}/auth/editpassword`, {
    method: "POST",
    body: formData,
  });

  return res;
};

export const findUser = async ({ type, data }) => {
  console.log("type", type, data);

  const formData = new FormData();

  for (const key in data) {
    formData.append(key, data[key]);
  }

  const res = await fetch(`${API_URL}/auth/find/${type}`, {
    method: "POST",
    body: formData,
  });

  // const res = await fetch(`${API_URL}/auth/find/${type}`, {
  //   method: "POST",
  //   body: formData,
  // });

  const result = await res.json();

  console.log("rere", result);

  return result;
};
