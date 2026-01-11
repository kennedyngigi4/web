import React, { Suspense } from 'react';
import { fetchAuctionVehicle, fetchVehicle } from '@/lib/api';
import { Metadata } from "next";
import LoadingModal from '@/components/modals/loading_modal';
import AuctionPageClient from './pageClient';

type AuctionSlugPageProps = {
    params: any;
}

export async function generateMetadata({ params }: AuctionSlugPageProps): Promise<Metadata> {
    const resolvedParams = await params;
    const vehicleData = await fetchAuctionVehicle(resolvedParams.vehicleSlug);

    // console.log(vehicleData);

    const year = vehicleData.year_of_make || "";
    const make = vehicleData.vehicle_make || "Car";
    const model = vehicleData.vehicle_model || "";
    const slug = vehicleData.slug || "";
    const location = vehicleData.location || "Kenya";

    const readableTitle = [year, make, model].filter(Boolean).join(" ").trim();
    const title = `${readableTitle} For Sale in Kenya on Kenautos Hub`;
    const description = `${year} ${make} ${model} vehicles for sale in ${location}. Buy, Sell or Hire a Car in Kenya. Find the best deals on ${make} ${model} vehicles for sale in ${location} on Kenautos.`;

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

    const url = `https://kenautos.co.ke/${encodeURIComponent(make)}/${encodeURIComponent(model)}/${slug}`;

    return {
        title,
        description,
        keywords: [year, make, model, location, `${make} for sale in ${location}`, `${make} ${model} for sale in ${location}`, `${year} ${make} ${model} for sale in ${location}`, `${location} yards`, "used cars", "buy, sell or hire a car in kenya", "car dealers", "cars for sale", "Kenya"].join(", "),
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


export default async function AuctionSlugPage({ params }: AuctionSlugPageProps) {
    const resolvedParams = await params;

    const vehicleData = await fetchAuctionVehicle(`${resolvedParams.vehicleSlug}`);

    console.log(vehicleData);

    return (
        <Suspense fallback={<LoadingModal />}>
            <AuctionPageClient
                vehicleData={vehicleData}

            />
        </Suspense>
    );
}