"use client";

import { Button } from '@/components/ui/button';
import Image from 'next/image';
import React from 'react';
import Link from 'next/link';
import DeleteModal from '@/components/modals/delete_modal';
import DealerApiService from '@/lib/dealer_apiservice';
import { useSession } from 'next-auth/react';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { DealerVehicleModel } from '@/lib/dealer_models';


interface DashboardVehicleListProps {
    vehicle: DealerVehicleModel;
}

const DashboardVehicleList = ({ vehicle } : DashboardVehicleListProps) => {
    const {data:session} = useSession();
    const formattedPrice = parseInt(vehicle.price).toLocaleString();
    const newPrice = parseInt(vehicle.price_drop).toLocaleString();
    const formattedExpires = new Date(vehicle.expires_at).toLocaleDateString("en-us", {
        year: "numeric",
        month: "short",
        day: "numeric"
    });

    const handleDelete = async() => {

        if(!session?.accessToken) return;

        const res = await DealerApiService.delete(`dealers/vehicle_delete/${vehicle.slug}`, session?.accessToken);
        if(res.success){
            toast.success(res.message, { position: "top-center" });
            window.location.reload();
        } else {
            toast.error("An error occured", { position: "top-center" })
        }
    }

  return (
    <section className="grid grid-cols-1 lg:grid-cols-12 lg:gap-9 lg:space-y-4 bg-white p-3 mb-2">
        <div className="lg:col-span-2">
            <div className="w-full lg:h-30 h-45 relative overflow-hidden rounded">
                {vehicle?.thumbnail ? (
                    <Image src={`${vehicle?.thumbnail}`} alt={`${vehicle.year_of_make} ${vehicle.vehicle_make} ${vehicle.vehicle_model}`} fill className="object-cover" sizes="(max-width: 640px) 100vw, 400px" />
                ) : (
                    <div className="flex flex-col justify-center items-center w-full h-full">
                        <p className="text-red-500">No Image</p>
                        <Link href={`/dealer/${vehicle.slug}`} className="text-sm">Click to Upload</Link>
                    </div>
                )}
                
            </div>
        </div>
        <div className="lg:col-span-5">
            <Link href="">
                <h1 className="text-orange-500 font-semibold">{vehicle?.year_of_make} {vehicle?.vehicle_make} {vehicle?.vehicle_model}</h1>
                {vehicle?.price_dropped 
                    ? (
                        <>
                            <p className="text-sm">KSh {newPrice} <span className="text-xs text-red-600 line-through">{formattedPrice}</span></p>
                        </>
                    )
                    : (
                        <>
                            <p className="text-sm">KSh {formattedPrice}</p>
                        </>
                    )
                }
            </Link>
        </div>
        <div className="lg:col-span-2">
            <div className="flex lg:flex-col flex-row lg:justify-center justify-between max-md:py-3 lg:items-center">
                <div>
                    <h1 className="text-sm">{vehicle?.clicks} Clicks</h1>
                </div>
                
            </div>
            
        </div>
        <div className="lg:col-span-3">
            <div className="flex md:flex-col flex-row justify-center items-center gap-6">
                {vehicle?.status != "published" ? (
                    <Link href={`/dealer/publish-draft/${vehicle?.vehicle_type}/${vehicle.listing_id}`}>
                        <Button size="sm" variant="outline" className='border-yellow-400 text-yellow-500 cursor-pointer'>Publish</Button>
                    </Link>
                ) : (
                    <p className="text-xs text-green-500">Expires: {formattedExpires}</p>
                )}
                <div className="flex flex-row justify-evenly items-center space-x-2">
                    <Link href={`/dealer/${vehicle.slug}`}>
                        <Button size="sm" variant="outline" className='border-green-500 text-green-500 hover:bg-green-500 hover:text-white cursor-pointer'>Edit</Button>
                    </Link>
                    
                    <DeleteModal 
                        title={`Delete`} 
                        product={`${vehicle.year_of_make} ${vehicle.vehicle_make} ${vehicle.vehicle_model}`}
                        description='Are you sure you want to delete this vehicle listing? This action cannot be undone.' 
                        onConfirm={handleDelete}
                      ><Button size="sm" variant="outline" className='border-red-500 text-red-500 hover:bg-red-500 hover:text-white cursor-pointer'>Delete</Button></DeleteModal>
                </div>
                
                
            </div>
        </div>
        
    </section>
  )
}

export default DashboardVehicleList