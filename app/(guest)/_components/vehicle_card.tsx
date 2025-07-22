"use client"

import { VehicleModel } from '@/lib/models';
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowDown } from 'lucide-react';

interface VehicleCardProps{
    vehicle: VehicleModel
}

const VehicleCard = ({ vehicle }: VehicleCardProps) => {
  return (
    
    <Card className="p-3 shadow-sm hover:shadow-lg bg-background relative">
        <CardContent className="p-0 ">
            {vehicle?.price_dropped && (
                <div className="absolute top-0 right-0 bg-red-600 z-10 p-1 rounded">
                    <p className="text-white text-xs flex"><ArrowDown size={15  } /> Price Dropped</p>
                </div>
            )}
            <Link href={`/${vehicle?.make}/${vehicle?.model}/${vehicle?.slug}`}>
                <div className="w-full sm:h-55 h-55 relative overflow-hidden">
                    {vehicle?.images.length > 0 ? ( <> 
                        { String(vehicle?.images[0].image).startsWith("http") ? (
                            <Image
                                src={vehicle?.images[0].image}
                                alt={`${vehicle?.year_of_make} ${vehicle?.make} ${vehicle?.model} for sale at Kenautos Hub Nairobi, Kenya. Buy, Sell and Trade your car in Kenya. Car dealers in kenya. Leading trusted online car marketplace in Kenya.`}
                                fill
                                className="rounded-lg object-cover"
                                sizes="(max-width: 640px) 100vw, 400px"
                            />
                        ) : (
                            <Image
                                src={`${process.env.NEXT_PUBLIC_IMGURL}${vehicle?.images[0].image}`}
                                alt={`${vehicle?.year_of_make} ${vehicle?.make} ${vehicle?.model} for sale at Kenautos Hub Nairobi, Kenya. Buy, Sell and Trade your car in Kenya. Car dealers in kenya. Leading trusted online car marketplace in Kenya.`}
                                fill
                                className="rounded-lg object-cover"
                                sizes="(max-width: 640px) 100vw, 400px"
                            />
                        )}
                    </>) : (<>
                        <p>Images coming soon.</p>
                    </>)}
                    
                </div>
                <div className="flex flex-col pt-3">
                    <h1 className="font-semibold truncate max-sm:text-sm">{vehicle?.year_of_make} {vehicle?.make} {vehicle?.model}</h1>
                    {vehicle?.price_dropped ?
                        (<>
                            <h1 className="text-orange-500 font-normal truncate text-lg">KSh. {parseInt(vehicle?.price_drop).toLocaleString()} <span className="text-red-600 text-sm line-through font-normal">KSh. {parseInt(vehicle?.price).toLocaleString()}</span></h1>
                        </>)
                        :
                        (<>
                            <h1 className="text-orange-500 font-normal text-lg">KSh. {parseInt(vehicle?.price).toLocaleString()}</h1>
                        </>)
                    }
                    <div className='md:flex md:flex-row flex-wrap justify-between hidden pt-2'>
                        <p className="text-xs flex items-center justify-center bg-slate-200 py-1 px-2 rounded-2xl">{vehicle.drive}</p>
                        <p className="text-xs flex items-center justify-center bg-slate-100 py-1 px-2 rounded-2xl">{vehicle.fuel}</p>
                        <p className="text-xs flex items-center justify-center bg-slate-100 py-1 px-2 rounded-2xl">{vehicle.engine_capacity}cc</p>
                        <p className="text-xs md:flex items-center hidden justify-center bg-slate-100 py-1 px-2 rounded-2xl">{vehicle.transmission}</p>
                    </div>
                </div>
            </Link>
        </CardContent>
    </Card>
  )
}

export default VehicleCard