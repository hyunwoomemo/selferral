import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.scss";
import { cn } from "@/lib/utils";
import { SiteHeader } from "@/components/site-header";
import { Providers } from "@/components/providers";
import { siteConfig } from "@/config/site";
import { SiteFooter } from "@/components/site-footer";
import { Provider } from "jotai";
import ToastContainer from "@/components/toast-container";
import { getServerPathname } from "@/utils/getServerPathname";
import ClientLayout from "./client-layout";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  title: siteConfig.name,
  description: siteConfig.description,
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL ?? siteConfig.url),
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#fb923c" },
    { media: "(prefers-color-scheme: dark)", color: "#fb923c" },
  ],
  maximumScale: 1,
  minimumScale: 1,
};

export default async function RootLayout({
  children,
  modal,
}: Readonly<{
  children: React.ReactNode;
  modal: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-pt-[3.5rem] light">
      <body className={cn("min-h-screen bg-background font-sans antialiased min-w-screen ", inter.variable)}>
        <script type="module" defer src="https://cdn.jsdelivr.net/npm/ldrs/dist/auto/spiral.js"></script>
        <Providers>
          <Provider>
            <div className="relative flex min-h-dvh flex-col bg-gray-50 dark:bg-gray-900">
              {/* {role} */}
              {/* <SiteHeader role={role} /> */}
              <SiteHeader />
              <ClientLayout>{children}</ClientLayout>
              <SiteFooter />
              <ToastContainer />
            </div>
          </Provider>
        </Providers>
        {modal}
      </body>
    </html>
  );
}
