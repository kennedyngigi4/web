"use client"

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Eye, EyeClosed } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import ResetClient from './resetclient';


interface PageProps {
  params: {
    uid: string;
    token: string;
  };
}

const ResetPasswordPage = ({ params }: PageProps) => {
  

  return (
    <ResetClient uid={params.uid} token={params.token} />
  )
}

export default ResetPasswordPage