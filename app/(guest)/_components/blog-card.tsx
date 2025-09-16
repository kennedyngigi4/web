"use client";

import React from 'react';
import { Card, CardAction, CardContent, CardTitle } from '@/components/ui/card';
import { BlogModel } from '@/lib/models';
import Image from 'next/image';
import Link from 'next/link';

interface BlogCardProps {
    blog: BlogModel,
}

const BlogCard = ({ blog }: BlogCardProps) => {
  return (
    <Link href={`/car-blogs-news/${blog.slug}`}>
        <Card className="p-0">
            <div className="relative md:h-[200px] h-150px overflow-hidden">
                <Image src={`${blog.image}`} alt={`${blog.title} Autosblog, latest auto news in Kenya. `} fill className="absolute object-cover" />
            </div>
            <CardContent>
                <CardTitle>{blog.title}</CardTitle>
                <p className='text-sm text-slate-500 line-clamp-2'>{blog.exerpt}</p>
                <div className='flex justify-between text-xs pt-4 pb-5'>
                    <p className='truncate text-slate-500 text-xs'>Editor <span className='text-orange-500'>Mike</span></p>
                    <p className='truncate text-slate-500 text-xs'>{new Date(blog.uploaded_at).toLocaleDateString("en-us", { year: "numeric", month: "short", day: "numeric"}) }</p>
                </div>
            </CardContent>  
        </Card>
    </Link>
  )
}

export default BlogCard