"use client";

import { Button } from '@/components/ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Check, Clock, Ellipsis, Info, Trash2 } from 'lucide-react'
import Link from 'next/link';
import React from 'react';
import { VehicleModel } from '@/lib/models';

interface MoreDropdownProps{
    listingId: VehicleModel;
}

const MoreDropdown = ({ listingId }: MoreDropdownProps) => {
  return (
    <DropdownMenu>
        <DropdownMenuTrigger asChild>
            <Button className="cursor-pointer text-xs" size="sm" variant="outline"><Ellipsis /> More</Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
            <DropdownMenuItem className="cursor-pointer">
                <Link className="flex justify-center items-center" href={`/dealer/${listingId}`}><Info className="w-5 h-5 pr-0.5" /> Details</Link>
            </DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer">
                <Clock /> Renew
            </DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer">
                <Check /> Sold
            </DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer">
                <Trash2 /> Delete
            </DropdownMenuItem>
        </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default MoreDropdown