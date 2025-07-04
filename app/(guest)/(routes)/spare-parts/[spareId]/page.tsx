import LoadingModal from '@/components/modals/loading_modal';
import { fetchSparePart } from '@/lib/api';
import React, { Suspense } from 'react';
import SpareClientId from './pageClient';
import { Metadata } from 'next';

type SpareIdProps = {
  params: any;
}

export async function generateMetadata({ params }: SpareIdProps): Promise<Metadata> {
  const spare = await fetchSparePart(`${params.spareId}`);
  const title = `${spare.title} for ${spare.make} ${spare.model} | Kenautos Nairobi Kenya`;
  const description = `https://kenautos.co.ke ${spare.title} ${spare.description}`;
  const keywords = `${spare.title} ${spare.make} ${spare.model} spare parts dealers, spare parts sales, buy spare parts in Nairobi Kenya, buy car in Nairobi Kenya`;
  let image = spare.images?.[0]?.image || "";
  if (image && !image.startsWith("http")) {
    image = `https://kenautos.co.ke${image}`;
  }
  const url = `https://kenautos.co.ke/spare-parts/${spare.id}`;

  return {
    title,
    description,
    keywords: [keywords],
    openGraph: {
      type: "website",
      url,
      title,
      description,
      images: [
        {
          url: image,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
  }
}

const SpareId = async ({ params} : SpareIdProps) => {

  const spare = await fetchSparePart(`${params.spareId}`);
  

  return (
    <Suspense fallback={<LoadingModal />}>
      <SpareClientId 
        spare={spare} 
        
      />
    </Suspense>
  )
}

export default SpareId