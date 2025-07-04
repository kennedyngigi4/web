"use client";

import Breadcrumbs from '@/app/(guest)/_components/breadcrumb';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { SparePart } from '@/lib/models';
import React, { useState } from 'react';
import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import Link from 'next/link';
import { BadgeCheck, ChevronDown, ChevronUp, Slash } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { FaFacebook, FaLinkedin, FaPhone, FaTwitter, FaWhatsapp } from 'react-icons/fa';
import ReportAbuseModal from '../../[make]/[model]/[vehicleId]/_components/report_abuse_modal';
import { Breadcrumb, BreadcrumbItem, BreadcrumbList, BreadcrumbSeparator } from '@/components/ui/breadcrumb';

type SpareClientProps = {
    spare: SparePart;
    params: any;
}

const SpareClientId = ({ spare, params }: SpareClientProps) => {
    const [ showTips, setShowTips] = useState(false);
    const decodedMake =   decodeURIComponent(spare.make);
    const decodedModel = decodeURIComponent(spare.model);

    const spareURL = `https://kenautos.co.ke/spare-parts/${encodeURIComponent(spare.id)}`;
    const spareText = encodeURIComponent(`Check out this ${spare?.title} for ${spare?.make} ${spare?.model} for sale on Kenautos Hub`)

    return (
        <>
            <section className="py-3">
                <Breadcrumb>
                    <BreadcrumbList>
                        <BreadcrumbItem>
                            <Link href="/">Home</Link>
                        </BreadcrumbItem>

                        <BreadcrumbSeparator>
                            <Slash />
                        </BreadcrumbSeparator>
                        <BreadcrumbItem>
                            <Link href="/spare-parts">Spare Parts</Link>
                        </BreadcrumbItem>

                        <BreadcrumbSeparator>
                            <Slash />
                        </BreadcrumbSeparator>
                        <BreadcrumbItem>
                            <Link href="">{spare?.spare_name}</Link>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>
            </section>
            
            <section className="pt-2 pb-8 flex flex-col">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                    <div className="md:col-span-8">
                        <Carousel className="md:w-full">
                            <CarouselContent>
                                {spare?.images?.map((image: any) => (
                                    <CarouselItem key={image.id}>
                                        <Image
                                            src={image?.image}
                                            alt={`${spare?.title} ${spare?.make} ${spare?.model} for sale at Kenautos Hub Nairobi, Kenya. Buy, Sell and Trade your car in Kenya. Car dealers in kenya. Leading trusted online car marketplace in Kenya.`}
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
                                    <h1 className="text-orange-500 font-extrabold text-xl">KSh. {parseInt(spare?.price).toLocaleString()}</h1>
                                    <h1 className="font-normal first-letter:capitalize lowercase">{spare?.title}</h1>
                                    {/* <h1 className="font-semibold uppercase text-orange-400">{spare?.make} {spare?.model}</h1> */}
                                </div>
                                <div className="md:col-span-4">
                                    <h1 className="font-semibold text-sm pb-1">Share on:</h1>
                                    <div className="flex justify-between items-center max-md:w-[50%]">
                                        <a href={`https://www.facebook.com/sharer/sharer.php?u=${spareURL}`} target="_blank" rel="noopener noreferrer"><FaFacebook className="w-5 h-5 text-slate-600" /></a>
                                        <a href={`https://twitter.com/intent/tweet?url=${spareURL}&text=${spareText}`} target="_blank" rel="noopener noreferrer"><FaTwitter className="w-5 h-5 text-slate-600" /></a>
                                        <a href={`https://api.whatsapp.com/send?text=${spareText}%20${spareURL}`} target="_blank"  rel="noopener noreferrer"><FaWhatsapp className="w-5 h-5 text-slate-600" /></a>
                                        <a href={`https://www.linkedin.com/sharing/share-offsite/?url=${spareURL}`} target="_blank" rel="noopener noreferrer"><FaLinkedin className="w-5 h-5 text-slate-600" /></a>
                                    </div>
                                </div>
                            </div>
                        </div>


                        <div className="grid grid-cols-3 md:grid-cols-3 gap-4 py-2">

                            {spare?.make && (
                                <div className="flex flex-col">
                                    <p className="text-sm text-orange-400">Vehicle Make</p>
                                    <h1 className='font-semibold text-slate-600 capitalize'>{spare?.make}</h1>
                                </div>
                            )}

                            {spare?.model && (
                                <div className="flex flex-col">
                                    <p className="text-sm text-orange-400">Vehicle Model</p>
                                    <h1 className='font-semibold text-slate-600 capitalize'>{spare?.model}</h1>
                                </div>
                            )}

                            {spare?.vehicle_type && (
                                <div className="flex flex-col">
                                    <p className="text-sm text-orange-400">Vehicle Type</p>
                                    <h1 className='font-semibold text-slate-600 capitalize'>{spare?.vehicle_type}</h1>
                                </div>
                            )}

                            {spare?.parts_type && (
                                <div className="flex flex-col">
                                    <p className="text-sm text-orange-400">Spare Type</p>
                                    <h1 className='font-semibold text-slate-600 capitalize'>{spare?.spare_name}</h1>
                                </div>
                            )}

                            {spare?.condition && (
                                <div className="flex flex-col">
                                    <p className="text-sm text-orange-400">Condition</p>
                                    <h1 className='font-semibold text-slate-600 capitalize'>{spare?.condition}</h1>
                                </div>
                            )}

                            

                        </div>
                        {spare?.description && (
                            <div className="pt-5">
                                <p className="text-slate-500">{spare?.description}</p>
                            </div>
                        )}

                    </div>
                    <div className="md:col-span-4 w-full">
                        <div className="w-full mb-6">
                            <Card className="bg-background">
                                <CardContent className="px-2">
                                    <Link href={`/dealer-profile/${spare?.dealer?.id}`}>
                                        <div className="flex flex-row flex-wrap space-x-5">
                                            <div className="w-18 h-18 rounded-full bg-slate-100 flex justify-center items-center">
                                                {spare?.dealer?.image?.startsWith("http")
                                                    ? (<><Image src={spare?.dealer?.image} alt={spare?.dealer?.name} className="w-18 h-18 rounded-full" /></>)
                                                    : (<div className="font-bold">{spare?.dealer?.image}</div>)
                                                }
                                            </div>
                                            <div className="space-y-1">
                                                <h1 className="font-bold text-lg uppercase">{spare?.dealer?.name}</h1>
                                                <p className="flex items-center justify-start text-xs text-green-600"><BadgeCheck className="w-4 h-4" /> Verified</p>
                                                <p className="text-xs">{spare?.dealer?.joined_since}</p>
                                            </div>
                                        </div>
                                    </Link>
                                </CardContent>
                            </Card>
                        </div>

                        <div className="grid md:grid-cols-2 grid-cols-2 w-full gap-3 mb-5 space-y-3">
                            <div className="">
                                <a href={`https://wa.me/${spare?.dealer?.phone}?text=Hello ${spare?.dealer?.name}, I am interested in ${spare?.title} ${spare?.make} ${spare?.model} posted on Kenautos Hub ${spareURL}`} target="_blank" rel="noopener noreferrer">
                                    <Button className="bg-green-500 font-semibold w-full rounded-none cursor-pointer"><FaWhatsapp /> Whatsapp Seller</Button>
                                </a>
                            </div>
                            <div>
                                <a href={`tel:${spare?.dealer?.phone}`}><Button className="bg-orange-500 font-semibold w-full rounded-none cursor-pointer"><FaPhone /> Call Seller</Button></a>
                            </div>
                        </div>


                        <Card className="w-full mb-8 bg-background">
                            <CardContent>
                                <div className="flex flex-col">
                                    <h1 className="text-orange-400 font-semibold pb-3">Safety Tips</h1>
                                    <ul className="list-disc ps-4 space-y-1 text-slate-500">
                                        <li>Do not send deposits or full payment before physically inspecting the item and confirming ownership.</li>
                                        <li>Always meet the seller in a busy, public place.</li>
                                        <li>Inspect the spare part you're going to buy to make sure it's what you need.</li>
                                        
                                        {showTips && (
                                            <>
                                                <li>Ask to see the logbook, service records, and the seller's ID.</li>
                                                <li>Do not send deposits or full payment before physically inspecting the vehicle and confirming ownership.</li>
                                            </>
                                        )}
                                        <p className="text-orange-400 text-sm flex" onClick={() => setShowTips(((prev: any) => !prev))}>{!showTips ? <>Show more tips <ChevronDown /></> : <>Show less tips <ChevronUp /></>}</p>

                                    </ul>
                                </div>
                            </CardContent>
                        </Card>


                        <Card className="w-full bg-background">
                            <CardContent>
                                <div className="flex flex-row flex-wrap gap-6">
                                    
                                    <div>
                                        <ReportAbuseModal spare={spare} />
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                    </div>
                </div>
            </section>
        </>
        
    )
}

export default SpareClientId