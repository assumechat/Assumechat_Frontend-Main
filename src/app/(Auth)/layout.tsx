'use client';
import { FooterSection } from "@/components/Footerforauth"
import Header from "@/components/HeaderforAuth"
import { Toaster } from "sonner";
import { useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '@/store/hooks';
import { initSockets, joinQueue, leaveQueue } from '@/store/slices/socketSlice';
import { useRouter } from 'next/navigation';

export default function Layout({
    children,
}: {
    children: React.ReactNode
}) {
    const dispatch = useAppDispatch();

    const matched = useAppSelector(s => s.socket.matched);
  
    return (
        <>
            <Header />
            <Toaster richColors />
            {children}
            <FooterSection />
        </>
    )
}
