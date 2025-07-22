"use client";

import ApiServices from '@/lib/apiservice';
import React, { useEffect, useState } from 'react';
import SpareCard from '../../_components/spare-card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const SpareParts = () => {
  const [ spares, setSpares ] = useState([]);
  const [ spareTypes, setSpareTypes ] = useState([]);

  useEffect(() => {
    const loadSpares = async() => {
      const data = await ApiServices.get("listings/spares/");
      setSpares(data.results);
    }
    loadSpares();
  }, []);


  useEffect(() => {
    const loadTypes = async() => {
      const data = await ApiServices.get("listings/spares_types");
      
      setSpareTypes(data);
    }
    loadTypes();
  }, []);

  return (
    <section className="flex flex-col justify-start items-start min-h-screen py-6">
      <div className="md:flex flex-row space-x-2 mb-5 hidden">
        <div className="bg-slate-200 text-sm py-1 px-3 cursor-pointer rounded-2xl">All</div>
        {spareTypes.map((item: any) => (
          <div key={item.name} className="bg-slate-200 text-sm py-1 px-3 cursor-pointer rounded-2xl">{item.name}</div>
        ))}
      </div>

      <div className='md:hidden flex'>
        <Select>
          <SelectTrigger className='w-full'>
            <SelectValue placeholder="Choose Parts Type" />
          </SelectTrigger>
          <SelectContent>
            {spareTypes.map((item: any) => (
              <SelectItem key={item.id} value={item.id}>{item.name}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {spares.map((part: any) => (
          <SpareCard key={part.id} spare={part} />
        ))}
      </div>
    </section>
  )
}

export default SpareParts