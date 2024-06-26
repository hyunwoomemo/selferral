import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import "./reset.css";
import StyledComponentsRegistry from "@/lib/registry";
import Sidebar from "@/components/Sidebar";
import Dim from "@/components/Dim";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "셀퍼럴",
  description: "셀퍼럴 소개 문구",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <StyledComponentsRegistry>
          {children}
          <Dim />
          <Sidebar />
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}
