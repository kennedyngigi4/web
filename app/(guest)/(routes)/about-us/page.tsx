import Image from 'next/image'
import React from 'react'

const AboutUs = () => {
  return (
    <section className="p-6 min-h-screen">
      <section className="flex flex-col md:flex-row md:gap-10 pb-10">
        <div className="w-full md:w-1/2">
          <h1 className="text-2xl font-semibold mb-4 text-orange-500">About Us</h1>
          <p className="mb-4">
            Kenautos is Kenya's leading online marketplace for buying, selling, and hiring cars, bikes, and trucks. Whether you're searching for a reliable daily ride, a heavy-duty truck, or a stylish bike, Kenautos connects you with thousands of listings from individuals, dealers, and showrooms across the country.
          </p>
          <p className="mb-4">
            Our platform makes it easy to find and compare vehicles, explore market prices, and connect directly with sellers. Whether you're a first-time buyer or a seasoned car enthusiast, Kenautos helps you make informed decisions with ease.
          </p>
          <p>
            Need something special for a big day or event? Explore our luxury car hire service and enjoy access to premium vehicles for weddings, corporate functions, and VIP transport—without the hassle.
          </p>
        </div>
        <div className="w-full md:w-1/2 relative min-h-[300px]">
          <Image src="/images/about.png" alt="Kenautos" fill className="object-cover rounded" />
        </div>
      </section>

      <section className="relative w-full h-[400px] md:h-[500px]">
        {/* Background image */}
        <div className="absolute inset-0 rounded-2xl">
          <Image
            src="/images/mission.jpg"
            alt="Mission background"
            fill
            className="object-cover rounded-2xl"
          />
          <div className="absolute inset-0 bg-black/70 rounded-2xl" />
        </div>

        {/* Mission text */}
        <div className="relative h-full flex justify-end items-center">
          <div className="w-full md:w-1/2 p-8 md:p-12 text-white">
            <h2 className="text-3xl font-bold mb-4">Our Mission</h2>
            <p className="text-lg leading-relaxed">
              To make vehicle ownership and access easier for everyone in Kenya by providing a trusted
              platform to buy, sell, or hire cars, bikes, and trucks—empowering users with choice,
              convenience, and confidence.
            </p>
          </div>
        </div>
      </section>
    </section>
  )
}

export default AboutUs