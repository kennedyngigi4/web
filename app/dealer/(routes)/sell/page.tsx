"use client"

import React from 'react'
import TopServiceCards from '../../_components/top_service_cards'

const Sell = () => {
  return (
    <section className="px-6 py-15">
        <h1 className="text-lg text-orange-400 font-semibold">What would you like to sell?</h1>
        <TopServiceCards />
    </section>
  )
}

export default Sell