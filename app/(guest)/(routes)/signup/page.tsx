import React from 'react'
import SignUpClient from './pageClient'
import { Metadata } from 'next';


export const metadata: Metadata = {
  title: "Sell Cars Faster with Kenautos – Free Car & Spare Parts Listings in Kenya",
  description: "Join Kenautos today to buy or sell cars and spare parts across Kenya. Connect with trusted car dealers, brokers, and auto part sellers. Create your free account and start listing or browsing instantly!",
  keywords: "Buy cars in Kenya, Sell cars in Kenya, Car marketplace Kenya, Car hire services Kenya, Spare parts Kenya, Car dealers in Kenya, Second-hand cars Kenya, Car listing platform Kenya, Kenya automotive marketplace, Where to buy cars in Kenya, How to sell a car online in Kenya, Affordable car hire Kenya, Genuine spare parts for sale Kenya, Online car sales platform Kenya, Used cars Nairobi, Car hire companies in Kenya, Best place to buy car parts Kenya, Trusted car brokers Kenya, List car for free Kenya, Car dealership platform Kenya, List cars for sale as dealer Kenya, Auto spare parts dealer Kenya, Car hire business Kenya, Car sales agents in Kenya, Used cars Nairobi, Car hire in Mombasa, Spare parts in Kisumu, Buy Toyota in Nakuru, Car sales Eldoret.",
  openGraph: {
    title: "Sell Cars Faster with Kenautos – Free Car & Spare Parts Listings in Kenya",
    description: "Join Kenautos today to buy or sell cars and spare parts across Kenya. Connect with trusted car dealers, brokers, and auto part sellers. Create your free account and start listing or browsing instantly!",
    url: "https://kenautos.co.ke/signup",
    siteName: "Kenautos",
    images: [
      {
        url: "https://kenautos.co.ke/og-signup.png",
        width: 1200,
        height: 630,
        alt: "Sell Cars Faster with Kenautos – Free Car & Spare Parts Listings in Kenya",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sell Cars Faster with Kenautos – Free Car & Spare Parts Listings in Kenya",
    description: "Join Kenautos today to buy or sell cars and spare parts across Kenya.Connect with trusted car dealers, brokers, and auto part sellers.Create your free account and start listing or browsing instantly!",
    images: ["https://kenautos.co.ke/og-signup.png"],
  },
};

const Signup = () => {
  return (
    <section>
      <SignUpClient />
    </section>
  )
}

export default Signup