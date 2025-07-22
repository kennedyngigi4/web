"use client"

import React from 'react';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Form, FormField, FormItem, FormControl, FormLabel, FormMessage  } from '@/components/ui/form';
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import ApiServices from '@/lib/apiservice';
import { toast } from 'sonner';


const formSchema = z.object({
  name: z.string().min(2, { message: "Full Name must be at least 2 characters.", }),
  phone: z.string().min(1, { message: "Phone is required", }),
  make: z.string().min(1, { message: "Make is required", }),
  model: z.string().min(1, { message: "Model is required", }),
  budget: z.string().min(1, { message: "Budget is required", }),
  notes: z.string().optional(),
})

const FindMeCar = () => {

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      phone: "",
      make: "",
      model: "",
      budget: "",
      notes: "",
    }
  });
  const { reset } = form;
  const { isValid, isSubmitting } = form.formState;

  const onSubmit = async(values: z.infer<typeof formSchema>) => {
   
    try{
      const resp = await ApiServices.post("listings/search_request", values);
      if(resp.success){
        toast.success("Request sent successfully", { position: "top-center"});

        setTimeout(() => {
          toast.success("Our agent will get back to you shortly.", { position: "top-center" });
        }, 6000);

        reset();
      } else {
        toast.error(resp.error, { position: "top-center" });
      }
    } catch(e){
      toast.error("An error occured! "+e, { position: "top-center" });
    }
  }

  return (
    <section className="min-h-screen flex items-center px-4 py-10 lg:px-16 bg-gray-50">
      <div className="grid md:grid-cols-2 grid-cols-1 gap-8 w-full">

        {/* Left Side - Text */}
        <div className="flex flex-col justify-center">
          <div className="bg-orange-400 p-2 rounded-2xl inline-block mb-4 w-fit">
            <p className="text-white font-medium max-md:text-sm">We are here to help you find your dream car.</p>
          </div>
          <h2 className="text-3xl max-md:text-2xl font-bold text-gray-900 mb-4">
            Skip the stress of car hunting. <br />Let us do it for you!
          </h2>
          <p className="text-gray-600 text-lg">
            Just tell us what kind of car you’re looking for — make, model, budget — and our team will get to work finding the perfect match for you.
          </p>
        </div>

        {/* Right Side - Form */}
        <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8">
          <div className="mb-5">
            <h1 className="text-lg font-bold text-gray-900 mb-2">Your car hunt starts here</h1>
            <div className="bg-orange-200 p-1 text-sm rounded inline-block">
              <p className='px-1'>This service will cost you <strong>KSh 2,000</strong></p>
            </div>
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-5">
              <FormField 
                name="name"
                control={form.control}
                render={({field}) => (
                  <FormItem>
                    <FormLabel>Full Name</FormLabel>
                    <FormControl>
                      <Input 
                        type="text"
                        placeholder="John Doe"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField 
                name="phone"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone</FormLabel>
                    <FormControl>
                      <Input
                        type="tel"
                        placeholder="+254722..."
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField 
                name="make"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Preferred Make</FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        placeholder="Toyota, Mazda, Nissan, etc"
                        {...field}
                      />
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
                    <FormLabel>Preferred Model</FormLabel>
                    <FormControl>
                      <Input
                        type="tel"
                        placeholder="Probox, CX-5, etc."
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField 
                name="budget"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Budget Range</FormLabel>
                    <FormControl>
                      <Input
                        type="tel"
                        placeholder="KES 1M - 1.5M"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField 
                name="notes"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Additional Notes</FormLabel>
                    <FormControl>
                      <Textarea 
                        rows={3} 
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-400 focus:ring-orange-400" 
                        placeholder="Color, fuel type, etc." {...field}>
                        
                      </Textarea>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <p className="text-sm text-gray-500">
                <span className="font-semibold text-red-500">Note:</span> While we assist in finding your ideal car, please come with your own mechanic or technician to help you inspect it and ensure it’s in great condition.
              </p>

              <Button type="submit" disabled={!isValid || isSubmitting}  className="bg-orange-400 hover:bg-orange-500 cursor-pointer mt-3 text-white font-semibold py-2 rounded-xl transition duration-200">
                Find My Car
              </Button>
            </form>
          </Form>

          
        </div>
      </div>
    </section>

  )
}

export default FindMeCar