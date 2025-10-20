import { Metadata } from "next";
import PageClient from "./pageClient";
import ApiServices from "@/lib/apiservice";

interface BlogPageProps {
    params: Promise<{ blogSlug: string }>;
}

export async function generateMetadata({ params }: BlogPageProps): Promise<Metadata> {
    const { blogSlug } = await params;
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_APIURL}/marketing/blog/${blogSlug}/`, {
            method: "GET",
            headers: { "Content-Type": "application/json" },
            cache: "no-store", 
        });
        if (!res.ok) throw new Error("Failed to fetch blog");

        const blog = await res.json();

        return {
            title: blog?.title || "Kenautos Blog",
            description:
                blog?.exerpt ||
                "Explore the latest car news, auto tips, and insights from Kenautos.",
            keywords: [
                blog?.category,
                "Kenautos",
                "Car News",
                "Car Blogs",
                "Automotive",
                "Car Hire Kenya",
                "Vehicle Deals",
            ].filter(Boolean),
            openGraph: {
                title: blog?.title,
                description: blog?.exerpt,
                images: blog?.image ? [blog.image] : ["/placeholder.png"],
                type: "article",
                url: `${process.env.NEXT_PUBLIC_APP_URL}/car-blogs-news/${blog.slug}/`,
            },
            twitter: {
                card: "summary_large_image",
                title: blog?.title,
                description: blog?.exerpt,
                images: [blog?.image || "/placeholder.png"],
            },
        };
    } catch (error) {
        console.error("SEO metadata error:", error);
        return {
            title: "Kenautos Blog",
            description:
                "Explore the latest automotive insights and stories from Kenautos.",
        };
    }
}

export default async function BlogDetailsPage({ params }: BlogPageProps) {
    const { blogSlug } = await params; 

    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_APIURL}/marketing/blog/${blogSlug}/`, {
            method: "GET",
            headers: { "Content-Type": "application/json" },
            cache: "no-store",
        });
        if (!res.ok) {
            return (
                <section className="min-h-screen flex items-center justify-center text-gray-600">
                    <p>Blog not found.</p>
                </section>
            );
        }

        const blog = await res.json();
        return <PageClient blog={blog} />;
    } catch (error) {
        console.error("Blog fetch error:", error);
        return (
            <section className="min-h-screen flex items-center justify-center text-gray-600">
                <p>Unable to load this blog at the moment. Please try again later.</p>
            </section>
        );
    }
}
