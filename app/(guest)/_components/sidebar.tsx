"use client"

import React, { useState } from 'react';
import { Sheet, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { MenuIcon } from 'lucide-react';
import SidebarItems from './sidebar_items';
import Image from 'next/image';


const Sidebar = () => {
    const [ open, setOpen] = useState(false);


    return (
        <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
                <Button variant="ghost"><MenuIcon className='text-white' /></Button>
            </SheetTrigger>
            <SheetContent side="left">
                <SheetHeader>
                    <SheetTitle>
                        <Image src="/logo2.png" alt="KENAUTOS HUB" width={140} height={50} />
                    </SheetTitle>
                    <SheetDescription className="text-xs">We Live. We Drive</SheetDescription>
                </SheetHeader>
                <div className="flex-1 overflow-y-auto py-4">
                    <SidebarItems setOpen={setOpen} />
                </div>
                <SheetFooter>
                    <p className="text-sm text-orange-500">Your Trusted Online Car Marketplace</p>
                </SheetFooter>
            </SheetContent>
        </Sheet>
    )
}

export default Sidebar