// app/blog/[blogSlug]/page.tsx
import BlogSlug from "./pageClient"
import ApiServices from "@/lib/apiservice"

export async function generateMetadata({ params }: { params: { blogSlug: string } }) {
    try {
        const resp = await ApiServices.get(`marketing/blog/${params.blogSlug}`)

        // Remove HTML from content for description fallback
        const plainText = resp.content
            ? resp.content.replace(/<[^>]+>/g, "").slice(0, 160)
            : "Explore auto insights, car listings, and vehicle ownership tips on Kenautos."

        const keywords = [
            "Kenautos",
            "cars for sale in Kenya",
            "buy cars online Kenya",
            "Kenya auto market",
            "car reviews",
            resp.title,
        ].join(", ")

        return {
            title: `${resp.title} | Kenautos Blog`,
            description: resp.exerpt || plainText,
            keywords,
            openGraph: {
                title: resp.title,
                description: resp.exerpt || plainText,
                images: [{ url: resp.image || "/placeholder.png" }],
                type: "article",
            },
            twitter: {
                card: "summary_large_image",
                title: resp.title,
                description: resp.exerpt || plainText,
                images: [resp.image || "/placeholder.png"],
            },
        }
    } catch (error) {
        return {
            title: "Kenautos Blog",
            description:
                "Discover car listings, automotive insights, and motoring trends in Kenya with Kenautos.",
        }
    }
}

// Default export (render the client component)
export default function BlogDetailsPage({ params }: { params: { blogSlug: string } }) {
    return <BlogSlug params={params} />
}
