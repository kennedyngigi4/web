"use client"

import DeleteModal from "@/components/modals/delete_modal";
import { Button } from "@/components/ui/button";
import DealerApiService from "@/lib/dealer_apiservice";
import { VehicleModel } from "@/lib/models";
import { ColumnDef } from "@tanstack/react-table"
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { toast } from "sonner";



export const columns: ColumnDef<VehicleModel>[] = [
    {
        
        header: "Vehicle Details",
        cell: ({row}) => {
            const imageOne = row?.original?.images[0]?.image;
            const images = row?.original.images;
            const slug = row?.original?.slug;

            return (
                <div className="w-full rounded-lg h-35 relative overflow-hidden">
                    {images.length > 0 ? ( 
                        <Image src={`${process.env.NEXT_PUBLIC_IMGURL}${imageOne}`} alt="Vehicle" fill className="object-cover" />
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
            const vehicle = `${row?.original?.year_of_make} ${row?.original?.make} ${row?.original?.model}`;
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
            const status = row?.original?.status;
            const vehicle_type = row?.original?.vehicle_type;
            const listing_id = row?.original?.listing_id;
            const slug = row?.original?.slug;
            const year_of_make = row?.original?.year_of_make;
            const make = row?.original?.make;
            const model = row?.original?.model;
            const formattedExpires = new Date(row?.original?.expires_at).toLocaleDateString("en-us", {
                year: "numeric",
                month: "short",
                day: "numeric"
            });
            

            const handleDelete = async() => {
                const { data: session } = useSession();
                
                if (!session?.accessToken) {
                    throw new Error("You must be logged in.");
                }

                const res = await DealerApiService.delete(`dealers/vehicle_delete/${slug}`, session?.accessToken);
                if (res.success) {
                    toast.success(res.message, { position: "top-center" });
                    window.location.reload();
                } else {
                    toast.error("An error occured", { position: "top-center" })
                }
            }

            return (
                <div className="flex md:flex-col flex-row justify-center items-center gap-6">
                    {status != "published" ? (
                        <Link href={`/dealer/publish-draft/${vehicle_type}/${listing_id}`}>
                            <Button size="sm" variant="outline" className='border-yellow-400 text-yellow-500 cursor-pointer'>Publish</Button>
                        </Link>
                    ) : (
                        <p className="text-xs text-green-500">Expires: {formattedExpires}</p>
                    )}
                    <div className="flex flex-row justify-evenly items-center space-x-2">
                        <Link href={`/dealer/${slug}`}>
                            <Button size="sm" variant="outline" className='border-green-500 text-green-500 hover:bg-green-500 hover:text-white cursor-pointer'>Edit</Button>
                        </Link>

                        <DeleteModal
                            title={`Delete`}
                            product={`${year_of_make} ${make} ${model}`}
                            description='Are you sure you want to delete this vehicle listing? This action cannot be undone.'
                            onConfirm={handleDelete}
                        >
                            <Button size="sm" variant="outline" className='border-red-500 text-red-500 hover:bg-red-500 hover:text-white cursor-pointer'>Delete</Button>
                        </DeleteModal>
                    </div>


                </div>
                
            );
        }
    },
]
