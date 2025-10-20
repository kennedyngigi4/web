"use client";

import Image from "next/image";

interface BlogProps {
    blog: {
        id: number;
        title: string;
        slug: string;
        category?: string;
        image?: string;
        exerpt?: string;
        content: string;
        uploaded_at: string;
        uploaded_by?: string;
    };
}

const PageClient = ({ blog }: BlogProps) => {
    return (
        <section className="py-8 min-h-screen w-full">
            <article className="prose prose-slate max-w-none">
                <div className="md:w-[70%] mx-auto">
                    {/* --- Blog Image --- */}
                    <div className="relative w-full h-[400px] rounded-lg overflow-hidden shadow-sm">
                        <Image
                            src={blog.image || "/placeholder.png"}
                            alt={blog.title}
                            fill
                            className="object-cover"
                            priority
                        />
                    </div>

                    {/* --- Blog Title --- */}
                    <h1 className="text-3xl font-bold mt-6 text-slate-800 leading-tight">
                        {blog.title}
                    </h1>

                    {/* --- Blog Meta --- */}
                    <div className="flex flex-wrap items-center gap-x-6 py-3 text-sm text-slate-500">
                        <p>
                            Editor:{" "}
                            <span className="text-orange-500 font-medium">
                                Mike
                            </span>
                        </p>
                        <p>
                            {new Date(blog.uploaded_at).toLocaleDateString("en-us", {
                                year: "numeric",
                                month: "short",
                                day: "numeric",
                            })}
                        </p>
                        {blog.category && (
                            <p className="bg-slate-100 text-slate-700 px-3 py-1 rounded-full text-xs">
                                {blog.category}
                            </p>
                        )}
                    </div>

                    {/* --- Blog Excerpt --- */}
                    {blog.exerpt && (
                        <p className="text-slate-600 italic mb-6 border-l-4 border-orange-400 pl-3">
                            {blog.exerpt}
                        </p>
                    )}

                    {/* --- Blog Content --- */}
                    <div
                        className="text-slate-700 [&>p]:mb-4 [&>h2]:mt-6 [&>h2]:mb-2 [&>ul]:list-disc [&>ul]:ml-6 [&>ol]:list-decimal [&>ol]:ml-6 leading-relaxed"
                        dangerouslySetInnerHTML={{ __html: blog.content }}
                    />
                </div>
            </article>
        </section>
    );
};

export default PageClient;
