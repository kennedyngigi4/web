"use client"

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { Form, FormField, FormItem, FormControl, FormMessage, FormLabel } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { toast } from 'sonner';
import { Eye, EyeClosed } from 'lucide-react';
import { loginUser } from '@/lib/actions';
import { signIn } from "@/auth"
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';

const formSchema = z.object({
  email: z.string({ required_error: "Email is required" }).email({ "message": "Invalid email address"}),
  password: z.string({ required_error: "Password is required" })
            .min(8, "Password must be at least 8 characters")
            .max(32, "Password must be less than 32 characters")
})

const SignInPage = () => {
  const { data:session, status } = useSession();
  const router = useRouter();

  const [ passwordView, setPasswordView ] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    }
  })

  const { isValid, isSubmitting } = form.formState;

  const onSubmit = async(values: z.infer<typeof formSchema>) => {
    const res =  await loginUser(values.email, values.password);
    if(res.success){
      toast.success(res.message, { position: 'top-center' });
      window.location.href = "/dealer"
      // router.push("/dealer");
      // router.refresh();
    } else {
      toast.error("Email or Password is invalid", { position: 'top-center' });
    }
  }


  useEffect(() => {
    if (status === "authenticated"){
      router.push("/dealer");
    }
  }, [status]);


  return (
    <section className="py-16">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 md:w-[85%] shadow-sm bg-white md:p-9 p-3 md:mx-auto">
        <div>
          <Image src="/images/login.svg" width={500} height={500} layout="responsive" className="md:pt-10" alt="Your trusted online car marketplace. Buy, sell or rent cars in Nairobi, Kenya" />
        </div>
        <div className="flex flex-col space-y-6 lg:w-[75%] w-full">
          <div>
            <h1 className="text-2xl font-semibold text-orange-400">Login</h1>
            <p className="text-slate-500">Welcome back, let's make some money!🤑</p>
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField 
                name="email"
                control={form.control}
                render={({field}) => (
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

              <FormField
                name="password"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input
                          type={passwordView ? "text" : "password"}
                          placeholder="********"
                          {...field}
                        />
                        {passwordView ? (
                          <Eye className="absolute right-3 top-2 z-20 cursor-pointer text-slate-500 w-5" onClick={() => {
                            setPasswordView(!passwordView)
                          }} />
                        ) : (
                            <EyeClosed className="absolute right-3 top-2 z-20 cursor-pointer text-slate-500 w-5" onClick={() => {
                            setPasswordView(!passwordView)
                          }} />
                        )}
                      </div>
                      
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="text-sm text-end mb-4"><Link href="/forgot-password" className="text-orange-400">Forgot password?</Link></div>

              <div>
                <Button className="cursor-pointer bg-orange-400 text-white hover:border hover:border-orange-400 hover:bg-background hover:text-orange-400" disabled={!isValid || isSubmitting}>Log in</Button>
              </div>
            </form>
          </Form>


          
          <p>Not registered? <Link href="/signup" className="text-orange-400 font-semibold">Register</Link></p>
        </div>
      </div>
    </section>
  )
}

export default SignInPage