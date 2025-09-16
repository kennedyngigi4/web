"use client";

import React, { useEffect, useState } from 'react';
import BlogCard from '../../_components/blog-card';
import { BlogModel } from '@/lib/models';
import ApiServices from '@/lib/apiservice';


const BlogsNews = () => {
    const [blogs, setBlogs] = useState<BlogModel[]>([]);

    useEffect(() => {
        const fetchBlogs = async() => {
            const resp = await ApiServices.get("marketing/blogs/");
            console.log(resp);
            setBlogs(resp);
        }
        fetchBlogs();
    }, [])

    return (
        <section className='min-h-screen pt-8'>
            <div className='flex md:flex-row flex-col md:justify-between md:items-baseline'>
                <h1 className="text-orange-500 text-xl font-semibold pb-3">Latest Cars News & Blogs</h1>
            </div>
            <div className="grid lg:grid-cols-3 md:grid-cols-3 grid-cols-1 gap-6 mb-4">
                {blogs.map((blog: BlogModel) => (
                    <div key={blog.id} className="">
                        <BlogCard blog={blog} />
                    </div>
                ))}
            </div>
        </section>
    )
}

export default BlogsNews