"use client"

import DealerApiService from '@/lib/dealer_apiservice';
import React, { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react';
import { DataTable } from './_components/data-table';
import { columns } from './_components/columns';

const MyCars = () => {
  const { data:session } = useSession();
  const [ vehicles, setVehicles ] = useState([]);

  

  useEffect(() => {
    const getCars = async () => {

      if(!session?.accessToken){
        throw new Error("You must be logged in.");
      }

      const res = await DealerApiService.get('dealers/vehicles/', session?.accessToken);
      setVehicles(res);
    }
    getCars();
  },[session]);

  return (
    <section className="py-7 md:w-[1000px] w-screen px-5 mx-auto min-h-screen">
      <div className="flex flex-col">
        <h5 className="font-semibold">All Vehicles</h5>
        <p className="text-slate-500 text-sm">Here is a list of all vehicles that you have uploaded.</p>
      </div>
      
      
      <div className="lg:w-[1000px] w-screen lg:px-5 mx-auto mt-8">
        <DataTable columns={columns} data={vehicles} />
      </div>
    </section>
  )
}

export default MyCars