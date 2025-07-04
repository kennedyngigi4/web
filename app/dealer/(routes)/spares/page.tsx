"use client";

import React, { useEffect, useState } from 'react';
import { DataTable } from './_components/data-table';
import { columns } from './_components/columns';
import DealerApiService from '@/lib/dealer_apiservice';
import { useSession } from 'next-auth/react';

const SpareParts = () => {
  const { data:session, status } = useSession();
  const [ spares, setSpares ] = useState([]);

  useEffect(() => {
    const loadSpares = async() => {

      if(!session?.accessToken){
        throw new Error("You must be logged in.")
      }

      const data = await DealerApiService.get(`dealers/my_spares/`, session?.accessToken);
      console.log(data);
      setSpares(data);
    }
    loadSpares();
  }, [session]);

  return (
    <section className="py-7 md:w-[1000px] w-screen px-5 mx-auto min-h-screen">
          <div className="flex flex-col">
            <h5 className="text-xl font-semibold">My Spare Parts</h5>
            <p className="text-slate-500 text-sm">Here is a list of all spare parts that you have uploaded.</p>
          </div>
          
          
          <div className="lg:w-[1000px] w-screen lg:px-5 mx-auto mt-8">
            <DataTable columns={columns} data={spares} />
          </div>
        </section>
  )
}

export default SpareParts