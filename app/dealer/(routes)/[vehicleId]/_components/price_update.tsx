"use client"

import React, { useState } from 'react';
import { Dialog, DialogContent, DialogTrigger, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { ArrowDown } from 'lucide-react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { VehicleModel } from '@/lib/models';
import { useSession } from 'next-auth/react';
import { toast } from 'sonner';

interface PriceUpdateProps {
    vehicle: VehicleModel;
    // onSubmit: () => void;
}

const PriceUpdate = ({ vehicle }: PriceUpdateProps) => {
    const session = useSession();
    const [ price, setPrice ] = useState("");

    const onSubmit = async() => {

        const id = vehicle?.listing_id
        const formData = new FormData()
        formData.append("price", price)
        formData.append("listing", id)

        if(Number(price) < Number(vehicle?.price)){
            const res = await fetch(`${process.env.NEXT_PUBLIC_APIURL}/dealers/price_history/`, {
                method: "POST",
                headers: {
                    "Authorization": `Token ${session?.data?.accessToken}`
                },
                body: formData
            });

            if (res.ok) {
                toast.success("Price updated!", { position: "top-center" });
                window.location.reload();
            } else {
                toast.error("Something went wrong", { position: "top-center" });
            }
        } else {
            toast.error("New price must be less than current price!", { position: "top-center" });
        }
        
    }

  return (
      <Dialog>
        <DialogTrigger asChild>
            <Button className="cursor-pointer">Price Drop<ArrowDown /></Button>
        </DialogTrigger>
        <DialogContent>
            <DialogHeader>
                <DialogTitle>Have a price drop?</DialogTitle>
                <DialogDescription>This will add a badge on your listing showing price drop. If not just change price from details form.</DialogDescription>
            </DialogHeader>
            <div className='grid grid-cols-1 space-y-2'>
                <Label htmlFor="newPrice" className="text-right">New price</Label>
                <Input type="number" onChange={(e) => setPrice(e.target.value)} placeholder="e.g. 850000" />
            </div>
            <DialogFooter>
                <Button type="submit" onClick={onSubmit} className="cursor-pointer">Update Price</Button>
            </DialogFooter>
        </DialogContent>
    </Dialog>
  )
}

export default PriceUpdate