"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import ApiServices from "@/lib/apiservice";
import LoadingModal from "@/components/modals/loading_modal";


const BlogSlug = ({ params }: { params: Promise<{ blogSlug: string }> }) => {
    const { blogSlug } = React.use(params);
    const [blog, setBlog] = useState<any>(null);

    useEffect(() => {
        const fetchBlog = async () => {
            const resp = await ApiServices.get(`marketing/blog/${blogSlug}`);
            setBlog(resp);
        };
        fetchBlog();
    }, [blogSlug]);

    if (!blog) {
        return <LoadingModal />;
    }

    return (
        <section className="py-8 min-h-screen w-full">
            <article className="prose max-w-none">
            <div className="md:w-[70%] mx-auto">
                <div className="relative w-full h-[400px]">
                    {blog.image ? (
                        <Image
                            src={blog.image}
                            alt={blog.title}
                            fill
                            className="object-contain"
                        />
                    ) : (
                        <Image
                            src="/placeholder.png" 
                            alt="Placeholder"
                            fill
                            className="object-cover"
                        />
                    )}
                </div>
                
                <div>
                    <h1 className="text-3xl font-bold mt-4 text-slate-700">{blog.title}</h1>
                    <div className="flex justify-items-start space-x-50 py-5">
                        <p className="text-slate-500 text-sm">Editor <span className="text-orange-500">Mike</span></p>
                        <p className="text-slate-500 text-xs">{new Date(blog.uploaded_at).toLocaleDateString("en-us", { year: "numeric", month: "short", day: "numeric"})}</p>
                    </div>

                    <div className="text-slate-600" dangerouslySetInnerHTML={{ __html: blog.content}}>
                        
                    </div>
                </div>
            </div>
            </article>
        </section>
    );
};

export default BlogSlug;
