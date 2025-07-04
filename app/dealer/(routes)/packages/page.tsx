"use client";

import { Button } from '@/components/ui/button';
import DealerApiService from '@/lib/dealer_apiservice';
import { useSession } from 'next-auth/react';
import React, { useEffect, useState } from 'react'
import PackageCard from '../../_components/package_card';
import { PackageItem } from '@/lib/models';

const Packages = () => {
  const { data:session } = useSession();
  const [ packages, setPackages ] = useState([]);

 

  useEffect(() => {
    const fetchPackages = async() => {

      if(!session?.accessToken){
        throw new Error("You must be logged in.");
      }

      const data = await DealerApiService.get("dealers/packages", session?.accessToken);
      
      setPackages(data);
    }
    fetchPackages();
  }, [session]);

  return (
    <section className="p-6">
      <div className="mb-8">
        <h1 className="font-semibold text-orange-400">Packages</h1>
        <p className="text-slate-500">Subscribe to any package and see your sales grow.</p>
      </div>

      <div className="flex md:flex-row flex-col max-md:space-y-3 justify-between items-center mb-5">
        <div>
          <Button className="bg-orange-400">Cars</Button>
        </div>
        <div className="flex space-x-4">
          <Button variant="outline">1 months</Button>
          <Button variant="outline">3 months</Button>
        </div>
      </div>
      <div className="grid lg:grid-cols-3 md:grid-cols-3 grid-cols-1 gap-5">
        {packages.map((item: PackageItem) => (
          
          <PackageCard key={item.pid}  item={item} />
          
        ))}
      </div>
    </section>
  )
}

export default Packages