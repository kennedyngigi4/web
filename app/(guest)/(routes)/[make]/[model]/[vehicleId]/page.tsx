import React, { Suspense } from 'react';
import VehiclePageClient from './pageClient';
import { fetchVehicle } from '@/lib/api';
import { Metadata } from "next";
import LoadingModal from '@/components/modals/loading_modal';

type VehicleIdPageProps = {
    params: any;
}

export async function generateMetadata({ params }: VehicleIdPageProps): Promise<Metadata> {
    const resolvedParams = await params;
    const vehicleData = await fetchVehicle(resolvedParams.vehicleId);

    console.log(vehicleData);

    const year = vehicleData.year_of_make || "";
    const make = vehicleData.make || "Car";
    const model = vehicleData.model || "";
    const location = vehicleData.location || "Kenya";

    const readableTitle = [year, make, model].filter(Boolean).join(" ").trim();
    const title = `${readableTitle} For Sale in Kenya on Kenautos Hub`;
    const description = `Find the best deals on ${make} ${model} vehicles for sale in ${location} on Kenautos Hub.`;

    // ✅ Prefer thumbnail (watermarked)
    let image =
        vehicleData.thumbnail_image ||
        vehicleData.images?.[0]?.thumbnail ||
        vehicleData.images?.[0]?.image ||
        "";

    if (image && image.startsWith("http://")) {
        image = image.replace("http://", "https://");
    }
    image = image.replace("http://api.kenautos.co.ke", "https://api.kenautos.co.ke");

    const url = `https://kenautos.co.ke/${encodeURIComponent(make)}/${encodeURIComponent(model)}/${resolvedParams.vehicleId}`;

    return {
        title,
        description,
        keywords: [make, model, location, "used cars", "cars for sale", "Kenya"].join(", "),
        openGraph: {
            title,
            description,
            images: [{ url: image }],
            url,
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
    const resolvedParams = await params;

    const vehicleData = await fetchVehicle(`${resolvedParams.vehicleId}`);

    return (
        <Suspense fallback={<LoadingModal />}>
            <VehiclePageClient
                vehicleData={vehicleData}
                
            />
        </Suspense>
    );
}