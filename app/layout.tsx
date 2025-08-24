import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner"
import { ThemeProvider } from "./(guest)/_components/theme-provider";
import { SessionProvider } from "next-auth/react";
import Script from "next/script";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Kenautos Hub - Buy, Sell or Hire Luxury Cars in Kenya.",
  description: "Kenautos is Kenya's trusted online platform to buy, sell, or hire cars. Browse listings for new and used vehicles from individuals and dealers across the country.",
  keywords: "Buy cars in Kenya, Sell cars in Kenya, Car marketplace Kenya, Car hire services Kenya, Spare parts Kenya, Car dealers in Kenya, Second-hand cars Kenya, Car listing platform Kenya, Kenya automotive marketplace, Where to buy cars in Kenya, How to sell a car online in Kenya, Affordable car hire Kenya, Genuine spare parts for sale Kenya, Online car sales platform Kenya, Used cars Nairobi, Car hire companies in Kenya, Best place to buy car parts Kenya, Trusted car brokers Kenya, List car for free Kenya, Car dealership platform Kenya, List cars for sale as dealer Kenya, Auto spare parts dealer Kenya, Car hire business Kenya, Car sales agents in Kenya, Used cars Nairobi, Car hire in Mombasa, Spare parts in Kisumu, Buy Toyota in Nakuru, Car sales Eldoret.",
  openGraph: {
    title: "Kenautos Hub - Buy, Sell or Hire Luxury Cars in Kenya.",
    description: "Kenautos is Kenya's trusted online platform to buy, sell, or hire cars. Browse listings for new and used vehicles from individuals and dealers across the country.",
    url: "https://kenautos.co.ke",
    siteName: "Kenautos",
    images: [
      {
        url: "https://kenautos.co.ke/og-img.png",
        width: 1200,
        height: 630,
        alt: "Kenautos Hub - Buy, Sell or Hire Luxury Cars in Kenya.",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Kenautos Hub - Buy, Sell or Hire Luxury Cars in Kenya.",
    description: "Kenautos is Kenya's trusted online platform to buy, sell, or hire cars. Browse listings for new and used vehicles from individuals and dealers across the country.",
    images: ["https://kenautos.co.ke/og-new.jpeg"],
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  // const session = await auth(); 

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Google Analytics Scripts */}
        <Script
          strategy="afterInteractive"
          src="https://www.googletagmanager.com/gtag/js?id=G-9XNHEPWYRG"
        />
        <Script
          id="gtag-init"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}');
            `,
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gray-50`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem={false}
          disableTransitionOnChange
          forcedTheme="light"
        >
          <SessionProvider>
            {children}
          </SessionProvider>
        </ThemeProvider>
        <Toaster position="top-center" richColors />
      </body>
    </html>
    
  );
}
