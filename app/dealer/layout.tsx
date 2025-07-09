"use client"

import React, { useEffect, useState } from 'react'
import Navbar from '../(guest)/_components/navbar'
import Footer from '../(guest)/_components/footer'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'


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
    label: "Packages",
    href: "/dealer/packages",
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

const DealerLayout = ({
  children
} : { children: React.ReactNode }) => {
  const routes = dealerRoutes;
  const { data:session, status } = useSession();
  const router = useRouter();
  const [ isReady, setIsReady ] = useState(false);

  useEffect(() => {
    if (status === "loading" ) return;

    if (status === "unauthenticated") {
      router.push("/signin");
    } else {
      setIsReady(true);
    }
  }, [status, router]);

  if(!isReady){
    return <div className="flex w-full h-screen justify-center items-center">
      <Image src="/animations/car.gif" alt="Loader" width={100} height={100} />
    </div>;
  }

  return (
    <section>
        <Navbar />
        <main className="md:px-[50px] px-[20px] grid grid-cols-1 lg:grid-cols-12 gap-5">
          <div className="lg:col-span-2 border-r-2 border-slate-100 py-4 max-lg:hidden">
            <div className="w-[100px] h-[100px] rounded-full bg-slate-100">
              
            </div>
            <h1 className="capitalize font-semibold text-lg truncate pt-3">{session?.user?.name}</h1>
            <div className="bg-slate-50 h-0.5 my-3"></div>
            <div className="flex flex-col space-y-4">
              <h1 className="text-slate-500 font-semibold">My Account</h1>
              {routes.map((route) => (
                <Link href={route.href} key={route.label}>{route.label}</Link>
              ))}
            </div>
          </div>
          <div className="lg:col-span-10">
            {children}
          </div>
        </main>
      <Footer />
    </section>
    
  )
}

export default DealerLayout