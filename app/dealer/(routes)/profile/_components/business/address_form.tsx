"use client"

import { PencilIcon } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from "zod";
import { useForm } from 'react-hook-form';
import { Form, FormField, FormItem, FormMessage, FormControl, FormLabel } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import { useSession } from 'next-auth/react';
import DealerApiService from '@/lib/dealer_apiservice';


interface BusinessLocationFormProps {
    initialData: string;
    business_id: string;
}

const formSchema = z.object({
    address: z.string(),
})


const BusinessLocationForm = ({ initialData, business_id }: BusinessLocationFormProps) => {
    const { data: session } = useSession();
    const [isEditing, setIsEditing] = useState(false);

    const toggleEdit = () => setIsEditing((current) => !current);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            address: initialData,
        }
    });

    const { isValid, isSubmitting } = form.formState;


    useEffect(() => {
        if (initialData) {
            form.reset({ address: initialData });
        }
    }, [initialData, form]);

    const handleSubmit = async (values: z.infer<typeof formSchema>) => {
        try {

            if (!session?.accessToken) {
                throw new Error("You must be logged in.");
            }

            const formData = new FormData();
            formData.append("address", values.address);

            const res = await DealerApiService.patch(`account/dealers/business_update/${business_id}`, session?.accessToken, formData);
            if (res.ok) {
                toast.success("Update successful!");
                window.location.reload();
            } else {
                toast.error("Something went wrong.");
                window.location.reload();
            }
        } catch (e) {
            toast.error("An error occurred " + e);
        }
    }

    return (
        <section className="bg-white border-2 border-slate-100 rounded-lg p-4">
            <div className="flex flex-col">
                <div className="flex justify-between items-center">
                    <p className="text-sm font-medium">Business address</p>
                    <div className="flex text-sm text-slate-600">
                        <Button variant="ghost" className="cursor-pointer" onClick={toggleEdit}>
                            {isEditing && (
                                <>Cancel</>
                            )}
                            {!isEditing && (
                                <>
                                    Edit address <PencilIcon className="w-4 h-4" />
                                </>
                            )}

                        </Button>


                    </div>
                </div>

                {isEditing ? <>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-2">
                            <FormField
                                name="address"
                                control={form.control}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel></FormLabel>
                                        <FormControl>
                                            <Input
                                                type="text"
                                                className="bg-white"
                                                placeholder="e.g. Kiambu Road, Nairobi, Kenya"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <div>
                                <Button size="sm" className="cursor-pointer" disabled={!isValid || isSubmitting}>Save</Button>
                            </div>
                        </form>
                    </Form>
                </> : <>
                    <p className="text-slate-500 text-sm mt-2">{initialData ? initialData : "No physical address"}</p>
                </>}

            </div>
        </section>
    );
}

export default BusinessLocationForm