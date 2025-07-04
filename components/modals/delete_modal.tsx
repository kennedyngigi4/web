"use client"

import React from 'react';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogHeader,
    AlertDialogFooter,
    AlertDialogTitle,
    AlertDialogTrigger
} from '../ui/alert-dialog';


interface DeleteModalProps {
    children: React.ReactNode;
    title: string;
    product?: string;
    description: string;
    onConfirm: () => void;
}

const DeleteModal = ({ children, title, product, description, onConfirm } : DeleteModalProps) => {
  return (
    <AlertDialog>
        <AlertDialogTrigger asChild>
            {children}
        </AlertDialogTrigger>
        <AlertDialogContent>
            <AlertDialogHeader>
                <AlertDialogTitle>{title}</AlertDialogTitle>
                <AlertDialogDescription>{description}</AlertDialogDescription>

                <AlertDialogTitle className='py-5 font-semibold text-red-400 text-sm'>Deleting: {product}</AlertDialogTitle>
            </AlertDialogHeader>
            <AlertDialogFooter>
                <AlertDialogCancel className='cursor-pointer'>Cancel</AlertDialogCancel>
                <AlertDialogAction className='cursor-pointer' onClick={onConfirm}>Continue</AlertDialogAction>
            </AlertDialogFooter>
        </AlertDialogContent>
    </AlertDialog>
  )
}

export default DeleteModal