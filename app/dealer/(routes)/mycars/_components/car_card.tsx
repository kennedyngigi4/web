import { VehicleModel } from '@/lib/models';
import { InfoIcon } from 'lucide-react';
import Link from 'next/link';
import React from 'react'

interface DealerCarCardProps {
    vehicle: VehicleModel
}

const DealerCarCard = ({ vehicle } : DealerCarCardProps) => {
  return (
    <section className="grid md:grid-cols-4 gap-4 py-4 border-b-2 border-slate-50">
        <div>
            <h1>{vehicle.year_of_make} {vehicle.make} {vehicle.model}</h1>
        </div>
        <div>
            <h1 className="text-sm text-center">KSh. {parseInt(vehicle?.price).toLocaleString()}</h1>
        </div>
        <div>
            <h1 className="text-xs">Expires: </h1>
        </div>
        <div>
            <Link href={`/dealer/${vehicle?.listing_id}`}>
                <InfoIcon className="w-4 h-4" />
            </Link>
            
        </div>
    </section>
  )
}

export default DealerCarCard