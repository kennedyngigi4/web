"use client"

import Image from 'next/image'
import React from 'react'

const LoadingModal = () => {
  return (
    <section className="flex text-lg justify-center items-center font-semibold text-gray-500 h-screen">
      <Image src="/animations/car.gif" alt="Loader" width={100} height={100} />
    </section>
  )
}

export default LoadingModal