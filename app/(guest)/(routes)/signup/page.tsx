"use client"

import React, { useState } from 'react';
import Image from 'next/image';
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { Form, FormField, FormItem, FormControl, FormMessage, FormDescription, FormLabel } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import 'react-phone-number-input/style.css';
import PhoneInput from 'react-phone-number-input';
import { userRegistration } from "@/lib/actions";
import { Eye, EyeClosed } from 'lucide-react';
import { toast } from "sonner";
import { useRouter } from 'next/navigation';


const formSchema = z.object({
  name: z.string({ required_error: "Name is required" }),
  email: z.string({ required_error: "Email is required" }).email({ "message": "Invalid email address"}),
  phone: z.string({ required_error: "Phone number is required" }),
  password: z.string({ required_error: "Password is required" })
            .min(8, "Password must be at least 8 characters")
            .max(32, "Password must be less than 32 characters")
})

const SignUp = () => {
  const [passwordView, setPasswordView] = useState(false);


  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      password: "",
    }
  })

  const { isValid, isSubmitting } = form.formState;

  const onSubmit = async(values: z.infer<typeof formSchema>) => {
    const registrationData = {
      name: values.name,
      email: values.email,
      phone: values.phone,
      password: values.password,
    }

    const res = await userRegistration(registrationData);
    if(res?.success){
      toast.success(res?.message, { position: 'top-center' });
      window.location.href = "/dealer";
    } else {
      toast.error(res?.message, { position: 'top-center' });
    }
    
  }


  return (
    <section className="py-16">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 md:w-[85%] shadow-sm bg-white md:p-9 p-3 md:mx-auto">
        <div>
          <Image src="/images/registration.svg" width={500} height={500} layout="responsive" className="" alt="Your trusted online car marketplace. Buy, sell or rent cars in Nairobi, Kenya" />
        </div>
        <div className="flex flex-col space-y-6 lg:w-[80%] w-full">
          <div>
            <h1 className="text-2xl font-semibold text-orange-400">Register</h1>
            <p className="text-slate-500">Join our community and sell more🤑!</p>
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField 
                name="name"
                control={form.control}
                render={({field}) => (
                  <FormItem>
                    <FormLabel>Full name</FormLabel>
                    <FormControl className="bg-background">
                      <Input 
                        type="text"
                        placeholder="e.g. John Doe"
                        className="bg-background"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription className="text-xs">Your name or company name</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />


              <FormField
                name="email"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email Address</FormLabel>
                    <FormControl className="bg-background">
                      <Input
                        type="email"
                        placeholder="e.g. johndoe@email.com"
                        className="bg-background"
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
                    <FormControl className="border p-1 rounded-sm bg-background focus:border-0 focus:ring-0">
                      <PhoneInput
                        defaultCountry="KE"
                        placeholder="e.g. 740 733604"
                        international
                        withCountryCallingCode
                        className="focus:ring-0 focus:border-none focus:outline-0"
                        // value={field.value as E164NUMBER | undefined}
                        {...field}
                      />
                    </FormControl>
                    <FormDescription className="text-xs">Be registered on WhatsApp</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                name="password"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl className="bg-background">
                      <div className="relative">
                        <Input
                          type={passwordView ? "text" : "password"}
                          placeholder="********"
                          className="bg-background"
                          {...field}
                        />
                        {passwordView ? (
                          <Eye className="absolute right-3 top-2 z-20 cursor-pointer w-5 text-slate-500" onClick={() => {
                            setPasswordView(!passwordView)
                          }} />
                        ) : (
                            <EyeClosed className="absolute right-3 top-2 z-20 cursor-pointer w-5 text-slate-500" onClick={() => {
                              setPasswordView(!passwordView)
                            }} />
                        )}
                      </div>
                      
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <p className="text-slate-500 text-xs">By creating an account, you confirm that you have read and agree to abide by our <Link href="/terms-conditions" className="text-orange-500">Terms and Conditions</Link> and <Link href="/privacy-policy" className="text-orange-500">Privacy Policy</Link>.</p>

              <div>
                <Button className="cursor-pointer bg-orange-400 text-white hover:border hover:border-orange-400 hover:bg-background hover:text-orange-400" disabled={!isValid || isSubmitting}>Register</Button>
              </div>
            </form>
          </Form>
          
          <p>Already having account? <Link href="/signin" className="text-orange-400 font-semibold">Log in</Link></p>
        </div>
      </div>
    </section>
  )
}

export default SignUp