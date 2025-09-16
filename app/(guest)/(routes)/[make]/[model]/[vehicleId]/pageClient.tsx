"use client"

import React, { useState } from 'react';

import Breadcrumbs from '@/app/(guest)/_components/breadcrumb';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious, } from '@/components/ui/carousel';
import { Card, CardContent, CardTitle } from '@/components/ui/card';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { BadgeCheck, ChevronDown, ChevronUp, Gavel, MapPin, TagIcon } from 'lucide-react';
import { FaFacebook, FaLinkedin, FaTwitter, FaWhatsapp } from "react-icons/fa"
import { FaPhone } from 'react-icons/fa6';
import ViewingModal from './_components/viewing_modal';
import ReportAbuseModal from './_components/report_abuse_modal';
import Link from 'next/link';
import { VehicleModel } from '@/lib/models';
import CountDown from '@/app/(guest)/_components/count-down';
import BidModal from './_components/bid-modal';


type VehiclePageClientProps = {
    vehicleData: VehicleModel;
}


const VehiclePageClient = ({ vehicleData }: VehiclePageClientProps) => {
    const decodedMake = decodeURIComponent(vehicleData?.make as string)
    const decodedModel = decodeURIComponent(vehicleData?.model as string)
    const [ showTips, setShowTips] = useState(false);
    



    const carURL = encodeURIComponent(`https://kenautos.co.ke/${encodeURIComponent(vehicleData?.make)}/${encodeURIComponent(vehicleData?.model)}/${vehicleData?.slug}`)
    
    const carText = encodeURIComponent(`Check out this ${vehicleData?.year_of_make} ${vehicleData?.make} ${vehicleData?.model} for sale on Kenautos Hub`)
      

    return (
        <>
            <Breadcrumbs vehicletype={vehicleData?.vehicle_type} make={decodedMake} model={decodedModel} vehicleId={vehicleData?.registration_number} />
                    <section className="pt-2 pb-8 flex flex-col">
                        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                            <div className="md:col-span-8">
                                
                                <Carousel className="md:w-full">
                                    <CarouselContent>
                                        {vehicleData?.images?.map((image: any) => (
                                            <CarouselItem key={image.image_id}>
                                                <Image 
                                                    src={image?.image} 
                                                    alt={`${vehicleData?.year_of_make} ${vehicleData?.make} ${vehicleData?.model} for sale at Kenautos Hub Nairobi, Kenya. Buy, Sell and Trade your car in Kenya. Car dealers in kenya. Leading trusted online car marketplace in Kenya.`}
                                                    width={600} height={300} 
                                                    className="w-full h-auto object-cover rounded-md" 
                                                />
                                            </CarouselItem>
                                        ))}
                                    </CarouselContent>
                                    <CarouselPrevious />
                                    <CarouselNext />
                                </Carousel>
                                    
                                <div className="pt-4">
                                    <div className="grid grid-cols-1 md:grid-cols-12 space-y-4">
                                        <div className="md:col-span-8">
                                            {vehicleData?.display_type != "auction" ? (
                                                <>
                                                    {vehicleData?.price_dropped ?
                                                        (<>
                                                            <h1 className="text-orange-500 font-extrabold text-xl">KSh. {parseInt(vehicleData?.price_drop).toLocaleString()} <span className="text-red-600 text-sm line-through font-normal">KSh. {parseInt(vehicleData?.price).toLocaleString()}</span></h1>
                                                        </>)
                                                        :
                                                        (<>
                                                            <h1 className="text-orange-500 font-extrabold text-xl">KSh. {parseInt(vehicleData?.price).toLocaleString()}</h1>
                                                        </>)
                                                    }
                                                </>
                                            ) : (
                                                <div className='flex items-start'>
                                                    <h1 className="text-orange-500 font-extrabold text-xl">KES {parseInt(vehicleData?.auctions?.current_price).toLocaleString()}</h1>
                                                    <p className='text-slate-500 text-xs'>Current Bid</p>
                                                </div>
                                            )}
                                            
                                            
                                            <h1 className="text-lg font-bold  uppercase">{vehicleData?.year_of_make} {vehicleData?.make} {vehicleData?.model}</h1>
                                            
                                            
                                        </div>
                                        <div className="md:col-span-4">
                                            <h1 className="font-semibold text-sm pb-1">Share on:</h1>
                                            <div className="flex justify-between items-center max-md:w-[50%]">
                                                <a href={`https://www.facebook.com/sharer/sharer.php?u=${carURL}`} target="_blank" rel="noopener noreferrer"><FaFacebook className="w-5 h-5 text-slate-600" /></a>
                                                <a href={`https://twitter.com/intent/tweet?url=${carURL}&text=${carText}`} target="_blank" rel="noopener noreferrer"><FaTwitter className="w-5 h-5 text-slate-600" /></a>
                                                <a href={`https://api.whatsapp.com/send?text=${carText}%20${carURL}`} target="_blank"  rel="noopener noreferrer"><FaWhatsapp className="w-5 h-5 text-slate-600" /></a>
                                                <a href={`https://www.linkedin.com/sharing/share-offsite/?url=${carURL}`} target="_blank" rel="noopener noreferrer"><FaLinkedin className="w-5 h-5 text-slate-600" /></a>
                                            </div>
                                        </div>
                                    </div>


                                    {vehicleData?.display_type === "auction" && (
                                        <div className='bg-orange-50 border border-orange-400 p-8 my-5 rounded-2xl'>
                                            <div className='grid md:grid-cols-2 grid-cols-1 gap-8'>
                                                <div className=''>
                                                    {vehicleData?.auctions?.status === "upcoming" && (
                                                        <div className='py-1'>Auction starts in: <CountDown endTime={vehicleData?.auctions?.countdown_to} /></div>
                                                    )}
                                                    {vehicleData?.auctions?.status === "live" && (
                                                        <div className='py-1'>Auction ends in: <CountDown endTime={vehicleData?.auctions?.countdown_to} /></div>
                                                    )}
                                                    {vehicleData?.auctions?.status === "ended" && "Auction ended"}
                                                </div>
                                                <div>
                                                    <div>
                                                        <p className='text-slate-500'>Current Bid:</p>
                                                        <h1 className="font-semibold text-xl">KES {parseInt(vehicleData?.auctions?.current_price).toLocaleString()}</h1>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                    
                                    {vehicleData?.location && (
                                        <p className='flex flex-row text-sm items-center max-md:pt-2'><MapPin size={15} className="text-orange-500 me-1" /> {vehicleData?.location}</p>
                                    )}

                                    <div className="grid grid-cols-3 md:grid-cols-6 gap-4 py-2">
                                        
                                        {vehicleData?.mileage && (
                                            <div className="flex flex-col">
                                                <p className="text-sm text-orange-400">Mileage</p>
                                                <h1 className='font-semibold text-slate-600'>{vehicleData?.mileage}kms</h1>
                                            </div>
                                        )}

                                        {vehicleData?.fuel && (
                                            <div className="flex flex-col">
                                                <p className="text-sm text-orange-400">Fuel</p>
                                                <h1 className='font-semibold text-slate-600'>{vehicleData?.fuel}</h1>
                                            </div>
                                        )}

                                        {vehicleData?.drive && (
                                            <div className="flex flex-col">
                                                <p className="text-sm text-orange-400">Drive</p>
                                                <h1 className='font-semibold text-slate-600'>{vehicleData?.drive}</h1>
                                            </div>
                                        )}

                                        {vehicleData?.transmission && (
                                            <div className="flex flex-col">
                                                <p className="text-sm text-orange-400">Transmission</p>
                                                <h1 className='font-semibold text-slate-600'>{vehicleData?.transmission}</h1>
                                            </div>
                                        )}
                                        
                                        
                                        {!vehicleData?.tradein && (
                                            <div className="flex flex-col">
                                                <p className="text-sm text-orange-400">Trade-in</p>
                                                <h1 className='font-semibold text-slate-600'>Accepted</h1>
                                            </div>
                                        )}
                                        {!vehicleData?.financing && (
                                            <div className="flex flex-col">
                                                <p className="text-sm text-orange-400">Financing</p>
                                                <h1 className='font-semibold text-slate-600'>Available</h1>
                                            </div>
                                        )}
                                        
                                    </div>
                                    {vehicleData?.description && (
                                        <div className="">
                                            <p className="text-slate-500">{vehicleData?.description}</p>
                                        </div>
                                    )}
                                </div>
                            </div>
                            <div className="md:col-span-4 w-full">
                                <div className="w-full mb-6">
                                    <Card className="bg-background">
                                        <CardContent className="px-2">
                                            <Link href={`/dealer-profile/${vehicleData?.dealer?.id}`}>
                                                <div className="flex flex-row flex-wrap space-x-5">
                                                    <div className="w-18 h-18 rounded-full bg-slate-100 flex justify-center items-center">
                                                        {vehicleData?.dealer?.image?.startsWith("http") 
                                                            ? (<><Image src={vehicleData?.dealer?.image} alt={vehicleData?.dealer?.name} className="w-18 h-18 rounded-full"  /></>) 
                                                            : (<div className="font-bold">{vehicleData?.dealer?.image}</div>)
                                                        }
                                                    </div>
                                                    <div className="space-y-1">
                                                        <h1 className="font-bold text-lg uppercase">{vehicleData?.dealer?.name}</h1>
                                                        {vehicleData?.dealer?.is_verified && (
                                                            <p className="flex items-center justify-start text-xs text-green-600"><BadgeCheck className="w-4 h-4" /> Verified</p>
                                                        )}
                                                        <p className="text-xs">{vehicleData?.dealer?.joined_since}</p>
                                                    </div>
                                                </div>
                                            </Link>
                                        </CardContent>
                                    </Card>
                                </div>
                                
                                {vehicleData?.display_type != "auction" ? (
                                    <div className="grid md:grid-cols-2 grid-cols-2 w-full gap-3 mb-5 space-y-3">
                                        <div className="">
                                            <a href={`https://wa.me/${vehicleData?.dealer?.phone}?text=Hello ${vehicleData?.dealer?.name}, I am interested in ${vehicleData?.year_of_make} ${vehicleData?.make} ${vehicleData?.model} posted on Kenautos Hub ${carURL}`} target="_blank" rel="noopener noreferrer">
                                            <Button className="bg-green-500 font-semibold w-full rounded-none cursor-pointer"><FaWhatsapp /> Whatsapp Seller</Button>
                                            </a>
                                        </div>
                                        <div>
                                            <a href={`tel:${vehicleData?.dealer?.phone}`}><Button className="bg-orange-500 font-semibold w-full rounded-none cursor-pointer"><FaPhone /> Call Seller</Button></a>
                                        </div>
                                    </div>
                                ): (
                                    <Card className='mb-8'>
                                        <CardContent>
                                            <CardTitle className='text-xl text-orange-500 font-semibold flex'><Gavel className='pe-2' /> Place Your Bid</CardTitle>
                                            <div>
                                                {vehicleData?.auctions?.status === "upcoming" && (
                                                    <div className='py-5'>Auction starts in: <CountDown endTime={vehicleData?.auctions?.countdown_to} /></div>
                                                )}
                                                {vehicleData?.auctions?.status === "live" && (
                                                    <div className='py-5'>Auction ends in: <CountDown endTime={vehicleData?.auctions?.countdown_to} /></div>
                                                )}
                                                {vehicleData?.auctions?.status === "ended" && "Auction ended"}

                                                
                                            </div>
                                            <div><p className='text-slate-500'>Current Bid:</p>
                                                <h1 className="font-semibold text-xl">KES {parseInt(vehicleData?.auctions?.current_price).toLocaleString()}</h1>
                                            </div>

                                            <div className='mt-4'>
                                                <BidModal vehicleData={vehicleData} />  
                                            </div>
                                        </CardContent>
                                    </Card>
                                )}

                                <Card className="w-full mb-8 bg-background">
                                    <CardContent>
                                        <div className="flex flex-col">
                                            <h1 className="text-orange-400 font-semibold pb-3">Safety Tips</h1>
                                            <ul className="list-disc ps-4 space-y-1 text-slate-500">
                                                <li>Always meet the seller in a busy, public place.</li>
                                                <li>Check the condition of the car.</li>
                                                <li>Consider bringing a trusted mechanic to verify everything is working properly.</li>
                                                {showTips && (
                                                    <>
                                                        <li>Ask to see the logbook, service records, and the seller's ID.</li>
                                                        <li>Do not send deposits or full payment before physically inspecting the vehicle and confirming ownership.</li>
                                                    </>
                                                )}
                                                <p className="text-orange-400 text-sm flex" onClick={() => setShowTips((prev => !prev))}>{!showTips ? <>Show more tips <ChevronDown /></> : <>Show less tips <ChevronUp /></>}</p>
                                                
                                            </ul>
                                        </div>
                                    </CardContent>
                                </Card>


                                <Card className="w-full bg-background">
                                    <CardContent>
                                        <div className="flex flex-row flex-wrap gap-6">
                                            <div>
                                                <ViewingModal vehicle={vehicleData} />
                                            </div>
                                            <div>
                                                <ReportAbuseModal vehicle={vehicleData} />
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>

                            </div>
                        </div>

                        <div className="pt-6">
                            <h1 className="text-slate-500 font-semibold">You may also like</h1>
                            
                            <div className="grid grid-cols-2 md:grid-cols-5">

                            </div>
                        </div>
                        
                        
                    </section>
        </>
    )
}

export default VehiclePageClient