"use client"

import { PencilIcon } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from "zod";
import { useForm } from 'react-hook-form';
import { Form, FormField, FormItem, FormDescription, FormMessage, FormControl, FormLabel } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import { useSession } from 'next-auth/react';
import DealerApiService from '@/lib/dealer_apiservice';


interface BusinessEmailFormProps {
    initialData: string;
    business_id: string;
}

const formSchema = z.object({
    email: z.string({ "required_error": "Your business email is required" }),
})


const BusinessEmailForm = ({ initialData, business_id } : BusinessEmailFormProps ) => {
    const { data:session, status } = useSession();
    const [ isEditing, setIsEditing ] = useState(false);

    const toggleEdit = () => setIsEditing((current) => !current);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: initialData,
        }
    });

    const { isValid, isSubmitting  } = form.formState;


    useEffect(() => {
        if (initialData) {
            form.reset({ email: initialData });
        }
    }, [initialData]);

    const handleSubmit = async(values: z.infer<typeof formSchema>) => {
        try {
        
            if(!session?.accessToken){
                throw new Error("You must be logged in.");
            }

            const formData = new FormData();
            formData.append("email", values.email);

            const res = await DealerApiService.patch(`account/dealers/business_update/${business_id}`, session?.accessToken, formData);
            if(res.ok){
                toast.success("Update successful!");
                window.location.reload();
            } else {
                toast.error("Something went wrong.");
                window.location.reload();
            }
        } catch(e){
            toast.error("An error occurred.");
        }
    }

    return (
        <section className="bg-white border-2 border-slate-100 rounded-lg p-4">
            <div className="flex flex-col">
                <div className="flex justify-between items-center">
                    <p className="text-sm font-medium">Business email</p>
                    <div className="flex text-sm text-slate-600">
                        <Button variant="ghost" className="cursor-pointer" onClick={toggleEdit}>
                            {isEditing && (
                                <>Cancel</>
                            )}
                            {!isEditing &&(
                                <>
                                    Edit email <PencilIcon className="w-4 h-4" />
                                </>
                            )}
                            
                        </Button>
                        
                        
                    </div>
                </div>

                {isEditing  ? <>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-2">
                            <FormField 
                                name="email"
                                control={form.control}
                                render={({field}) => (
                                    <FormItem>
                                        <FormLabel></FormLabel>
                                        <FormControl>
                                            <Input 
                                                type="text"
                                                className="bg-white"
                                                placeholder="e.g. company@email.com"
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
                    <p className="text-slate-500 text-sm mt-2">{initialData ? initialData : "No business email"}</p>
                </>}

            </div>
        </section>
    );
}

export default BusinessEmailForm