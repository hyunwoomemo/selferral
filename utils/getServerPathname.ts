import { headers } from "next/headers";

export const getServerPathname = () => {
  const header_url = headers().get("x-url") || "";
  const pathname = new URL(header_url).pathname;

  return pathname;
};
