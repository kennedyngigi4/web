"use client"

import React from 'react';
import { useParams } from 'next/navigation';
import Breadcrumbs from '@/app/(guest)/_components/breadcrumb';

const ModelPage = () => {

    const params = useParams();
    const decodedMake = decodeURIComponent(params?.make as string);
    const decodedModel = decodeURIComponent(params?.model as string);

    return (
        <>
            <Breadcrumbs  make={decodedMake} model={decodedModel} />
            <section>
                ModelPage: {decodedMake} {decodedModel}
            </section>
        </>
        
    )
}

export default ModelPage