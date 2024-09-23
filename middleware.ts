// middleware.ts
import { NextResponse, type NextRequest } from "next/server";
import { getInfo } from "./actions/user/action";

const AUTH_PAGES = ["/admin"];

export default async function middleware(request: NextRequest) {
  const requestHeaders = new Headers(request.headers);

  requestHeaders.set("x-url", request.url);

  const { nextUrl, cookies } = request;
  const { origin, pathname, href } = nextUrl;

  const accessToken = cookies.get("token");

  // const res = await getInfo({ accessToken });

  // console.log("rrfrfrfr", res);

  // if (res.CODE === "AC001" && !pathname.startsWith("/login")) {
  //   const url = request.nextUrl.clone();
  //   url.pathname = `/login`;

  //   return NextResponse.redirect(url);
  // }

  if (AUTH_PAGES.some((page) => pathname.startsWith(page))) {
    if (accessToken && accessToken.value) {
      return NextResponse.next({
        request: {
          headers: requestHeaders,
        },
      });
    } else {
      const url = request.nextUrl.clone();
      const pathname = url.pathname;
      url.pathname = `/login`;
      url.search = "?callback=" + pathname;

      return NextResponse.redirect(url, {
        headers: requestHeaders,
      });
    }
  } else {
  }

  return NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });
}
