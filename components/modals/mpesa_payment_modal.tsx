"use client";

import React, { useState } from 'react';
import { Dialog, DialogContent, DialogTrigger } from '../ui/dialog';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { DialogDescription, DialogTitle } from '@radix-ui/react-dialog';
import ApiServices from '@/lib/apiservice';
import DealerApiService from '@/lib/dealer_apiservice';
import { useSession } from 'next-auth/react';
import { toast } from 'sonner';
import { PackageItem } from '@/lib/models';


interface MpesaPaymentModalProps {
    open: boolean;
    onClose: () => void;
    subscription: PackageItem;
    vehicleid: any;
}


const MpesaPaymentModal = ({ open, onClose, subscription, vehicleid }: MpesaPaymentModalProps) => {
    const [phone, setPhone] = useState("254");
    const { data:session, status} = useSession();


    const handlePhoneChange = async(e: React.ChangeEvent<HTMLInputElement>) => {
        let val = e.target.value;

        if(!val.startsWith("254")){
            val = "254" + val.replace(/^0+|[^0-9]/g, "");
        }

        setPhone(val);
    }


    const handlePayment = async() => {
        const data = {
            "phone": phone,
            "package": subscription.pid,
            "vehicleid": vehicleid,
        }


        const res = await fetch(`${process.env.NEXT_PUBLIC_APIURL}/payments/purchase_subscription/`, {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Token ${session?.accessToken}`
            }
        });
        const response = await res.json()

        if(response.success){
            
            toast.success("Check you phone and enter your PIN to complete payments", { position: "top-center" });
            setTimeout(() => {
                onClose();
            }, 6000);
            
        } else {
            toast.error(`Error: ${response.error}`, { position: "top-center" });
        }
    }

    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent>
                <DialogTitle className="font-semibold text-xl">Package Purchase</DialogTitle>
                <DialogDescription className='font-bold text-orange-400'>{subscription?.name} - {subscription?.active_days} active days</DialogDescription>
                <div className='pt-4'>
                    

                    <Label htmlFor='mpesa number' className="pb-2">M-Pesa Phone Number</Label>
                    <Input 
                        type="tel" 
                        name="phone"
                        value={phone}
                        onChange={handlePhoneChange}
                        placeholder="" 
                    />

                    <div className="w-full my-4">
                        <Button onClick={handlePayment} className="bg-orange-400 text-white w-full cursor-pointer">Pay Via M-pesa <strong>(KSh {parseInt(subscription?.price).toLocaleString()})</strong></Button>
                    </div>
                    
                </div>
            </DialogContent>
        </Dialog>
    )
}

export default MpesaPaymentModal