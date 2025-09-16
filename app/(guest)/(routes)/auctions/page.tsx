"use client";

import LoadingModal from '@/components/modals/loading_modal';
import React, { useState } from 'react';

const Auctions = () => {
  const [isloading, setIsLoading] =useState(false);

  if(!isloading){
    return <LoadingModal />
  }

  return (
    <section className='min-h-screen'>Auctions</section>
  )
}

export default Auctions