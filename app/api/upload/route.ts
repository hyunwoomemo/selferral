// // import { uploadToCloudinary } from "@/app/action";
// // import executeQuery from "@/lib/db";
// import { redirect } from "next/navigation";
// import { NextRequest, NextResponse } from "next/server";

// export async function POST(req: NextRequest) {
//   // your auth check here if required

//   const formData = await req.formData();

//

//   const name = formData.get("name");
//   const payback = formData.get("payback");
//   const discount = formData.get("discount");
//   const marketOrder = formData.get("marketOrder");
//   const limitOrder = formData.get("limitOrder");
//   const averageRefund = formData.get("averageRefund");
//   const tag = formData.get("tag");

//   if (name === "") {
//     return {
//       message: "Required field.",
//     };
//   }

//   const sql = "SELECT * FROM selferral.exchanges WHERE name = ?";
//   const data = await executeQuery(sql, [name]);
//   const getData = JSON.parse(JSON.stringify(data));

//   if (getData.length > 0) {
//     return NextResponse.json({ message: "Exchange already exists.", CODE: "EA001" });
//   } else {
//     const logo = formData.get("logo") as File;
//     const banner = formData.get("banner") as File;
//     let logoPath = "";
//     let bannerPath = "";

//     if (logo) {
//       const fileBuffer = await logo.arrayBuffer();

//       const mimeType = logo.type;
//       const encoding = "base64";
//       const base64Data = Buffer.from(fileBuffer).toString("base64");

//       // // this will be used to upload the file
//       const fileUri = "data:" + mimeType + ";" + encoding + "," + base64Data;

//       const res = await uploadToCloudinary(fileUri, logo.name);

//       logoPath = res?.result?.secure_url;
//     }

//     if (banner) {
//       const fileBuffer = await banner.arrayBuffer();

//       const mimeType = banner.type;
//       const encoding = "base64";
//       const base64Data = Buffer.from(fileBuffer).toString("base64");

//       // // this will be used to upload the file
//       const fileUri = "data:" + mimeType + ";" + encoding + "," + base64Data;

//       const res = await uploadToCloudinary(fileUri, banner.name);

//       bannerPath = res?.result?.secure_url;
//     }

//     const insertSql = "INSERT INTO selferral.exchanges (name, payback, discount, market_order, limit_order, round_image, square_image, tag, average_refund) VALUES (?,?,?,?,?,?,?,?, ?)";
//     const insertData = await executeQuery(insertSql, [name, payback, discount, marketOrder, limitOrder, logoPath, bannerPath, tag, averageRefund]);
//     const insertedData = JSON.parse(JSON.stringify(insertData));
//     if (insertedData.affectedRows > 0) {
//       return NextResponse.json({ message: "success", CODE: "EA000" });
//     } else {
//       return NextResponse.json({ message: "failure" });
//     }
//   }
// }
