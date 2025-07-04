"use client"


import React, { useEffect, useState } from 'react';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Form, FormField, FormItem, FormControl, FormMessage, FormDescription, FormLabel } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { Select, SelectContent, SelectItem, SelectTrigger } from '@/components/ui/select';
import { SelectValue } from '@radix-ui/react-select';
import { Textarea } from '@/components/ui/textarea';
import { ArrowLeft, ArrowRightIcon, Bike, Car, Trash2, Truck, UploadCloud } from 'lucide-react';
import { Label } from '@/components/ui/label';
import ApiServices from '@/lib/apiservice';
import DealerApiService from '@/lib/dealer_apiservice';

const sparesSchema = z.object({
    title: z.string().min(1, { message: "Title is required." }),
    parts_type: z.string().min(1, { message: "Spare parts type is required." }),
    vehicle_make: z.string().min(1, { message: "Vehicle make is required" }),
    vehicle_model: z.string().optional(),
    condition: z.string().min(1, { message: "Spare parts condition is required"}),
    price: z.string().min(1, { message: "Price is required" }),
    description: z.string().min(1, { message: "Description is required." }),
})

const SpareParts = () => {
    const router = useRouter();
    const { data:session, status } = useSession();
    const [ images, setImages ] = useState<File[]>([]);
    const [ previewUrls, setPreviewUrls ] = useState<string[]>([]);
    const [ loading, setLoading ] = useState(false);
    const [ activeTab, selectActiveTab ] = useState("images");
    const [ selectedVehicle, setSelectedVehicle ] = useState<string | null>(null);
    const [ makes, setMakes ] = useState([]);
    const [ models, setModels ] = useState([]);
    const [ spares, setSpares ] = useState([]);
    

    const form = useForm<z.infer <typeof sparesSchema>>({
        resolver: zodResolver(sparesSchema),
        defaultValues: {
            title: "",
            parts_type: "",
            vehicle_make: "",
            vehicle_model: "",
            condition: "",
            price: "",
            description: ""
        }
    })

    const { isValid, isSubmitting } = form.formState;

    const handleFileChange = (files: FileList | null) => {
        if (!files) return;

        const selectedFiles = Array.from(files);

        // Prevent duplication
        const uniqueFiles = selectedFiles.filter((file) => !images.some((img) => img.name === file.name))
        setImages((prev) => [...prev, ...uniqueFiles]);

        // preview Images
        const previewUrls = uniqueFiles.map((file) => URL.createObjectURL(file));
        setPreviewUrls((prev) => [...prev, ...previewUrls]);
    }


    const handleRemoveImage = (index: number) => {
        setImages((prev) => prev.filter((_, i) => i !== index));
        setPreviewUrls((prev) => prev.filter((_, i) => i !== index));
    }


    const handleSelect = (type: string) => {
        setSelectedVehicle(type);
    }

    const handleNext = async() => {
        if(images.length < 1){
            toast.error("Upload at least 1 image", { position: "top-center" });
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
            const res = await ApiServices.get(`listings/makes/${selectedVehicle}`);
            setMakes(res);
        }   
        loadMakes();
    }, [selectedVehicle]);

    const handleRelatedModels = async(value: string) => {
        const res = await ApiServices.get(`listings/models/${value}`);
        setModels(res);
    }


    useEffect(() => {
        const fetchPartTypes = async() => {
            const res = await ApiServices.get(`listings/spares_types/`);
            setSpares(res)
        }
        fetchPartTypes();
    }, [])


    const onSubmit = async(values: z.infer<typeof sparesSchema>) => {
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
        formData.append("vehicle_type", selectedVehicle);
        formData.append("title", values.title);
        formData.append("vehicle_make", values.vehicle_make);
        formData.append("parts_type", values.parts_type);
        formData.append("price", values.price);
        formData.append("condition", values.condition);
        formData.append("description", values.description);
        // formData.append("package_id", selectedPackage?.pid);
        images.forEach((image) => {
            formData.append("images", image);
        });


        if (values.vehicle_model) {
            formData.append("vehicle_model", values.vehicle_model);
        }

        if (!session?.accessToken) {
            throw new Error("You must be logged in.");
        }


        const resp = await DealerApiService.post("dealers/spare_upload/", session?.accessToken, formData);
        console.log(resp);

    }

    return (
        <section className="min-h-screen flex justify-center items-start">
            <div className="py-10">
                <div className="pb-8 max-md:px-5">
                    <h1 className="font-bold text-orange-400 text-2xl">Spare Parts</h1>
                    <p className="text-slate-500">Upload images and parts details for it to be listed on our website</p>
                </div>
                <Tabs value={activeTab} className="md:w-[700px] w-screen px-5">
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
                                    <img src={src} alt="Preview" className="md:w-30 md:h-30 w-60 h-60 object-cover rounded-md" />
                                    <button
                                        onClick={() => handleRemoveImage(index)}
                                        className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 cursor-pointer"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                </div>
                            ))}
                        </div>
                        

                        <div className="py-14">
                            <Label>Select vehicle type</Label>
                            <div className="flex gap-4 w-full pt-5">

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
                            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5 mt-5">
                                <FormField
                                    name="title"
                                    control={form.control}
                                    render={({field}) => (
                                        <FormItem>
                                            <FormLabel>Title</FormLabel>
                                            <FormControl>
                                                <Input 
                                                    type="text" 
                                                    placeholder="e.g. Foglight Valeo (Vitz, Fielder, Axio, Rav4, Markx)"
                                                    className="bg-white"
                                                    {...field} 
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <div className="grid md:grid-cols-2 grid-cols-1 gap-5">
                                    <FormField 
                                        name="vehicle_make"
                                        control={form.control}
                                        render={({field}) => (
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
                                        name="vehicle_model"
                                        control={form.control}
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Model</FormLabel>
                                                <FormControl>
                                                    <Select onValueChange={field.onChange} defaultValue="" value={field.value}>
                                                        <SelectTrigger className='w-full bg-white'>
                                                            <SelectValue placeholder="Choose model" />
                                                        </SelectTrigger>
                                                        <SelectContent>
                                                            {models.map((opt: { id: string, name: string }) => (
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

                                <FormField
                                    name="parts_type"
                                    control={form.control}
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Spare parts type</FormLabel>
                                            <FormControl>
                                                <Select onValueChange={field.onChange}  defaultValue="" value={field.value}>
                                                    <SelectTrigger className="w-full bg-white">
                                                        <SelectValue placeholder="Select spare parts type" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        {spares.map((item: any) => (
                                                            <SelectItem key={item.id} value={String(item.id)}>{item.name}</SelectItem>
                                                        ))}
                                                    </SelectContent>
                                                </Select>
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />



                                <div className="grid md:grid-cols-2 grid-cols-1 gap-5">
                                    <FormField
                                        name="price"
                                        control={form.control}
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Price</FormLabel>
                                                <FormControl>
                                                    <Input 
                                                        type="number" 
                                                        placeholder="e.g. 3000"
                                                        className="bg-white"
                                                        {...field} 
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        name="condition"
                                        control={form.control}
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Condition</FormLabel>
                                                <FormControl>
                                                    <Select defaultValue={field.value} onValueChange={field.onChange}>
                                                        <SelectTrigger className="w-full bg-white">
                                                            <SelectValue placeholder="Select condition" />
                                                        </SelectTrigger>
                                                        <SelectContent>
                                                            <SelectItem value="brand new">Brand New</SelectItem>
                                                            <SelectItem value="refurbished">Refurbished</SelectItem>
                                                            <SelectItem value="used">Used</SelectItem>
                                                        </SelectContent>
                                                    </Select>
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>

                                <FormField
                                    name="description"
                                    control={form.control}
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Description</FormLabel>
                                            <FormControl>
                                                <Textarea rows={3} {...field} placeholder="Enter description here ...." className="bg-white"></Textarea>
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <div className="flex justify-between py-8">
                                    <div>
                                        <Button onClick={handleBacktoImages} type="button" variant="ghost" className="cursor-pointer"><ArrowLeft /> Back</Button>
                                    </div>
                                    <div>
                                        <Button type="submit" className="bg-orange-400 cursor-pointer" disabled={!isValid || isSubmitting }>{loading ? "Uploading ...." : "Upload"}</Button>
                                    </div>
                                </div>

                            </form>
                        </Form>
                    </TabsContent>
                </Tabs>
            </div>
        </section>
    )
}

export default SpareParts




