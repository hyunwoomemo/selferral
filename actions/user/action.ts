import { redirect } from "next/navigation";
import { API_URL } from "..";
export const getAllUser = async () => {
  const res = await fetch(`${API_URL}/auth/getuser`);
  const data = await res.json();

  console.log("zxczxc", data);
  return data;
};

export const getUser = async (id) => {
  const res = await fetch(`${API_URL}/auth/user/${id}`);

  const data = await res.json();

  return data;
};

export async function register(prevState: any, formData: FormData) {
  const email = formData.get("email");
  const password = formData.get("password");
  const name = formData.get("name");
  const hp = formData.get("hp");
  console.log("nnn", email, password, name, hp);

  if (email === "" || password === "" || name === "" || hp === "") {
    return {
      message: "필수 입력값이 입력되지 않았습니다.",
    };
  }

  const res = await fetch(`${API_URL}/auth/register`, {
    method: "POST",
    body: JSON.stringify({
      email,
      password,
      name,
      hp,
    }),
  });

  const data = await res.json();

  console.log("data", data);

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

  console.log("id", id, password);

  const res = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    body: JSON.stringify({
      id,
      password,
    }),
  });

  const data = await res.json();

  console.log("data", data);

  if (data.CODE === "AL000") {
    return data;
  } else {
    switch (data.CODE) {
      case "AL001":
        return {
          message: "필수 입력값이 입력되지 않았습니다.",
        };
      case "AL002":
        return {
          message: "이미 등록되어있는 아이디입니다.",
        };
    }
  }
}

export const getInfo = async (token, refresh) => {
  if (token) {
    const res = await fetch(`${API_URL}/auth/info`, {
      headers: { authorization: `Bearer ${token}`, refresh },
    });

    const data = await res.json();

    console.log("dd", data);

    return data;
  }
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

export const getWithdrawal = async ({ token }) => {
  console.log("tokentoken", token);
  const res = await fetch(`${API_URL}/exchange/withdrawal/10/1`, {
    headers: { authorization: `Bearer ${token}` },
  });

  const data = await res.json();

  return data;
};
