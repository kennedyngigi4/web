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


interface EmailFormProps {
    initialData: string;
}

const formSchema = z.object({
    email: z.string({ "required_error": "Your email is required" }).email(),
})


const EmailForm = ({ initialData  }: EmailFormProps) => {
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
        if(initialData){
            form.reset({ email: initialData })
        }
    }, [initialData]);

    const handleSubmit = async(values: z.infer<typeof formSchema>) => {
        console.log(values);
    }

    return (
        <section className="bg-white border-2 border-slate-100 rounded-lg p-4">
            <div className="flex flex-col">
                <div className="flex justify-between items-center">
                    <p className="text-sm font-medium">Your email</p>
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
                                                type="email"
                                                className="bg-white"
                                                placeholder="e.g. johndoe@email.com"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <div>
                                <Button size="sm" className="" disabled={!isValid || isSubmitting}>Save</Button>
                            </div>
                        </form>
                    </Form>
                </> : <>
                    <p className="text-slate-500 text-sm mt-2">{initialData ? initialData : "No Email"}</p>
                </>}

            </div>
        </section>
    );
}

export default EmailForm