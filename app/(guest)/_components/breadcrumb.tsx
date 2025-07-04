"use client"

import React from 'react';

import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb';
import { Slash } from 'lucide-react';
import Link from 'next/link';

interface BreadcrumbsProps {
    make?: any;
    model?: any;
    vehicleId?: any;
    vehicletype?: any;
}

const Breadcrumbs = ({ make, model, vehicleId, vehicletype } : BreadcrumbsProps) => {

    const decodedMake = decodeURIComponent(make as string)
    const decodedModel = decodeURIComponent(model as string);
    const vehicle = vehicletype+"s"

  return (
    <section className="py-3">
        <Breadcrumb>
            <BreadcrumbList>
                <BreadcrumbItem>
                    <Link href="/">Home</Link>
                </BreadcrumbItem>
                {make && (
                    <>
                        <BreadcrumbSeparator>
                            <Slash />
                        </BreadcrumbSeparator>
                        <BreadcrumbItem>
                              <Link href="">{make}</Link>
                        </BreadcrumbItem>
                    </>
                )}
                {model && (
                    <>
                        <BreadcrumbSeparator>
                            <Slash />
                        </BreadcrumbSeparator>
                        <BreadcrumbItem>
                              <Link href="">{model}</Link>
                        </BreadcrumbItem>
                    </>
                )}
                {vehicleId && (
                    <>
                        <BreadcrumbSeparator>
                            <Slash />
                        </BreadcrumbSeparator>
                        <BreadcrumbItem>
                            <Link href="">{vehicleId}</Link>
                        </BreadcrumbItem>
                    </>
                )}
            </BreadcrumbList>
        </Breadcrumb>
    </section>
  );
}

export default Breadcrumbs