"use client"

import React from 'react';
import Image from 'next/image';
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { Form, FormField, FormItem, FormControl, FormMessage, FormLabel } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import ApiServices from '@/lib/apiservice';
import { toast } from 'sonner';


const formSchema = z.object({
    email: z.string({ required_error: "Email is required" }).email({ "message": "Invalid email address" }),
})

const ForgotPassword = () => {

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
        }
    })

    const { isValid, isSubmitting } = form.formState;

    const onSubmit = async (values: z.infer<typeof formSchema>) => {

        const formData = new FormData();
        formData.append("email", values.email);
        const res = await ApiServices.post('account/forgot-password/', formData);
        console.log(res);
        if(res.success){
            toast.success(res.message);
        } else {
            toast.error(res.message);
        }
    }


    return (
        <section className="flex py-16 h-screen justify-center items-center">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 md:w-[85%] shadow-sm md:p-9 p-3 bg-white md:mx-auto">
                <div>
                    <Image src="/images/login.svg" width={500} height={500} layout="responsive" className="md:pt-2" alt="Your trusted online car marketplace. Buy, sell or rent cars in Nairobi, Kenya" />
                </div>
                <div className="flex flex-col space-y-6 lg:w-[75%] w-full">
                    <div>
                        <h1 className="text-2xl font-semibold text-orange-400">Forgot Password?</h1>
                        <p className="text-slate-500">Welcome back, let's make some money!🤑</p>
                    </div>

                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                            <FormField
                                name="email"
                                control={form.control}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Email Address</FormLabel>
                                        <FormControl>
                                            <Input
                                                type="email"
                                                placeholder="e.g. johndoe@email.com"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <div>
                                <Button className="w-full bg-orange-400 hover:bg-orange-400 text-white cursor-pointer" disabled={!isValid || isSubmitting}>RESET PASSWORD</Button>
                            </div>
                        </form>
                    </Form>

                    <p>Already having account? <Link href="/signin" className="text-orange-400">Log in</Link></p>
                </div>
            </div>
        </section>
    )
}

export default ForgotPassword