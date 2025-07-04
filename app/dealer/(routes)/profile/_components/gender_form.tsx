"use client"

import { PencilIcon } from 'lucide-react';
import React, { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from "zod";
import { useForm } from 'react-hook-form';
import { Form, FormField, FormItem, FormDescription, FormMessage, FormControl, FormLabel } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import { useSession } from 'next-auth/react';
import { Select, SelectContent, SelectItem, SelectTrigger } from '@/components/ui/select';
import { SelectValue } from '@radix-ui/react-select';
import { cn } from '@/lib/utils';


interface GenderFormProps {
    initialData: string;
}

const formSchema = z.object({
    gender: z.string({ "required_error": "Your gender is required" }),
})


const GenderForm = ({ initialData }: GenderFormProps) => {
    const { data:session, status } = useSession();
    const [ isEditing, setIsEditing ] = useState(false);

    const toggleEdit = () => setIsEditing((current) => !current);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            gender: initialData,
        }
    });

    const { isValid, isSubmitting  } = form.formState;

    const handleSubmit = async(values: z.infer<typeof formSchema>) => {
        console.log(values);
    }

    return (
        <section className="bg-white border-2 border-slate-100 rounded-lg p-4">
            <div className="flex flex-col">
                <div className="flex justify-between items-center">
                    <p className="text-sm font-medium">Your gender</p>
                    <div className="flex text-sm text-slate-600">
                        <Button variant="ghost" className="cursor-pointer" onClick={toggleEdit}>
                            {isEditing && (
                                <>Cancel</>
                            )}
                            {!isEditing &&(
                                <>
                                    Edit gender <PencilIcon className="w-4 h-4" />
                                </>
                            )}
                            
                        </Button>
                        
                        
                    </div>
                </div>

                {isEditing  ? <>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-2">
                            <FormField 
                                name="gender"
                                control={form.control}
                                render={({field}) => (
                                    <FormItem>
                                        <FormLabel></FormLabel>
                                        <FormControl>
                                            <Select>
                                                <SelectTrigger className="w-full bg-white">
                                                    <SelectValue placeholder="Choose gender" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="Female">Female</SelectItem>
                                                    <SelectItem value="Male">Male</SelectItem>
                                                    <SelectItem value="Not Say">Not Say</SelectItem>
                                                </SelectContent>
                                            </Select>
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
                    <p className={cn("text-slate-500 text-sm mt-2", !initialData && "italic")}>{initialData ? initialData : "No gender"}</p>
                </>}

            </div>
        </section>
    );
}

export default GenderForm