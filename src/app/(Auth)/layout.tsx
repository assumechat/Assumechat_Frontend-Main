"use client";
import { FooterSection } from "@/components/Footerforauth";
import Header from "@/components/HeaderforAuth";
import { Toaster } from "sonner";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <Toaster richColors />
      {children}
      <FooterSection />
    </>
  );
}
