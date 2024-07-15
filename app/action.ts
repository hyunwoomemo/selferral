"use server";

import executeQuery from "@/lib/db";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import multer from "multer";
import fs from "fs";
import { pipeline } from "stream";
import { promisify } from "util";
const SALT_ROUNDS = 10;

async function tokenCheck() {
  const token = cookies().get("token")?.value;

  try {
    const decodedToken = jwt.verify(token, process.env.NEXT_PUBLIC_ACCESS_TOKEN_KEY);

    if (decodedToken) {
      return true;
    }
  } catch (err) {}
}

export async function register(prevState: any, formData: FormData) {
  const email = formData.get("email");
  const password = formData.get("password");
  const name = formData.get("name");
  const hp = formData.get("hp");

  console.log(email, password, name, hp);

  if (email === "" || password === "" || name === "" || hp === "") {
    return {
      message: "필수 입력값이 입력되지 않았습니다.",
    };
  }

  const sql = "select * from selferral.users where email = ?";
  const data = await executeQuery(sql, [email]);
  const getData = JSON.parse(JSON.stringify(data));

  if (getData.length > 0) {
    return {
      CODE: "AR001",
      message: "이미 등록되어있는 이메일입니다.",
    };
  } else {
    const hashPassword = await bcrypt.hash(password, SALT_ROUNDS);

    const sql = `insert into selferral.users (email,password, name, hp, createdAt) value (?,?,?,?,?)`;
    const data = await executeQuery(sql, [email, hashPassword, name, hp, new Date()]);
    const getData = JSON.parse(JSON.stringify(data));

    if (getData.affectedRows > 0) {
      // 회원가입 완료
      redirect("/login");
    }
  }
}

export async function login(prevState: any, formData: FormData) {
  const email = formData.get("email");
  const password = formData.get("password");

  if (email !== "" && password !== "") {
    const sql = "select * from selferral.users where email = ?";
    const data = await executeQuery(sql, [email]);
    const getData = JSON.parse(JSON.stringify(data));

    if (getData.length === 0) {
      return {
        CODE: "AL001",
        message: "일치하는 회원이 존재하지 않습니다.",
      };
    }

    const user = getData[0];

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return {
        CODE: "AL001",
        message: "일치하는 회원이 존재하지 않습니다.",
      };
    }

    const accessToken = jwt.sign({ email: user.email, name: user.name, hp: user.hp, createdAt: user.createdAt, type: user.type }, process.env.NEXT_PUBLIC_ACCESS_TOKEN_KEY, { expiresIn: "1h" });
    const refreshToken = jwt.sign({ email: user.email, name: user.name, hp: user.hp, createdAt: user.createdAt, type: user.type }, process.env.NEXT_PUBLIC_REFRESH_TOKEN_KEY, { expiresIn: "7d" });

    cookies().set("token", accessToken);
    cookies().set("refresh_token", refreshToken);

    return {
      CODE: "AL000",
      TOKEN: { accessToken, refreshToken },
      DATA: { email: user.email, name: user.name, hp: user.hp, type: user.type },
    };
  } else {
    revalidatePath("/login");
    return {
      message: "필수 입력값입니다.",
    };
  }
}

// export async function getUserInfo()

export async function info() {
  const token = cookies().get("token")?.value;

  console.log("123", token);

  try {
    const decodedToken = jwt.verify(token, process.env.NEXT_PUBLIC_ACCESS_TOKEN_KEY);

    console.log("Decoded Token:", decodedToken);

    return {
      DATA: {
        email: decodedToken.email,
        name: decodedToken.name,
        hp: decodedToken.hp,
        createdAt: decodedToken.createdAt,
        type: decodedToken.type,
      },
    };
  } catch (error) {
    return {
      message: "유효하지 않은 토큰입니다.",
    };
  } finally {
  }
}

export async function logout() {
  cookies().set("token", "");
  cookies().set("refresh_token", "");

  try {
    return {
      CODE: "AL000",
    };
  } catch (err) {}
}

export async function checkUserRole() {
  const token = cookies().get("token")?.value;

  try {
    const decodedToken = jwt.verify(token, process.env.NEXT_PUBLIC_ACCESS_TOKEN_KEY);

    console.log("Decoded Token:", decodedToken);

    if (decodedToken.type === "UT02") {
      return "admin";
    } else {
      return "client";
    }
  } catch (error) {
    return {
      message: "유효하지 않은 토큰입니다.",
    };
  } finally {
  }
}

export async function getUsers() {
  const token = await tokenCheck();

  if (token) {
    const sql = "select email, name, hp, createdAt, type from selferral.users";
    const data = await executeQuery(sql, "");
    const getData = JSON.parse(JSON.stringify(data));

    return getData;
  } else {
    redirect("/login");
  }
}

export async function getExchanges() {
  const token = await tokenCheck();

  if (token) {
    const sql = "select * from selferral.exchanges";
    const data = await executeQuery(sql, "");
    const getData = JSON.parse(JSON.stringify(data));

    return getData;
  } else {
    redirect("/login");
  }
}

export async function addExchange(prevState: any, formData: FormData) {
  let redirectPath = null;
  const name = formData.get("name");
  const payback = formData.get("payback");
  const discount = formData.get("discount");
  const marketOrder = formData.get("marketOrder");
  const limitOrder = formData.get("limitOrder");
  const roundImage = formData.get("roundImage");

  try {
    const filePath = `public/uploads/${roundImage.name}`;
    console.log("filePath", filePath);
    const pump = promisify(pipeline);

    await pump(roundImage.stream(), fs.createWriteStream(filePath));
    console.log("파일추가");

    if (name === "") {
      return {
        message: "필수 입력값입니다.",
      };
    }

    const sql = "select * from selferral.exchanges where name = (?)";
    const data = await executeQuery(sql, [name]);
    const getData = JSON.parse(JSON.stringify(data));

    console.log("getData", getData);

    if (getData.length > 0) {
      return {
        message: "이미 존재하는 거래소입니다.",
      };
    } else {
      const sql = "insert into selferral.exchanges (name, payback, discount, market_order, limit_order, round_image) values (?,?,?,?,?,?)";
      const data = await executeQuery(sql, [name, `${payback}%`, `${discount}%`, marketOrder, limitOrder, filePath.replaceAll("public/", "")]);
      const getData = JSON.parse(JSON.stringify(data));
      if (getData.affectedRows > 0) {
        redirectPath = `/admin/exchange/list`;
        // 회원가입 완료
      }
    }
  } catch (err) {
    redirectPath = "/";
  } finally {
    if (redirectPath) {
      redirect(redirectPath);
    }
  }
}
