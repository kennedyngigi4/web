"use client";

import LoadingModal from '@/components/modals/loading_modal';
import { VehicleModel } from '@/lib/models';
import React, { useEffect, useState } from 'react';
import VehicleAuctionCard from '../../_components/vehicle_auction_card';

const Auctions = () => {
  const [isloading, setIsLoading] =useState(true);
  const [auctions, setAuctions] = useState([]);

  useEffect(() => {
    const fetchAuctions = async() => {
      const response = await fetch(`${process.env.NEXT_PUBLIC_APIURL}/listings/auctions/`);
      const data = await response.json();
      setAuctions(data);
      if(auctions.length >= 0){
        setIsLoading(false);
      }
      
    }
    fetchAuctions();
  }, []);

  if(isloading){
    return <div className="flex flex-col justify-center items-center space-y-0 relative">
      <LoadingModal />
      <p className='absolute pt-40'>No auctions at the moment</p>
    </div>
  }

  return (
    <section className='min-h-screen'>
      <div className='pt-10 pb-10'>
        <h1 className="text-2xl text-orange-500 font-bold">Car Auctions in Kenya – Buy Used & Salvage Cars Online</h1>
        <p></p>
      </div>

      <div>
        <div className="grid lg:grid-cols-4 md:grid-cols-3 grid-cols-1 gap-6 mb-4">
          {auctions.map((vehicle: VehicleModel) => (
            <div key={vehicle.listing_id} className="">
              <VehicleAuctionCard vehicle={vehicle} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Auctions