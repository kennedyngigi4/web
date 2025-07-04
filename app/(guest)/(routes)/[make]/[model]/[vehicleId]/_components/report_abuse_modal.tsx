"use client"

import React, { useState } from 'react';
import { Dialog, DialogContent, DialogTrigger, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { ArrowDown, FlagIcon } from 'lucide-react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { SparePart, VehicleModel } from '@/lib/models';
import { useSession } from 'next-auth/react';
import { toast } from 'sonner';
import { Textarea } from '@/components/ui/textarea';

interface ReportAbuseModalProps {
    vehicle?: VehicleModel;
    spare?: SparePart;
    // onSubmit: () => void;
}

const ReportAbuseModal = ({ vehicle, spare }: ReportAbuseModalProps) => {
    const [message, setMessage] = useState("");
    

    const onSubmit = async () => {

        const id = vehicle ? vehicle?.dealer.id : spare?.dealer.id;
        const formData = new FormData()
        formData.append("message", message);
        formData.append("seller", id);

        

    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button className="bg-red-600 cursor-pointer text-sm"><FlagIcon /> Report Abuse</Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Report Abuse</DialogTitle>
                    <DialogDescription>Report any issue you had with the seller</DialogDescription>
                </DialogHeader>
                <div className='grid grid-cols-1 space-y-4 pt-4'>
                    <div>
                        <Label htmlFor="name" className="text-right pb-1">Message</Label>
                        <Textarea onChange={(e) => setMessage(e.target.value)} placeholder="Enter you message here ..."></Textarea>
                    </div>
                    
                </div>
                <DialogFooter>
                    <Button type="submit" onClick={onSubmit} className="cursor-pointer">Submit</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

export default ReportAbuseModal