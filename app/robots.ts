import { MetadataRoute } from 'next';
import React from 'react'

export default function robots(): MetadataRoute.Robots {
    return {
        rules: {
            userAgent: '*',
            allow: '/',
            disallow: '/dealer/',
        },
        sitemap: 'https://kenautos.co.ke/sitemap.xml'
    }
}