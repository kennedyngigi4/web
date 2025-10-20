"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import ApiServices from "@/lib/apiservice";
import LoadingModal from "@/components/modals/loading_modal";

const BlogSlug = ({ params }: { params: { blogSlug: string } }) => {
    const { blogSlug } = params;
    const [blog, setBlog] = useState<any>(null);

    useEffect(() => {
        const fetchBlog = async () => {
            try {
                const resp = await ApiServices.get(`marketing/blog/${blogSlug}`);
                setBlog(resp);
            } catch (err) {
                console.error("Failed to fetch blog:", err);
            }
        };
        fetchBlog();
    }, [blogSlug]);

    if (!blog) return <LoadingModal />;

    return (
        <section className="py-8 min-h-screen w-full">
            <article className="prose max-w-none">
                <div className="md:w-[70%] mx-auto">
                    {/* Blog Image */}
                    <div className="relative w-full h-[400px] rounded-lg overflow-hidden shadow-sm">
                        <Image
                            src={blog.image || "/placeholder.png"}
                            alt={blog.title || "Blog image"}
                            fill
                            className="object-cover"
                            priority
                        />
                    </div>

                    {/* Blog Header */}
                    <div className="mt-6">
                        <h1 className="text-3xl font-bold text-slate-800">{blog.title}</h1>
                        <div className="flex items-center space-x-5 py-3">
                            <p className="text-slate-500 text-sm">
                                Editor: <span className="text-orange-500">{blog.uploaded_by || "Kenautos"}</span>
                            </p>
                            <p className="text-slate-500 text-xs">
                                {new Date(blog.uploaded_at).toLocaleDateString("en-us", {
                                    year: "numeric",
                                    month: "short",
                                    day: "numeric",
                                })}
                            </p>
                        </div>
                    </div>

                    {/* Blog Content */}
                    <div
                        className="text-slate-700 [&>p]:mb-4 whitespace-pre-wrap leading-relaxed"
                        dangerouslySetInnerHTML={{ __html: blog.content }}
                    />
                </div>
            </article>
        </section>
    );
};

export default BlogSlug;
