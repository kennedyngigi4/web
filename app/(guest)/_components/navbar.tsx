"use client"

import { Button } from '@/components/ui/button';
import Link from 'next/link';
import React from 'react';
import NavItem from './navitem';
import { ChevronDown, MenuIcon } from "lucide-react";
import { useSession, signOut } from 'next-auth/react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useRouter } from 'next/navigation';
import Sidebar from './sidebar';
import Image from 'next/image';


const guestRoutes = [
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
    label: "Find me a Car",
    href: "/find-me-car"
  },
  {
    label: "Car Hire",
    href: "/luxury-car-hire"
  },
  {
    label: "FAQ",
    href: "/frequently-asked-questions"
  }
]

const Navbar = () => {
  const routes = guestRoutes;
  const session = useSession();
  const router = useRouter();

  const logOut  = async() => {
    await signOut({
      callbackUrl: '/signin',
    });
    // router.push("/signin");
  }

  return (
    <>
      <section className="flex justify-center py-0.5 items-center text-white bg-orange-400">
        
      </section>
      <nav className="flex flex-row shadow justify-between items-center py-2 px-[20px] md:px-[50px] sticky top-0 z-50 bg-gray-900">
        <div className="lg:hidden">
          <Sidebar />
        </div>
        
        <h1><Link href="/" prefetch>
          <Image src="/logo.png" alt="KENAUTOS HUB" width={150} height={50} />
        </Link></h1>
        <div className="flex justify-between items-center md:gap-x-14">
          <ul className="lg:flex lg:flex-row space-x-8 hidden">
            {routes.map((route) => (
              <NavItem 
                key={route.label}
                href={route.href}
                label={route.label}
              />
            ))}
          </ul>

          <div>
            { session.data?.user?.email
              ? 
              (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button className="flex items-center gap-1 w-24 sm:w-auto px-3 truncate border-0 text-orange-400 text-start cursor-pointer" variant="outline">
                      <span className="truncate max-w-[5.5rem] sm:max-w-none" title={session?.data?.user?.name}>
                        Hi {session?.data?.user?.name}
                      </span> 
                      {/* <ChevronDown className="" /> */}
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56 bg-background">
                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuGroup>
                      <DropdownMenuItem>
                        <Link href="/dealer">
                          Dashboard
                        </Link>
                      </DropdownMenuItem>
                      
                    </DropdownMenuGroup>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="cursor-pointer" onClick={logOut}>
                      Log out
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) 
              : 
              (<>
                <Link href="/signin"><Button className="cursor-pointer text-white bg-orange-400 hover:bg-background border-1 hover:border-orange-400 hover:text-orange-400 rounded-3xl md:px-8" variant="default">SELL</Button></Link>
              </>)
            }
            
            
          </div>
            
        </div>
        
      </nav>
    </>
  )
}

export default Navbar