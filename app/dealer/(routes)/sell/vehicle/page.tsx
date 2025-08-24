"use client"

import React, { useEffect, useState } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { Form, FormField, FormControl, FormItem, FormMessage, FormLabel, FormDescription } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ArrowRightIcon, Bike, Car, Trash2, Truck, UploadCloud } from 'lucide-react';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { Select, SelectContent, SelectTrigger, SelectValue, SelectItem } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { vehicleUpload } from '@/lib/actions';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import DealerApiService from '@/lib/dealer_apiservice';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import MpesaPaymentModal from '@/components/modals/mpesa_payment_modal';


const formSchema = z.object({
    make: z.string().min(1, { message: "Make is required" }),
    model: z.string().min(1, { message: "Model is required" }),
    yom: z.string().min(1, { message: "Year of manufacture is required" }),
    transmission: z.string().optional(),
    fuel: z.string().min(1, { message: "Fuel type is required" }),
    mileage: z.string().optional(),
    drive: z.string().optional(),
    engine_capacity: z.string().min(1, { message: "Engine capacity(cc) is required" }),
    price: z.string().min(1, { message: "Price is required" }),
    tradein: z.string().optional(),
    financing: z.string().optional(),
    usage: z.string().min(1, { message: "Usage is required" }),
    description: z.string().min(20, { message: "Description should be at least 20 characters" })
});




const SellCarPage = () => {
    const router = useRouter();
    const { data:session, status } = useSession();
    const [images, setImages ] = useState<File[]>([]);
    const [previewUrls, setPreviewUrls ] = useState<string[]>([]);
    const [loading, setLoading ] = useState(false);
    const [activeTab, selectActiveTab] = useState("images");
    const [selectedVehicle, setSelectedVehicle] = useState<string | null>(null);
    const [makes, setMakes] = useState([]);
    const [models, setModels] = useState([]);
    const [packages, setPackages] = useState<any>([]);
    const [ selectedPackage, setSelectedPackage ] = useState<string | null>(null);
    const [isReady, setIsReady] = useState(false);
    const [ showMpesaDialog, setShowMpesaDialog ] = useState(false);
    const [ uploadedVehicleID, setUploadedVehicleID] = useState("");
    const [ imgErrorMessage, setImgErrorMessage] = useState<string>("");

    useEffect(() => {
        const checkEligibility = async() => {
            if(!session?.accessToken){
                throw new Error("You must be logged in!");
            }

            const res = await DealerApiService.get("dealers/eligibility_check", session?.accessToken);
            setPackages(res);
        }
        checkEligibility();
    }, [session]);


    const handleSelect = (type: string) => {
        setSelectedVehicle(type);
    };

    const handlePackageSelect = (type: any) => {
        setSelectedPackage(type);
    }


    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            make: "",
            model: "",
            yom: "",
            transmission: "",
            fuel: "",
            price: "",
            drive: "",
            mileage: "",
            engine_capacity: "",
            tradein: "",
            financing: "",
            usage: "",
            description: ""
        }
    });

    const { isSubmitting, isValid } = form.formState;

    const handleFileChange = (files: FileList | null) => {
        if(!files) return;

        const selectedFiles = Array.from(files);

        const maxSizeInBytes = 10 * 1024 * 1024;
        const validFiles: File[] = [];
        const errors: string[] = [];

        selectedFiles.forEach((img) => {
            if(img.size >= maxSizeInBytes){
                errors.push(`${img.name} is too large. Max size is 10MB.`);
            } else {
                validFiles.push(img);
            }
        });

        if(errors.length > 0){
            setImgErrorMessage(errors.join(" "));
        } else {
            setImgErrorMessage(""); 
        }
        
        // Prevent duplication
        const uniqueFiles = validFiles.filter((file) => !images.some((img) => img.name === file.name))
        setImages((prev) => [...prev, ...uniqueFiles]);

        // preview Images
        const previewUrls = uniqueFiles.map((file) => URL.createObjectURL(file));
        setPreviewUrls((prev) => [...prev, ...previewUrls]);
    }


    const handleRemoveImage = (index: number) => {
        setImages((prev) => prev.filter((_, i) => i !== index));
        setPreviewUrls((prev) => prev.filter((_,i) => i !== index));
    }


    const handleNext = () => {
        if(images.length < 1){
            toast.error("Upload at least 3 images", { position: "top-center" });
            return;
        } else if (!selectedVehicle){
            toast.error("Select vehicle type", { position: "top-center" });
            return;
        }
        selectActiveTab("details")
    }

    const handleBacktoImages = () => {
        selectActiveTab("images");
    }


    useEffect(() => {
        // Loads all vehicle makes
        async function loadMakes(){
            const res = await fetch(`${process.env.NEXT_PUBLIC_APIURL}/listings/makes/${selectedVehicle}`);
            const makes = await res.json();
            setMakes(makes);
        }   
        loadMakes();
    }, [selectedVehicle]);


    const handleRelatedModels = async(value: string) => {
        // Get related models to the make user has selected
        const res = await fetch(`${process.env.NEXT_PUBLIC_APIURL}/listings/models/${value}`)
        const models = await res.json();
        setModels(models);
    }

    const currentYear = new Date().getFullYear()
    const years = Array.from({ length: currentYear - 1980 + 1 }, (_, i) => String(currentYear - i));



    const onSubmit = async(values: z.infer<typeof formSchema>) => {
        if(images.length < 1){
            toast.error("Upload at least 3 images", { position: "top-center" });
            return;
        }
        if (!selectedVehicle) {
            toast.error("Select vehicle type", { position: "top-center" });
            return;
        }

        
        setLoading(true);

        const formData = new FormData();
        formData.append("vehicle_make", values.make);
        formData.append("vehicle_model", values.model);
        formData.append("year_of_make", values.yom);
        formData.append("fuel", values.fuel);
        formData.append("drive", values.drive);
        formData.append("transmission", values.transmission);
        formData.append("engine_capacity", values.engine_capacity);
        formData.append("price", values.price);
        formData.append("usage", values.usage);
        formData.append("description", values.description);
        formData.append("vehicle_type", selectedVehicle);
        formData.append("package_id", selectedPackage?.pid);
        // images.forEach((image) => {
        //     formData.append("images", image);
        // });

        if(values.mileage){
            formData.append("mileage", values.mileage);
        }

        if (values.tradein) {
            formData.append("tradein", values.tradein);
        }

        if (values.financing) {
            formData.append("financing", values.financing);
        }

        

        const res = await vehicleUpload(formData);
        
        
        if(res.success){
            
            setUploadedVehicleID(res.id);

            imagesUpload(res.id, images);

            
            
        } else {
            setLoading(false);
            toast.error(res.message, { position: "top-center" });
        }
        
    }


    const imagesUpload = async(id: string, images: File[]) => {
        
        try {
            const res = await DealerApiService.images("dealers/images_upload", id, images);
            if(res.success){
                toast.success(res.message, { position: "top-center" });
                // if (!packages?.can_upload){
                //     setShowMpesaDialog(true);
                // }
                
                setLoading(false);
                
                router.push("/dealer/mycars");
            } else {
                setLoading(false);
                toast.error("An error occurred.", { position: "top-center"});
            }
        } catch(e){
            console.log(e);
        }
    }

    
    
    useEffect(() => {
        if (status === "loading" ) return;

        if (status === "unauthenticated") {
            router.push("/signin");
        } else {
            setIsReady(true);
        }
    }, [status, router]);


    const handleMpesaModalClose = async () => {
        setShowMpesaDialog(false);
        router.push(`/dealer/mycars`);
    }

    if(!isReady){
        return <div className="flex w-full h-screen justify-center items-center">
            <Image src="/animations/car.gif" alt="Loader" width={100} height={100} />
        </div>;
    }

    return (
        <section className="min-h-screen flex justify-center items-start">
            <div className="py-10">
                <div className="pb-8 max-md:px-1">
                    <h1 className="font-bold text-orange-400 text-2xl">Sell vehicle</h1>
                    <p className="text-slate-500">Upload images and car details for it to be listed on our website</p>
                </div>
                <Tabs value={activeTab} className="md:w-[700px] w-screen px-1">
                    <TabsList className="grid w-full grid-cols-2">
                        <TabsTrigger value="images">Images</TabsTrigger>
                        <TabsTrigger value="details">Details</TabsTrigger>
                    </TabsList>
                    <TabsContent value="images">
                        <div className="grid md:grid-cols-6 grid-cols-2 pt-4">
                            <div className="gap-4">
                                <div
                                    className="md:w-30 md:h-30 w-40 h-50 border-2 border-dashed border-gray-400 flex flex-col items-center justify-center rounded-lg cursor-pointer hover:bg-gray-100 transition-all"
                                    onClick={() => document.getElementById("fileInput")?.click()}
                                >
                                    <UploadCloud className="w-12 h-12 text-gray-500 mb-2" />
                                    <p className="text-gray-600 text-sm text-center">Click to Upload</p>
                                    <input
                                        id="fileInput"
                                        type="file"
                                        multiple
                                        className="hidden"
                                        onChange={(e) => handleFileChange(e.target.files)}
                                    />
                                </div>
                            </div>
                            
                            {previewUrls.map((src, index) => (
                                <div key={index} className="ml-3 mb-3 relative">
                                    <Image src={src} alt="Preview" width={120} height={120} className="md:w-30 md:h-30 w-60 h-60 object-cover rounded-md" />
                                    <button
                                        onClick={() => handleRemoveImage(index)}
                                        className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 cursor-pointer"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                </div>
                            ))}
                        </div>
                        {imgErrorMessage && <p className="text-red-600 text-xs">{imgErrorMessage}</p>}
                        <div className="py-14">
                            <Label>Select vehicle type</Label>
                            <div className="flex gap-4 flex-wrap w-full pt-5">

                                {/* Bike */}
                                <div
                                    className={`w-32 h-32 flex flex-col items-center justify-center border-2 rounded-lg cursor-pointer transition-all ${selectedVehicle === "bike" ? "border-orange-300 bg-orange-100" : "border-gray-300"
                                        }`}
                                    onClick={() => handleSelect("bike")}
                                >
                                    <Bike className="w-10 h-10 text-gray-700" />
                                    <p className="mt-2 text-lg">Bike</p>
                                </div>

                                {/* Car */}
                                <div
                                    className={`w-32 h-32 flex flex-col items-center justify-center border-2 rounded-lg cursor-pointer transition-all ${selectedVehicle === "car" ? "border-orange-300 bg-orange-100" : "border-gray-300"
                                        }`}
                                    onClick={() => handleSelect("car")}
                                >
                                    <Car className="w-10 h-10 text-gray-700" />
                                    <p className="mt-2 text-lg">Car</p>
                                </div>

                                

                                {/* Truck */}
                                <div
                                    className={`w-32 h-32 flex flex-col items-center justify-center border-2 rounded-lg cursor-pointer transition-all ${selectedVehicle === "truck" ? "border-orange-300 bg-orange-100" : "border-gray-300"
                                        }`}
                                    onClick={() => handleSelect("truck")}
                                >
                                    <Truck className="w-10 h-10 text-gray-700" />
                                    <p className="mt-2 text-lg">Truck</p>
                                </div>
                            </div>

                            {/* Hidden Input for Form Submission */}
                            <input type="hidden" name="vehicleType" value={selectedVehicle || ""} />

                            {/* Submit Button */}
                            <button
                                type="button"
                                className="mt-16 bg-orange-400 text-white cursor-pointer py-2 px-4 rounded flex"
                                onClick={handleNext}
                                
                            >
                                Next <ArrowRightIcon className="pl-2 h-6 w-6" />
                            </button>
                        </div>
                        
                    </TabsContent>
                    <TabsContent value="details">
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                                <div className="grid md:grid-cols-2 grid-cols-2 gap-3 pt-6">
                                    <FormField
                                        name="make"
                                        control={form.control}
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Make</FormLabel>
                                                <FormControl>
                                                    <Select onValueChange={(value) => { field.onChange(value); handleRelatedModels(value); }} defaultValue="" value={field.value}>
                                                        <SelectTrigger className='w-full bg-white'>
                                                            <SelectValue placeholder="Choose make" />
                                                        </SelectTrigger>
                                                        <SelectContent>
                                                            {makes.map((opt: { id: string, name: string}) => (
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
                                        name="model"
                                        control={form.control}
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Model</FormLabel>
                                                <FormControl>
                                                    <Select onValueChange={field.onChange} defaultValue="" value={field.value}>
                                                        <SelectTrigger className='w-full bg-white'>
                                                            <SelectValue placeholder="Choose make" />
                                                        </SelectTrigger>
                                                        <SelectContent>
                                                            {models.map((opt: {id: string, name: string}) => (
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
                                        name="yom"
                                        control={form.control}
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Year of Manufacture</FormLabel>
                                                <FormControl>
                                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                        <SelectTrigger className='w-full bg-white'>
                                                            <SelectValue placeholder="Choose yom" />
                                                        </SelectTrigger>
                                                        <SelectContent>
                                                            {years.map((opt) => (
                                                                <SelectItem key={opt} value={String(opt)}>{opt}</SelectItem>
                                                            ))}
                                                            
                                                            
                                                        </SelectContent>
                                                    </Select>
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    {(selectedVehicle === "car" || selectedVehicle === "truck") && (
                                        <FormField
                                            name="transmission"
                                            control={form.control}
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Transmission</FormLabel>
                                                    <FormControl>
                                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                            <SelectTrigger className='w-full bg-white'>
                                                                <SelectValue placeholder="Transmission" />
                                                            </SelectTrigger>
                                                            <SelectContent>
                                                                <SelectItem value='Automatic'>Automatic</SelectItem>
                                                                <SelectItem value='CVT'>CVT</SelectItem>
                                                                <SelectItem value='DCT'>DCT</SelectItem>
                                                                <SelectItem value='Manual'>Manual</SelectItem>
                                                                <SelectItem value='Semi Automatic'>Semi Automatic</SelectItem>
                                                                <SelectItem value='Sport AT'>Sport AT</SelectItem>
                                                                <SelectItem value='Unspecified'>Unspecified</SelectItem>
                                                            </SelectContent>
                                                        </Select>
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    )}
                                    
                                    <FormField
                                        name="fuel"
                                        control={form.control}
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Fuel</FormLabel>
                                                <FormControl>
                                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                        <SelectTrigger className='w-full bg-white'>
                                                            <SelectValue placeholder="Choose fuel type" />
                                                        </SelectTrigger>
                                                        <SelectContent>
                                                            <SelectItem value='Hybrid(LPG)'>Hybrid(LPG)</SelectItem>
                                                            <SelectItem value='Hydrogen'>Hydrogen</SelectItem>
                                                            <SelectItem value='Petrol'>Petrol</SelectItem>
                                                            <SelectItem value='Diesel'>Diesel</SelectItem>
                                                            <SelectItem value='Hybrid(Petrol)'>Hybrid(Petrol)</SelectItem>
                                                            <SelectItem value='LPG'>LPG</SelectItem>
                                                            <SelectItem value='Electric'>Electric</SelectItem>
                                                            <SelectItem value='Hybrid(Diesel)'>Hybrid(Diesel)</SelectItem>
                                                            <SelectItem value='CNG'>CNG</SelectItem>
                                                            <SelectItem value='Other'>Other</SelectItem>
                                                        </SelectContent>
                                                    </Select>
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    {(selectedVehicle === "car" || selectedVehicle === "truck") && (
                                        <FormField
                                            name="drive"
                                            control={form.control}
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Drive</FormLabel>
                                                    <FormControl>
                                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                            <SelectTrigger className='w-full bg-white'>
                                                                <SelectValue placeholder="Choose drive type" />
                                                            </SelectTrigger>
                                                            <SelectContent>
                                                                <SelectItem value='AWD'>AWD</SelectItem>
                                                                <SelectItem value='2WD'>2WD</SelectItem>
                                                                <SelectItem value='4WD'>4WD</SelectItem>
                                                            </SelectContent>
                                                        </Select>
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    )}

                                    <FormField
                                        name="engine_capacity"
                                        control={form.control}
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Engine Capacity(CC)</FormLabel>
                                                <FormControl>
                                                    <Input 
                                                        type="number"
                                                        className='bg-white'
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
                                                        className='bg-white'
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
                                                        className='bg-white'
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
                                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                        <SelectTrigger className='w-full bg-white'>
                                                            <SelectValue placeholder="Financing option" />
                                                        </SelectTrigger>
                                                        <SelectContent>
                                                            <SelectItem value='True'>Yes</SelectItem>
                                                            <SelectItem value='False'>No</SelectItem>
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
                                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                        <SelectTrigger className='w-full bg-white'>
                                                            <SelectValue placeholder="Trade-in" />
                                                        </SelectTrigger>
                                                        <SelectContent>
                                                            <SelectItem value='True'>Yes</SelectItem>
                                                            <SelectItem value='False'>No</SelectItem>
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
                                                <FormLabel>Condition</FormLabel>
                                                <FormControl>
                                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                        <SelectTrigger className='w-full bg-white'>
                                                            <SelectValue placeholder="Choose condition" />
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
                                        render={({ field }) => {
                                            const showDescriptionHint = field.value?.length < 20;

                                            return (
                                                <FormItem>
                                                    <FormLabel>Description</FormLabel>
                                                    <FormControl>
                                                        <Textarea className="bg-white" {...field} />
                                                    </FormControl>

                                                    {showDescriptionHint && (
                                                        <FormDescription className="text-red-500">
                                                            Description must be at least 20 characters long.
                                                        </FormDescription>
                                                    )}

                                                    <FormMessage />
                                                </FormItem>
                                            );
                                        }}
                                    />
                                </div>
                                
                                {packages?.can_upload && (
                                    <div className='flex flex-col justify-center space-y-7 items-center w-2/3 p-5 mx-auto bg-orange-200 border-2 border-orange-300 rounded-2xl'>
                                        <h1 className="font-bold text-xl capitalize">{packages.reason}</h1>
                                        {packages?.reason == "subscription" && (
                                            <>
                                                <h1>{packages?.subscription?.package} package</h1>
                                                <p>Remaining: {packages?.subscription?.remaining_uploads} / {packages?.subscription?.uploads_allowed}</p>
                                            </>
                                        )}
                                    </div>
                                )}  


                                {!packages?.can_upload && (
                                    <>
                                        

                                        <div className="grid lg:grid-cols-3 grid-cols-1 gap-4">
                                            {packages?.packages?.map((item: any) => (
                                                <div key={item.pid} onClick={() => handlePackageSelect(item)}>
                                                    <div className={cn("flex flex-col cursor-pointer justify-center items-center rounded-2xl py-8 border-2 border-gray-100", selectedPackage?.pid === item.pid && "bg-orange-200 border-orange-300" )}>
                                                        <h1 className="font-bold text-xl capitalize">{item.name}</h1>
                                                        <p className="text-sm pt-4"><span className="font-semibold">{item.uploads_allowed}</span> posts</p>
                                                        <p className="text-sm"><span className="font-semibold">{item.active_days}</span> days per post</p>
                                                        { item.renew_after_hours ? (
                                                            <p className="text-sm">Renews after {item.renew_after_hours} Hrs</p>
                                                        ) : (
                                                            <p className="text-sm">No renewal</p>
                                                        )}
                                                        
                                                        <h1 className="font-bold text-lg pt-6">KShs. {parseInt(item.price).toLocaleString()}</h1>
                                                    </div>
                                                </div>
                                            )) }
                                        </div>
                                    </>
                                )} 
                                


                                <div className="flex justify-center gap-20">
                                    <Button type="button" variant="ghost" disabled={loading} onClick={handleBacktoImages} className="cursor-pointer"><ArrowLeft /> Back</Button>
                                    <Button type="submit" className="bg-orange-400 cursor-pointer" disabled={!isValid || isSubmitting || loading }>{loading ? "Uploading ...." : "Upload"}</Button>
                                </div>
                            </form>
                        </Form>
                    </TabsContent>
                </Tabs>

                <MpesaPaymentModal open={showMpesaDialog} onClose={handleMpesaModalClose} subscription={selectedPackage} vehicleid={uploadedVehicleID} />
            </div>
        </section>
    );
}

export default SellCarPage