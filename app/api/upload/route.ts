import { NextResponse } from "next/server";
import fs from "fs";
import { pipeline } from "stream";
import { promisify } from "util";
const pump = promisify(pipeline);

export async function POST(req, res) {
  console.log("reqreqreqreqreq", req);

  try {
    const formData = await req.formData();
    const file = formData.getAll("upload")[0];
    const filePath = `./public/uploads/${file.name}`;
    await pump(file.stream(), fs.createWriteStream(filePath));
    return NextResponse.json({ status: "success", data: file.size });
  } catch (e) {
    return NextResponse.json({ status: "fail", data: e });
  }
}
