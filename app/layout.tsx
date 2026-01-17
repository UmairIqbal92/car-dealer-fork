import type React from "react"
import type { Metadata } from "next"
import { Open_Sans } from "next/font/google"
import { LocalBusinessSchema, WebsiteSchema } from "@/components/structured-data"
import "./globals.css"

const openSans = Open_Sans({ subsets: ["latin"], weight: ["400", "600", "700"] })

export const metadata: Metadata = {
  metadataBase: new URL("https://carjunctionllc.com"),
  title: {
    default: "Car Junction LLC - Quality Used Cars & Trucks in Dallas, TX",
    template: "%s | Car Junction LLC"
  },
  description: "Find your perfect used car at Car Junction LLC. Dallas, TX's trusted car dealership offering quality pre-owned vehicles, trucks, SUVs at unbeatable prices. Easy financing available. Visit us today!",
  keywords: [
    "used cars Dallas TX",
    "used car dealership Dallas",
    "buy used car Dallas",
    "pre-owned vehicles Dallas",
    "affordable used cars Texas",
    "Car Junction LLC",
    "used trucks Dallas",
    "used SUVs Dallas",
    "car dealer near me",
    "auto dealer Dallas Texas",
    "cheap cars Dallas",
    "quality used vehicles",
    "car financing Dallas",
    "buy here pay here Dallas",
    "second hand cars Dallas"
  ],
  authors: [{ name: "Car Junction LLC" }],
  creator: "Car Junction LLC",
  publisher: "Car Junction LLC",
  formatDetection: {
    email: true,
    address: true,
    telephone: true,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://carjunctionllc.com",
    siteName: "Car Junction LLC",
    title: "Car Junction LLC - Quality Used Cars & Trucks in Dallas, TX",
    description: "Find your perfect used car at Car Junction LLC. Dallas, TX's trusted car dealership offering quality pre-owned vehicles at unbeatable prices.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Car Junction LLC - Used Car Dealership in Dallas, TX",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Car Junction LLC - Quality Used Cars & Trucks in Dallas, TX",
    description: "Find your perfect used car at Car Junction LLC. Dallas, TX's trusted car dealership.",
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
    google: "your-google-verification-code",
  },
  alternates: {
    canonical: "https://carjunctionllc.com",
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
      <body className={`${openSans.className} font-sans antialiased`}>
        <LocalBusinessSchema />
        <WebsiteSchema />
        {children}
      </body>
    </html>
  )
}
