"use client";

import React from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { VehicleModel } from '@/lib/models';
import { zodResolver } from '@hookform/resolvers/zod';
import { DialogTitle } from '@radix-ui/react-dialog';
import { Gavel } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import 'react-phone-number-input/style.css';
import PhoneInput from 'react-phone-number-input';
import Link from 'next/link';
import ApiServices from '@/lib/apiservice';
import { toast } from 'sonner';

interface BigModalProps {
    vehicleData: VehicleModel;
}


const biddingSchema = z.object({
    name: z.string().min(1, "Full name is required."),
    phone: z.string().min(1, "Phone number is required."),
    amount: z.string().min(1, "Amount is required."),
})

const BidModal = ({ vehicleData }: BigModalProps) => {

    const form = useForm<z.infer <typeof biddingSchema>>({
        resolver: zodResolver(biddingSchema),
        defaultValues: {
            name: "",
            phone: "",
            amount: "",
        }
    });
    const { isValid, isSubmitting} = form.formState;

    const onSubmit = async(values: z.infer<typeof biddingSchema>) => {

        const formData = new FormData();
        formData.append("name", values.name);
        formData.append("phone", values.phone);
        formData.append("amount", values.amount);
        formData.append("auction", vehicleData?.auctions?.id);

        console.log(vehicleData);
        const resp = await ApiServices.post("listings/place-bid/", formData);
        if(resp.success){
            toast.success(resp.message);
            window.location.reload();
        } else {
            toast.error("Something went wrong.");
        }
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                {/* disabled={vehicleData?.auctions?.status === "upcoming"} */}
                <Button  className="bg-orange-500 text-white w-full cursor-pointer flex items-center"><Gavel /> Place Your Bid</Button>
            </DialogTrigger>
            <DialogContent>
                
                <DialogTitle className='text-xl text-orange-500 font-bold'>
                    <p className='text-slate-500 text-xs font-medium'>You are bidding on</p>{vehicleData?.year_of_make} {vehicleData?.make} {vehicleData?.model}
                </DialogTitle>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-5'>
                        <div>
                            <FormField 
                                name="name"
                                control={form.control}
                                render={({field}) => (
                                    <FormItem>
                                        <FormLabel>Your Name</FormLabel>
                                        <FormControl>
                                            <Input 
                                                type="text"
                                                placeholder="e.g. John Doe"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <div>
                            <FormField
                                name="phone"
                                control={form.control}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Phone</FormLabel>
                                        <FormControl>
                                            <PhoneInput
                                                defaultCountry="KE"
                                                placeholder="e.g. 740733604"
                                                international
                                                withCountryCallingCode
                                                className="focus:ring-0 focus:border-none border px-1.5 py-1 rounded-lg ring-slate-200 focus:outline-0"
                                               
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                        <FormDescription className='text-orange-400'>Phone number used to pay <strong>Bid Deposit</strong> via MPESA</FormDescription>
                                    </FormItem>
                                )}
                            />
                        </div>
                        <div>
                            <FormField
                                name="amount"
                                control={form.control}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Your Bid Amount</FormLabel>
                                        <FormControl>
                                            <Input
                                                type="text"
                                                placeholder={`Min amount: KES ${parseInt(vehicleData?.auctions?.current_price).toLocaleString()}`}
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        <div>
                            <FormDescription className='text-orange-400'>By submitting you agree to our <Link href="/terms-conditions">Terms & Conditions</Link></FormDescription>
                        </div>

                        <div>
                            <Button disabled={!isValid || isSubmitting} className="w-full cursor-pointer hover:bg-orange-500">Submit</Button>
                        </div>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
}

export default BidModal