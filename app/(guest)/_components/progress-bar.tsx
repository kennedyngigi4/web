"use client"
import { usePathname, useSearchParams } from 'next/navigation'
import React, { useEffect } from 'react'
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';

const ProgressBar = () => {

    const pathname = usePathname();
    const searchParams = useSearchParams();

    useEffect(() => {
        // Function to start the progress bar
        const handleAnchorClick = (event) => {
            const anchor = event.target.closest('a'); // Find the closest <a> tag
            if (anchor) {
                NProgress.start();
            }
        };

        // Add event listeners to the document for link clicks
        document.addEventListener('click', handleAnchorClick);

        // Cleanup event listeners
        return () => {
            document.removeEventListener('click', handleAnchorClick);
        };
    }, []);

    useEffect(() => {
        // Complete the progress bar when the route changes
        NProgress.done();
    }, [pathname, searchParams]);


    return null;
}

export default ProgressBar