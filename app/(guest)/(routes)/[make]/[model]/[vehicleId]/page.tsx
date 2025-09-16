import React, { Suspense } from 'react';
import VehiclePageClient from './pageClient';
import { fetchVehicle } from '@/lib/api';
import { Metadata } from "next";
import LoadingModal from '@/components/modals/loading_modal';

type VehicleIdPageProps = {
    params: any;
}

export async function generateMetadata({ params }: VehicleIdPageProps): Promise<Metadata> {
    const vehicleData = await fetchVehicle(`${params.vehicleId}`);
    
    const title = `${vehicleData.year_of_make} ${params.make} ${params.model} For Sale in Kenya on Kenautos Hub`;
    const description = `${vehicleData.year_of_make} ${params.make} ${params.model} for sale ${vehicleData.location} ${vehicleData.description}`;
    const keywords = `${vehicleData.year_of_make} ${params.make} ${params.model}, ${params.make} ${params.model} for sale ${vehicleData.location}, ${params.make} ${params.model} Kenya, used ${params.make} ${params.model} Kenya, ${params.make} ${params.model}, ${params.make} ${params.model} price Kenya, cars for sale in ${vehicleData.location}, used cars ${vehicleData.location}, affordable cars Kenya, Cars for sale Kenya, ${params.make} cars for sale Kenya, used cars for sale Kenya, buy ${params.make} ${params.model} ${vehicleData.location}, cheap cars Kenya
`
    let image = vehicleData.images?.[0]?.image || "";
    if (image && !image.startsWith("http")) {
        image = `${image}`;
    }

    // Force HTTPS for api.kenautos.co.ke images
    image = image.replace("http://api.kenautos.co.ke", "https://api.kenautos.co.ke");

    const url = `https://kenautos.co.ke/${encodeURIComponent(params.make)}/${encodeURIComponent(params.model)}/${params.vehicleId}`;


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

    return (
        <Suspense fallback={<LoadingModal />}>
            <VehiclePageClient
                vehicleData={vehicleData}
                
            />
        </Suspense>
    );
}