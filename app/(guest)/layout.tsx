"use client"

import React from 'react';
import Navbar from './_components/navbar';
import Footer from './_components/footer';
import ProgressBar from './_components/progress-bar';

const GuestLayout = ({
    children
} : { children: React.ReactNode }) => {
  return (
    <section className="w-full">
      {/* <ProgressBar  /> */}
      <Navbar />
      <main className="md:px-[50px] px-[20px]">
        {children}
      </main>
      <Footer />
    </section>
  )
}

export default GuestLayout