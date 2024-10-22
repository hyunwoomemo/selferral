"use server";
import { API_URL } from "@/actions";
import { getCookie, setCookie } from "@/actions/user/action";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function fetchWithAuth(url, options = {}) {
  // const token = getCookie("token");

  const token = await getCookie("token"); // 쿠키에서 액세스 토큰 가져오기
  // const a = await fetch("ht/api/user/logout", { method: "POST" });

  // const token = await fetch("/api/user/token");
  // const refresh = cookies().get("refresh")?.value; // 쿠키에서 액세스 토큰 가져오기

  // console.log("tokentokentoken", token);

  // 요청 헤더에 액세스 토큰 포함
  options.headers = {
    ...options.headers,
    authorization: token && `Bearer ${token}`,
  };

  // if (!token && !refresh) {
  //   return;
  // }

  // 액세스 토큰 만료 확인
  if (isTokenExpired(token)) {
    try {
      const newToken = await refreshToken(); // 토큰 갱신
      setCookie("token", newToken); // 새로운 토큰을 쿠키에 저장

      options.headers = {
        ...options.headers,
        authorization: `Bearer ${newToken}`,
      };
    } catch (error) {
      // 갱신 실패 시, 로그인 페이지로 리다이렉트하거나 오류 처리

      // redirectToLogin();
      return;
    }
  }

  // API 요청 보내기
  const response = await fetch(url, options);

  // 응답 처리
  if (response.status === 401) {
    // 401 에러 처리: 액세스 토큰 만료 시 다시 로그인
    redirectToLogin();
  }

  return response.json();
}

// 쿠키에서 토큰 가져오기
// function getCookie(name) {
//   const cookieArr = document.cookie.split(";");
//   for (let i = 0; i < cookieArr.length; i++) {
//     const cookiePair = cookieArr[i].split("=");
//     if (name === cookiePair[0].trim()) {
//       return cookiePair[1];
//     }
//   }
//   return null;
// }

// 쿠키에 토큰 저장하기
// function setCookie(name, value, maxAge = 3600) {
//   document.cookie = `${name}=${value}; path=/; max-age=${maxAge}; Secure`;
// }

// 토큰 만료 여부 확인
function isTokenExpired(token) {
  if (!token) return true;

  const payload = JSON.parse(atob(token.split(".")[1]));

  return payload.exp < Date.now() / 1000;
}

// 토큰 갱신 함수
async function refreshToken() {
  // const refreshToken = getCookie("refresh"); // 리프레시 토큰을 쿠키에서 가져오기
  const refreshToken = cookies().get("refresh")?.value;

  const response = await fetch(`${API_URL}/auth/refresh`, {
    headers: {
      "Content-Type": "application/json",
      refresh: refreshToken,
    },
  });

  // if (response.CODE !== 'ART000') {
  //   throw new Error("Failed to refresh token");
  // }

  const data = await response.json();

  console.log("ddd", data);

  if (data.CODE !== "ART000") {
    throw new Error("Failed to refresh token");
  }

  return data.TOKEN.accessToken;
}

// 로그인 페이지로 리다이렉트하는 함수
function redirectToLogin() {
  // window.location.href = "/login";
  redirect("/login?type=expire");
}
