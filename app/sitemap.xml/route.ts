import { NextResponse } from "next/server";

export async function GET() {
    const sitemaps = [
        "https://kenautos.co.ke/sitemap-static.xml",
        "https://kenautos.co.ke/sitemap-vehicles.xml",
    ];

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
    <sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
        ${sitemaps.map((url) => `<sitemap><loc>${url}</loc></sitemap>`).join("")}
    </sitemapindex>`;

    return new NextResponse(xml, {
        headers: {
            "Content-Type": "application/xml",
        },
    });
}
