"use client"

import React from 'react';
import { useParams } from 'next/navigation';
import Breadcrumbs from '../../_components/breadcrumb';

const MakePage =  () => {
    const params = useParams();
    const decodedMake = decodeURIComponent(params?.make as string)

    return (
        <>
            <Breadcrumbs make={decodedMake} />
            <section>Make: {decodedMake}</section>
        </>
    )
}

export default MakePage;