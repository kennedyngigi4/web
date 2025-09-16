"use client";

import React from 'react';


const SuperadminLayout = ({ children }: Readonly<{ children: React.ReactNode}>) => {
  return (
    <section>
      {children}
    </section>
  )
}

export default SuperadminLayout