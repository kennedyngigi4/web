"use client"

import DeleteModal from "@/components/modals/delete_modal";
import { Button } from "@/components/ui/button";
import DealerApiService from "@/lib/dealer_apiservice";
import { VehicleListModel } from "@/lib/models";
import { ColumnDef } from "@tanstack/react-table"
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { toast } from "sonner";



export const columns: ColumnDef<VehicleListModel>[] = [
    {
        
        header: "Vehicle Details",
        cell: ({row}) => {
            const thumbnail = row?.original?.thumbnail;
            const slug = row?.original?.slug;

            return (
                <div className="w-full rounded-lg h-35 relative overflow-hidden">
                    
                    {thumbnail ? ( 
                        <Image src={`${thumbnail}`} alt="Vehicle" fill className="object-cover" />
                    ) : (
                        <div className="flex flex-col justify-center items-center w-full h-full">
                            <p className="text-red-500">No Image</p>
                            <Link href={`/dealer/${slug}`} className="text-sm">Click to Upload</Link>
                        </div>
                    )}
                    
                </div>
            );
        }
    },
    {
        accessorKey: "model",
        header: "",
        cell: ({ row }) => {
            const vehicle = `${row?.original?.year_of_make} ${row?.original?.vehicle_make } ${row?.original?.vehicle_model }`;
            const formattedPrice = parseInt(row?.original?.price).toLocaleString();
            const priceDropped = row?.original?.price_dropped;
            const newPrice = parseInt(row?.original?.price_drop).toLocaleString();

            return(
                <div>
                    <p className="font-semibold text-orange-500">{vehicle}</p>
                    {priceDropped ? (
                        <div>
                            <p className="text-sm">KSh {newPrice}<span className="text-xs text-red-600 line-through">{formattedPrice}</span></p>
                        </div>
                    ) : (
                        <div>
                            <p className="text-sm">KSh {formattedPrice}</p>
                        </div>
                    )}
                    
                </div>
            );
        }
    },
    {
        accessorKey: "",
        header: "Stats",
        cell: ({row}) => {
            const clicks = row?.original?.clicks;
            return(
                <p className="text-xs">{clicks} Clicks</p>
            );
        }
    },
    
    {
        accessorKey: "amount",
        header: "Actions",
        cell: ({row}) => {
            const slug = row?.original?.slug;
    
            return (
                <div className="flex md:flex-col flex-row justify-center items-center gap-6">
                    
                    <div className="flex flex-row justify-evenly items-center space-x-2">
                        <Link href={`/dealer/${slug}`}>
                            <Button size="sm" variant="outline" className='border-green-500 text-green-500 hover:bg-green-500 hover:text-white cursor-pointer'>Edit</Button>
                        </Link>

                        
                    </div>


                </div>
                
            );
        }
    },
]
