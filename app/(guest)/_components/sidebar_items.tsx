"use client"

import { useSession } from 'next-auth/react';
import React from 'react';
import SidebarRoutes from './sidebar_routes';

const guestRoutes = [
    {
        label: "Home",
        href: "/",
    },
    {
        label: "Cars",
        href: "/cars",
    },
    {
        label: "Bikes",
        href: "/bikes",
    },
    {
        label: "Trucks",
        href: "/trucks",
    },
    {
        label: "Spare Parts",
        href: "/spare-parts",
    },
    {
        label: "Find me a car",
        href: "/find-me-car",
    },
    {
        label: "Car Hire",
        href: "/car-hire"
    },
    {
        label: "FAQ",
        href: "/frequently-asked-questions"
      }
];

const dealerRoutes = [
    {
        label: "Dashboard",
        href: "/dealer",
    },
    {
        label: "Sell Now",
        href: "/dealer/sell",
    },
    {
        label: "My Vehicles",
        href: "/dealer/mycars",
    },
    {
        label: "Spare Parts",
        href: "/dealer/spares",
    },
    
    {
        label: "Notifications",
        href: "/dealer/notifications",
    },
    {
        label: "Profile",
        href: "/dealer/profile",
    }
]


interface SidebarItemsProps{
    setOpen: (open: boolean) => void,
}


const SidebarItems = ({ setOpen }: SidebarItemsProps) => {
    const { data:session } = useSession();

    return (
        <section>
            <div className="flex flex-col space-y-1">
                {guestRoutes.map((route) => (
                    <SidebarRoutes key={route.label} label={route.label} href={route.href} setOpen={setOpen} />
                ))}
            </div>

            {session?.user && (
                <div className="border-t-2 border-slate-100 pt-3">
                    <h1 className="font-semibold ps-4 text-slate-500">My Account</h1>
                    
                        <div className="flex flex-col space-y-1 pt-1">
                            {dealerRoutes.map((route) => (
                                <SidebarRoutes key={route.label} label={route.label} href={route.href} setOpen={setOpen} />
                            ))}
                        </div>
                    
                </div>
            )}
            
            
            
        </section>
    )
}

export default SidebarItems