"use client"

import { cn } from '@/lib/utils';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import React from 'react';

interface SidebarRoutesProps {
    label: string,
    href: string,
    setOpen: (open: boolean) => void,
}

const SidebarRoutes = ({ label, href, setOpen }: SidebarRoutesProps) => {
    const pathname = usePathname();
    const router = useRouter();

    const active = 
        (pathname === "/" && href === "/" ) || 
        pathname === href || 
        pathname.startsWith(`${href}/`);
        
    const onClick = async() => {
        setOpen(false);
        router.push(href);
    }

    return (
        <button 
            onClick={onClick} 
            type="button"
            className={cn("pl-4 py-2 flex justify-start", active && "bg-orange-50 text-orange-500")}
        >
            {label}
        </button>
    )
}

export default SidebarRoutes