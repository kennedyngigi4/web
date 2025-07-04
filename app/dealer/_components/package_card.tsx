"use client";

import MpesaPaymentModal from '@/components/modals/mpesa_payment_modal';
import { Button } from '@/components/ui/button';
import { PackageItem } from '@/lib/models';
import React, { useState } from 'react';


interface PackageCardProps {
    item: PackageItem;
    vehicleId?: string;
}


const PackageCard = ({ item, vehicleId }: PackageCardProps) => {
    const [ showMpesaDialog, setShowMpesaDialog ] = useState(false);
    const [ selectedPackage, setSelectedPackage ] = useState<PackageItem | null>(null);

    const onclick = async(item: PackageItem) => {
        setSelectedPackage(item);
        setShowMpesaDialog(true);
    }

    const handleMpesaModalClose = async() => {
        setShowMpesaDialog(false);
    }

    return (
        <section>
            <div className="border-2 rounded-2xl relative">
                <div className="bg-orange-300 py-5 px-2 rounded-t-2xl">
                    <h1 className="font-semibold">{item.name}</h1>
                </div>
                <div className="p-2 space-y-5">
                    <div className="border-b-2 border-dotted border-slate-200 pb-3">
                        <p className='flex justify-between text-sm'><span>Power-up</span> <span className='text-orange-500'>2x more views</span></p>
                    </div>
                    <div className="border-b-2 border-dotted border-slate-200 pb-3">
                        <p className='flex justify-between text-sm'><span>Cars</span> <span className='text-orange-500'>{item?.uploads_allowed} ads</span></p>
                    </div>
                    <div className="border-b-2 border-dotted border-slate-200 pb-3">
                        <p className='flex justify-between text-sm'><span>Auto-renews</span> <span className='text-orange-500'>Every {item?.renew_after_hours}hrs</span></p>
                    </div>
                    <div className="border-b-2 border-dotted border-slate-200 pb-3">
                        <p className='flex justify-between text-sm'><span>Active days</span> <span className='text-orange-500'> {item?.active_days} days</span></p>
                    </div>
                    <div>
                        <h1 className="font-semibold text-xl text-end">KSh {parseInt(item.price).toLocaleString()}</h1>
                    </div>

                    <div className="w-full mt-8 mb-5">
                        <Button onClick={() => onclick(item)} className="w-full rounded-2xl bg-orange-400 cursor-pointer">Buy {item.name}</Button>
                    </div>
                </div>
            </div>
            {vehicleId != null ? ( 
                <MpesaPaymentModal open={showMpesaDialog} onClose={handleMpesaModalClose} subscription={item} vehicleid={vehicleId} />
            ) : (
                <MpesaPaymentModal open = { showMpesaDialog } onClose = { handleMpesaModalClose } subscription = { item } vehicleid = { null } />
            )}
            
        </section>
    );
}

export default PackageCard