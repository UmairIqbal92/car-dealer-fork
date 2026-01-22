import type React from "react"
import type { Metadata } from "next"
import { Open_Sans } from "next/font/google"
import { LocalBusinessSchema, WebsiteSchema } from "@/components/structured-data"
import { seoConfig } from "@/lib/seo-config"
import "./globals.css"

const openSans = Open_Sans({ subsets: ["latin"], weight: ["400", "600", "700"] })

export const metadata: Metadata = {
  metadataBase: new URL(seoConfig.siteUrl),
  title: {
    default: seoConfig.pages.home.title,
    template: "%s | Car Junction LLC"
  },
  description: seoConfig.pages.home.description,
  keywords: seoConfig.defaultKeywords,
  authors: [{ name: seoConfig.siteName }],
  creator: seoConfig.siteName,
  publisher: seoConfig.siteName,
  formatDetection: {
    email: true,
    address: true,
    telephone: true,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: seoConfig.siteUrl,
    siteName: seoConfig.siteName,
    title: seoConfig.pages.home.title,
    description: seoConfig.pages.home.description,
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: `${seoConfig.siteName} - Used Car Dealership in Dallas, TX`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: seoConfig.pages.home.title,
    description: seoConfig.pages.home.description,
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: seoConfig.googleVerification || undefined,
    yandex: seoConfig.yandexVerification || undefined,
    other: seoConfig.bingVerification ? { "msvalidate.01": seoConfig.bingVerification } : undefined,
  },
  alternates: {
    canonical: seoConfig.siteUrl,
  },
  icons: {
    icon: "/favicon.png",
    apple: "/favicon.png",
  },
  category: "automotive",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        {seoConfig.googleTagManagerId && (
          <script
            dangerouslySetInnerHTML={{
              __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','${seoConfig.googleTagManagerId}');`
            }}
          />
        )}
        {seoConfig.googleAnalyticsId && (
          <>
            <script async src={`https://www.googletagmanager.com/gtag/js?id=${seoConfig.googleAnalyticsId}`} />
            <script
              dangerouslySetInnerHTML={{
                __html: `window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${seoConfig.googleAnalyticsId}');`
              }}
            />
          </>
        )}
        {seoConfig.facebookPixelId && (
          <script
            dangerouslySetInnerHTML={{
              __html: `!function(f,b,e,v,n,t,s)
              {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
              n.callMethod.apply(n,arguments):n.queue.push(arguments)};
              if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
              n.queue=[];t=b.createElement(e);t.async=!0;
              t.src=v;s=b.getElementsByTagName(e)[0];
              s.parentNode.insertBefore(t,s)}(window, document,'script',
              'https://connect.facebook.net/en_US/fbevents.js');
              fbq('init', '${seoConfig.facebookPixelId}');
              fbq('track', 'PageView');`
            }}
          />
        )}
      </head>
      <body className={`${openSans.className} font-sans antialiased`}>
        {seoConfig.googleTagManagerId && (
          <noscript>
            <iframe
              src={`https://www.googletagmanager.com/ns.html?id=${seoConfig.googleTagManagerId}`}
              height="0"
              width="0"
              style={{ display: 'none', visibility: 'hidden' }}
            />
          </noscript>
        )}
        <LocalBusinessSchema />
        <WebsiteSchema />
        {children}
      </body>
    </html>
  )
}
