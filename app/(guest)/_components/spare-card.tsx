"use client";

import React from 'react';
import { SparePart } from '@/lib/models';
import { Card, CardContent } from '@/components/ui/card';
import Link from 'next/link';
import Image from 'next/image';

interface SpareCardProps {
    spare: SparePart;
}

const SpareCard = ({ spare }: SpareCardProps) => {
  return (
    <Card className="p-3 shadow-sm hover:shadow-lg bg-background relative">
      <CardContent className="p-0 ">
       
        <Link href={`/spare-parts/${spare?.id}`}>
          <div className="w-[250px] sm:h-45 h-38 relative overflow-hidden">
            {String(spare?.images[0].image).startsWith("http") ? (
              <Image
                src={spare?.images[0].image}
                alt={`${spare?.title} ${spare?.make} ${spare?.model} for sale at Kenautos Hub Nairobi, Kenya. Buy, Sell and Trade your car in Kenya. Car dealers in kenya. Leading trusted online car marketplace in Kenya.`}
                fill
                className="rounded-lg object-cover"
                sizes="(max-width: 640px) 100vw, 400px"
              />
            ) : (
              <Image
                  src={`http:127.0.0.1:8000${spare?.images[0].image}`}
                  alt={`${spare?.title} ${spare?.make} ${spare?.model} for sale at Kenautos Hub Nairobi, Kenya. Buy, Sell and Trade your car in Kenya. Car dealers in kenya. Leading trusted online car marketplace in Kenya.`}
                fill
                className="rounded-lg object-cover"
                sizes="(max-width: 640px) 100vw, 400px"
              />
            )}

          </div>
          <div className="flex flex-col pt-3">
            <h1 className="font-semibold truncate max-sm:text-sm capitalize">{spare?.title}</h1>
            <h1 className="font-extrabold text-orange-400 max-sm:text-sm">KSh. {parseInt(spare?.price).toLocaleString()}</h1>
            <div className='md:flex md:flex-row flex-wrap justify-between hidden pt-2'>
              <p className="text-xs flex items-center justify-center capitalize bg-slate-100 py-1 px-2 rounded-2xl">{spare.condition}</p> 
            </div>
          </div>
        </Link>
      </CardContent>
    </Card>
  )
}

export default SpareCard