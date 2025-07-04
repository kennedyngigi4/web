"use client"

import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Trash2 } from 'lucide-react';
import DealerApiService from '@/lib/dealer_apiservice';
import { useSession } from 'next-auth/react';
import { SparePart } from '@/lib/models';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Form, FormItem, FormControl, FormField, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import ConfirmModal from '@/components/modals/confirm_modal';
import Image from 'next/image';
import ApiServices from '@/lib/apiservice';
import DeleteModal from '@/components/modals/delete_modal';
import { toast } from 'sonner';

const sparesSchema = z.object({
    title: z.string().min(1, { message: "Title is required." }),
    parts_type: z.string().min(1, { message: "Spare parts type is required." }),
    vehicle_make: z.string().min(1, { message: "Vehicle make is required" }),
    vehicle_model: z.string().min(1, { message: "Vehicle make is required" }),
    condition: z.string().min(1, { message: "Spare parts condition is required"}),
    price: z.string().min(1, { message: "Price is required" }),
    description: z.string().min(1, { message: "Description is required." }),
    vehicle_type: z.string(),
})


const SpareDetailsPage = () => {
    const params = useParams();
    const { data:session, status} = useSession(); 
    const router = useRouter();
    const [ spareData, setSpareData ] = useState< SparePart | any>({});
    const [ makes, setMakes ] = useState([]);
    const [ models, setModels ]= useState([]);
    const [ spares, setSpares ] = useState([]);

    useEffect(() => {
        const loadSpare = async () => {

            if (!session?.accessToken) {
                throw new Error("You must be logged in");
            }

            const data = await DealerApiService.get(`dealers/spare/${params?.spareId}`, session?.accessToken);
            console.log(data);
            setSpareData(data);
        }
        loadSpare();
    }, [session, params]);


    useEffect(() => {
            // Loads all vehicle makes
        async function loadMakes(){
            const res = await fetch(`${process.env.NEXT_PUBLIC_APIURL}/listings/makes/${spareData.vehicle_type}`);
            const makes = await res.json();
            setMakes(makes);
        }   
        loadMakes();
    }, [spareData]);


    const handleRelatedModels = async (value: string) => {
        // Get related models to the make user has selected
        const res = await fetch(`${process.env.NEXT_PUBLIC_APIURL}/listings/models/${value}`)
        const models = await res.json();
        setModels(models);
    }


    useEffect(() => {
        const fetchPartTypes = async() => {
            const data = await ApiServices.get(`listings/spares_types/`);
            setSpares(data)
        }
        fetchPartTypes();
    }, [])

    const form = useForm<z.infer <typeof sparesSchema>>({
        resolver: zodResolver(sparesSchema),
        defaultValues: {
            title: "",
            parts_type: "",
            vehicle_make: "",
            vehicle_model: "",
            condition: "",
            price: "",
            description: "",
            vehicle_type: "",
        }
    });

    const { isValid, isSubmitting } = form.formState;

    useEffect(() => {
        if(spareData){
            form.reset(spareData);
        }
    }, [spareData, form]);

    


    const onSubmit = async(values: z.infer<typeof sparesSchema>) => {
        try{

            if(!session?.accessToken){
                throw new Error("You must be logged in.");
            }

            const formData = new FormData()
            formData.append("title", values.title);
            formData.append("vehicle_type", values.vehicle_type);
            formData.append("vehicle_make", values.vehicle_make);
            formData.append("vehicle_model", values.vehicle_model);
            formData.append("parts_type", values.parts_type);
            formData.append("condition", values.condition);
            formData.append("price", values.price);
            formData.append("description", values.description);

            const res = await DealerApiService.patch(`dealers/spare/${params.spareId}`, session?.accessToken, formData);
            if (res.success) {
                toast.success(res.message, { position: "top-center", });
                window.location.reload();
            } else {
                toast.error(res.message, { position: "top-center", });
                window.location.reload();
            }
        } catch(e){
            console.log(e);
        }
    }


    const handleDelete = async() => {
        try{
            if (!session?.accessToken) {
                throw new Error("You must be logged in.");
            }

            const res = await DealerApiService.delete(`dealers/spare/${params.spareId}`, session?.accessToken);
            console.log(res)
            if(res.success){
                toast.success(res.message, { position: "top-center", });
                return router.push("/dealer/spares");
            } else {
                toast.error(res.message, { position: "top-center", });
                return router.push("/dealer/spares");
            }
        } catch(e){
            console.log(e);
        }
    }

    const handleImgDelete = async(id: string) => {

    }

  return (
    <section className=''>
        <div className="bg-white p-6">
            <div className="flex flex-col lg:flex-row w-full lg:justify-between space-y-4 lg:items-center">
                <div>
                    <Link href="/dealer/spares" className="flex text-slate-500 text-sm">
                        <Button type="button" variant="ghost" className="cursor-pointer">
                            <ArrowLeft className="w-8 h-4" /> Back to spares
                        </Button>
                    </Link>
                    <div className="flex flex-col pt-5">
                        <h2 className="font-semibold text-lg">{spareData?.title}</h2>
                        <p></p>
                    </div>
                </div>
                <div className="flex justify-start items-center gap-2">
                    <div>
                        {(spareData?.status == "draft" || spareData?.status == "expired") && (
                            <Link href={`/dealer/publish-draft/${spareData?.title}/${spareData.id}`}>
                                <Button className="capitalize bg-yellow-400 hover:text-white text-black cursor-pointer" size="sm">Publish</Button>
                            </Link>
                        )}
                    </div>

                    <div>
                        {spareData?.status == "published" && (
                            <p className="text-green-600 font-semibold text-sm pe-10">Expires: {new Date(spareData?.expires_at).toLocaleDateString("en-us", {
                                year: "numeric",
                                month: "short",
                                day: "numeric",
                            }) }</p>
                        )}
                    </div>


                    <div>
                        {spareData?.status == "pending_review" && (
                            <p className="text-orange-400">Updating ....</p>
                        )}
                    </div>
                    

                    <DeleteModal
                        children={<Button size="sm" variant="outline" className='border-red-500 text-red-500 hover:bg-red-500 hover:text-white cursor-pointer'>Delete</Button>}
                        title={`Delete`}
                        product={`${spareData?.title}`}
                        description='Are you sure you want to delete this spare part listing? This action cannot be undone.'
                        onConfirm={handleDelete}
                    />
                </div>
            </div>


            <div className="grid md:grid-cols-12 grid-cols-1 mt-4 gap-8">
                <div className="md:col-span-8">
                    <div className="flex flex-col ">
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className="">
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

                                <div className="grid grid-cols-1 md:grid-cols-3 gap-5 pt-5">
                                    <FormField
                                        name="vehicle_type"
                                        control={form.control}
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Vehicle Type</FormLabel>
                                                <FormControl>
                                                    <Select onValueChange={field.onChange} value={field.value}>
                                                        <SelectTrigger className='w-full bg-white'>
                                                            <SelectValue placeholder="Choose vehicle type" />
                                                        </SelectTrigger>
                                                        <SelectContent>
                                                            <SelectItem value="bike">Bike</SelectItem>
                                                            <SelectItem value="car">Car</SelectItem>
                                                            <SelectItem value="truck">Truck</SelectItem>
                                                        </SelectContent>
                                                    </Select>
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        name="vehicle_make"
                                        control={form.control}
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Vehicle Make</FormLabel>
                                                <FormControl>
                                                    <Select onValueChange={(value) => { field.onChange(value); handleRelatedModels(value); }} defaultValue="" value={field.value}>
                                                        <SelectTrigger className='w-full bg-white'>
                                                            <SelectValue placeholder="Choose vehicle type" />
                                                        </SelectTrigger>
                                                        <SelectContent>
                                                            {makes.map((make: { id: string, name: string}) => (
                                                                <SelectItem key={make.id} value={make.id.toString()}>{make.name}</SelectItem>
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
                                                <FormLabel>Vehicle Model</FormLabel>
                                                <FormControl>
                                                    <Select onValueChange={field.onChange} value={field.value}>
                                                        <SelectTrigger className='w-full bg-white'>
                                                            <SelectValue placeholder="Choose vehicle type" />
                                                        </SelectTrigger>
                                                        <SelectContent>
                                                            {models.map((model: { id: string, name: string}) => (
                                                                <SelectItem key={model.id} value={model.id.toString()}>{model.name}</SelectItem>
                                                            ))}
                                                            
                                                            
                                                        </SelectContent>
                                                    </Select>
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-3 gap-5 pt-5">
                                      <FormField
                                          name="parts_type"
                                          control={form.control}
                                          render={({ field }) => (
                                              <FormItem>
                                                  <FormLabel>Type of Part</FormLabel>
                                                  <FormControl>
                                                      <Select onValueChange={field.onChange} value={field.value}>
                                                          <SelectTrigger className='w-full bg-white'>
                                                              <SelectValue placeholder="Choose vehicle type" />
                                                          </SelectTrigger>
                                                          <SelectContent>
                                                            {spares.map((item: { id: string, name: string}) => (
                                                                <SelectItem key={item.id} value={item.id.toString()}>{item.name}</SelectItem>
                                                            ))}
                                                          </SelectContent>
                                                      </Select>
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
                                                  <FormLabel>Price (KES)</FormLabel>
                                                  <FormControl>
                                                      <Input 
                                                        type="text"
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
                                                      <Select onValueChange={field.onChange} value={field.value}>
                                                          <SelectTrigger className='w-full bg-white'>
                                                              <SelectValue placeholder="Choose condition" />
                                                          </SelectTrigger>
                                                          <SelectContent>
                                                              <SelectItem value="brand new">Brand New</SelectItem>
                                                              <SelectItem value="refurbished">refurbished</SelectItem>
                                                              <SelectItem value="used">Used</SelectItem>
                                                          </SelectContent>
                                                      </Select>
                                                  </FormControl>
                                                  <FormMessage />
                                              </FormItem>
                                          )}
                                      />
                                </div>
                                <div className='pt-5'>
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
                                </div>

                                <div className='mt-5'>
                                    <Button size="sm" className="bg-orange-400 cursor-pointer">Save Changes</Button>
                                </div>
                            </form>
                        </Form>

                    </div>
                </div>
                <div className="md:col-span-4">
                    <h1 className="font-semibold pb-3">Images</h1>
                    <div className="grid md:grid-cols-2 grid-cols-2 gap-5">
                        {spareData?.images?.map((img: any) => (
                            <div key={img.id} className="relative">
                                <ConfirmModal onConfirm={() => handleImgDelete(img.id)}>
                                    <div className="absolute bottom-1 right-1 bg-red-500 text-white rounded-full p-1 cursor-pointer">
                                        <Trash2 className="w-4 h-4 text-white" />
                                    </div>
                                    
                                </ConfirmModal>
                                <Image src={img?.image} alt="Kenautos Hub, Kenyas leading car Marketplace" width={300} height={300} />
                            </div>
                        ))}
                    </div>
                </div>
            </div>

        </div>
    </section>
  )
}

export default SpareDetailsPage