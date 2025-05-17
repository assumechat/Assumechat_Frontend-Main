"use client"
import { useRef, useEffect } from 'react';
import Head from 'next/head';
import HeroSection from '@/components/Home/HeroSection';
import HowItWorksSection from '@/components/Home/HowitWorks';
import ExperienceSection from '@/components/Home/EXPSection';
import cards from '@/Data/Howitworks';
import privactcard from "@/Data/Privary"
import TestimonialsSection from '@/components/Home/Testimonials';
import FnQsection from '@/components/Home/FnQs';
import Universities from '@/components/Home/Universities';
export default function LandingPage() {


  return (
    <>
      <HeroSection />
      <HowItWorksSection title='How It Works?' description='Real people. Real talk. Just you, the moment and the conversations that count.' Data={cards} />
      <ExperienceSection />
      <HowItWorksSection title='Your Safety & Privacy is Our Priority' description='Advanced security measures to ensure safe and private interactions' Data={privactcard} />
      <TestimonialsSection/>
      <Universities/>
      <FnQsection/>
    </>
  );
}