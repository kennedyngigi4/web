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

interface ViewingModalProps {
    vehicle: VehicleModel;
    // onSubmit: () => void;
}

const ViewingModal = ({ vehicle }: ViewingModalProps) => {
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [dateTime, setDateTime ] = useState("");

    const onSubmit = async () => {

        const id = vehicle?.listing_id
        const formData = new FormData()
        formData.append("name", name);
        formData.append("listing", id);

        

    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button className="bg-orange-400 cursor-pointer text-sm">Request Viewing</Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Request Viewing</DialogTitle>
                    <DialogDescription>We schedule viewing with the seller on your behalf.</DialogDescription>
                </DialogHeader>
                <div className='grid grid-cols-1 space-y-4 pt-4'>
                    <div>
                        <Label htmlFor="name" className="text-right pb-1">Full Name</Label>
                        <Input type="text" onChange={(e) => setName(e.target.value)} placeholder="e.g. John Doe" />
                    </div>
                    <div>
                        <Label htmlFor="phone" className="text-right pb-1">Phone Number</Label>
                        <Input type="tel" onChange={(e) => setPhone(e.target.value)} placeholder="e.g. 0110 276248" />
                    </div>
                    <div>
                        <Label htmlFor="phone" className="text-right pb-1">Date and Time</Label>
                        <Input type="datetime-local" onChange={(e) => setDateTime(e.target.value)} />
                    </div>
                </div>
                <DialogFooter>
                    <Button type="submit" onClick={onSubmit} className="cursor-pointer">Submit</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

export default ViewingModal