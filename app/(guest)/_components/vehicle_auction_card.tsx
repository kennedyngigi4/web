"use client"

import { VehicleListModel } from '@/lib/models';
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowDown } from 'lucide-react';

interface VehicleCardProps{
    vehicle: VehicleListModel;
}

const VehicleAuctionCard = ({ vehicle }: VehicleCardProps) => {
    
  return (
    
      <Card className="p-3 shadow-sm hover:shadow-lg bg-background relative">
          {vehicle?.display_type === "auction" && (
              <div className="absolute top-0 left-0 z-30">
                  <div className='bg-orange-400 py-1 px-3 rounded-r-lg flex items-center'>
                      <span className="relative flex h-2 w-2">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
                      </span>
                      {vehicle.display_type === "auction" && (
                          <p className='capitalize text-xs font-semibold text-white ps-1'>Auction</p>
                      )}

                  </div>
              </div>
          )}
          <CardContent className="p-0 ">

              {/* {vehicle?.price_dropped && (
                <div className="absolute top-0 right-0 bg-red-600 z-10 p-1 rounded">
                    <p className="text-white text-xs flex"><ArrowDown size={15  } /> Price Dropped</p>
                </div>
            )} */}
              <Link href={`/auctions/${vehicle?.slug}`}>
                  <div className="w-full sm:h-55 h-55 relative overflow-hidden">

                      {vehicle?.thumbnail ? (<>
                          <Image
                              src={vehicle?.thumbnail}
                              alt={`${vehicle?.year_of_make} ${vehicle?.vehicle_make} ${vehicle?.vehicle_model} for sale at Kenautos Hub Nairobi, Kenya. Buy, Sell or Hire a Car in Kenya. Car dealers in kenya. Leading trusted online car marketplace in Kenya.`}
                              fill
                              className="rounded-lg object-cover"
                              sizes="(max-width: 640px) 100vw, 400px"
                          />

                      </>) : (<>
                          <p>Images coming soon.</p>
                      </>)}

                  </div>
                  <div className="flex flex-col pt-3">
                      <h1 className="font-semibold truncate max-sm:text-sm">{vehicle?.year_of_make} {vehicle?.vehicle_make} {vehicle?.vehicle_model}</h1>
                      {vehicle?.price_dropped ?
                        (<>
                            <h1 className="text-orange-500 font-normal truncate">KSh. {parseInt(vehicle?.price_drop).toLocaleString()} <span className="text-red-600 text-sm line-through font-normal">KSh. {parseInt(vehicle?.price).toLocaleString()}</span></h1>
                        </>)
                        :
                        (<>
                            <h1 className="text-orange-500 font-normal">KSh. {parseInt(vehicle?.price).toLocaleString()}</h1>
                        </>)
                    }
                      <div className='md:flex md:flex-row flex-wrap justify-between hidden pt-2'>
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

export default VehicleAuctionCard