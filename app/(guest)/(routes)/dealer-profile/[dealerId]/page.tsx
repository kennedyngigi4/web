"use client"

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import { BadgeCheck } from 'lucide-react';
import VehicleCard from '@/app/(guest)/_components/vehicle_card';
import { FaEnvelope, FaLocationDot } from 'react-icons/fa6';
import { FaFacebook, FaGlobe, FaInstagram, FaLinkedin, FaPhone, FaTiktok, FaTwitter, FaYoutube } from 'react-icons/fa';
import Link from 'next/link';

const DealerDetailsPage = () => {
  const params = useParams();
  const [ dealerData, setDealerData ] = useState<any>({});

  useEffect(() => {
    const loadData = async() => {
      const res = await fetch(`${process.env.NEXT_PUBLIC_APIURL}/listings/dealer_profile/${params?.dealerId}`);
      const data = await res.json();
      setDealerData(data);
    }
    loadData();
  }, [params]);

  return (
    <section className="pb-8 min-h-screen">
      <div className='relative h-[250px] mb-8'>
        {dealerData?.user?.business?.banner ? (
          <div className="relative h-full w-full">
            {dealerData.user.business.banner}
            <Image
              src={`${process.env.NEXT_PUBLIC_BASEURL}${dealerData.user.business.banner.startsWith('/') ? '' : '/'
                }${dealerData.user.business.banner}`}
              alt="Business banner"
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover rounded-b-xl"
              
            />
          </div>
        ) : (
          <div className="w-full h-full bg-gray-100 rounded-lg" />
        )}
      </div>
      <div className="grid md:grid-cols-12 grid-cols-1 gap-5">
        <div className="col-span-3">

          <div className="flex flex-col flex-wrap space-y-5">
            <div className="w-18 h-18 rounded-full bg-slate-100 flex justify-center items-center">
              {dealerData?.user?.image?.startsWith("http")
                ? (<><Image src={dealerData?.user?.image} alt={dealerData?.user?.name} className="w-18 h-18 rounded-full" /></>)
                : (<div className="font-bold">{dealerData?.user?.image}</div>)
              }
            </div>
            <div className="space-y-3">
              <h1 className="font-bold uppercase">{dealerData?.user?.business?.name}</h1>
              <p className="flex items-center justify-start text-xs text-green-600"><BadgeCheck className="w-5 h-5 pe-2" /> Verified</p>
              <p className="text-sm flex items-center justify-self-start"><FaPhone className='w-5 h-5 pe-2' /> {dealerData?.user?.business?.phone}</p>
              <p className="text-sm flex items-center justify-self-start"><FaEnvelope className='w-5 h-5 pe-2' /> {dealerData?.user?.business?.email}</p>
              <p className="text-sm flex items-center justify-self-start"><FaGlobe className='w-5 h-5 pe-2' /> {dealerData?.user?.business?.website}</p>
              <p className="text-sm flex items-center justify-self-start"><FaLocationDot className='w-5 h-5 pe-2' /> {dealerData?.user?.business?.address}</p>
            </div>
          </div>

          <div className="flex flex-col py-5">
            <h1 className="font-bold text-sm text-orange-400">Follow us</h1>
            <div className="flex pt-2 flex-wrap space-x-4">
              <Link href=""><FaFacebook /></Link>
              <Link href=""><FaInstagram /></Link>
              <Link href=""><FaTwitter /></Link>
              <Link href=""><FaTiktok /></Link>
              <Link href=""><FaLinkedin /></Link>
              <Link href=""><FaYoutube /></Link>
            </div>
          </div>


        </div>
        <div className="col-span-9">
          <div className="grid md:grid-cols-3 grid-cols-1 gap-4">
            {dealerData?.vehicles?.map((vehicle: any) => (
              <VehicleCard key={vehicle?.listing_id} vehicle={vehicle} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default DealerDetailsPage