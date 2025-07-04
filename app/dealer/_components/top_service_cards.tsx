"use client"

import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { Banknote, Car, WrenchIcon } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

const TopServiceCards = () => {
  return (
    <div className='grid md:grid-cols-3 grid-cols-1 gap-8 pt-10 pb-6'>
        <Link href="/dealer/sell/vehicle">
            <Card>
                <CardContent>
                    <p><Car size={50} className="text-orange-400" /></p>
                </CardContent>
                <CardFooter className='text-center'>
                    <p className='text-gray-500 font-semibold'>Sell Vehicle</p>
                </CardFooter>
            </Card>
        </Link>

        <Link href="/dealer/sell/spare-parts">
            <Card>
                <CardContent>
                    <p><WrenchIcon size={50} className='text-orange-400' /></p>
                </CardContent>
                <CardFooter className='w-full'>
                    <p className='text-gray-500 font-semibold'>Sell Spare Parts</p>
                </CardFooter>
            </Card>
        </Link>

        <a href="https://wa.me/message/VBGK2QIY5626P1" target="_blank">
            <Card>
                <CardContent>
                    <p><Banknote size={50} className='text-orange-400' /></p>
                </CardContent>
                <CardFooter className='w-full'>
                    <p className='text-gray-500 font-semibold'>Invest in Luxury Car Hire</p>
                </CardFooter>
            </Card>
        </a>
    </div>
  )
}

export default TopServiceCards