"use client"

import React, { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useParams, useRouter } from 'next/navigation';
import { VehicleModel } from '@/lib/models';
import { z } from "zod";
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Form, FormField, FormItem, FormControl, FormMessage, FormLabel } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowLeft, Trash2, UploadCloud } from 'lucide-react';
import { toast } from 'sonner';
import Link from 'next/link';
import Image from 'next/image';
import ConfirmModal from '@/components/modals/confirm_modal';
import DealerApiService from '@/lib/dealer_apiservice';
import PriceUpdate from './_components/price_update';
import SoldModal from '@/components/modals/sold_modal';
import { FaFacebook, FaLinkedin, FaTwitter, FaWhatsapp } from 'react-icons/fa6';
import DeleteModal from '@/components/modals/delete_modal';


const formSchema = z.object({
    vehicle_make: z.string(),
    vehicle_model: z.string(),
    year_of_make: z.string(),
    transmission: z.string({}),
    fuel: z.string({ required_error: "Fuel type is required" }),
    mileage: z.string(),
    drive: z.string(),
    engine_capacity: z.string(),
    price: z.string({ required_error: "Price is required" }),
    tradein: z.boolean().optional(),
    financing: z.boolean().optional(),
    usage: z.string({ required_error: "Usage is required" }),
    description: z.string({ required_error: "Description is required" })
})

const VehicleDetailsPage = () => {
    const params = useParams();
    const {data:session} = useSession();
    const router = useRouter();

    const [ vehicleData, setVehicleData] = useState<VehicleModel | any>({});
    const [ newImages, setNewImages ] = useState<File[]>([]);
    const [ newPreviewUrls, setNewPreviewUrls] = useState<string[]>([]);
    const [ makes, setMakes ] = useState([]);
    const [ models, setModels] = useState([]);
    const [ uploading, setUploading ] = useState(false);

   

    useEffect(() => {
        async function getData() {
            const res = await fetch(`${process.env.NEXT_PUBLIC_APIURL}/dealers/vehicle/${params.vehicleId}`, {
                method: "GET",
                headers: {
                    'Authorization': `Token ${session?.accessToken}`
                }
            });
            const data = await res.json();
            setVehicleData(data);
        }

        getData();
    }, [params, session])


    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            vehicle_make: "",
            vehicle_model: "",
            year_of_make: "",
            transmission: "",
            fuel: "",
            price: "",
            drive: "",
            mileage: "",
            engine_capacity: "",
            tradein: false,
            financing: false,
            usage: "",
            description: ""
        }
    });

    const { isValid, isSubmitting } = form.formState;


    useEffect(() => {
        if(vehicleData){
            form.reset(vehicleData);
        }
    },[vehicleData, form]);
    

    useEffect(() => {
        // Loads all vehicle makes
        async function loadMakes(){
            const res = await fetch(`${process.env.NEXT_PUBLIC_APIURL}/listings/makes/${vehicleData?.vehicle_type}`);
            const makes = await res.json();
            setMakes(makes);
        }   
        loadMakes();
    }, [vehicleData]);

    const currentYear = new Date().getFullYear() 
    const years = Array.from({ length: currentYear - 1980 + 1 }, (_, i) => String(currentYear - i));


    const handleRelatedModels = async (value: string) => {
        // Get related models to the make user has selected
        const res = await fetch(`${process.env.NEXT_PUBLIC_APIURL}/listings/models/${value}`)
        const models = await res.json();
        setModels(models);
    }

    

    const onSubmit = async(values: z.infer<typeof formSchema>) => {
        if (!session?.accessToken) {
            throw new Error("You must be logged in");
        }

        // Updates data on the vehicle
        const formData = new FormData();
        formData.append("vehicle_make", values.vehicle_make);
        formData.append("vehicle_model", values.vehicle_model);
        formData.append("year_of_make", values.year_of_make);
        formData.append("fuel", values.fuel);
        formData.append("drive", values.drive);
        formData.append("transmission", values.transmission);
        formData.append("engine_capacity", values.engine_capacity);
        formData.append("price", values.price);
        formData.append("usage", values.usage);
        formData.append("mileage", values.mileage);
        formData.append("description", values.description);
        // formData.append("vehicle_type", selectedVehicle);

        const res = await DealerApiService.patch(`dealers/vehicle/${vehicleData.listing_id}`, session?.accessToken, formData);
        console.log(res.data);
    }


    const handleImgDelete = async(imgId: string) => {
        if (!session?.accessToken) {
            throw new Error("You must be logged in");
        }
        
        if(imgId){
            const res = await DealerApiService.delete(`dealers/vehicle_image_delete/${imgId}`, session?.accessToken);
            if(res.ok){
                toast.success("Image deleted", { position: "top-center" });
                window.location.reload();
            }
        }
    }


    const handleFileChange = (files: FileList | null) => {
        if(!files) return;

        const selectedFiles = Array.from(files);

        // Prevent duplication
        const uniqueFiles = selectedFiles.filter((file) => !newImages.some((img) => img.name === file.name));
        setNewImages((prev) => [...prev, ...uniqueFiles]);

        // Preview images
        const previewUrls = uniqueFiles.map((file) => URL.createObjectURL(file));
        setNewPreviewUrls((prev) => [...prev, ...previewUrls]);
    }


    const handleRemoveNewImage = async(index: number) => {
        setNewImages((prev) => prev.filter((_, i) => i !== index));
        setNewPreviewUrls((prev) => prev.filter((_, i) => i !== index));
    }


    const handleUploadNewImages = async() => {
        if (!session?.accessToken) {
            throw new Error("You must be logged in");
        }

        setUploading(true);

        if(newImages.length > 0){
            const formData = new FormData();
            formData.append("listing_id", vehicleData.listing_id)
            newImages.forEach((image) => {
                formData.append("images", image)
            });

            const res = await DealerApiService.post("dealers/new_images", session?.accessToken, formData);
            console.log(res)
            if(res?.status == 201){
                toast.success("Images uploaded", { position: "top-center" });
                window.location.reload();
                setUploading(false);
            } else {
                toast.error("Something went wrong", { position: "top-center" });
                window.location.reload();
                setUploading(false);
            }
        }
    }


   

    const handleAvailability = async(value: string) => {
        if (!session?.accessToken) {
            throw new Error("You must be logged in");
        }

        const formData = new FormData();
        formData.append("availability", value)
        const res = await DealerApiService.patch(`dealers/vehicle/${vehicleData.slug}`, session?.accessToken, formData);
        if(res.ok){
            toast.success("Vehicle updated", { position: "top-center"})
            window.location.reload();
        } else {
            toast.error("Something went wrong", { position: "top-center" });
            window.location.reload();
        }
    }


    const handleDelete = async() => {
        if(!session?.accessToken){
            throw new Error("You must be logged in.");
        }

        const res = await DealerApiService.delete(`dealers/vehicle_delete/${vehicleData.slug}`, session?.accessToken);
        if(res.success){
            toast.success(res.message, { position: "top-center" });
            router.push("/dealer/mycars");
        } else {
            toast.error("An error occured", { position: "top-center" });
            window.location.reload();
        }
    }



    const carURL = encodeURIComponent(`https://kenautos.co.ke/${params?.make}/${params?.model}/${params?.vehicleId}`)
    const carText = encodeURIComponent(`Check out this ${vehicleData?.year_of_make} ${vehicleData?.make} ${vehicleData?.model} for sale on Kenautos Hub`)


    return (
        <section className="py-6">
            <div className="">
                <div className="flex flex-col lg:flex-row w-full lg:justify-between space-y-4 lg:items-center">
                    <div>
                        <Link href="/dealer/mycars" className="flex text-slate-500 text-sm">
                            <Button type="button" variant="ghost" className="cursor-pointer">
                                <ArrowLeft className="w-8 h-4" /> Back to vehicles
                            </Button>
                        </Link>
                        <div className="flex flex-col pt-5">
                            <h2 className="font-bold text-2xl">{vehicleData?.year_of_make} {vehicleData?.make} {vehicleData?.model}</h2>
                            <p></p>
                        </div>
                    </div>
                    <div className="flex justify-start items-center gap-2">

                        <div>
                            {(vehicleData?.status == "draft" || vehicleData?.status == "expired") && (
                                <Link href={`/dealer/publish-draft/${vehicleData?.vehicle_type}/${vehicleData.listing_id}`}>
                                    <Button className="capitalize bg-yellow-400 hover:text-white text-black cursor-pointer" size="sm">Publish</Button>
                                </Link>
                            )}
                        </div>

                        <div>
                            {vehicleData?.status == "published" && (
                                <p className="text-green-600 font-semibold text-sm pe-10">Expires: { new Date(vehicleData?.expires_at).toLocaleDateString("en-us", {
                                    year: "numeric",
                                    month: "short",
                                    day: "numeric",
                                }) }</p>
                            )}
                        </div>


                        <div>
                            {vehicleData?.status == "pending_review" && (
                                <p className="text-orange-400">Updating ....</p>
                            )}
                        </div>
                        
                        <DeleteModal
                            title={`Delete`}
                            product={`${vehicleData?.year_of_make} ${vehicleData.make} ${vehicleData.model}`}
                            description='Are you sure you want to delete this vehicle listing? This action cannot be undone.'
                            onConfirm={handleDelete}
                        >
                            <Button size="sm" variant="outline" className='border-red-500 text-red-500 hover:bg-red-500 hover:text-white cursor-pointer'>Delete</Button>
                        </DeleteModal>
                    </div>
                </div>


                <div className="grid md:grid-cols-12 grid-cols-1 mt-4 gap-8">
                    <div className="md:col-span-8">
                        <div className="flex flex-col ">
                            <Form {...form}>
                                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                                    <div className="grid md:grid-cols-2 grid-cols-2 gap-3 pt-6">
                                        <FormField
                                            name="vehicle_make"
                                            control={form.control}
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Make</FormLabel>
                                                    <FormControl>
                                                        <Select onValueChange={(value) => { field.onChange(value); handleRelatedModels(value); }} defaultValue="" value={String(field.value)}>
                                                            <SelectTrigger className='w-full'>
                                                                <SelectValue placeholder="Choose make" />
                                                            </SelectTrigger>
                                                            <SelectContent>
                                                                {makes.map((opt: any) => (
                                                                    <SelectItem key={opt.id} value={String(opt.id)}>{opt.name}</SelectItem>
                                                                ))}
                                                            </SelectContent>
                                                        </Select>
                                                        
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />

                                        <FormField
                                            name="vehicle_model"
                                            control={form.control}
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Model</FormLabel>
                                                    <FormControl>
                                                        <Select onValueChange={field.onChange} defaultValue="" value={field.value}>
                                                            <SelectTrigger className='w-full'>
                                                                <SelectValue placeholder="Choose make" />
                                                            </SelectTrigger>
                                                            <SelectContent>
                                                                {models.map((opt: any) => (
                                                                    <SelectItem key={opt.id} value={String(opt.id)}>{opt.name}</SelectItem>
                                                                ))}
                                                            </SelectContent>
                                                        </Select>
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </div>
                                    <div className="grid md:grid-cols-3 grid-cols-2 gap-3 space-y-4">
                                        <FormField
                                            name="year_of_make"
                                            control={form.control}
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Year of Manufacture</FormLabel>
                                                    <FormControl>
                                                        <Select onValueChange={field.onChange} value={field.value}>
                                                            <SelectTrigger className='w-full'>
                                                                <SelectValue placeholder="Choose yom" />
                                                            </SelectTrigger>
                                                            <SelectContent>
                                                                {years.map((opt) => (
                                                                    <SelectItem key={opt} value={opt}>{opt}</SelectItem>
                                                                ))}
                                                                
                                                                
                                                            </SelectContent>
                                                        </Select>
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            name="transmission"
                                            control={form.control}
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Transmission</FormLabel>
                                                    <FormControl>
                                                        <Select onValueChange={field.onChange} value={field.value}>
                                                            <SelectTrigger className='w-full'>
                                                                <SelectValue placeholder="Transmission" />
                                                            </SelectTrigger>
                                                            <SelectContent>
                                                                <SelectItem value='Automatic'>Automatic</SelectItem>
                                                                <SelectItem value='Manual'>Manual</SelectItem>
                                                                
                                                            </SelectContent>
                                                        </Select>
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            name="fuel"
                                            control={form.control}
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Fuel</FormLabel>
                                                    <FormControl>
                                                        <Select onValueChange={field.onChange} value={field.value}>
                                                            <SelectTrigger className='w-full'>
                                                                <SelectValue placeholder="Choose fuel type" />
                                                            </SelectTrigger>
                                                            <SelectContent>
                                                                <SelectItem value='Diesel'>Diesel</SelectItem>
                                                                <SelectItem value='Electric'>Electric</SelectItem>
                                                                <SelectItem value='Hybrid'>Hybrid</SelectItem>
                                                                <SelectItem value='Petrol'>Petrol</SelectItem>
                                                            </SelectContent>
                                                        </Select>
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            name="drive"
                                            control={form.control}
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Drive</FormLabel>
                                                    <FormControl>
                                                        <Select onValueChange={field.onChange} value={field.value}>
                                                            <SelectTrigger className='w-full'>
                                                                <SelectValue placeholder="Choose drive type" />
                                                            </SelectTrigger>
                                                            <SelectContent>
                                                                <SelectItem value='AWD'>AWD</SelectItem>
                                                                <SelectItem value='2WD'>2WD</SelectItem>
                                                                <SelectItem value='4WD'>4WD</SelectItem>
                                                                <SelectItem value='sDrive'>sDrive</SelectItem>
                                                                <SelectItem value='xDrive'>xDrive</SelectItem>
                                                            </SelectContent>
                                                        </Select>
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            name="engine_capacity"
                                            control={form.control}
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Engine Capacity(CC)</FormLabel>
                                                    <FormControl>
                                                        <Input 
                                                            type="number"
                                                            className=''
                                                            placeholder='e.g. 1500'
                                                            {...field}
                                                        />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            name="mileage"
                                            control={form.control}
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Mileage(kms)</FormLabel>
                                                    <FormControl>
                                                        <Input
                                                            type="number"
                                                            className=''
                                                            placeholder='e.g. 154900'
                                                            {...field}
                                                        />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            name="price"
                                            control={form.control}
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Price (KSh.)</FormLabel>
                                                    <FormControl>
                                                        <Input
                                                            type="number"
                                                            className=''
                                                            placeholder='e.g. 1850000'
                                                            {...field}
                                                        />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            name="financing"
                                            control={form.control}
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Is there financing?</FormLabel>
                                                    <FormControl>
                                                        <Select onValueChange={field.onChange} value={String(field.value)}>
                                                            <SelectTrigger className='w-full'>
                                                                <SelectValue placeholder="Financing option" />
                                                            </SelectTrigger>
                                                            <SelectContent>
                                                                <SelectItem value='true'>Yes</SelectItem>
                                                                <SelectItem value='false'>No</SelectItem>
                                                            </SelectContent>
                                                        </Select>
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            name="tradein"
                                            control={form.control}
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Is trade-in accepted?</FormLabel>
                                                    <FormControl>
                                                        <Select onValueChange={field.onChange} value={String(field.value)}>
                                                            <SelectTrigger className='w-full'>
                                                                <SelectValue placeholder="Trade-in" />
                                                            </SelectTrigger>
                                                            <SelectContent>
                                                                <SelectItem value='true'>Yes</SelectItem>
                                                                <SelectItem value='false'>No</SelectItem>
                                                            </SelectContent>
                                                        </Select>
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            name="usage"
                                            control={form.control}
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Usage</FormLabel>
                                                    <FormControl>
                                                        <Select onValueChange={field.onChange} value={field.value}>
                                                            <SelectTrigger className='w-full'>
                                                                <SelectValue placeholder="Choose usage" />
                                                            </SelectTrigger>
                                                            <SelectContent>
                                                                <SelectItem value='Foreign Used'>Foreign Used</SelectItem>
                                                                <SelectItem value='Locally Used'>Locally Used</SelectItem>
                                                                <SelectItem value='New'>New</SelectItem>
                                                            </SelectContent>
                                                        </Select>
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </div>
                                    <div className="grid md:grid-cols-1 grid-cols-1 gap-3 space-y-4">
                                        <FormField
                                            name="description"
                                            control={form.control}
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Description</FormLabel>
                                                    <FormControl>
                                                        <Textarea {...field}/>
                                                    </FormControl>
                                                    
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </div>
                                    <div>
                                        <Button type="submit" className="bg-orange-400 cursor-pointer">Save Changes</Button>
                                    </div>
                                </form>
                            </Form>
                        </div>
                    </div>
                    <div className="md:col-span-4">
                        <h1 className="font-semibold pb-3">Images</h1>
                        <div className="grid md:grid-cols-3 grid-cols-2 gap-3"> 
                            <div 
                                className="w-25 h-20 border-2 border-dashed border-gray-400 flex flex-col items-center justify-center rounded-lg"
                                onClick={() => document.getElementById("fileInput")?.click()}
                            >
                                <UploadCloud className="w-18 h-18 text-gray-500" />
                                <p className="text-gray-600 text-xs text-center">Upload more images</p>
                                <input 
                                    id="fileInput"
                                    type="file"
                                    multiple
                                    className="hidden"
                                    onChange={(e) => handleFileChange(e.target.files)}
                                />
                            </div>     
                            {newPreviewUrls.map((src, index) => (
                                <div key={index} className="ml-3 mb-3 relative w-20 h-20">
                                    
                                    <Image src={src} alt="Preview" fill className="object-cover rounded-md" />
                                    <button
                                        onClick={() => handleRemoveNewImage(index)}
                                        className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                </div>
                            ))}  

                            {vehicleData?.images?.map((img: any) => (
                                <div key={img.image_id} className="relative">
                                    <ConfirmModal onConfirm={() => handleImgDelete(img.image_id)}>
                                        <div className="absolute bottom-1 right-1 bg-red-500 text-white rounded-full p-1">
                                            <Trash2 className="w-4 h-4 text-white" />
                                        </div>
                                        
                                    </ConfirmModal>
                                    <Image src={img?.image} alt="Kenautos Hub, Kenyas leading car Marketplace" width={300} height={300} />
                                </div>
                            ))}

                            {newImages.length > 0 && (
                                <div className="flex justify-center items-center w-full mx-auto">
                                    <Button onClick={handleUploadNewImages} disabled={uploading} className="bg-orange-400 text-white cursor-pointer">Upload images</Button>
                                </div>
                            )}
                        </div>

                        {vehicleData.availability != "Sold" && (
                            <>
                                <div className="pb-3 pt-10">
                                    <h1 className="text-orange-500 font-semibold">More Actions</h1>
                                    <p className="text-slate-500 text-sm">Want to reduce price or vehicle has been sold?</p>
                                </div>
                                <div className="flex justify-between items-center">
                                    <div>
                                        <PriceUpdate vehicle={vehicleData}></PriceUpdate>
                                    </div>
                                    
                                    <div>
                                        <SoldModal title="Congratulations🥳🎉" description="Kenautos Hub is happy😊 to see you sell through us." onConfirm={() => handleAvailability("Sold")}>
                                            <Button className="bg-green-500 cursor-pointer">Mark as Sold</Button>
                                        </SoldModal>
                                    </div>
                                </div>
                            </>
                        )}



                        <div className="pt-8">
                            <h1 className="font-bold pb-3 text-orange-500">Share via:</h1>
                            <div>
                                <div className="flex justify-between items-center gap-x-4 max-lg:w-[50%]">
                                    <a href={`https://www.facebook.com/sharer/sharer.php?u=${carURL}`} target="_blank" rel="noopener noreferrer"><FaFacebook className="w-5 h-5 text-slate-600" /></a>
                                    <a href={`https://twitter.com/intent/tweet?url=${carURL}&text=${carText}`} target="_blank" rel="noopener noreferrer"><FaTwitter className="w-5 h-5 text-slate-600" /></a>
                                    <a href={`https://api.whatsapp.com/send?text=${carText}%20${carURL}`} target="_blank" rel="noopener noreferrer"><FaWhatsapp className="w-5 h-5 text-slate-600" /></a>
                                    <a href={`https://www.linkedin.com/sharing/share-offsite/?url=${carURL}`} target="_blank" rel="noopener noreferrer"><FaLinkedin className="w-5 h-5 text-slate-600" /></a>
                                </div>
                            </div>
                        </div>



                    </div>
                </div>
            </div>
        </section>
    )
}

export default VehicleDetailsPage