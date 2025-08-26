"use client";

import React from 'react';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Form, FormControl, FormItem, FormField, FormMessage, FormLabel } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { FaWhatsapp } from 'react-icons/fa';
import ApiServices from '@/lib/apiservice';
import { toast } from 'sonner';
import Image from 'next/image';


const bookingSchema = z.object({
  fullname: z.string().min(1, { message: "Full name is required. "}),
  phone: z.string().min(1, { message: "Phone number is required. " }),
  occasion: z.string().min(1, { message: "Occasion is required. " }),
  vehicle: z.string().min(1, { message: "Vehicle is required. " }),
  occasion_date: z.string().min(1, { message: "Occasion date is required. " }),
  pickup_time: z.string().min(1, { message: "Pickup time is required. " }),
  pickup_location: z.string().min(1, { message: "Pickup location is required. " }),
  additionals: z.string().optional(),
})

const LuxuryCarHirePage = () => {

  const form = useForm<z.infer<typeof bookingSchema>>({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      fullname: "",
      phone: "",
      occasion: "",
      vehicle: "",
      occasion_date: "",
      pickup_time: "",
      pickup_location: "",
      additionals: ""
    }
  });

  const { reset } = form;
  const { isValid, isSubmitting } = form.formState;

  const handleSubmit = async(values: z.infer<typeof bookingSchema>) => {

    const formData = new FormData();
    formData.append("fullname", values.fullname);
    formData.append("phone", values.phone);
    formData.append("occasion", values.occasion);
    formData.append("vehicle", values.vehicle);
    formData.append("occasion_date", values.occasion_date);
    formData.append("pickup_time", values.pickup_time);
    formData.append("pickup_location", values.pickup_location);
    if(values.additionals){
      formData.append("additionals", values.additionals);
    }
    

    try {
      const resp = await ApiServices.post("listings/car_hire", formData);
      if (resp.success) {
        toast.success("Request sent successfully", { position: "top-center" });
        setTimeout(() => {
          toast.success("Our agent will get back to you shortly.", { position: "top-center" });
        }, 6000);

        reset();
      } else {
        toast.error(resp.error, { position: "top-center" });
      }
    } catch (e) {
      toast.error("An error occured, " +e, { position: "top-center" });
    }

  }

  return (
    <div className="p-6 max-w-5xl mx-auto space-y-12">
      {/* Hero Section */}
      <section className="text-center space-y-4">
        <h1 className="text-3xl font-bold text-orange-400">Chauffeured & Luxury Car Hire Services</h1>
        <p className="text-lg text-gray-600">Experience class and comfort with our premium car hire services.</p>
        {/* <img src="/luxury-car-banner.jpg" alt="Luxury Car Hire" className="w-full rounded-2xl shadow-xl" /> */}
      </section>

      {/* Service Categories */}
      <section className="grid md:grid-cols-2 gap-6">
        {[
          {
            title: 'Weddings',
            description: 'Arrive in style with our luxury wedding fleet, including white Land Cruisers, Range Rovers, Mercedes, and classic cars.'
          },
          {
            title: 'Hotel Transfers',
            description: 'Airport pickups and hotel transfers for VIP guests, executives, and tourists. Chauffeur included.'
          },
          {
            title: 'Corporate Transport',
            description: 'Reliable, high-end vehicles for executives, board members, or guests attending business meetings and conferences.'
          },
          {
            title: 'Events & Photography',
            description: 'Hire exotic or classic vehicles for photoshoots, graduations, music videos, or red-carpet arrivals.'
          },
        ].map((service, index) => (
          <div key={index} className="p-6 bg-gray-50 rounded-2xl shadow-sm">
            <h2 className="text-xl font-semibold mb-2">{service.title}</h2>
            <p className="text-gray-700">{service.description}</p>
          </div>
        ))}
      </section>

      {/* Sample Gallery */}
      <section>
        <h2 className="text-2xl font-bold mb-4">Our Luxury & Corporate Fleet</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-5">
          {['mercedes_benz.png', 'range_rover.png', 'land_cruiser.png', 'bmw.png', 'van.png'].map((img, idx) => (
            <div key={idx} className="rounded-xl overflow-hidden shadow-md">
              {/* Image container */}
              <div className="relative h-60 w-full">
                <Image
                  src={`/images/hire/${img}`}
                  alt="Luxury car"
                  fill
                  className="object-cover"
                />
              </div>

              {/* Text below the image */}
              <p className="text-center uppercase py-2 text-sm font-semibold text-gray-600 bg-white">
                {img
                  .replace('.png', '')
                  .replace('_', ' ')
                  .replace(/([a-z])([A-Z])/g, '$1 $2')}
              </p>
            </div>
          ))}


        </div>
      </section>

      {/* Booking Form */}
      <section className="bg-white p-6 rounded-2xl shadow-md space-y-4">
        <h2 className="text-2xl font-bold">Request Booking</h2>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField 
              name="fullname"
              control={form.control}
              render={({field}) => (
                <FormItem>
                  <FormLabel>Full Name</FormLabel>
                  <FormControl>
                    <Input 
                      type="text" 
                      placeholder="e.g John Doe" 
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
                      placeholder="e.g 254722..."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />


            <FormField 
              name="occasion"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Type of Occasion</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder="e.g Wedding, Corporate, Album Launch etc."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField 
              name="vehicle"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Preferred Vehicle</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder="e.g Range Rover Sport, Mercedes GLE, Toyota VXL"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />    

            <FormField 
              name="occasion_date"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Occasion Date</FormLabel>
                  <FormControl>
                    <Input
                      type="date"
                      placeholder="e.g John Doe"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              name="pickup_time"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Pickup Time</FormLabel>
                  <FormControl>
                    <Input
                      type="time"
                      placeholder="e.g John Doe"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />


            <FormField
              name="pickup_location"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Pickup Location</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder="e.g Old Runda"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="md:col-span-2">
              <FormField
                name="additionals"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Special Request</FormLabel>
                    <FormControl>
                      <Textarea rows={4} placeholder="Enter your additional requests here ..." {...field}></Textarea>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />   
            </div> 

            <div className="mx-auto md:col-span-2">
              <Button disabled={!isValid || isSubmitting} className="w-full md:col-span-2 bg-orange-400 cursor-pointer rounded-xl">Request Booking</Button>
            </div>
          </form>
        </Form>

        
      </section>

      {/* WhatsApp CTA */}
      <div className="text-center">
        <a
          href="https://wa.me/254110276248"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 bg-green-500 text-white px-6 py-3 rounded-full shadow-md hover:bg-green-600 transition"
        >
          <FaWhatsapp className="text-lg" />
          Chat with a Booking Agent
        </a>

      </div>

      {/* Trust Note */}
      <footer className="text-center text-sm text-gray-500 mt-12">
        All bookings are professionally handled. Chauffeurs are trained, vehicles are well-maintained, and schedules are strictly followed.
      </footer>
    </div>
  );
};

export default LuxuryCarHirePage;