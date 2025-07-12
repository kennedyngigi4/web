import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner"
import { ThemeProvider } from "./(guest)/_components/theme-provider";
import { SessionProvider } from "next-auth/react";

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
  keywords: "buy cars in Kenya, sell cars in Kenya, hire cars in Kenya, used cars Kenya, car marketplace Kenya, online car sales Kenya, car dealers in Kenya, new cars Kenya, car listings Kenya, vehicle marketplace Kenya",
  openGraph: {
    title: "Kenautos Hub - Buy, Sell or Hire Luxury Cars in Kenya.",
    description: "Kenautos is Kenya's trusted online platform to buy, sell, or hire cars. Browse listings for new and used vehicles from individuals and dealers across the country.",
    url: "https://kenautos.co.ke",
    siteName: "Kenautos",
    images: [
      {
        url: "https://kenautos.co.ke/og-image.png",
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
    images: ["https://kenautos.co.ke/og-image.png"],
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
        <Toaster position="top-center" richColors  />
      </body>
    </html>
  );
}
