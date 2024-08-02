// import { uploadToCloudinary } from "@/app/action";
// import executeQuery from "@/lib/db";
// import { NextResponse } from "next/server";

// export async function POST(req) {
//   const formData = await req.formData();

//   const id = formData.get("id");
//   const name = formData.get("name");
//   const payback = formData.get("payback");
//   const discount = formData.get("discount");
//   const marketOrder = formData.get("marketOrder");
//   const limitOrder = formData.get("limitOrder");
//   const averageRefund = formData.get("averageRefund");
//   const tag = formData.get("tag");

//   if (name === "") {
//     return NextResponse.json({ message: "Required field." });
//   }

//   const sql = "SELECT * FROM selferral.exchanges WHERE name = ?";
//   const data = await executeQuery(sql, [name]);
//   const getData = JSON.parse(JSON.stringify(data));

//   const logo = formData.get("logo") as File;
//   const banner = formData.get("banner") as File;
//   let logoPath = "";
//   let bannerPath = "";

//   console.log("logo", typeof logo);

//   if (logo && typeof logo !== "string") {
//     const fileBuffer = await logo.arrayBuffer();

//     const mimeType = logo.type;
//     const encoding = "base64";
//     const base64Data = Buffer.from(fileBuffer).toString("base64");

//     const fileUri = "data:" + mimeType + ";" + encoding + "," + base64Data;

//     const res = await uploadToCloudinary(fileUri, logo.name);

//     logoPath = res?.result?.secure_url;
//   } else {
//     logoPath = logo;
//   }

//   if (banner && typeof banner !== "string") {
//     const fileBuffer = await banner.arrayBuffer();

//     const mimeType = banner.type;
//     const encoding = "base64";
//     const base64Data = Buffer.from(fileBuffer).toString("base64");

//     const fileUri = "data:" + mimeType + ";" + encoding + "," + base64Data;

//     const res = await uploadToCloudinary(fileUri, banner.name);

//     bannerPath = res?.result?.secure_url;
//   } else {
//     bannerPath = banner;
//   }

//   const updateSql =
//     "UPDATE selferral.exchanges SET name = ?, payback = ?, discount = ?, market_order = ?, limit_order = ?, round_image = ?, square_image = ?, tag = ?, average_refund = ? WHERE id = ?";
//   const updateData = await executeQuery(updateSql, [name, payback, discount, marketOrder, limitOrder, logoPath, bannerPath, tag, averageRefund, id]);
//   const updatedData = JSON.parse(JSON.stringify(updateData));

//   if (updatedData.affectedRows > 0) {
//     return NextResponse.json({ message: "success", CODE: "EM000" });
//   } else {
//     return NextResponse.json({ message: "failure" });
//   }
// }
