// "use server";

// import executeQuery from "@/lib/db";
// import { revalidatePath } from "next/cache";
// import { redirect } from "next/navigation";
// import bcrypt from "bcrypt";
// import jwt from "jsonwebtoken";
// import { cookies } from "next/headers";
// import { NextResponse } from "next/server";
// import multer from "multer";
// import fs from "fs";
// import { pipeline } from "stream";
// import { promisify } from "util";
// import path from "path";
// import { NextRequest } from "next/server";
// import { cloudinary } from "../cloudinary";
// const SALT_ROUNDS = 10;

// async function tokenCheck() {
//   const token = cookies().get("token")?.value;

//   try {
//     const decodedToken = jwt.verify(token, process.env.NEXT_PUBLIC_ACCESS_TOKEN_KEY);

//     if (decodedToken) {
//       return true;
//     }
//   } catch (err) {}
// }

// export async function register(prevState: any, formData: FormData) {
//   const email = formData.get("email");
//   const password = formData.get("password");
//   const name = formData.get("name");
//   const hp = formData.get("hp");

//   console.log(email, password, name, hp);

//   if (email === "" || password === "" || name === "" || hp === "") {
//     return {
//       message: "필수 입력값이 입력되지 않았습니다.",
//     };
//   }

//   const sql = "select * from selferral.users where email = ?";
//   const data = await executeQuery(sql, [email]);
//   const getData = JSON.parse(JSON.stringify(data));

//   if (getData.length > 0) {
//     return {
//       CODE: "AR001",
//       message: "이미 등록되어있는 이메일입니다.",
//     };
//   } else {
//     const hashPassword = await bcrypt.hash(password, SALT_ROUNDS);

//     const sql = `insert into selferral.users (email,password, name, hp, createdAt,type) value (?,?,?,?,?, ?)`;
//     const data = await executeQuery(sql, [email, hashPassword, name, hp, new Date(), "UT01"]);
//     const getData = JSON.parse(JSON.stringify(data));

//     if (getData.affectedRows > 0) {
//       // 회원가입 완료
//       redirect("/login");
//     }
//   }
// }

// export async function login(prevState: any, formData: FormData) {
//   const email = formData.get("email");
//   const password = formData.get("password");

//   if (email !== "" && password !== "") {
//     const sql = "select * from selferral.users where email = ?";
//     const data = await executeQuery(sql, [email]);
//     const getData = JSON.parse(JSON.stringify(data));

//     if (getData.length === 0) {
//       return {
//         CODE: "AL001",
//         message: "일치하는 회원이 존재하지 않습니다.",
//       };
//     }

//     const user = getData[0];

//     const isMatch = await bcrypt.compare(password, user.password);

//     if (!isMatch) {
//       return {
//         CODE: "AL001",
//         message: "일치하는 회원이 존재하지 않습니다.",
//       };
//     }

//     const accessToken = jwt.sign({ email: user.email, name: user.name, hp: user.hp, createdAt: user.createdAt, type: user.type }, process.env.NEXT_PUBLIC_ACCESS_TOKEN_KEY, { expiresIn: "1h" });
//     const refreshToken = jwt.sign({ email: user.email, name: user.name, hp: user.hp, createdAt: user.createdAt, type: user.type }, process.env.NEXT_PUBLIC_REFRESH_TOKEN_KEY, { expiresIn: "7d" });

//     cookies().set("token", accessToken);
//     cookies().set("refresh_token", refreshToken);

//     return {
//       CODE: "AL000",
//       TOKEN: { accessToken, refreshToken },
//       DATA: { email: user.email, name: user.name, hp: user.hp, type: user.type },
//     };
//   } else {
//     revalidatePath("/login");
//     return {
//       message: "필수 입력값입니다.",
//     };
//   }
// }

// // export async function getUserInfo()

// export async function info() {
//   const token = cookies().get("token")?.value;

//   console.log("123", token);

//   try {
//     const decodedToken = jwt.verify(token, process.env.NEXT_PUBLIC_ACCESS_TOKEN_KEY);

//     console.log("Decoded Token:", decodedToken);

//     return {
//       DATA: {
//         email: decodedToken.email,
//         name: decodedToken.name,
//         hp: decodedToken.hp,
//         createdAt: decodedToken.createdAt,
//         type: decodedToken.type,
//       },
//     };
//   } catch (error) {
//     return {
//       message: "유효하지 않은 토큰입니다.",
//     };
//   } finally {
//   }
// }

// export async function logout() {
//   cookies().set("token", "");
//   cookies().set("refresh_token", "");

//   try {
//     return {
//       CODE: "AL000",
//     };
//   } catch (err) {}
// }

// export async function checkUserRole() {
//   const token = cookies().get("token")?.value;

//   try {
//     const decodedToken = jwt.verify(token, process.env.NEXT_PUBLIC_ACCESS_TOKEN_KEY);

//     console.log("Decoded Token:", decodedToken);

//     if (decodedToken.type === "UT02") {
//       return "admin";
//     } else {
//       return "client";
//     }
//   } catch (error) {
//     return {
//       message: "유효하지 않은 토큰입니다.",
//     };
//   } finally {
//   }
// }

// export async function getUsers() {
//   const token = await tokenCheck();

//   if (token) {
//     const sql = "select id,email, name, hp, createdAt, type from selferral.users";
//     const data = await executeQuery(sql, "");
//     const getData = JSON.parse(JSON.stringify(data));

//     return getData;
//   } else {
//     redirect("/login");
//   }
// }

// export async function getUser(id) {
//   const token = await tokenCheck();

//   if (token) {
//     const sql = "select id, email, name, hp, createdAt, type from selferral.users where id = ?";
//     const data = await executeQuery(sql, [id]);
//     const getData = JSON.parse(JSON.stringify(data));

//     return getData[0];
//   } else {
//     redirect("/login");
//   }
// }

export async function getExchanges() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API}/exchange/getExchanges`);

  console.log("res", res);

  if (res.ok) {
    const data = await res.json();
    console.log("data", data);
    return data;
  }
}

// export async function getExchange(id) {
//   const token = await tokenCheck();

//   if (token) {
//     const sql = "select * from selferral.exchanges where id = ?";
//     const data = await executeQuery(sql, [id]);
//     const getData = JSON.parse(JSON.stringify(data));

//     return getData[0];
//   } else {
//     redirect("/login");
//   }
// }

// export async function addExchange(prevState, formData) {
//   const UPLOAD_DIR = path.resolve(process.env.ROOT_PATH ?? "", "public/uploads");

//   console.log("formData", formData);

//   const name = formData.get("name");
//   const payback = formData.get("payback");
//   const discount = formData.get("discount");
//   const marketOrder = formData.get("marketOrder");
//   const limitOrder = formData.get("limitOrder");
//   const roundImage = formData.get("roundImage");
//   const squareImage = formData.get("squareImage");
//   const tag = formData.get("tag");

//   if (name === "") {
//     return {
//       message: "Required field.",
//     };
//   }

//   let roundeImagePath = "";
//   let squareImagePath = "";

//   if (roundImage) {
//     const buffer = Buffer.from(await roundImage.arrayBuffer());
//     if (!fs.existsSync(UPLOAD_DIR)) {
//       fs.mkdirSync(UPLOAD_DIR, { recursive: true });
//     }

//     // Store only the relative path from public directory
//     const relativeFilePath = `/uploads/${roundImage.name}`;
//     fs.writeFileSync(path.resolve(UPLOAD_DIR, roundImage.name), buffer);
//     roundeImagePath = relativeFilePath;
//   }

//   if (squareImage) {
//     const buffer = Buffer.from(await squareImage.arrayBuffer());
//     if (!fs.existsSync(UPLOAD_DIR)) {
//       fs.mkdirSync(UPLOAD_DIR, { recursive: true });
//     }

//     // Store only the relative path from public directory
//     const relativeFilePath = `/uploads/${squareImage.name}`;
//     fs.writeFileSync(path.resolve(UPLOAD_DIR, squareImage.name), buffer);
//     squareImagePath = relativeFilePath;
//   }

//   const sql = "SELECT * FROM selferral.exchanges WHERE name = ?";
//   const data = await executeQuery(sql, [name]);
//   const getData = JSON.parse(JSON.stringify(data));

//   if (getData.length > 0) {
//     return {
//       message: "Exchange already exists.",
//     };
//   } else {
//     const insertSql = "INSERT INTO selferral.exchanges (name, payback, discount, market_order, limit_order, round_image, square_image, tag) VALUES (?,?,?,?,?,?,?,?)";
//     const insertData = await executeQuery(insertSql, [name, `${payback}%`, `${discount}%`, marketOrder, limitOrder, roundeImagePath, squareImagePath, tag]);
//     const insertedData = JSON.parse(JSON.stringify(insertData));
//     if (insertedData.affectedRows > 0) {
//       redirect("/admin/exchange/list");
//     }
//   }
// }

// type UploadResponse = { success: true; result?: UploadApiResponse } | { success: false; error: UploadApiErrorResponse };

// export const uploadToCloudinary = (fileUri: string, fileName: string): Promise<UploadResponse> => {
//   return new Promise((resolve, reject) => {
//     cloudinary.uploader
//       .upload(fileUri, {
//         invalidate: true,
//         resource_type: "auto",
//         filename_override: fileName,
//         folder: "selferral", // any sub-folder name in your cloud
//         use_filename: true,
//       })
//       .then((result) => {
//         resolve({ success: true, result });
//       })
//       .catch((error) => {
//         reject({ success: false, error });
//       });
//   });
// };

// // export const deleteExchange = async (id) => {
// //   const sql = 'delete from selferral.exchanges where id = ?';
// //   const data = await executeQuery(sql, [id]);

// // }
