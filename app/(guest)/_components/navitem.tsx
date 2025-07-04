"use client"

import { cn } from '@/lib/utils';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import React from 'react';


interface NavItemProps{
    label: string;
    href: string;
}

const NavItem = ({ label, href} : NavItemProps) => {

    const pathname = usePathname();

    const isActive = 
        ( pathname === "/" && href === "/" ) ||
        pathname === href ||
        pathname.startsWith(`${href}/`);

  return (
    <li>
      <Link href={href} className={cn("text-white", isActive && "text-orange-400")} prefetch>{label}</Link>
    </li>
  )
}

export default NavItem