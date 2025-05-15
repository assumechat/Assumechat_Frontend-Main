'use client'
import { ReactNode } from 'react'
import { usePathname } from 'next/navigation'
import Header from '@/components/Header'
import { FooterSection } from '@/components/Footer'

export default function AppLayout({ children }: { children: ReactNode }) {
  const path = usePathname()
  // on /signin or /signup, render only the page
  if (path === '/') {
    return (
      <>
        <Header />
        {children}
        <FooterSection />
      </>
    )
  }
  if (path === '/waitingRoom') {
    return (
      <>
        <Header />
        {children}
      </>
    )
  }

  // otherwise wrap with Header + Footer
  return (
    <>
      {children}
    </>
  )
}
