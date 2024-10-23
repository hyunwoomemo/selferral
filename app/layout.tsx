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
import Script from "next/script";

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
      <Script id="fb-pixel" strategy="afterInteractive">
        {`
              !function(f,b,e,v,n,t,s)
              {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
              n.callMethod.apply(n,arguments):n.queue.push(arguments)};
              if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
              n.queue=[];t=b.createElement(e);t.async=!0;
              t.src=v;s=b.getElementsByTagName(e)[0];
              s.parentNode.insertBefore(t,s)}(window, document,'script',
              'https://connect.facebook.net/en_US/fbevents.js');
              fbq('init', '${process.env.NEXT_PUBLIC_PIXEL_ID}');
              fbq('track', 'PageView');
            `}
      </Script>
      <Script id="googletagmanager" strategy="afterInteractive">
        {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-5XN5PS2M')
`}
      </Script>
      <body className={cn("min-h-screen bg-background font-sans antialiased min-w-screen ", inter.variable)}>
        <noscript>
          <iframe src="https://www.googletagmanager.com/ns.html?id=GTM-5XN5PS2M" height="0" width="0" style="display:none;visibility:hidden"></iframe>
        </noscript>

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
        <noscript>
          <img height="1" width="1" style="display:none" src="https://www.facebook.com/tr?id=1054798653043201&ev=PageView&noscript=1" />
        </noscript>
      </body>
    </html>
  );
}
