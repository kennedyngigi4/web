import { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const res = await fetch("https://api.kenautos.co.ke/api/listings/all/", {
        next: { revalidate: 3600 }, 
    });

    const data = await res.json();
    const vehicles = data.results ?? []; 

    return vehicles.map((vehicle: any) => ({
        url: `https://kenautos.co.ke/${vehicle.make}/${vehicle.model}/${vehicle.slug}`,
        lastModified: vehicle.updated_at ? new Date(vehicle.updated_at) : new Date(),
        changeFrequency: "weekly",
        priority: 0.9,
    }));
}
