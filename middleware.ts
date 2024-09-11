// middleware.ts
import { NextResponse, type NextRequest } from "next/server";

const AUTH_PAGES = ["/admin"];

export default function middleware(request: NextRequest) {
  const requestHeaders = new Headers(request.headers);

  requestHeaders.set("x-url", request.url);

  const { nextUrl, cookies } = request;
  const { origin, pathname, href } = nextUrl;

  const accessToken = cookies.get("token");

  console.log("accessToken", accessToken);

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
