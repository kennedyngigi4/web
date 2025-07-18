"use client"
import React, { useEffect, useState } from 'react'
import VehicleCard from './vehicle_card';
import LoadingModal from '@/components/modals/loading_modal';
import { VehicleModel } from '@/lib/models';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';

interface VehicleListProps {
    vehicle_type: string
}

const VehicleList = ({ vehicle_type }: VehicleListProps) => {
    const [vehicles, setVehicles] = useState<VehicleModel[]>([]);
    const [page, setPage] = useState(1);
    const [totalCount, setTotalCount] = useState(0);
    const [loading, setLoading] = useState(true);


    // more filter states
    const [makes, setMakes] = useState<{ id: number; name: string }[]>([]);
    const [models, setModels] = useState<{ id: number; name: string }[]>([]);
    const [make, setMake] = useState("");
    const [makeId, setMakeId] = useState("");
    const [ model, setModel ] = useState("");
    const [ yom, setYom ] = useState("");
    const [minPrice, setMinPrice] = useState('');
    const [maxPrice, setMaxPrice] = useState('');
    const [ usage, setUsage ] = useState("");



    useEffect(() => {
        // Loads all vehicle makes
        async function loadMakes(){
            const res = await fetch(`${process.env.NEXT_PUBLIC_APIURL}/listings/makes/${vehicle_type}`);
            const data = await res.json();
            setMakes(data);
        }   
        loadMakes();
    }, [vehicle_type]);


    useEffect(() => {
        // Loads all vehicle models
        async function loadModels() {
            if (!makeId || makeId === 'all'){
                setModels([]);
                return;
            }

            const res = await fetch(`${process.env.NEXT_PUBLIC_APIURL}/listings/models/${makeId}`);
            const data = await res.json();
            setModels(data);
            
        }
        loadModels();
    }, [makeId]);

    const currentYear = new Date().getFullYear();
    const startYear = 1980;

    const years = Array.from({ length: currentYear - startYear + 1 }, (_, i) => String(currentYear - i));



    useEffect(() => {
        const fetchVehicles = async() => {
            setLoading(true);
            const query = new URLSearchParams({
                vehicle_type,
                page: page.toString(),
                page_size: '23',
            });


            if (make && make !== "all") query.append("make", make);
            if (model && model !== "all") query.append("model", model);
            if (yom && yom !== "all") query.append("yom", yom);
            if (minPrice) query.append("min_price", minPrice);
            if (maxPrice) query.append("max_price", maxPrice);
            if (usage && usage !== "all") query.append("usage", usage);


            const res = await fetch(`${process.env.NEXT_PUBLIC_APIURL}/listings/all/?${query.toString()}`, {
                cache: 'no-store'
            });

            const data = await res.json();
            setVehicles(data.results);
            setTotalCount(data.count);
            
            setLoading(false);
        };

        fetchVehicles();
    }, [vehicle_type, page, make, model, yom, usage, minPrice, maxPrice]);


    const totalPages = Math.ceil(totalCount / 20);

    return (
        <section className="min-h-screen py-4">
            {/* Filters */}
            <div className="bg-white pt-5 pb-2 rounded-2xl shadow mb-3">
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 px-4 mb-3">
                    <Select 
                        value={makeId} 
                        onValueChange={(value) => {
                            setMakeId(value);
                            const selectedMake = makes.find((m) => m.id.toString() === value);
                            setMake(selectedMake?.name || "");
                            setModel("");
                        }}
                    >
                        <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select Make" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">All</SelectItem>
                            {makes.map((make) => (
                                <SelectItem value={make.id.toString()} key={make.id}>{make.name}</SelectItem>
                            ))}
                        </SelectContent>
                    </Select>

                    <Select value={model} onValueChange={setModel}>
                        <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select Model" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">All</SelectItem>
                            {models.map((model) => (
                                <SelectItem value={model.name} key={model.id}>{model.name}</SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                
                    <Select value={yom} onValueChange={setYom}>
                        <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select Year of Make" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">All</SelectItem>
                            {years.map((year) => (
                                <SelectItem value={year} key={year}>{year}</SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                    
                    <Input type="text" placeholder="Min Price" value={minPrice} onChange={(e) => setMinPrice(e.target.value)} />
                    
                    <Input type="text" placeholder="Max Price" value={maxPrice} onChange={(e) => setMaxPrice(e.target.value)} />
                    
                    <Select value={usage} onValueChange={setUsage}>
                        <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select Condition" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">All</SelectItem>
                            <SelectItem value="Foreign Used">Foreign Used</SelectItem>
                            <SelectItem value="Locally Used">Locally Used</SelectItem>
                        </SelectContent>
                    </Select>

                    
                </div>
            </div>

            <div className='py-2'>
                <p className='font-semibold capitalize'>{vehicles?.length} {vehicle_type}s</p>
            </div>
            {loading ? (
                <LoadingModal />
            ) : (
                <>
                    <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                        {vehicles?.map((vehicle: VehicleModel) => (
                            <VehicleCard key={vehicle?.listing_id} vehicle={vehicle} />
                        ))}
                        <div className="flex flex-col items-center justify-center bg-orange-400 shadow rounded-2xl p-6 space-y-8">
                            <h1 className="text-white text-3xl capitalize font-semibold text-center">Didn't Find Your Dream {vehicle_type}?</h1>
                            <Link href="/find-me-car">
                                <Button className="cursor-pointer capitalize hover:bg-white hover:text-orange-400">Find Me a {vehicle_type}</Button>
                            </Link>
                        </div>
                    </div>
                </>
            )}





            {totalPages > 1 && (
                <div className="flex justify-center space-x-2 my-14">
                    <Button
                        disabled={page === 1}
                        onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                        className="cursor-pointer btn-sm"
                    >
                        Previous
                    </Button>

                    {[...Array(totalPages)].map((_, i) => (
                        <Button
                            key={i}
                            variant={i + 1 === page ? "default" : "outline"}
                            onClick={() => setPage(i + 1)}
                            className="cursor-pointer btn-sm"
                        >
                            {i + 1}
                        </Button>
                    ))}

                    <Button
                        disabled={page === totalPages}
                        onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
                        className="cursor-pointer btn-sm"
                    >
                        Next
                    </Button>
                </div>
            )}

        </section>
    )
}

export default VehicleList






