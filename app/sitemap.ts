import { MetadataRoute } from "next";


export default async function sitemap(): Promise<MetadataRoute.Sitemap> {


    const res = await fetch("https://api.kenautos.co.ke/api/listings/all/", {
        next: { revalidate: 60 },
    });
    const vehicles = await res.json();


    const staticRoutes: MetadataRoute.Sitemap = [
        {
            url: 'https://kenautos.co.ke',
            lastModified: new Date(),
            changeFrequency: 'daily',
            priority: 1,
        },
        {
            url: 'https://kenautos.co.ke/cars',
            lastModified: new Date(),
            changeFrequency: 'daily',
            priority: 1,
        },
        {
            url: 'https://kenautos.co.ke/bikes',
            lastModified: new Date(),
            changeFrequency: 'daily',
            priority: 1,
        },
        {
            url: 'https://kenautos.co.ke/trucks',
            lastModified: new Date(),
            changeFrequency: 'daily',
            priority: 0.9,
        },
        {
            url: 'https://kenautos.co.ke/spare-parts',
            lastModified: new Date(),
            changeFrequency: 'daily',
            priority: 0.9,
        },
        {
            url: 'https://kenautos.co.ke/find-me-car',
            lastModified: new Date(),
            changeFrequency: 'daily',
            priority: 1,
        },
        {
            url: 'https://kenautos.co.ke/car-hire',
            lastModified: new Date(),
            changeFrequency: 'daily',
            priority: 1,
        },
        {
            url: 'https://kenautos.co.ke/frequently-asked-questions',
            lastModified: new Date(),
            changeFrequency: 'daily',
            priority: 0.5,
        },
        {
            url: 'https://kenautos.co.ke/about-us',
            lastModified: new Date(),
            changeFrequency: 'daily',
            priority: 0.8,
        },
        {
            url: 'https://kenautos.co.ke/partnership-relations',
            lastModified: new Date(),
            changeFrequency: 'daily',
            priority: 0.8,
        }
    ]


    // dynamic routes
    const dynamicRoutes: MetadataRoute.Sitemap = vehicles.map((vehicle: any) => ({
        url: `https://kenautos.co.ke/${vehicle.make}/${vehicle.model}/${vehicle.slug}`,
        lastModified: vehicle.updated_at ? new Date(vehicle.updated_at) : new Date(),
        changeFrequency: "weekly",
        priority: 0.9,
    }))

    return [...staticRoutes, ...dynamicRoutes]
}

