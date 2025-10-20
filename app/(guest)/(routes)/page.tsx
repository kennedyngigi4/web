"use client"


import React, { useEffect, useState } from 'react';
import ApiServices from '@/lib/apiservice';
import { BlogModel, VehicleModel } from '@/lib/models';
import VehicleCard from '../_components/vehicle_card';
import LoadingModal from '@/components/modals/loading_modal';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import BlogCard from '../_components/blog-card';
import VehicleAuctionCard from '../_components/vehicle_auction_card';

const IndexPage = () => {
  const [ luxuries, setLuxuries] = useState<VehicleModel[]>([]);
  const [ cars, setCars] = useState<VehicleModel[]>([]);
  const [ auctions, setAuctions] = useState<VehicleModel[]>([]);
  const [ blogs, setBlogs] = useState<BlogModel[]>([]);
  const [ loading, setLoading ] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try{
        setLoading(true);

        const data = await ApiServices.get("listings/home_view/");
        setLuxuries(data.luxuries || []);
        setCars(data.cars || []);
        setAuctions(data.auctions || []);
        setBlogs(data.blogs || []);
      } catch(e){
        console.error('Error fetching vehicles:', e);
      } finally {
        setLoading(false);
      }
      
    }
    fetchData();
  }, []);


  return (
    <section className="min-h-screen pb-10">

      <div className="relative overflow-hidden mb-8">
        
        <div className="relative z-10 flex flex-col justify-center items-center py-8 px-5 text-center space-y-5">
          <div className="w-full md:w-[60%] mx-auto">
            <h1 className="text-3xl md:text-5xl font-light leading-tight">
              Your <span className="font-extrabold text-orange-400">trusted car marketplace</span>
            </h1>

            <p className="text-lg text-gray-700 mt-4 max-md:text-sm">
              Discover the easiest way to buy, sell, or hire cars in Kenya. KENAUTOS connects you with trusted sellers, verified listings, and a wide range of vehicles – all in one place.
            </p>

            <div className="flex flex-row flex-wrap  md:flex-row justify-center items-center gap-4 mt-8">
              <Link href="/cars">
                <Button className="rounded-full px-6 py-2 bg-orange-400 hover:bg-orange-400 text-white shadow-md cursor-pointer">
                  Explore Cars
                </Button>
              </Link>
              <Link href="/spare-parts">
                <Button className="rounded-full px-6 py-2 bg-orange-400 hover:bg-orange-400 text-white shadow-md cursor-pointer">
                  Browse Spares
                </Button>
              </Link>
              <Link href="/car-hire">
                <Button className="rounded-full px-6 py-2 bg-orange-400 hover:bg-orange-400 text-white shadow-md cursor-pointer">
                  Hire a Car
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>





      { loading 
        ? (
          <>
            <LoadingModal />
          </>
        ) 
        : (<>
          {luxuries.length > 0 && (
            <section>
              <h1 className="text-orange-500 text-xl font-bold pb-3" title="Luxury and Premium Cars in Kenya">Luxury & Premium Cars</h1>
              <div className="grid lg:grid-cols-4 md:grid-cols-3 grid-cols-1 gap-6">
                {luxuries.map((vehicle: VehicleModel) => (
                  <div key={vehicle.listing_id} className="mb-8">
                    <VehicleCard vehicle={vehicle} />
                  </div>

                ))}
              </div>
            </section>
          )}
        </>)
      }




      {loading
        ? (
          <>
            <LoadingModal />
          </>
        )
        : (<>
          {cars.length > 0 && (
            <section>
              <h1 className="text-orange-500 text-xl font-bold pb-3">Latest Cars</h1>
              <div className="grid lg:grid-cols-4 md:grid-cols-3 grid-cols-1 gap-6 mb-4">
                {cars.map((vehicle: VehicleModel) => (
                  <div key={vehicle.listing_id} className="">
                    <VehicleCard vehicle={vehicle} />
                  </div>
                ))}
              </div>

            </section>
          )}
        </>)
      }


      
      {loading
        ? (
          <>
            <LoadingModal />
          </>
        )
        : (<>
          {auctions.length > 0 && (
            <section>
              <h1 className="text-orange-500 text-lg font-bold pb-3">Car Auctions in Kenya</h1>
              <div className="grid lg:grid-cols-4 md:grid-cols-3 grid-cols-1 gap-6 mb-4">
                {auctions.map((vehicle: VehicleModel) => (
                  <div key={vehicle.listing_id} className="">
                    <VehicleAuctionCard vehicle={vehicle} />
                  </div>
                ))}
              </div>
            </section>
          )}
        </>)
      }



      {loading
        ? (
          <>
            <LoadingModal />
          </>
        )
        : (<>
          {blogs.length > 0 && (
            <section>
              <div className='flex md:flex-row flex-col md:justify-between md:items-baseline mt-8'>
                <h1 className="text-orange-500 text-xl font-semibold pb-3">Latest News & Blogs</h1>
                <Link href="/car-blogs-news">Find More</Link>
              </div>
              <div className="grid lg:grid-cols-3 md:grid-cols-3 grid-cols-1 gap-6 mb-4">
                {blogs.map((blog: BlogModel) => (
                  <div key={blog.id} className="">
                    <BlogCard blog={blog} />
                  </div>
                ))}
              </div>
            </section>
          )}
        </>)
      }


      
      
    </section>
  )
}

export default IndexPage