import React, { Suspense } from 'react';
import VehiclePageClient from './pageClient';
import { fetchVehicle } from '@/lib/api';
import { VehicleModel } from '@/lib/models';
import { Metadata } from "next";
import LoadingModal from '@/components/modals/loading_modal';

type VehicleIdPageProps = {
    params: any;
}

export async function generateMetadata({ params }: VehicleIdPageProps): Promise<Metadata> {
    const vehicleData = await fetchVehicle(`${params.vehicleId}`);
    const title = `${vehicleData.year_of_make} ${vehicleData.make} ${vehicleData.model} For sale | Kenautos Hub Your Trusted Car Marketplace in Nairobi Kenya`;
    const description = vehicleData.description;
    const keywords = `${vehicleData.year_of_make} ${vehicleData.make} ${vehicleData.model} car dealers, car sales, sell car in Nairobi Kenya, buy car in Nairobi Kenya`;
    let image = vehicleData.images?.[0]?.image || "";
    if (image && !image.startsWith("http")) {
        image = `https://kenautos.co.ke${image}`;
    }
    const url = `https://kenautos.co.ke/${encodeURIComponent(vehicleData.make)}/${encodeURIComponent(vehicleData.model)}/${vehicleData.listing_id}`;


    return {
        title,
        description,
        keywords: [keywords], // this will generate <meta name="keywords">
        openGraph: {
            type: "website",
            url,
            title,
            description,
            images: [
                {
                    url: image,
                },
            ],
        },
        twitter: {
            card: "summary_large_image",
            title,
            description,
            images: [image],
        },
    };
}

export default async function VehicleIdPage({ params }: VehicleIdPageProps) {
    const vehicleData = await fetchVehicle(`${params.vehicleId}`);

    console.log(vehicleData);

    return (
        <Suspense fallback={<LoadingModal />}>
            <VehiclePageClient
                vehicleData={vehicleData}
                params={params}
            />
        </Suspense>
    );
}