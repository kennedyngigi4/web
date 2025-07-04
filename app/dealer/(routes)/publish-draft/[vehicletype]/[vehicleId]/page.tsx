"use client";

import PackageCard from '@/app/dealer/_components/package_card';
import DealerApiService from '@/lib/dealer_apiservice';
import { PackageItem } from '@/lib/models';
import { useSession } from 'next-auth/react';
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react'

const PublishDraft = () => {
    const params = useParams();

    const { data:session, status } = useSession();
    const [ packages, setPackages ] = useState([]);
    useEffect(() => {
        const fetchPackages = async() => {
            const data = await DealerApiService.get("dealers/packages", session?.accessToken);
            
            setPackages(data);
        }
    fetchPackages();
    }, [session]);

    return (
        <section className="p-6 flex flex-col space-y-8">
            <h1 className="text-center font-semibold text-2xl">Publish your vehicle</h1>

            <div className="grid lg:grid-cols-3 md:grid-cols-3 grid-cols-1 gap-5">
                {packages.map((item: PackageItem) => (
                    <PackageCard key={item.pid}  item={item} vehicleId={params?.vehicleId as string}  />  
                ))}
            </div>
        </section>
    )
}

export default PublishDraft