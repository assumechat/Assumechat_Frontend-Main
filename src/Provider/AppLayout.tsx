'use client';

import { ReactNode, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setUser } from '@/store/slices/userSlice';
import Header from '@/components/Header';
import { FooterSection } from '@/components/Footer';

export default function AppLayout({ children }: { children: ReactNode }) {
  const path = usePathname();
  const dispatch = useDispatch();

  useEffect(() => {
    const refreshToken = async () => {
      const token = localStorage.getItem('refreshToken');

      if (!token) return;

      try {
        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}Auth/refresh`,
          { refreshToken: token }
        );
        localStorage.setItem('refreshToken', response.data.data.refreshToken);
        dispatch(setUser({
          accessToken: response.data.data.accessToken,
          user: response.data.data.user,
        }));
      } catch (error) {
        console.error('Refresh token error:', error);
        localStorage.removeItem('refreshToken');
      }
    };

    refreshToken();
  }, [dispatch]);

  if (path === '/') {
    return (
      <>
        <Header />
        {children}
        <FooterSection />
      </>
    );
  }

  if (path === '/waitingRoom') {
    return (
      <>
        <Header />
        {children}
      </>
    );
  }

  return <>{children}</>;
}