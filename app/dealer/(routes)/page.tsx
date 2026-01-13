"use client"

import React, { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter, redirect } from 'next/navigation';
import DealerApiService from '@/lib/dealer_apiservice';
import DashboardVehicleList from '../_components/dashboard_vehicle_list';
import { VehicleModel } from '@/lib/models';
import TopServiceCards from '../_components/top_service_cards';
import { DealerVehicleModel } from '@/lib/dealer_models';



const Dealer = () => {
  const {data:session, status} = useSession();
  const [ vehicles, setVehicles ] = useState([]);

  if(status == "unauthenticated"){
    redirect("/signin");
  }

  useEffect(() => {
    const loadCars = async() => {

      if(!session?.accessToken){
        throw new Error("You must be logged in.")
      }

      const res = await DealerApiService.get('dealers/vehicles/', session?.accessToken);
      setVehicles(res)
    }
    loadCars();
  }, [session]);


  return (
    <section className="min-h-screen px-5">
      
      <TopServiceCards />


      <div className="">
        {vehicles.length > 0 
          ? (
            <div>
              <div className="py-3">
                <h1 className="font-semibold text-slate-500">Your Latest Vehicles</h1>
              </div>
              {vehicles.slice(0,4).map((vehicle: DealerVehicleModel) => (
                <div key={vehicle?.listing_id}>
                  <DashboardVehicleList vehicle={vehicle} />
                </div>
              ))}
            </div>
          ) 
          : (<>
            <p>You have not uploaded any post. Start Selling</p>
          </>)}
      </div>

    </section>
  )
}

export default Dealer