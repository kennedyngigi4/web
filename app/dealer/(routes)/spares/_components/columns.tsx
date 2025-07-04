"use client"

import DeleteModal from "@/components/modals/delete_modal";
import { Button } from "@/components/ui/button";
import { SparePart } from "@/lib/models";
import { ColumnDef } from "@tanstack/react-table"
import { Check, Ellipsis, Info, MoveDown, Trash2 } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.



export const columns: ColumnDef<SparePart>[] = [
    {

        header: "Details",
        accessorKey: "title",
        cell: ({ row }) => {
            const title = row?.original?.title;
            const make = row?.original?.make;
            const model = row?.original?.model;
            const image = row?.original.images[0].image;

            return (
                <>
                    <div className="h-35 w-[90%] relative">
                        <Image src={`http://127.0.0.1:8000${image}`} alt="" fill className="object-cover" />
                    </div>
                    <p className="font-semibold pt-2 first-letter:capitalize lower">{title}</p>
                    
                </>
                
            );
        }
    },
    {

        header: "Price",
        cell: ({ row }) => {
            const price = row?.original?.price;
            return (
                <div className="">
                    <p>KSh {parseInt(price).toLocaleString()}</p>
                </div>
            );
        }
    },
    {

        header: "Condition",
        cell: ({ row }) => {
            const condition = row?.original?.condition;
            return (
                <div className="">
                    <p className="capitalize">{condition}</p>
                </div>
            );
        }
    },
    {

        header: "Action",
        cell: ({ row }) => {

            const id = row?.original?.id;
            const title = row.getValue("title");
            const status = row?.original?.status;
            const vehicle_type = row?.original.vehicle_type;
            const formattedExpires = new Date(row?.original?.expires_at).toLocaleDateString("en-us", {
                year: "numeric",
                month: "short",
                day: "numeric"
            })

            const handleDelete = async() => {

            }

            return (
                <div className="flex md:flex-col flex-row justify-center items-center gap-6">
                    {status != "published" ? (
                        <Link href={`/dealer/publish-draft/${vehicle_type}/${id}`}>
                            <Button size="sm" variant="outline" className='border-yellow-400 text-yellow-500 cursor-pointer'>Publish</Button>
                        </Link>
                    ) : (
                        <p className="text-xs text-green-500">Expires: {formattedExpires}</p>
                    )}
                    <div className="flex flex-row gap-5">
                        <Link href={`/dealer/spares/${id}`}>
                            <Button size="sm" variant="outline" className="border-green-500 hover:bg-green-500 hover:text-white cursor-pointer text-green-500">Edit</Button>
                        </Link>
                        <DeleteModal 
                            children={<Button size="sm" variant="outline" className='border-red-500 text-red-500 hover:bg-red-500 hover:text-white cursor-pointer'>Delete</Button>}
                            title={`Delete`}
                            product={`${title}`}
                            description='Are you sure you want to delete this spare part from your listing? This action cannot be undone.'
                            onConfirm={handleDelete}
                        />
                    </div>
                </div>
            );
        }
    },
    
]
